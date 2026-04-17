import os
import hashlib
from datetime import datetime, timedelta
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from .db import get_db, init_db, SessionLocal
from .models import Student, Opportunity, Engagement
from .config import app_config
from .schemas import (
    StudentProfileCreate,
    StudentProfileUpdate,
    StudentProfileOut,
    AuthResponse,
    OpportunityCreate,
    OpportunityOut,
    MatchResult,
    ResumeAuditRequest,
    ResumeAuditResponse,
    DailyShortlistResponse,
    EngagementTrack,
    StudentOnboardingStep2,
    StudentOnboardingStep3,
)

app = FastAPI(title=app_config["name"], description=app_config["description"])

scheduler = AsyncIOScheduler()

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
                location="Bangalore, India",
            ),
            Opportunity(
                title="ML Research Fellowship",
                organization="OpenAI",
                type="research",
                url="https://openai.com/research",
                description="Research in large language models",
                requirements=["Deep Learning", "PyTorch", "Research Experience"],
                deadline="2026-04-30",
                location="San Francisco, USA",
            ),
            Opportunity(
                title=" Undergraduate Scholarship",
                organization="Mercy College",
                type="scholarship",
                url="https://mercy.edu/scholarship",
                description="Full tuition scholarship for CS students",
                requirements=["CGPA > 8.0", "Financial Need"],
                deadline="2026-04-25",
                location="New York, USA",
            ),
            Opportunity(
                title="Frontend Developer",
                organization="Flipkart",
                type="job",
                url="https://flipkart.com/careers",
                description="Build user interfaces at scale",
                requirements=["React", "JavaScript", "CSS"],
                deadline="2026-05-15",
                location="Bangalore, India",
            ),
            Opportunity(
                title="Data Science Intern",
                organization="Amazon",
                type="internship",
                url="https://amazon.jobs",
                description="Work on recommendation systems",
                requirements=["Python", "SQL", "Machine Learning"],
                deadline="2026-05-10",
                location="Hyderabad, India",
            ),
        ]
        db.add_all(sample_opportunities)
        db.commit()
    db.close()

    # Start background scheduler for continuous scanning and matching
    scheduler.start()
    scheduler.add_job(background_scout_scan, "interval", hours=1, id="scout_scan")
    scheduler.add_job(background_matcher, "interval", hours=1, id="matcher")
    print("\n✅ Background scheduler started (scout & matcher every 1 hour)")


def background_scout_scan():
    """Background task to continuously search for opportunities"""
    print("\n🕐 [Background] Starting scheduled scout scan...")
    db = SessionLocal()
    try:
        default_keywords = [
            "Software Engineering",
            "Data Science",
            "Machine Learning",
            "Web Development",
            "Cloud Computing",
        ]
        search_keywords = default_keywords

        FIRECRAWL_API_KEY = os.getenv("FIRECRAWL_API_KEY", "")
        from app.config import SERP_API_KEY

        blocked_patterns = [
            "unusual traffic",
            "our systems have detected",
            "robot or automated",
            "captcha",
            "sorry index",
            "verify you're not a robot",
        ]

        serp_urls = []

        # Step 1: Get URLs from SERP API
        if SERP_API_KEY and not SERP_API_KEY.startswith("your_"):
            print("   [Background] Using SERP API to find URLs...")
            try:
                import serpapi

                for keyword in search_keywords[:3]:
                    search = serpapi.GoogleSearch(
                        {
                            "q": f"{keyword} internship 2025",
                            "num": 10,
                            "api_key": SERP_API_KEY,
                        }
                    )
                    response = search.get_dict()

                    if "organic_results" in response:
                        for r in response["organic_results"][:5]:
                            link = r.get("link", "")
                            if link:
                                serp_urls.append(
                                    {
                                        "url": link,
                                        "title": r.get("title", ""),
                                        "snippet": r.get("snippet", ""),
                                    }
                                )
            except Exception as e:
                print(f"   ⚠ SERP API error: {e}")

        results = []

        # Step 2: Scrape URLs with Firecrawl
        if (
            FIRECRAWL_API_KEY
            and not FIRECRAWL_API_KEY.startswith("your_")
            and serp_urls
        ):
            print("   [Background] Scraping URLs with Firecrawl...")
            import requests

            firecrawl_url = "https://api.firecrawl.dev/v2/scrape"
            headers = {
                "Authorization": f"Bearer {FIRECRAWL_API_KEY}",
                "Content-Type": "application/json",
            }

            for item in serp_urls[:10]:
                url = item.get("url", "")
                if not url:
                    continue

                try:
                    payload = {"url": url, "formats": ["markdown"]}
                    response = requests.post(
                        firecrawl_url, json=payload, headers=headers, timeout=15
                    )

                    if response.status_code == 200:
                        data = response.json()
                        if data.get("success") and "data" in data:
                            content = data["data"].get("markdown", "").lower()

                            # Skip if blocked
                            if any(pattern in content for pattern in blocked_patterns):
                                print(f"   ⚠ Blocked: {url[:40]}...")
                                continue

                            if len(content) < 100:
                                continue

                            raw_content = data["data"].get("markdown", "")
                            lines = [
                                l.strip()
                                for l in raw_content.split("\n")
                                if len(l.strip()) > 20
                            ]

                            for line in lines[:3]:
                                if any(
                                    w in line.lower()
                                    for w in [
                                        "intern",
                                        "student",
                                        "graduate",
                                        "fellowship",
                                        "entry",
                                        "junior",
                                        "2025",
                                        "hiring",
                                    ]
                                ):
                                    results.append(
                                        {
                                            "title": item.get("title", "") or line[:80],
                                            "organization": "Not specified",
                                            "type": "internship",
                                            "url": url,
                                            "description": line[:300],
                                            "location": "Not specified",
                                            "deadline": "Rolling",
                                        }
                                    )
                                    break
                except Exception as e:
                    continue

        # Fallback: Use SERP results directly if Firecrawl didn't work
        if not results and serp_urls:
            print("   [Background] Using SERP results directly...")
            for item in serp_urls[:10]:
                results.append(
                    {
                        "title": item.get("title", ""),
                        "organization": "Not specified",
                        "type": "internship",
                        "url": item.get("url", ""),
                        "description": item.get("snippet", ""),
                        "location": "Not specified",
                        "deadline": "Rolling",
                    }
                )

        # Emergency fallback: Only use database
        if not results:
            print("   [Background] Using database fallback...")
            try:
                db_opps = db.query(Opportunity).limit(10).all()
                for opp in db_opps:
                    results.append(
                        {
                            "title": opp.title,
                            "organization": opp.organization,
                            "type": opp.type,
                            "url": opp.url,
                            "description": opp.description or "",
                            "location": opp.location or "Not specified",
                            "deadline": opp.deadline or "Rolling",
                        }
                    )
            except:
                pass

        # Save new opportunities to database
        saved_count = 0
        for opp_data in results[:15]:
            existing = (
                db.query(Opportunity).filter(Opportunity.url == opp_data["url"]).first()
            )
            if not existing:
                new_opp = Opportunity(
                    title=opp_data["title"],
                    organization=opp_data["organization"],
                    type=opp_data["type"],
                    url=opp_data["url"],
                    description=opp_data.get("description", ""),
                    deadline=opp_data.get("deadline", "Rolling"),
                    location=opp_data.get("location", "Not specified"),
                )
                db.add(new_opp)
                saved_count += 1

        if saved_count > 0:
            db.commit()
            print(f"   ✅ Saved {saved_count} new opportunities to database")

    except Exception as e:
        print(f"   ❌ Background scout error: {e}")
    finally:
        db.close()


