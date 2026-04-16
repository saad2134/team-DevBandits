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
    ResumeAuditResponse, DailyShortlistResponse, EngagementTrack
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
    
    student = Student(
        email=data.email,
        name=data.name,
        hashed_password=hash_password(data.password),
        cgpa=data.cgpa,
        year=data.year,
        branch=data.branch,
        skills=data.skills,
        goals=data.goals
    )
    db.add(student)
    db.commit()
    db.refresh(student)
    
    return AuthResponse(
        success=True,
        message="Account created successfully",
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)