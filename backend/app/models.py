from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, JSON, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from .db import Base

class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=True)
    hashed_password = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    cgpa = Column(Float, nullable=True)
    year = Column(Integer, nullable=True)
    branch = Column(String, nullable=True)
    skills = Column(JSON, default=list)
    goals = Column(JSON, default=list)
    
    engagements = relationship("Engagement", back_populates="student")

class Opportunity(Base):
    __tablename__ = "opportunities"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    organization = Column(String, nullable=False)
    type = Column(String, nullable=False)  # internship, scholarship, research, job
    url = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    requirements = Column(JSON, default=list)
    deadline = Column(String, nullable=True)
    location = Column(String, nullable=True)
    posted_at = Column(DateTime, default=datetime.utcnow)
    
    engagements = relationship("Engagement", back_populates="opportunity")

class Engagement(Base):
    __tablename__ = "engagements"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    opportunity_id = Column(Integer, ForeignKey("opportunities.id"), nullable=False)
    action = Column(String, nullable=False)  # viewed, applied, saved, dismissed
    created_at = Column(DateTime, default=datetime.utcnow)
    
    student = relationship("Student", back_populates="engagements")
    opportunity = relationship("Opportunity", back_populates="engagements")