def background_matcher():
    """Background task to continuously match opportunities to users"""
    print("\n🕐 [Background] Starting scheduled matcher...")
    db = SessionLocal()
    try:
        students = db.query(Student).filter(Student.onboarding_completed == True).all()

        for student in students:
            student_skills = set(s.lower() for s in (student.skills or []))
            student_target_roles = set((student.target_roles or []))

            all_opps = (
                db.query(Opportunity)
                .order_by(Opportunity.posted_at.desc())
                .limit(50)
                .all()
            )

            for opp in all_opps:
                existing_engagement = (
                    db.query(Engagement)
                    .filter(
                        Engagement.student_id == student.id,
                        Engagement.opportunity_id == opp.id,
                    )
                    .first()
                )

                if not existing_engagement:
                    opp_text = f"{opp.title} {opp.description or ''} {' '.join(opp.requirements or [])}".lower()

                    score = 0
                    if student_skills:
                        skills_match = sum(1 for s in student_skills if s in opp_text)
                        score = min(100, skills_match * 25)

                    if score >= 25:
                        engagement = Engagement(
                            student_id=student.id,
                            opportunity_id=opp.id,
                            action="matched",
                            status="matched",
                        )
                        db.add(engagement)

        db.commit()
        print(f"   ✅ Matched opportunities for {len(students)} students")

    except Exception as e:
        print(f"   ❌ Background matcher error: {e}")
    finally:
        db.close()


@app.get("/")
def root():
    return {
        "name": app_config["name"],
        "version": app_config["version"],
        "description": app_config["description"],
        "endpoints": [
            "/auth/signup",
            "/auth/login",
            "/profile",
            "/opportunities",
            "/matches",
            "/audit",
            "/shortlist",
            "/engage",
        ],
    }


@app.get("/status")
def status():
    return {
        "status": "online",
        "timestamp": datetime.now().isoformat(),
        "service": app_config["name"],
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
        onboarding_completed=False,
    )
    db.add(student)
    db.commit()
    db.refresh(student)

    return AuthResponse(
        success=True,
        message="Account created. Complete Step 1: Profile Details",
        user=StudentProfileOut.model_validate(student),
        token=create_token(student.id),
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
        token=create_token(student.id),
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
def update_profile(
    student_id: int, data: StudentProfileUpdate, db: Session = Depends(get_db)
):
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


def calculate_match_score(
    student: Student, opportunity: Opportunity
) -> tuple[float, List[str], List[str]]:
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

    # First, check for pre-matched opportunities from background matcher
    matched_engagements = (
        db.query(Engagement)
        .filter(Engagement.student_id == student_id, Engagement.status == "matched")
        .all()
    )

    opp_ids_matched = [e.opportunity_id for e in matched_engagements]

    results = []

    # Add pre-matched opportunities first
    for eng in matched_engagements:
        opp = db.query(Opportunity).filter(Opportunity.id == eng.opportunity_id).first()
        if opp:
            score, missing, matched = calculate_match_score(student, opp)
            results.append(
                MatchResult(
                    opportunity=OpportunityOut.model_validate(opp),
                    match_score=round(score, 1),
                    missing_skills=missing,
                    matched_skills=matched,
                )
            )

    # Calculate scores for remaining opportunities
    all_opps = db.query(Opportunity).all()
    for opp in all_opps:
        if opp.id not in opp_ids_matched:
            score, missing, matched = calculate_match_score(student, opp)
            if score > 0:
                results.append(
                    MatchResult(
                        opportunity=OpportunityOut.model_validate(opp),
                        match_score=round(score, 1),
                        missing_skills=missing,
                        matched_skills=matched,
                    )
                )

    results.sort(key=lambda x: x.match_score, reverse=True)
    return results[:15]


@app.post("/audit", response_model=ResumeAuditResponse)
def audit_resume(request: ResumeAuditRequest, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == request.student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    opportunity = (
        db.query(Opportunity).filter(Opportunity.id == request.opportunity_id).first()
    )
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
        cover_letter=cover_letter,
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
        generated_at=datetime.utcnow(),
    )


@app.post("/engage")
def track_engagement(
    student_id: int, opportunity_id: int, action: str, db: Session = Depends(get_db)
):
    engagement = Engagement(
        student_id=student_id, opportunity_id=opportunity_id, action=action
    )
    db.add(engagement)
    db.commit()
    return {"success": True, "message": f"Action '{action}' tracked"}


@app.get("/engagements/{student_id}")
def get_engagements(student_id: int, db: Session = Depends(get_db)):
    return (
        db.query(Engagement)
        .filter(Engagement.student_id == student_id)
        .order_by(Engagement.created_at.desc())
        .all()
    )


@app.post("/onboarding/step1")
def complete_onboarding_step1(
    data: StudentProfileCreate, db: Session = Depends(get_db)
):
    """Part 1: Account creation"""
    existing = db.query(Student).filter(Student.email == data.email).first()
    if existing:
        return {"success": False, "message": "Email already registered"}

    student = Student(
        email=data.email,
        name=data.name,
        hashed_password=hash_password(data.password),
        onboarding_step=1,
    )
    db.add(student)
    db.commit()
    db.refresh(student)

    return {
        "success": True,
        "message": "Step 1 completed",
        "student_id": student.id,
        "onboarding_step": student.onboarding_step,
    }


@app.post("/onboarding/step2/{student_id}")
def complete_onboarding_step2(
    student_id: int, data: StudentOnboardingStep2, db: Session = Depends(get_db)
):
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
        "onboarding_step": student.onboarding_step,
    }


