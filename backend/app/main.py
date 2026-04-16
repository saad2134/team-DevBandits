import os
import hashlib
from datetime import datetime, timedelta
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .db import get_db, init_db, SessionLocal
from .models import Student, Opportunity, Engagement
from .config import app_config
from .schemas import (
    StudentProfileCreate, StudentProfileUpdate, StudentProfileOut, AuthResponse,
    OpportunityCreate, OpportunityOut, MatchResult, ResumeAuditRequest,
    ResumeAuditResponse, DailyShortlistResponse, EngagementTrack,
    StudentOnboardingStep2, StudentOnboardingStep3
)

app = FastAPI(
    title=app_config["name"],
    description=app_config["description"]
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(plain: str, hashed: str) -> bool:
    return hash_password(plain) == hashed

def create_token(student_id: int) -> str:
    return f"token_{student_id}_{datetime.utcnow().timestamp()}"

@app.on_event("startup")
async def startup():
    db = SessionLocal()
    if db.query(Student).count() == 0:
        sample_opportunities = [
            Opportunity(
                title="Software Engineering Intern",
                organization="Google",
                type="internship",
                url="https://careers.google.com/jobs/123",
                description="Work on real-world distributed systems",
                requirements=["Python", "Data Structures", "System Design"],
                deadline="2026-05-01",
                location="Bangalore, India"
            ),
            Opportunity(
                title="ML Research Fellowship",
                organization="OpenAI",
                type="research",
                url="https://openai.com/research",
                description="Research in large language models",
                requirements=["Deep Learning", "PyTorch", "Research Experience"],
                deadline="2026-04-30",
                location="San Francisco, USA"
            ),
            Opportunity(
                title=" Undergraduate Scholarship",
                organization="Mercy College",
                type="scholarship",
                url="https://mercy.edu/scholarship",
                description="Full tuition scholarship for CS students",
                requirements=["CGPA > 8.0", "Financial Need"],
                deadline="2026-04-25",
                location="New York, USA"
            ),
            Opportunity(
                title="Frontend Developer",
                organization="Flipkart",
                type="job",
                url="https://flipkart.com/careers",
                description="Build user interfaces at scale",
                requirements=["React", "JavaScript", "CSS"],
                deadline="2026-05-15",
                location="Bangalore, India"
            ),
            Opportunity(
                title="Data Science Intern",
                organization="Amazon",
                type="internship",
                url="https://amazon.jobs",
                description="Work on recommendation systems",
                requirements=["Python", "SQL", "Machine Learning"],
                deadline="2026-05-10",
                location="Hyderabad, India"
            ),
        ]
        db.add_all(sample_opportunities)
        db.commit()
    db.close()

@app.get("/")
def root():
    return {
        "name": app_config["name"],
        "version": app_config["version"],
        "description": app_config["description"],
        "endpoints": ["/auth/signup", "/auth/login", "/profile", "/opportunities", "/matches", "/audit", "/shortlist", "/engage"]
    }

@app.get("/status")
def status():
    return {
        "status": "online",
        "timestamp": datetime.now().isoformat(),
        "service": app_config["name"]
    }

@app.post("/auth/signup", response_model=AuthResponse)
def signup(data: StudentProfileCreate, db: Session = Depends(get_db)):
    existing = db.query(Student).filter(Student.email == data.email).first()
    if existing:
        return AuthResponse(success=False, message="Email already registered")
    
    if not data.terms_accepted:
        return AuthResponse(success=False, message="Terms must be accepted")
    
    student = Student(
        email=data.email,
        name=data.name,
        hashed_password=hash_password(data.password),
        onboarding_step=1,
        onboarding_completed=False
    )
    db.add(student)
    db.commit()
    db.refresh(student)
    
    return AuthResponse(
        success=True,
        message="Account created. Complete Step 1: Profile Details",
        user=StudentProfileOut.model_validate(student),
        token=create_token(student.id)
    )

@app.post("/auth/login", response_model=AuthResponse)
def login(email: str, password: str, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.email == email).first()
    if not student or not verify_password(password, student.hashed_password):
        return AuthResponse(success=False, message="Invalid credentials")
    
    return AuthResponse(
        success=True,
        message="Login successful",
        user=StudentProfileOut.model_validate(student),
        token=create_token(student.id)
    )

@app.post("/auth/change-password")
def change_password(data: dict, db: Session = Depends(get_db)):
    """Change user password"""
    student_id = data.get("student_id")
    current_password = data.get("current_password")
    new_password = data.get("new_password")
    
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        return {"success": False, "message": "User not found"}
    
    if not verify_password(current_password, student.hashed_password):
        return {"success": False, "message": "Current password is incorrect"}
    
    student.hashed_password = hash_password(new_password)
    db.commit()
    
    return {"success": True, "message": "Password changed successfully"}

@app.get("/profile/{student_id}", response_model=StudentProfileOut)
def get_profile(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return StudentProfileOut.model_validate(student)

@app.put("/profile/{student_id}", response_model=StudentProfileOut)
def update_profile(student_id: int, data: StudentProfileUpdate, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(student, field, value)
    
    db.commit()
    db.refresh(student)
    return StudentProfileOut.model_validate(student)

@app.get("/opportunities", response_model=List[OpportunityOut])
def list_opportunities(db: Session = Depends(get_db)):
    return db.query(Opportunity).order_by(Opportunity.posted_at.desc()).all()

@app.post("/opportunities", response_model=OpportunityOut)
def create_opportunity(data: OpportunityCreate, db: Session = Depends(get_db)):
    opp = Opportunity(**data.model_dump())
    db.add(opp)
    db.commit()
    db.refresh(opp)
    return OpportunityOut.model_validate(opp)

def calculate_match_score(student: Student, opportunity: Opportunity) -> tuple[float, List[str], List[str]]:
    student_skills = set(s.lower() for s in student.skills)
    req_skills = set(r.lower() for r in opportunity.requirements)
    
    matched = student_skills.intersection(req_skills)
    missing = req_skills - student_skills
    
    if len(req_skills) == 0:
        score = 50.0
    else:
        score = (len(matched) / len(req_skills)) * 100
    
    if student.cgpa and student.cgpa >= 8.0:
        score += 10
    
    return min(score, 100), list(missing), list(req_skills)

@app.get("/matches/{student_id}", response_model=List[MatchResult])
def get_matches(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    opportunities = db.query(Opportunity).all()
    results = []
    
    for opp in opportunities:
        score, missing, matched = calculate_match_score(student, opp)
        results.append(MatchResult(
            opportunity=OpportunityOut.model_validate(opp),
            match_score=round(score, 1),
            missing_skills=missing,
            matched_skills=matched
        ))
    
    results.sort(key=lambda x: x.match_score, reverse=True)
    return results[:10]

@app.post("/audit", response_model=ResumeAuditResponse)
def audit_resume(request: ResumeAuditRequest, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == request.student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    opportunity = db.query(Opportunity).filter(Opportunity.id == request.opportunity_id).first()
    if not opportunity:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    
    score, missing, matched = calculate_match_score(student, opportunity)
    
    suggestions = []
    if missing:
        suggestions.append(f"Learn: {', '.join(missing[:3])}")
    if student.cgpa and student.cgpa < 8.0:
        suggestions.append("Improve CGPA above 8.0")
    if not student.branch:
        suggestions.append("Update your branch in profile")
    
    cover_letter = f"""Dear Hiring Manager at {opportunity.organization},

I am writing to express my interest in the {opportunity.title} position at {opportunity.organization}.

{"With my skills in " + ", ".join(matched[:3]) + ", " if matched else ""}I believe I am a strong candidate for this role.{" My academic background in " + student.branch + " has prepared me well." if student.branch else ""}

{"I am particularly excited about this opportunity because " + opportunity.description[:100]}

Thank you for considering my application.

Best regards,
{student.name}"""
    
    return ResumeAuditResponse(
        student_profile=StudentProfileOut.model_validate(student),
        opportunity=OpportunityOut.model_validate(opportunity),
        match_score=round(score, 1),
        matched_skills=matched,
        missing_skills=missing,
        suggestions=suggestions,
        cover_letter=cover_letter
    )

@app.get("/shortlist/{student_id}", response_model=DailyShortlistResponse)
def get_daily_shortlist(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    matches = get_matches(student_id, db)
    top_matches = [m for m in matches if m.match_score >= 30]
    
    return DailyShortlistResponse(
        student_id=student_id,
        opportunities=top_matches[:5],
        generated_at=datetime.utcnow()
    )

@app.post("/engage")
def track_engagement(student_id: int, opportunity_id: int, action: str, db: Session = Depends(get_db)):
    engagement = Engagement(
        student_id=student_id,
        opportunity_id=opportunity_id,
        action=action
    )
    db.add(engagement)
    db.commit()
    return {"success": True, "message": f"Action '{action}' tracked"}

@app.get("/engagements/{student_id}")
def get_engagements(student_id: int, db: Session = Depends(get_db)):
    return db.query(Engagement).filter(Engagement.student_id == student_id).order_by(Engagement.created_at.desc()).all()

@app.post("/onboarding/step1")
def complete_onboarding_step1(data: StudentProfileCreate, db: Session = Depends(get_db)):
    """Part 1: Account creation"""
    existing = db.query(Student).filter(Student.email == data.email).first()
    if existing:
        return {"success": False, "message": "Email already registered"}
    
    student = Student(
        email=data.email,
        name=data.name,
        hashed_password=hash_password(data.password),
        onboarding_step=1
    )
    db.add(student)
    db.commit()
    db.refresh(student)
    
    return {
        "success": True,
        "message": "Step 1 completed",
        "student_id": student.id,
        "onboarding_step": student.onboarding_step
    }

@app.post("/onboarding/step2/{student_id}")
def complete_onboarding_step2(student_id: int, data: StudentOnboardingStep2, db: Session = Depends(get_db)):
    """Part 2: Resume/Profile Details"""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(student, field, value)
    
    student.onboarding_step = 2
    db.commit()
    db.refresh(student)
    
    return {
        "success": True,
        "message": "Step 2 completed",
        "student_id": student.id,
        "onboarding_step": student.onboarding_step
    }

@app.post("/onboarding/step3/{student_id}")
def complete_onboarding_step3(student_id: int, data: StudentOnboardingStep3, db: Session = Depends(get_db)):
    """Part 3: Goals & Preferences"""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(student, field, value)
    
    student.onboarding_step = 3
    student.onboarding_completed = True
    db.commit()
    db.refresh(student)
    
    return {
        "success": True,
        "message": "Onboarding completed!",
        "student_id": student.id,
        "onboarding_completed": student.onboarding_completed
    }

@app.post("/onboarding/save-progress/{student_id}")
def save_onboarding_progress(student_id: int, step: int, data: dict, db: Session = Depends(get_db)):
    """Save progress at any step"""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    # Save the data to appropriate fields based on step
    if step == 2:
        for key, value in data.items():
            if hasattr(student, key):
                setattr(student, key, value)
        student.onboarding_step = max(student.onboarding_step, 1)
    elif step == 3:
        for key, value in data.items():
            if hasattr(student, key):
                setattr(student, key, value)
        student.onboarding_step = max(student.onboarding_step, 2)
    
    db.commit()
    return {"success": True, "message": "Progress saved"}

@app.get("/onboarding/progress/{student_id}")
def get_onboarding_progress(student_id: int, db: Session = Depends(get_db)):
    """Get current onboarding progress"""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    return {
        "student_id": student.id,
        "onboarding_step": student.onboarding_step,
        "onboarding_completed": student.onboarding_completed
    }

@app.post("/profile/resume/{student_id}")
async def upload_resume(student_id: int, db: Session = Depends(get_db)):
    """Upload resume - expects file to be sent as form data"""
    from fastapi import UploadFile, File
    
    async def file_dep(file: UploadFile = File(...)):
        return file
    
    return {"success": False, "message": "Resume upload not implemented yet"}

@app.post("/api/saved")
def save_opportunity(data: dict, db: Session = Depends(get_db)):
    """Save or unsave an opportunity"""
    student_id = data.get("student_id")
    opportunity_id = data.get("opportunity_id")
    action = data.get("action", "save")  # "save" or "unsave"
    
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    opp = db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()
    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    
    if action == "unsave":
        existing = db.query(Engagement).filter(
            Engagement.student_id == student_id,
            Engagement.opportunity_id == opportunity_id,
            Engagement.action == "saved"
        ).first()
        if existing:
            db.delete(existing)
            db.commit()
        return {"success": True, "message": "Opportunity unsaved"}
    
    existing = db.query(Engagement).filter(
        Engagement.student_id == student_id,
        Engagement.opportunity_id == opportunity_id,
        Engagement.action == "saved"
    ).first()
    
    if not existing:
        engagement = Engagement(
            student_id=student_id,
            opportunity_id=opportunity_id,
            action="saved"
        )
        db.add(engagement)
        db.commit()
    
    return {"success": True, "message": "Opportunity saved"}

@app.get("/api/saved/{student_id}")
def get_saved_opportunities(student_id: int, db: Session = Depends(get_db)):
    """Get saved opportunities for a student"""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    saved_engagements = db.query(Engagement).filter(
        Engagement.student_id == student_id,
        Engagement.action == "saved"
    ).all()
    
    opportunities = []
    for eng in saved_engagements:
        opp = db.query(Opportunity).filter(Opportunity.id == eng.opportunity_id).first()
        if opp:
            opportunities.append(OpportunityOut.model_validate(opp))
    
    return {"opportunities": opportunities}

@app.get("/applications/{student_id}")
def get_applications(student_id: int, db: Session = Depends(get_db)):
    """Get student applications - real data from engagement table"""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    applied_engagements = db.query(Engagement).filter(
        Engagement.student_id == student_id,
        Engagement.action == "applied"
    ).all()
    
    applications = []
    for eng in applied_engagements:
        opp = db.query(Opportunity).filter(Opportunity.id == eng.opportunity_id).first()
        if opp:
            applications.append({
                "id": eng.id,
                "opp_id": opp.id,
                "title": opp.title,
                "organization": opp.organization,
                "type": opp.type,
                "url": opp.url,
                "status": eng.status or "applied",
                "applied_at": str(eng.created_at)
            })
    
    return {"applications": applications}

@app.post("/applications")
def apply_to_opportunity(data: dict, db: Session = Depends(get_db)):
    """Track an application submission"""
    student_id = data.get("student_id")
    opportunity_id = data.get("opportunity_id")
    
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    opp = db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()
    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    
    existing = db.query(Engagement).filter(
        Engagement.student_id == student_id,
        Engagement.opportunity_id == opportunity_id,
        Engagement.action == "applied"
    ).first()
    
    if existing:
        return {"success": True, "message": "Already applied", "application_id": existing.id}
    
    engagement = Engagement(
        student_id=student_id,
        opportunity_id=opportunity_id,
        action="applied",
        status="applied"
    )
    db.add(engagement)
    db.commit()
    db.refresh(engagement)
    
    return {"success": True, "message": "Application submitted", "application_id": engagement.id}

@app.put("/applications/{application_id}")
def update_application_status(application_id: int, data: dict, db: Session = Depends(get_db)):
    """Update application status"""
    status = data.get("status")  # applied, shortlisted, rejected, offered
    
    valid_statuses = ["applied", "shortlisted", "rejected", "offered", "interview"]
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    engagement = db.query(Engagement).filter(Engagement.id == application_id).first()
    if not engagement:
        raise HTTPException(status_code=404, detail="Application not found")
    
    engagement.status = status
    db.commit()
    
    return {"success": True, "message": f"Status updated to {status}"}

@app.get("/analytics/{student_id}")
def get_analytics(student_id: int, db: Session = Depends(get_db)):
    """Get student analytics"""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    return {
        "totalViews": 0,
        "totalApplications": 0,
        "totalSaved": 0,
        "shortlisted": 0,
        "rejected": 0,
        "pending": 0,
        "match_rate": 75,
        "skills_match": 80,
        "topMatched": [
            {"title": "Python", "score": 95},
            {"title": "JavaScript", "score": 85},
        ],
        "topMissing": [
            {"skill": "AWS", "count": 12},
            {"skill": "Docker", "count": 8},
        ]
    }

# ==================== AGENT ENDPOINTS ====================

@app.get("/api/agents-status")
def get_agents_status():
    """Check all agents status"""
    return {
        "scout": {"status": "active", "name": "Scout", "role": "Opportunity Scout"},
        "analyzer": {"status": "active", "name": "Analyzer", "role": "Opportunity Analyzer"},
        "matcher": {"status": "active", "name": "Matcher", "role": "Matching Agent"},
        "auditor": {"status": "active", "name": "Auditor", "role": "Application Audit Agent"},
        "learner": {"status": "active", "name": "Learner", "role": "Learning Agent"},
    }

@app.post("/api/agent/scout")
def scout_agent(data: dict, db: Session = Depends(get_db)):
    """Scout discovers opportunities based on keywords"""
    from app.config import SERP_API_KEY
    
    keywords = data.get("keywords", [])
    search_type = data.get("search_type", "all")
    results = []
    source = "database"
    
    # Try Serp API if configured
    if SERP_API_KEY and not SERP_API_KEY.startswith("your_"):
        try:
            from google_search_results import GoogleSearchResults
            api = GoogleSearchResults(api_key=SERP_API_KEY)
            
            for keyword in keywords[:3]:
                query = {
                    "engine": "google",
                    "q": f"{keyword} {search_type} internship scholarship 2025",
                    "num": 10
                }
                response = api.get_dict(query)
                
                if "organic_results" in response:
                    source = "serp"
                    for result in response["organic_results"][:5]:
                        results.append({
                            "title": result.get("title", ""),
                            "link": result.get("link", ""),
                            "snippet": result.get("snippet", ""),
                            "source": "serp",
                            "relevance_score": 90
                        })
        except Exception as e:
            print(f"Serp API error: {e}")
            results = []
    
    # Fallback: Use database if no Serp results or error
    if not results:
        opportunities = db.query(Opportunity).all()
        for opp in opportunities:
            if any(k.lower() in opp.title.lower() or k.lower() in opp.description.lower() for k in keywords):
                results.append({
                    "id": opp.id,
                    "title": opp.title,
                    "organization": opp.organization,
                    "type": opp.type,
                    "url": opp.url,
                    "source": "database",
                    "relevance_score": 85 + (10 if search_type == opp.type else 0)
                })
        source = "database"
    
    return {"opportunities": results, "agent": "scout", "count": len(results), "source": source}

@app.post("/api/agent/analyzer")
def analyzer_agent(data: dict, db: Session = Depends(get_db)):
    """Analyzer extracts structured data from raw opportunity text or Scout results"""
    raw_text = data.get("text", "") or ""
    scout_results = data.get("scout_results", [])
    
    all_text = raw_text
    if scout_results:
        all_text += " " + " ".join([
            (r.get("title", "") or "") + " " + (r.get("snippet", "") or "")
            for r in scout_results
        ])
    
    # Extract skills
    skill_keywords = [
        "python", "javascript", "react", "java", "c++", "sql", "mongodb", 
        "machine learning", "deep learning", "tensorflow", "pytorch", "aws", 
        "docker", "kubernetes", "git", "html", "css", "typescript",
        "node", "express", "flask", "django", "fastapi", "angular", "vue"
    ]
    skills = [s for s in skill_keywords if s.lower() in all_text.lower()]
    
    # Extract eligibility
    eligibility = []
    if any(word in all_text.lower() for word in ["btech", "b.e.", "b.tech"]):
        eligibility.append("B.Tech/B.E.")
    if any(word in all_text.lower() for word in ["bca", "b.c.a"]):
        eligibility.append("BCA")
    if any(word in all_text.lower() for word in ["mtech", "m.sc", "mca"]):
        eligibility.append("Masters")
    if any(word in all_text.lower() for word in ["12th", "12 pass", "class 12"]):
        eligibility.append("12th Pass")
    eligibility = eligibility if eligibility else ["Any"]
    
    # Extract deadline
    import re
    date_pattern = r"(?:deadline|last date|apply by)[:\s]*(\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\w+\s+\d{1,2},?\s+\d{4})"
    deadline_match = re.search(date_pattern, all_text, re.IGNORECASE)
    deadline = deadline_match.group(1) if deadline_match else "Rolling"
    
    # Extract stipend
    stipend_pattern = r"(?:stipend|salary|compensation)[:\s]*Rs?\.?\s*(\d+,?\d*)"
    stipend_match = re.search(stipend_pattern, all_text, re.IGNORECASE)
    stipend = f"₹{stipend_match.group(1)}" if stipend_match else "Not specified"
    
    # Extract location
    location_keywords = ["bangalore", "mumbai", "delhi", "hyderabad", "pune", "chennai", "remote", "work from home", "wfh"]
    location = next((loc.title() for loc in location_keywords if loc in all_text.lower()), "Not specified")
    
    # Extract job type
    job_type = None
    if "internship" in all_text.lower():
        job_type = "Internship"
    elif "full time" in all_text.lower() or "full-time" in all_text.lower():
        job_type = "Full-time"
    elif "part time" in all_text.lower() or "part-time" in all_text.lower():
        job_type = "Part-time"
    elif "contract" in all_text.lower():
        job_type = "Contract"
    job_type = job_type or "Not specified"
    
    return {
        "skills": skills,
        "eligibility": eligibility,
        "deadline": deadline,
        "stipend": stipend,
        "location": location,
        "job_type": job_type,
        "parsed_fields": {
            "skills_count": len(skills),
            "text_length": len(all_text),
            "has_deadline": deadline != "Rolling",
            "has_stipend": stipend != "Not specified"
        },
        "agent": "analyzer"
    }

@app.post("/api/agent/matcher")
def matcher_agent(data: dict, db: Session = Depends(get_db)):
    """Matcher ranks opportunities for a student using vectorized matching"""
    from app.embeddings import calculate_skill_match_score, find_similar_skills, preload_embeddings
    
    student_id = data.get("student_id")
    opportunity_ids = data.get("opportunity_ids", [])
    use_vectorized = data.get("use_vectorized", True)
    
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    student_skills = student.skills or []
    results = []
    
    # Preload embeddings if using vectorized
    if use_vectorized and student_skills:
        all_skills = set()
        for opp_id in opportunity_ids:
            opp = db.query(Opportunity).filter(Opportunity.id == opp_id).first()
            if opp and opp.requirements:
                all_skills.update(opp.requirements)
        preload_embeddings(list(student_skills) + list(all_skills))
    
    for opp_id in opportunity_ids:
        opp = db.query(Opportunity).filter(Opportunity.id == opp_id).first()
        if not opp:
            continue
        
        required_skills = opp.requirements or []
        
        if use_vectorized and student_skills and required_skills:
            # Vectorized matching with embeddings
            score = calculate_skill_match_score(student_skills, required_skills)
            skill_analysis = find_similar_skills(student_skills, required_skills, threshold=0.6)
            matched = skill_analysis["matched"]
            missing = skill_analysis["missing"]
        else:
            # Fallback to exact matching
            matched_set = set(s.lower() for s in student_skills) & set(r.lower() for r in required_skills)
            matched = list(matched_set)
            missing = [r for r in required_skills if r.lower() not in student.skills]
            score = min(100, 50 + len(matched) * 15)
        
        results.append({
            "opportunity": {
                "id": opp_id,
                "title": opp.title,
                "organization": opp.organization,
                "type": opp.type,
                "location": opp.location,
                "description": opp.description,
                "requirements": opp.requirements or [],
                "deadline": opp.deadline,
                "url": opp.url
            },
            "match_score": round(score, 1),
            "matched_skills": matched,
            "missing_skills": missing,
            "matching_method": "vectorized" if use_vectorized else "exact"
        })
    
    results.sort(key=lambda x: x["match_score"], reverse=True)
    return {
        "ranked_matches": results, 
        "agent": "matcher", 
        "count": len(results),
        "student_skills": student_skills,
        "matching_method": "vectorized" if use_vectorized else "exact"
    }

@app.post("/api/agent/auditor/evaluate")
def auditor_evaluate(data: dict, db: Session = Depends(get_db)):
    """Auditor evaluates resume fit for an opportunity using vectorized matching"""
    from app.embeddings import find_similar_skills, calculate_skill_match_score, preload_embeddings
    
    student_id = data.get("student_id")
    opportunity_id = data.get("opportunity_id")
    use_vectorized = data.get("use_vectorized", True)
    
    student = db.query(Student).filter(Student.id == student_id).first()
    opp = db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()
    
    if not student or not opp:
        raise HTTPException(status_code=404, detail="Student or opportunity not found")
    
    student_skills = student.skills or []
    required_skills = opp.requirements or []
    
    if use_vectorized and student_skills and required_skills:
        # Preload embeddings for faster processing
        preload_embeddings(student_skills + required_skills)
        
        # Vectorized analysis
        score = calculate_skill_match_score(student_skills, required_skills)
        skill_analysis = find_similar_skills(student_skills, required_skills, threshold=0.6)
        matched = skill_analysis["matched"]
        missing = skill_analysis["missing"]
    else:
        # Fallback to exact matching
        matched = [s for s in student_skills if s.lower() in [r.lower() for r in required_skills]]
        missing = [r for r in required_skills if r.lower() not in [s.lower() for s in student_skills]]
        score = min(100, 50 + len(matched) * 10)
    
    # Additional analysis
    cgpa_boost = 15 if student.cgpa and student.cgpa >= 8.0 else 0
    final_score = min(100, score + cgpa_boost)
    
    return {
        "score": round(final_score, 1),
        "breakdown": {
            "skill_match": round(score, 1),
            "cgpa_boost": cgpa_boost
        },
        "strengths": matched,
        "gaps": missing,
        "recommendations": [
            f"Learn {s}" for s in missing[:3]
        ] + ([f"CGPA of {student.cgpa} is excellent!" if student.cgpa and student.cgpa >= 8 else "Focus on maintaining CGPA"] if student.cgpa else []),
        "student_profile": {
            "name": student.name,
            "cgpa": student.cgpa,
            "branch": student.branch,
            "year": student.year
        },
        "matching_method": "vectorized" if use_vectorized else "exact",
        "agent": "auditor"
    }

@app.post("/api/agent/auditor/ai-cover-letter")
def auditor_cover_letter(data: dict, db: Session = Depends(get_db)):
    """Auditor generates AI cover letter using Gemini or fallback template"""
    from app.config import GEMINI_API_KEY
    
    student_id = data.get("student_id")
    opportunity_id = data.get("opportunity_id")
    use_ai = data.get("use_ai", True)
    
    student = db.query(Student).filter(Student.id == student_id).first()
    opp = db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()
    
    if not student or not opp:
        raise HTTPException(status_code=404, detail="Student or opportunity not found")
    
    cover_letter = ""
    method = "template"
    
    # Try Gemini if key is configured and use_ai is True
    if use_ai and GEMINI_API_KEY and not GEMINI_API_KEY.startswith("your_"):
        try:
            import google.generativeai as genai
            genai.configure(api_key=GEMINI_API_KEY)
            model = genai.GenerativeModel('gemini-pro')
            
            prompt = f"""Write a professional cover letter for the following:

Position: {opp.title}
Company: {opp.organization}
Job Description: {opp.description}

Candidate Profile:
- Name: {student.name}
- Degree: {student.branch}
- Institution: {student.institution or "their university"}
- Skills: {", ".join(student.skills) if student.skills else "technical skills"}
- CGPA: {student.cgpa if student.cgpa else "not specified"}

Write a concise, professional cover letter highlighting how their skills match the job requirements. Keep it under 300 words."""
            
            response = model.generate_content(prompt)
            cover_letter = response.text
            method = "gemini"
        except Exception as e:
            print(f"Gemini API error: {e}")
            cover_letter = ""
    
    # Fallback to template if Gemini failed or not used
    if not cover_letter:
        method = "template"
        # Get matched skills
        matched_skills = []
        if student.skills and opp.requirements:
            matched_skills = [s for s in student.skills if s.lower() in [r.lower() for r in opp.requirements]]
        
        cover_letter = f"""Dear {opp.organization} Hiring Team,

I am writing to express my strong interest in the {opp.title} position at {opp.organization}.

Currently, I am pursuing my {"Bachelor's" if student.year and student.year <= 4 else "Master's"} in {student.branch or "Engineering"} at {student.institution or "my university"}. Through my studies and practical projects, I have developed solid skills in {", ".join(matched_skills[:4]) if matched_skills else "relevant technical areas"}.

What excites me most about this opportunity is {opp.description[:150] + "..." if opp.description and len(opp.description) > 150 else (opp.description or "the chance to contribute to your team")}.

{"My academic performance with a CGPA of " + str(student.cgpa) + " reflects my dedication to excellence" if student.cgpa else "I am committed to delivering quality work and continuous learning"}.

I would welcome the opportunity to discuss how I can contribute to your team's success. Thank you for considering my application.

Sincerely,
{student.name}"""
    
    return {
        "cover_letter": cover_letter, 
        "method": method,
        "student_name": student.name,
        "position": opp.title,
        "company": opp.organization,
        "matched_skills": matched_skills if 'matched_skills' in dir() else [],
        "agent": "auditor"
    }

@app.post("/api/agent/learner/feedback")
def learner_feedback(data: dict, db: Session = Depends(get_db)):
    """Learner processes feedback to improve recommendations"""
    from datetime import datetime
    
    student_id = data.get("student_id")
    action_type = data.get("action_type")  # viewed, saved, applied, dismissed, rejected
    opportunity_id = data.get("opportunity_id")
    feedback_rating = data.get("rating", None)  # 1-5 star rating
    feedback_text = data.get("feedback", "")
    
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    # Track action counts (simple analytics)
    if not hasattr(student, 'action_counts'):
        student.action_counts = {"viewed": 0, "saved": 0, "applied": 0, "dismissed": 0}
    
    # Update based on action
    action_insights = {
        "viewed": {
            "interest_level": "medium",
            "preference": "exploring",
            "score_change": "+1"
        },
        "saved": {
            "interest_level": "high",
            "preference": "interested",
            "score_change": "+5"
        },
        "applied": {
            "interest_level": "very high",
            "preference": "highly interested",
            "score_change": "+10"
        },
        "dismissed": {
            "interest_level": "low",
            "preference": "not interested",
            "score_change": "-2"
        },
        "rejected": {
            "interest_level": "low",
            "preference": "not fit",
            "score_change": "-5"
        }
    }
    
    action_data = action_insights.get(action_type, action_insights["viewed"])
    insights = {
        "action_type": action_type,
        "interest_level": action_data["interest_level"],
        "preference": action_data["preference"],
        "score_modifier": action_data["score_change"],
        "timestamp": datetime.now().isoformat()
    }
    
    # Learn user preferences from feedback
    learned_preferences = {}
    
    if action_type == "saved" or action_type == "applied":
        # Could learn job types, locations, etc.
        opp = db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()
        if opp:
            learned_preferences = {
                "preferred_job_types": [opp.type],
                "preferred_locations": [opp.location] if opp.location else [],
                "preferred_organizations": [opp.organization]
            }
    
    # Calculate composite preference score (mock - would use ML in production)
    engagement_score = (
        (student.action_counts.get("saved", 0) * 5) +
        (student.action_counts.get("applied", 0) * 10) -
        (student.action_counts.get("dismissed", 0) * 2) -
        (student.action_counts.get("rejected", 0) * 5)
    )
    
    return {
        "success": True,
        "message": f"Feedback recorded: {action_type} on opportunity {opportunity_id}",
        "learner_insights": {
            "current_interest_level": insights["interest_level"],
            "user_preference": insights["preference"],
            "engagement_score": max(0, engagement_score),
            "learned_preferences": learned_preferences,
            "suggestions": _get_learner_suggestions(action_type, feedback_rating)
        },
        "profile_recommendations": {
            "if_saved_many": "Shows more similar opportunities",
            "if_applied_many": "Prioritizes similar roles",
            "if_dismissed_many": "Filters out similar opportunities",
            "if_rejected_many": "Suggests skill improvements"
        },
        "agent": "learner"
    }

def _get_learner_suggestions(action_type, rating):
    """Generate suggestions based on user behavior"""
    suggestions = []
    
    if rating and rating <= 2:
        suggestions.append("The opportunity may not be a good fit")
    elif rating and rating >= 4:
        suggestions.append("Great match! More like this available")
    
    if action_type == "applied":
        suggestions.append("Your application is strong - follow up after 1 week")
    elif action_type == "saved":
        suggestions.append("Consider applying soon - deadline may be approaching")
    elif action_type == "dismissed":
        suggestions.append("We'll show fewer similar opportunities")
    
    return suggestions

@app.put("/profile/experience/{student_id}")
def update_experience(student_id: int, experience: List[Dict[str, Any]], db: Session = Depends(get_db)):
    """Update experience section"""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    student.experience = experience
    db.commit()
    return {"success": True, "message": "Experience updated"}

@app.put("/profile/education-details/{student_id}")
def update_education_details(student_id: int, education: List[Dict[str, Any]], db: Session = Depends(get_db)):
    """Update education details"""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    student.education_details = education
    db.commit()
    return {"success": True, "message": "Education details updated"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)