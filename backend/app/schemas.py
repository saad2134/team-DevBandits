from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from datetime import datetime

class StudentProfileCreate(BaseModel):
    email: str
    password: str
    name: str
    cgpa: Optional[float] = None
    year: Optional[int] = None
    branch: Optional[str] = None
    skills: List[str] = []
    goals: List[str] = []

class StudentProfileUpdate(BaseModel):
    name: Optional[str] = None
    cgpa: Optional[float] = None
    year: Optional[int] = None
    branch: Optional[str] = None
    skills: Optional[List[str]] = None
    goals: Optional[List[str]] = None

class StudentProfileOut(BaseModel):
    id: int
    email: str
    name: str
    cgpa: Optional[float]
    year: Optional[int]
    branch: Optional[str]
    skills: List[str]
    goals: List[str]
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