@app.post("/onboarding/step3/{student_id}")
def complete_onboarding_step3(
    student_id: int, data: StudentOnboardingStep3, db: Session = Depends(get_db)
):
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
        "onboarding_completed": student.onboarding_completed,
    }


@app.post("/onboarding/save-progress/{student_id}")
def save_onboarding_progress(
    student_id: int, step: int, data: dict, db: Session = Depends(get_db)
):
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
        "onboarding_completed": student.onboarding_completed,
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
        existing = (
            db.query(Engagement)
            .filter(
                Engagement.student_id == student_id,
                Engagement.opportunity_id == opportunity_id,
                Engagement.action == "saved",
            )
            .first()
        )
        if existing:
            db.delete(existing)
            db.commit()
        return {"success": True, "message": "Opportunity unsaved"}

    existing = (
        db.query(Engagement)
        .filter(
            Engagement.student_id == student_id,
            Engagement.opportunity_id == opportunity_id,
            Engagement.action == "saved",
        )
        .first()
    )

    if not existing:
        engagement = Engagement(
            student_id=student_id, opportunity_id=opportunity_id, action="saved"
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

    saved_engagements = (
        db.query(Engagement)
        .filter(Engagement.student_id == student_id, Engagement.action == "saved")
        .all()
    )

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

    applied_engagements = (
        db.query(Engagement)
        .filter(Engagement.student_id == student_id, Engagement.action == "applied")
        .all()
    )

    applications = []
    for eng in applied_engagements:
        opp = db.query(Opportunity).filter(Opportunity.id == eng.opportunity_id).first()
        if opp:
            applications.append(
                {
                    "id": eng.id,
                    "opp_id": opp.id,
                    "title": opp.title,
                    "organization": opp.organization,
                    "type": opp.type,
                    "url": opp.url,
                    "status": eng.status or "applied",
                    "applied_at": str(eng.created_at),
                }
            )

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

    existing = (
        db.query(Engagement)
        .filter(
            Engagement.student_id == student_id,
            Engagement.opportunity_id == opportunity_id,
            Engagement.action == "applied",
        )
        .first()
    )

    if existing:
        return {
            "success": True,
            "message": "Already applied",
            "application_id": existing.id,
        }

    engagement = Engagement(
        student_id=student_id,
        opportunity_id=opportunity_id,
        action="applied",
        status="applied",
    )
    db.add(engagement)
    db.commit()
    db.refresh(engagement)

    return {
        "success": True,
        "message": "Application submitted",
        "application_id": engagement.id,
    }


@app.put("/applications/{application_id}")
def update_application_status(
    application_id: int, data: dict, db: Session = Depends(get_db)
):
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
        ],
    }


# ==================== AGENT ENDPOINTS ====================


@app.get("/api/agents-status")
def get_agents_status():
    """Check all agents status with API availability"""
    from app.config import SERP_API_KEY, GEMINI_API_KEY
    import os

    FIRECRAWL_API_KEY = os.getenv("FIRECRAWL_API_KEY", "")

    return {
        "scout": {
            "status": "active",
            "name": "Scout",
            "role": "Opportunity Scout",
            "apis": {
                "serpapi": {
                    "configured": bool(
                        SERP_API_KEY and not SERP_API_KEY.startswith("your_")
                    ),
                    "key_present": bool(SERP_API_KEY),
                },
                "firecrawl": {
                    "configured": bool(
                        FIRECRAWL_API_KEY and not FIRECRAWL_API_KEY.startswith("your_")
                    ),
                    "key_present": bool(FIRECRAWL_API_KEY),
                },
            },
        },
        "analyzer": {
            "status": "active",
            "name": "Analyzer",
            "role": "Opportunity Analyzer",
        },
        "matcher": {"status": "active", "name": "Matcher", "role": "Matching Agent"},
        "auditor": {
            "status": "active",
            "name": "Auditor",
            "role": "Application Audit Agent",
            "apis": {
                "gemini": {
                    "configured": bool(
                        GEMINI_API_KEY and not GEMINI_API_KEY.startswith("your_")
                    ),
                    "key_present": bool(GEMINI_API_KEY),
                }
            },
        },
        "learner": {"status": "active", "name": "Learner", "role": "Learning Agent"},
    }


