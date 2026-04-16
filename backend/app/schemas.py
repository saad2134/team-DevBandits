from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from datetime import datetime

class StudentProfileCreate(BaseModel):
    email: str
    password: str
    name: str
    terms_accepted: bool = False

class StudentOnboardingStep1(BaseModel):
    """Part 1: Account setup - already handled in signup"""
    pass

class StudentOnboardingStep2(BaseModel):
    """Part 2: Resume/Profile Details"""
    phone: Optional[str] = None
    location: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    cgpa: Optional[float] = None
    year: Optional[int] = None
    branch: Optional[str] = None
    institution: Optional[str] = None
    skills: List[str] = []
    resume_filename: Optional[str] = None

class StudentOnboardingStep3(BaseModel):
    """Part 3: Goals & Preferences"""
    goals: List[str] = []
    preferred_job_types: List[str] = []
    preferred_locations: List[str] = []
    target_roles: List[str] = []
    industries: List[str] = []
    work_preference: Optional[str] = None
    notice_period: Optional[str] = None

class StudentProfileUpdate(BaseModel):
    # Basic Info
    name: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    
    # Education
    cgpa: Optional[float] = None
    year: Optional[int] = None
    branch: Optional[str] = None
    institution: Optional[str] = None
    
    # Skills & Goals
    skills: Optional[List[str]] = None
    goals: Optional[List[str]] = None
    
    # Preferences
    preferred_job_types: Optional[List[str]] = None
    preferred_locations: Optional[List[str]] = None
    target_roles: Optional[List[str]] = None
    industries: Optional[List[str]] = None
    work_preference: Optional[str] = None
    notice_period: Optional[str] = None
    
    # Experience (for resume)
    experience: Optional[List[Dict[str, Any]]] = None
    education_details: Optional[List[Dict[str, Any]]] = None
    projects: Optional[List[Dict[str, Any]]] = None
    certifications: Optional[List[Dict[str, Any]]] = None
    languages: Optional[List[Dict[str, Any]]] = None
    
    # Resume
    resume_filename: Optional[str] = None
    resume_uploaded_at: Optional[datetime] = None

class StudentProfileOut(BaseModel):
    id: int
    email: str
    name: Optional[str]
    onboarding_completed: bool
    onboarding_step: int
    
    # Basic Info
    phone: Optional[str] = None
    location: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    
    # Education
    cgpa: Optional[float] = None
    year: Optional[int] = None
    branch: Optional[str] = None
    institution: Optional[str] = None
    
    # Resume
    resume_filename: Optional[str] = None
    resume_uploaded_at: Optional[datetime] = None
    
    # Skills & Goals
    skills: List[str] = []
    goals: List[str] = []
    
    # Preferences
    preferred_job_types: List[str] = []
    preferred_locations: List[str] = []
    target_roles: List[str] = []
    industries: List[str] = []
    work_preference: Optional[str] = None
    notice_period: Optional[str] = None
    
    # Experience
    experience: List[Dict[str, Any]] = []
    education_details: List[Dict[str, Any]] = []
    projects: List[Dict[str, Any]] = []
    certifications: List[Dict[str, Any]] = []
    languages: List[Dict[str, Any]] = []
    
    created_at: datetime
    
    class Config:
        from_attributes = True

class AuthResponse(BaseModel):
    success: bool
    message: str
    user: Optional[StudentProfileOut] = None
    token: Optional[str] = None

class OpportunityCreate(BaseModel):
    title: str
    organization: str
    type: str  # internship, scholarship, research, job
    url: str
    description: str
    requirements: List[str] = []
    deadline: Optional[str] = None
    location: Optional[str] = None

class OpportunityOut(BaseModel):
    id: int
    title: str
    organization: str
    type: str
    url: str
    description: str
    requirements: List[str]
    deadline: Optional[str]
    location: Optional[str]
    posted_at: datetime
    class Config:
        from_attributes = True

class MatchResult(BaseModel):
    opportunity: OpportunityOut
    match_score: float
    missing_skills: List[str]
    matched_skills: List[str]

class ResumeAuditRequest(BaseModel):
    student_id: int
    opportunity_id: int

class ResumeAuditResponse(BaseModel):
    student_profile: StudentProfileOut
    opportunity: OpportunityOut
    match_score: float
    matched_skills: List[str]
    missing_skills: List[str]
    suggestions: List[str]
    cover_letter: Optional[str] = None

class DailyShortlistResponse(BaseModel):
    student_id: int
    opportunities: List[MatchResult]
    generated_at: datetime

class EngagementTrack(BaseModel):
    id: int
    student_id: int
    opportunity_id: int
    action: str  # viewed, applied, saved, dismissed
    created_at: datetime
    class Config:
        from_attributes = True

class OnboardingProgressOut(BaseModel):
    current_step: int
    total_steps: int
    completed: bool
    saved_data: Optional[Dict[str, Any]] = None