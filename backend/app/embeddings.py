import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import os
import warnings

warnings.filterwarnings('ignore')
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.environ['TOKENIZERS_PARALLELISM'] = 'false'

_model = None

def get_embedding_model():
    global _model
    if _model is None:
        try:
            _model = SentenceTransformer('all-MiniLM-L6-v2', device='cpu')
            _model.max_seq_length = 256
        except Exception as e:
            print(f"Error loading model: {e}")
            return None
    return _model

get_embedding_model()

def get_embeddings(texts: list[str], show_progress: bool = False) -> np.ndarray:
    if not texts:
        return np.array([])
    
    model = get_embedding_model()
    if model is None:
        return np.array([])
    
    try:
        embeddings = model.encode(texts, show_progress_bar=show_progress, convert_to_numpy=True)
        return embeddings
    except Exception as e:
        print(f"Error encoding texts: {e}")
        return np.array([])

def get_cached_embeddings(items: list[str], cache_dict: dict = None) -> dict:
    global _embeddings_cache
    if cache_dict is None:
        cache_dict = _embeddings_cache
    
    uncached = [item for item in items if item.lower().strip() not in cache_dict]
    
    if uncached:
        embeddings = get_embeddings(uncached)
        for i, item in enumerate(uncached):
            key = item.lower().strip()
            if i < len(embeddings):
                cache_dict[key] = embeddings[i]
    
    return {item: cache_dict[item.lower().strip()] for item in items if item.lower().strip() in cache_dict}

def calculate_skill_match_score(student_skills: list[str], required_skills: list[str]) -> float:
    if not student_skills or not required_skills:
        return 0.0
    
    all_skills = student_skills + required_skills
    embeddings = get_embeddings(all_skills)
    
    if len(embeddings) < len(all_skills):
        return 0.0
    
    student_embs = embeddings[:len(student_skills)]
    required_embs = embeddings[len(student_skills):]
    
    similarities = cosine_similarity(required_embs, student_embs)
    best_matches = similarities.max(axis=1)
    
    avg_match = float(np.mean(best_matches))
    
    exact_skills = set(s.lower() for s in student_skills) & set(s.lower() for s in required_skills)
    exact_ratio = len(exact_skills) / len(required_skills) if required_skills else 0
    
    final_score = (exact_ratio * 0.4 + avg_match * 0.6) * 100
    return min(100, final_score)

def find_similar_skills(skills: list[str], reference_skills: list[str], threshold: float = 0.6) -> dict:
    if not skills or not reference_skills:
        return {"matched": [], "missing": reference_skills or [], "similarity_map": {}}
    
    all_skills = skills + reference_skills
    embeddings = get_embeddings(all_skills)
    
    if len(embeddings) < len(all_skills):
        return {"matched": [], "missing": reference_skills, "similarity_map": {}}
    
    skills_emb = embeddings[:len(skills)]
    ref_embs = embeddings[len(skills):]
    
    similarities = cosine_similarity(ref_embs, skills_emb)
    
    matched = []
    missing = []
    similarity_map = {}
    
    for i, ref in enumerate(reference_skills):
        best_idx = np.argmax(similarities[i])
        best_score = float(similarities[i][best_idx])
        best_match = skills[best_idx]
        
        similarity_map[ref] = {"match": best_match, "score": best_score}
        
        if best_score >= threshold:
            matched.append(ref)
        else:
            missing.append(ref)
    
    return {"matched": matched, "missing": missing, "similarity_map": similarity_map}

def preload_embeddings(texts: list[str]):
    if texts:
        get_embeddings(list(set(texts)))