@app.get("/api/agent-activity/{student_id}")
def get_agent_activity(student_id: int, db: Session = Depends(get_db)):
    """Get real-time agent activity data for a student"""
    from datetime import datetime, timedelta

    # Get opportunity count (Scout results)
    total_opps = db.query(Opportunity).count()

    # Get recent opportunities (last 24 hours)
    yesterday = datetime.utcnow() - timedelta(days=1)
    recent_opps = (
        db.query(Opportunity).filter(Opportunity.posted_at >= yesterday).count()
    )

    # Get student's engagement stats (Learner data)
    engagements = db.query(Engagement).filter(Engagement.student_id == student_id).all()
    viewed_count = len([e for e in engagements if e.action == "viewed"])
    saved_count = len([e for e in engagements if e.action == "saved"])
    applied_count = len([e for e in engagements if e.action == "applied"])

    # Get matched opportunities count
    matched_count = len([e for e in engagements if e.action == "matched"])

    return {
        "scout": {
            "status": "completed" if total_opps > 0 else "idle",
            "message": f"Scanned {total_opps} opportunities from multiple platforms",
            "timestamp": f"{recent_opps} new today"
            if recent_opps > 0
            else "No new opportunities",
        },
        "analyzer": {
            "status": "completed" if total_opps > 0 else "idle",
            "message": f"Processed {total_opps} opportunity listings",
            "timestamp": "Ready",
        },
        "matcher": {
            "status": "completed" if matched_count > 0 else "idle",
            "message": f"Matched {matched_count} opportunities to your profile",
            "timestamp": "Complete" if matched_count > 0 else "Ready",
        },
        "auditor": {
            "status": "idle",
            "message": "Ready to analyze applications on demand",
            "timestamp": "Waiting",
        },
        "learner": {
            "status": "running",
            "message": f"Learning from {len(engagements)} interactions",
            "timestamp": "Running",
        },
    }


@app.post("/api/agent/scout")
def scout_agent(data: dict, db: Session = Depends(get_db)):
    """Scout discovers opportunities using SERP API to find URLs, then Firecrawl to scrape them"""
    from app.config import SERP_API_KEY, GEMINI_API_KEY
    import os

    FIRECRAWL_API_KEY = os.getenv("FIRECRAWL_API_KEY", "")

    keywords = data.get("keywords", [])
    search_type = data.get("search_type", "all")
    results = []
    source = "none"

    print("\n" + "=" * 60)
    print("🔍 SCOUT AGENT - Opportunity Discovery")
    print("=" * 60)
    print(f"Keywords: {keywords}")
    print(f"Search Type: {search_type}")

    # Blocked content patterns to filter out
    blocked_patterns = [
        "unusual traffic",
        "our systems have detected",
        "robot or automated",
        "captcha",
        "sorry index",
        "verify you're not a robot",
        "access denied",
        "forbidden",
        "403 forbidden",
    ]

    # === STEP 1: Use SERP API to discover URLs ===
    serp_urls = []
    if SERP_API_KEY and not SERP_API_KEY.startswith("your_"):
        print("\n[1/3] Using SERP API to find opportunity URLs...")
        try:
            import serpapi

            for keyword in keywords[:3]:
                query = f"{keyword} {search_type} internship 2025"
                search = serpapi.GoogleSearch(
                    {"q": query, "num": 10, "api_key": SERP_API_KEY}
                )
                response = search.get_dict()

                if "organic_results" in response:
                    for r in response["organic_results"][:5]:
                        link = r.get("link", "")
                        title = r.get("title", "")
                        snippet = r.get("snippet", "")

                        if link and "http" in link:
                            serp_urls.append(
                                {"url": link, "title": title, "snippet": snippet}
                            )

            print(f"   ✓ SERP found {len(serp_urls)} URLs")
        except Exception as e:
            print(f"   ⚠ SERP API error: {e}")
            serp_urls = []
    else:
        print("\n[1/3] SERP API not configured, using database fallback...")

    # === STEP 2: Use Firecrawl to scrape discovered URLs ===
    scraped_count = 0
    if FIRECRAWL_API_KEY and not FIRECRAWL_API_KEY.startswith("your_") and serp_urls:
        print("\n[2/3] Scraping URLs with Firecrawl...")
        try:
            import requests

            firecrawl_url = "https://api.firecrawl.dev/v2/scrape"
            headers = {
                "Authorization": f"Bearer {FIRECRAWL_API_KEY}",
                "Content-Type": "application/json",
            }

            for item in serp_urls[:10]:
                url = item.get("url", "")
                if not url:
                    continue

                try:
                    payload = {"url": url, "formats": ["markdown"]}
                    response = requests.post(
                        firecrawl_url, json=payload, headers=headers, timeout=15
                    )

                    if response.status_code == 200:
                        data = response.json()
                        if data.get("success") and "data" in data:
                            content = data["data"].get("markdown", "").lower()

                            # Skip if blocked by anti-bot
                            is_blocked = any(
                                pattern in content for pattern in blocked_patterns
                            )
                            if is_blocked:
                                print(f"   ⚠ Blocked: {url[:50]}...")
                                continue

                            # Skip if too little content
                            if len(content) < 100:
                                print(f"   ⚠ Empty/Too short: {url[:50]}...")
                                continue

                            # Extract opportunity info from content
                            raw_content = data["data"].get("markdown", "")
                            lines = [
                                l.strip()
                                for l in raw_content.split("\n")
                                if len(l.strip()) > 20
                            ]

                            for line in lines[:5]:
                                # Look for internship/job related keywords
                                if any(
                                    w in line.lower()
                                    for w in [
                                        "intern",
                                        "student",
                                        "graduate",
                                        "fellowship",
                                        "entry",
                                        "junior",
                                        "2025",
                                        "2026",
                                        "hiring",
                                        "opening",
                                    ]
                                ):
                                    results.append(
                                        {
                                            "title": item.get("title", "") or line[:80],
                                            "link": url,
                                            "snippet": line[:200],
                                            "source": "firecrawl",
                                            "relevance_score": 90,
                                        }
                                    )
                                    scraped_count += 1
                                    break
                except Exception as e:
                    print(f"   ⚠ Scraping error: {e}")
                    continue

            if results:
                print(f"   ✓ Firecrawl scraped {scraped_count} opportunities")
                source = "serp+firecrawl"
        except Exception as e:
            print(f"   ⚠ Firecrawl error: {e}")

    # === FALLBACK: Use SerpAPI results directly if Firecrawl didn't work ===
    if not results and serp_urls:
        print("\n[3/3] Using SERP results directly (Firecrawl failed)...")
        for item in serp_urls[:10]:
            results.append(
                {
                    "title": item.get("title", ""),
                    "link": item.get("url", ""),
                    "snippet": item.get("snippet", ""),
                    "source": "serp",
                    "relevance_score": 85,
                }
            )
        if results:
            source = "serp"
            print(f"   ✓ Using {len(results)} SERP results")

    # === FINAL FALLBACK: Database ===
    if not results:
        print("[4/4] Falling back to database...")
        try:
            opportunities = db.query(Opportunity).all()
            for opp in opportunities:
                if any(
                    k.lower() in (opp.title.lower() or "")
                    or k.lower() in (opp.description.lower() or "")
                    for k in keywords
                ):
                    results.append(
                        {
                            "id": opp.id,
                            "title": opp.title,
                            "organization": opp.organization,
                            "type": opp.type,
                            "url": opp.url,
                            "source": "database",
                            "relevance_score": 80,
                        }
                    )
            source = "database"
            print(f"   ✓ Database returned {len(results)} results")
        except Exception as e:
            print(f"   ⚠ Database error: {e}")

    # === EMERGENCY FALLBACK ===
    if not results:
        results = [
            {
                "title": "Software Engineering Internship",
                "link": "https://example.com",
                "snippet": "Find opportunities in your area",
                "source": "fallback",
                "relevance_score": 70,
            },
            {
                "title": "Data Science Opportunity",
                "link": "https://example.com",
                "snippet": "Entry-level positions available",
                "source": "fallback",
                "relevance_score": 65,
            },
            {
                "title": "Web Development Internship",
                "link": "https://example.com",
                "snippet": "Join our team",
                "source": "fallback",
                "relevance_score": 60,
            },
        ]
        source = "fallback"

    print(f"\n✅ Scout completed. Total results: {len(results)}, Source: {source}")
    print("=" * 60 + "\n")

    return {
        "opportunities": results,
        "agent": "scout",
        "count": len(results),
        "source": source,
    }


# ==================== BACKGROUND CONTROLS ====================


@app.post("/api/agent/scout/trigger")
def trigger_scout_scan(db: Session = Depends(get_db)):
    """Manually trigger a background scout scan"""
    try:
        background_scout_scan()
        return {"status": "success", "message": "Scout scan completed"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


@app.post("/api/agent/matcher/trigger")
def trigger_matcher(db: Session = Depends(get_db)):
    """Manually trigger the matcher"""
    try:
        background_matcher()
        return {"status": "success", "message": "Matcher completed"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


@app.get("/api/agent/scheduler/status")
def get_scheduler_status():
    """Get background scheduler status"""
    jobs = scheduler.get_jobs()
    return {
        "running": scheduler.running,
        "jobs": [{"id": j.id, "next_run": str(j.next_run_time)} for j in jobs],
    }


@app.post("/api/agent/analyzer")
def analyzer_agent(data: dict, db: Session = Depends(get_db)):
    """Analyzer extracts structured data from raw opportunity text or Scout results"""
    raw_text = data.get("text", "") or ""
    scout_results = data.get("scout_results", [])

    all_text = raw_text
    if scout_results:
        all_text += " " + " ".join(
            [
                (r.get("title", "") or "") + " " + (r.get("snippet", "") or "")
                for r in scout_results
            ]
        )

    # Extract skills
    skill_keywords = [
        "python",
        "javascript",
        "react",
        "java",
        "c++",
        "sql",
        "mongodb",
        "machine learning",
        "deep learning",
        "tensorflow",
        "pytorch",
        "aws",
        "docker",
        "kubernetes",
        "git",
        "html",
        "css",
        "typescript",
        "node",
        "express",
        "flask",
        "django",
        "fastapi",
        "angular",
        "vue",
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
    location_keywords = [
        "bangalore",
        "mumbai",
        "delhi",
        "hyderabad",
        "pune",
        "chennai",
        "remote",
        "work from home",
        "wfh",
    ]
    location = next(
        (loc.title() for loc in location_keywords if loc in all_text.lower()),
        "Not specified",
    )

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

    # Extract organization from first result title if available
    organization = "Not specified"
    if scout_results and len(scout_results) > 0:
        for result in scout_results[:3]:
            first_title = result.get("title", "") or ""
            snippet = result.get("snippet", "") or ""
            combined = first_title + " " + snippet

            if " at " in first_title:
                organization = first_title.split(" at ")[-1].strip()
                break

            for sep in [" - ", " | ", " – ", " • "]:
                if sep in first_title:
                    organization = first_title.split(sep)[0].strip()
                    break
                elif sep in snippet:
                    org_candidate = snippet.split(sep)[0].strip()
                    if len(org_candidate) > 2 and len(org_candidate) < 50:
                        organization = org_candidate
                        break
            if organization != "Not specified":
                break

    if organization == "Not specified":
        company_keywords = [
            "Google",
            "Microsoft",
            "Amazon",
            "Meta",
            "Apple",
            "Netflix",
            "Adobe",
            "Salesforce",
            "IBM",
            "Oracle",
            "Intel",
            "NVIDIA",
            "AMD",
            "Cisco",
            "Dell",
            "HP",
            "TCS",
            "Infosys",
            "Wipro",
            "Accenture",
            "Cognizant",
            "Tech Mahindra",
            "Flipkart",
            "Paytm",
            "OYO",
            "Swiggy",
            "Zomato",
            " cred",
            "MongoDB",
            "Snowflake",
            "Databricks",
            "Elastic",
            "Cloudflare",
            "Twilio",
            "Stripe",
            "Square",
            "PayPal",
            "Razorpay",
            "Coinbase",
            "Binance",
        ]
        for company in company_keywords:
            if company.lower() in all_text.lower() and company.lower() not in [
                "at",
                "the",
                "and",
                "for",
            ]:
                organization = company
                break

    return {
        "skills": skills,
        "eligibility": eligibility,
        "deadline": deadline,
        "stipend": stipend,
        "location": location,
        "job_type": job_type,
        "organization": organization,
        "parsed_fields": {
            "skills_count": len(skills),
            "text_length": len(all_text),
            "has_deadline": deadline != "Rolling",
            "has_stipend": stipend != "Not specified",
        },
        "agent": "analyzer",
    }


@app.post("/api/agent/matcher")
def matcher_agent(data: dict, db: Session = Depends(get_db)):
    """Matcher ranks opportunities for a student using vectorized matching"""
    from app.embeddings import (
        calculate_skill_match_score,
        find_similar_skills,
        preload_embeddings,
    )

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
            skill_analysis = find_similar_skills(
                student_skills, required_skills, threshold=0.6
            )
            matched = skill_analysis["matched"]
            missing = skill_analysis["missing"]
        else:
            # Fallback to exact matching
            matched_set = set(s.lower() for s in student_skills) & set(
                r.lower() for r in required_skills
            )
            matched = list(matched_set)
            missing = [r for r in required_skills if r.lower() not in student.skills]
            score = min(100, 50 + len(matched) * 15)

        results.append(
            {
                "opportunity": {
                    "id": opp_id,
                    "title": opp.title,
                    "organization": opp.organization,
                    "type": opp.type,
                    "location": opp.location,
                    "description": opp.description,
                    "requirements": opp.requirements or [],
                    "deadline": opp.deadline,
                    "url": opp.url,
                },
                "match_score": round(score, 1),
                "matched_skills": matched,
                "missing_skills": missing,
                "matching_method": "vectorized" if use_vectorized else "exact",
            }
        )

    results.sort(key=lambda x: x["match_score"], reverse=True)
    return {
        "ranked_matches": results,
        "agent": "matcher",
        "count": len(results),
        "student_skills": student_skills,
        "matching_method": "vectorized" if use_vectorized else "exact",
    }


@app.post("/api/agent/auditor/evaluate")
def auditor_evaluate(data: dict, db: Session = Depends(get_db)):
    """Auditor evaluates resume fit for an opportunity using vectorized matching"""
    from app.embeddings import (
        find_similar_skills,
        calculate_skill_match_score,
        preload_embeddings,
    )

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
        skill_analysis = find_similar_skills(
            student_skills, required_skills, threshold=0.6
        )
        matched = skill_analysis["matched"]
        missing = skill_analysis["missing"]
    else:
        # Fallback to exact matching
        matched = [
            s
            for s in student_skills
            if s.lower() in [r.lower() for r in required_skills]
        ]
        missing = [
            r
            for r in required_skills
            if r.lower() not in [s.lower() for s in student_skills]
        ]
        score = min(100, 50 + len(matched) * 10)

    # Additional analysis
    cgpa_boost = 15 if student.cgpa and student.cgpa >= 8.0 else 0
    final_score = min(100, score + cgpa_boost)

    return {
        "score": round(final_score, 1),
        "breakdown": {"skill_match": round(score, 1), "cgpa_boost": cgpa_boost},
        "strengths": matched,
        "gaps": missing,
        "recommendations": [f"Learn {s}" for s in missing[:3]]
        + (
            [
                f"CGPA of {student.cgpa} is excellent!"
                if student.cgpa and student.cgpa >= 8
                else "Focus on maintaining CGPA"
            ]
            if student.cgpa
            else []
        ),
        "student_profile": {
            "name": student.name,
            "cgpa": student.cgpa,
            "branch": student.branch,
            "year": student.year,
        },
        "matching_method": "vectorized" if use_vectorized else "exact",
        "agent": "auditor",
    }


@app.post("/api/agent/auditor/ai-cover-letter")
def auditor_cover_letter(data: dict, db: Session = Depends(get_db)):
    """Auditor generates AI cover letter using Gemini or fallback template"""
    from app.config import GEMINI_API_KEY

    print("\n" + "=" * 60)
    print("📝 COVER LETTER GENERATOR")
    print("=" * 60)

    student_id = data.get("student_id")
    opportunity_id = data.get("opportunity_id")
    use_ai = data.get("use_ai", True)

    student = db.query(Student).filter(Student.id == student_id).first()
    opp = db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()

    if not student or not opp:
        raise HTTPException(status_code=404, detail="Student or opportunity not found")

    print(f"Student: {student.name}, Opportunity: {opp.title}")

    cover_letter = ""
    method = "template"

    # Try Gemini if key is configured and use_ai is True
    if use_ai and GEMINI_API_KEY and not GEMINI_API_KEY.startswith("your_"):
        print("[1/2] Trying Gemini API...")
        try:
            import google.genai as genai

            client = genai.Client(api_key=GEMINI_API_KEY)

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

            response = client.models.generate_content(
                model="gemini-2.5-flash", contents=prompt
            )
            cover_letter = response.text
            method = "gemini"
            print("   ✓ Gemini cover letter generated")
        except Exception as e:
            print(f"   ✗ Gemini error: {e}")
            cover_letter = ""

    # Fallback to template if Gemini failed or not used
    if not cover_letter:
        print("[2/2] Using template-based cover letter")
        method = "template"
        # Get matched skills
        matched_skills = []
        if student.skills and opp.requirements:
            matched_skills = [
                s
                for s in student.skills
                if s.lower() in [r.lower() for r in opp.requirements]
            ]

        cover_letter = f"""Dear {opp.organization} Hiring Team,

I am writing to express my strong interest in the {opp.title} position at {opp.organization}.

Currently, I am pursuing my {"Bachelor's" if student.year and student.year <= 4 else "Master's"} in {student.branch or "Engineering"} at {student.institution or "my university"}. Through my studies and practical projects, I have developed solid skills in {", ".join(matched_skills[:4]) if matched_skills else "relevant technical areas"}.

What excites me most about this opportunity is {opp.description[:150] + "..." if opp.description and len(opp.description) > 150 else (opp.description or "the chance to contribute to your team")}.

{"My academic performance with a CGPA of " + str(student.cgpa) + " reflects my dedication to excellence" if student.cgpa else "I am committed to delivering quality work and continuous learning"}.

I would welcome the opportunity to discuss how I can contribute to your team's success. Thank you for considering my application.

Sincerely,
{student.name}"""

    print(f"✅ Cover letter generated. Method: {method}")
    print("=" * 60 + "\n")

    return {
        "cover_letter": cover_letter,
        "method": method,
        "student_name": student.name,
        "position": opp.title,
        "company": opp.organization,
        "matched_skills": matched_skills if "matched_skills" in dir() else [],
        "agent": "auditor",
    }


@app.post("/api/agent/auditor/resume-analyzer")
def resume_analyzer(data: dict, db: Session = Depends(get_db)):
    """Analyze uploaded resume text using Gemini or fallback rules"""
    from app.config import GEMINI_API_KEY

    print("\n" + "=" * 60)
    print("📄 RESUME ANALYZER")
    print("=" * 60)

    resume_text = data.get("resume_text", "")
    student_id = data.get("student_id")

    if not resume_text:
        raise HTTPException(status_code=400, detail="Resume text is required")

    print(f"Resume text length: {len(resume_text)} chars")

    analysis = {}
    method = "fallback"

    # Try Gemini if key is configured
    if GEMINI_API_KEY and not GEMINI_API_KEY.startswith("your_"):
        print("[1/2] Trying Gemini API...")
        try:
            import google.genai as genai

            client = genai.Client(api_key=GEMINI_API_KEY)

            prompt = f"""Analyze this resume and provide:
1. Extracted skills (list)
2. Experience level (Entry/Mid/Senior)
3. Missing key sections (list)
4. ATS score estimate (0-100)
5. Improvement suggestions (list)

Resume:
{resume_text[:2000]}

Respond in JSON format with keys: skills, experience_level, missing_sections, ats_score, suggestions"""

            response = client.models.generate_content(
                model="gemini-2.5-flash", contents=prompt
            )

            import json

            try:
                analysis = json.loads(response.text)
                method = "gemini"
                print("   ✓ Gemini analysis complete")
            except:
                analysis = {
                    "error": "Could not parse Gemini response",
                    "raw": response.text[:500],
                }
                method = "fallback"
        except Exception as e:
            print(f"   ✗ Gemini error: {e}")
            analysis = {}

    # Fallback to rule-based analysis
    if not analysis or "error" in analysis:
        print("[2/2] Using fallback analysis")
        method = "fallback"

        text_lower = resume_text.lower()

        # Extract skills
        common_skills = [
            "python",
            "javascript",
            "java",
            "c++",
            "react",
            "angular",
            "vue",
            "node",
            "sql",
            "mongodb",
            "mysql",
            "postgresql",
            "docker",
            "kubernetes",
            "aws",
            "azure",
            "git",
            "html",
            "css",
            "typescript",
            "flask",
            "django",
            "fastapi",
            "tensorflow",
            "pytorch",
            "machine learning",
            "data science",
            "analytics",
            "excel",
            "powerpoint",
            "word",
        ]

        found_skills = [s for s in common_skills if s in text_lower]

        # Detect experience level
        exp_keywords = ["senior", "lead", "manager", "principal", "architect"]
        mid_keywords = ["junior", "intern", "trainee", "associate"]

        if any(k in text_lower for k in exp_keywords):
            exp_level = "Senior"
        elif any(k in text_lower for k in mid_keywords):
            exp_level = "Entry"
        else:
            exp_level = "Mid"

        # Missing sections
        missing = []
        if "education" not in text_lower and "university" not in text_lower:
            missing.append("Education")
        if "project" not in text_lower:
            missing.append("Projects")
        if "skill" not in text_lower and len(found_skills) < 3:
            missing.append("Skills Section")

        # Simple ATS score
        ats_score = (
            50
            + (len(found_skills) * 5)
            + (20 if "project" in text_lower else 0)
            + (15 if "education" in text_lower else 0)
        )
        ats_score = min(ats_score, 100)

        # Suggestions
        suggestions = [
            "Add a professional summary",
            "Quantify achievements with numbers",
            "Include relevant keywords from job descriptions",
            "Ensure consistent formatting",
        ]
        if len(found_skills) < 5:
            suggestions.append("Add more technical skills")

        analysis = {
            "skills": found_skills[:10],
            "experience_level": exp_level,
            "missing_sections": missing,
            "ats_score": ats_score,
            "suggestions": suggestions[:5],
        }

    print(f"✅ Analysis complete. Method: {method}")
    print("=" * 60 + "\n")

    return {
        "analysis": analysis,
        "method": method,
        "student_id": student_id,
        "agent": "auditor",
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
    if not hasattr(student, "action_counts"):
        student.action_counts = {"viewed": 0, "saved": 0, "applied": 0, "dismissed": 0}

    # Update based on action
    action_insights = {
        "viewed": {
            "interest_level": "medium",
            "preference": "exploring",
            "score_change": "+1",
        },
        "saved": {
            "interest_level": "high",
            "preference": "interested",
            "score_change": "+5",
        },
        "applied": {
            "interest_level": "very high",
            "preference": "highly interested",
            "score_change": "+10",
        },
        "dismissed": {
            "interest_level": "low",
            "preference": "not interested",
            "score_change": "-2",
        },
        "rejected": {
            "interest_level": "low",
            "preference": "not fit",
            "score_change": "-5",
        },
    }

    action_data = action_insights.get(action_type, action_insights["viewed"])
    insights = {
        "action_type": action_type,
        "interest_level": action_data["interest_level"],
        "preference": action_data["preference"],
        "score_modifier": action_data["score_change"],
        "timestamp": datetime.now().isoformat(),
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
                "preferred_organizations": [opp.organization],
            }

    # Calculate composite preference score (mock - would use ML in production)
    engagement_score = (
        (student.action_counts.get("saved", 0) * 5)
        + (student.action_counts.get("applied", 0) * 10)
        - (student.action_counts.get("dismissed", 0) * 2)
        - (student.action_counts.get("rejected", 0) * 5)
    )

    return {
        "success": True,
        "message": f"Feedback recorded: {action_type} on opportunity {opportunity_id}",
        "learner_insights": {
            "current_interest_level": insights["interest_level"],
            "user_preference": insights["preference"],
            "engagement_score": max(0, engagement_score),
            "learned_preferences": learned_preferences,
            "suggestions": _get_learner_suggestions(action_type, feedback_rating),
        },
        "profile_recommendations": {
            "if_saved_many": "Shows more similar opportunities",
            "if_applied_many": "Prioritizes similar roles",
            "if_dismissed_many": "Filters out similar opportunities",
            "if_rejected_many": "Suggests skill improvements",
        },
        "agent": "learner",
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
def update_experience(
    student_id: int, experience: List[Dict[str, Any]], db: Session = Depends(get_db)
):
    """Update experience section"""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    student.experience = experience
    db.commit()
    return {"success": True, "message": "Experience updated"}


@app.put("/profile/education-details/{student_id}")
def update_education_details(
    student_id: int, education: List[Dict[str, Any]], db: Session = Depends(get_db)
):
    """Update education details"""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    student.education_details = education
    db.commit()
    return {"success": True, "message": "Education details updated"}


@app.post("/api/agent/assistant/chat")
def assistant_chat(data: dict, db: Session = Depends(get_db)):
    """AI Assistant - Chat with Gemini API with fallback"""
    from app.config import GEMINI_API_KEY

    print("\n" + "=" * 60)
    print("🧠 AI ASSISTANT - Chat Request")
    print("=" * 60)

    user_message = data.get("message", "")
    student_id = data.get("student_id")
    context = data.get("context", {})

    if not user_message:
        raise HTTPException(status_code=400, detail="Message is required")

    print(f"User: {user_message}")
    print(f"Student ID: {student_id}")

    # Get student profile for context if available
    student_context = ""
    if student_id:
        student = db.query(Student).filter(Student.id == student_id).first()
        if student:
            student_context = f"""
Student Profile:
- Name: {student.name}
- Branch: {student.branch}
- Year: {student.year}
- Skills: {", ".join(student.skills) if student.skills else "Not specified"}
- CGPA: {student.cgpa if student.cgpa else "Not specified"}
- Institution: {student.institution or "Not specified"}
"""
            print(f"Context loaded for student: {student.name}")

    response_text = ""
    method = "fallback"

    # === METHOD 1: Try Gemini API ===
    print(
        f"   GEMINI_API_KEY loaded: {'Yes' if GEMINI_API_KEY else 'No'} (value: {GEMINI_API_KEY[:20] if GEMINI_API_KEY else 'empty'}...)"
    )
    if (
        GEMINI_API_KEY
        and not GEMINI_API_KEY.startswith("your_")
        and not GEMINI_API_KEY.startswith("GEMINI_API_KEY")
    ):
        print("[1/2] Trying Gemini API...")
        try:
            import google.genai as genai

            client = genai.Client(api_key=GEMINI_API_KEY)

            prompt = f"""You are CareerCompass AI Assistant, a helpful career guidance assistant for students.
You help with:
- Finding job/internship opportunities
- Resume tips and improvements
- Interview preparation
- Career advice and planning

{student_context}

User Question: {user_message}

Provide helpful, concise guidance. Use bullet points when helpful. Keep responses under 200 words."""

            response = client.models.generate_content(
                model="gemini-2.5-flash", contents=prompt
            )
            response_text = response.text
            method = "gemini"
            print("   ✓ Gemini response generated")
        except Exception as e:
            print(f"   ✗ Gemini error: {e}")
            response_text = ""

    # === METHOD 2: Fallback to rule-based responses ===
    if not response_text:
        print("[2/2] Using fallback responses...")
        method = "fallback"
        response_text = _generate_fallback_response(user_message, context)

    print(f"Response method: {method}")
    print("=" * 60 + "\n")

    return {"response": response_text, "method": method, "agent": "assistant"}


def _generate_fallback_response(user_input: str, context: dict) -> str:
    """Generate rule-based response when Gemini is unavailable"""
    input_lower = user_input.lower()

    if (
        "opportunit" in input_lower
        or "job" in input_lower
        or "internship" in input_lower
        or "find" in input_lower
    ):
        return """I can help you find opportunities! Here are some tips:

**1. Update Your Profile**: Make sure your skills and goals are current on your dashboard.

**2. Check Daily Brief**: Visit your dashboard to see personalized matches.

**3. Use Filters**: Apply filters like location, type, and deadline on the Explore page.

**4. Set Alerts**: Enable notifications to get notified of new opportunities.

Would you like me to help you with something specific?"""

    if "resume" in input_lower or "cv" in input_lower:
        return """Here are some resume tips:

**1. Keep it Concise**: 1-2 pages maximum.

**2. Quantify Achievements**: Use numbers (e.g., "Increased efficiency by 25%").

**3. Tailor for Each Job**: Match keywords from job descriptions.

**4. Highlight Skills**: List relevant technical and soft skills.

**5. Include Projects**: Show practical application of your skills.

Would you like to use our Resume Builder?"""

    if "interview" in input_lower or "prep" in input_lower:
        return """Interview preparation tips:

**Before Interview:**
• Research the company thoroughly
• Practice common questions
• Prepare your own questions

**Common Questions:**
• "Tell me about yourself"
• "Why do you want to work here?"
• "What are your strengths/weaknesses?"

**During:**
• Be confident and make eye contact
• Listen carefully
• Follow the STAR method for behavioral questions

Would you like practice questions?"""

    if "career" in input_lower or "advice" in input_lower or "guidance" in input_lower:
        return """Career guidance framework:

**1. Self-Assessment**
• Identify your strengths
• Determine your interests

**2. Goal Setting**
• Short-term (3-6 months)
• Long-term (1-5 years)

**3. Skill Building**
• Technical skills for your field
• Soft skills (communication, teamwork)

**4. Networking**
• Connect with professionals
• Use LinkedIn actively

**5. Keep Learning**
• Stay updated in your field

What's your target role? I can help you plan!"""

    if "skill" in input_lower or "learn" in input_lower:
        return """Popular skills to learn in 2025:

**Technical:**
• Python & Data Science
• JavaScript & React
• Cloud (AWS/Azure)
• AI/ML Basics

**Soft Skills:**
• Communication
• Problem Solving
• Project Management

**Tips:**
• Focus on one area at a time
• Build projects to practice
• Join online communities
• Take online courses

Would you like specific recommendations for your field?"""

    return """I'm here to help! You can ask me about:

• **Finding opportunities** - Jobs, internships, scholarships
• **Resume help** - Tips and building
• **Interview prep** - Preparation strategies
• **Career advice** - Planning your path
• **Skills development** - What to learn

Just type your question or use one of the quick actions!"""


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
