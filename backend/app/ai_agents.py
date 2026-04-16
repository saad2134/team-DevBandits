import os
import json
from datetime import datetime
from typing import List, Dict, Any, Optional
from pydantic import BaseModel

try:
    from crewai import Agent, Task, Crew, Process
except ImportError:
    class Agent:
        def __init__(self, **kwargs): pass
    class Task:
        def __init__(self, **kwargs): pass
    class Crew:
        def __init__(self, **kwargs): pass
    class Process:
        sequential = "sequential"

class OpportunityData(BaseModel):
    title: str
    organization: str
    type: str
    url: str
    description: str
    requirements: List[str] = []
    deadline: Optional[str] = None
    location: Optional[str] = None

class StudentProfileData(BaseModel):
    name: str
    email: str
    cgpa: Optional[float] = None
    year: Optional[int] = None
    branch: Optional[str] = None
    skills: List[str] = []
    goals: List[str] = []

class OpportunityScannerAgent:
    """AI agent that scans and extracts opportunity details from various platforms"""
    
    def __init__(self):
        self.agent = Agent(
            role="Opportunity Scanner",
            goal="Find and extract relevant internship, scholarship, research, and job opportunities for students",
            backstory="""You are an expert at finding opportunities for students. 
            You search across multiple platforms and extract key details like requirements, 
            deadlines, and eligibility criteria.""",
            verbose=True
        )
    
    def scan_and_parse(self, platform_data: str) -> List[OpportunityData]:
        task = Task(
            description=f"""Analyze and parse the following opportunity data:
            {platform_data}
            
            Extract: title, organization, type, url, description, requirements, deadline, location""",
            agent=self.agent,
            expected_output="A list of structured opportunity data in JSON format"
        )
        
        crew = Crew(agents=[self.agent], tasks=[task], process=Process.sequential)
        result = crew.kickoff()
        
        opportunities = []
        try:
            parsed = json.loads(result) if isinstance(result, str) else []
            for item in parsed:
                opportunities.append(OpportunityData(**item))
        except:
            pass
        
        return opportunities

class MatchingAgent:
    """AI agent that matches students with opportunities and generates personalized content"""
    
    def __init__(self):
        self.agent = Agent(
            role="Opportunity Matcher",
            goal="Match students with best opportunities and generate personalized cover letters",
            backstory="""You are an expert at matching candidates with opportunities.
            You analyze student profiles against job requirements and create
            personalized application materials.""",
            verbose=True
        )
    
    def match_and_rank(self, student: StudentProfileData, opportunities: List[OpportunityData]) -> List[Dict[str, Any]]:
        task_str = f"""
        Student Profile:
        - Name: {student.name}
        - Skills: {', '.join(student.skills)}
        - Goals: {', '.join(student.goals)}
        - Branch: {student.branch}
        - CGPA: {student.cgpa}
        
        Opportunities to evaluate:
        {json.dumps([opp.model_dump() for opp in opportunities], indent=2)}
        
        Rank opportunities based on:
        1. Skill match percentage
        2. Goal alignment
        3. Eligibility (CGPA, year, branch)
        
        Return a ranked list with match scores and reasoning.
        """
        
        task = Task(
            description=task_str,
            agent=self.agent,
            expected_output="Ranked list of opportunities with match scores"
        )
        
        crew = Crew(agents=[self.agent], tasks=[task], process=Process.sequential)
        result = crew.kickoff()
        
        rankings = []
        try:
            rankings = json.loads(result) if isinstance(result, str) else []
        except:
            for opp in opportunities:
                score = self._calculate_basic_match(student, opp)
                rankings.append({
                    "opportunity": opp.model_dump(),
                    "match_score": score,
                    "reasoning": "Basic keyword matching"
                })
        
        return sorted(rankings, key=lambda x: x.get("match_score", 0), reverse=True)
    
    def _calculate_basic_match(self, student: StudentProfileData, opp: OpportunityData) -> float:
        student_skills = set(s.lower() for s in student.skills)
        req_skills = set(r.lower() for r in opp.requirements)
        
        if not req_skills:
            return 50.0
        
        matched = student_skills.intersection(req_skills)
        score = (len(matched) / len(req_skills)) * 100
        
        if student.cgpa and student.cgpa >= 8.0:
            score += 10
        
        return min(score, 100)

class CoverLetterGeneratorAgent:
    """AI agent that generates personalized cover letters for applications"""
    
    def __init__(self):
        self.agent = Agent(
            role="Cover Letter Writer",
            goal="Generate personalized, compelling cover letters for student applications",
            backstory="""You are a professional cover letter writer specializing in
            student applications. You highlight relevant skills and make
            connections between the student's background and the opportunity.""",
            verbose=True
        )
    
    def generate_cover_letter(
        self, 
        student: StudentProfileData, 
        opportunity: OpportunityData
    ) -> str:
        task_str = f"""
        Generate a professional cover letter for:
        
        Student:
        - Name: {student.name}
        - Email: {student.email}
        - Skills: {', '.join(student.skills)}
        - Branch: {student.branch}
        - Year: {student.year}
        - CGPA: {student.cgpa}
        
        Opportunity:
        - Title: {opportunity.title}
        - Organization: {opportunity.organization}
        - Description: {opportunity.description}
        - Requirements: {', '.join(opportunity.requirements)}
        
        Guidelines:
        - Be professional but engaging
        - Highlight relevant skills
        - Show enthusiasm for the role
        - Keep it concise (250-300 words)
        - Use standard cover letter format
        """
        
        task = Task(
            description=task_str,
            agent=self.agent,
            expected_output="A personalized cover letter"
        )
        
        crew = Crew(agents=[self.agent], tasks=[task], process=Process.sequential)
        result = crew.kickoff()
        
        return str(result) if result else self._generate_fallback_cover_letter(student, opportunity)
    
    def _generate_fallback_cover_letter(
        self, 
        student: StudentProfileData, 
        opportunity: OpportunityData
    ) -> str:
        return f"""Dear Hiring Manager at {opportunity.organization},

I am writing to express my strong interest in the {opportunity.title} position at {opportunity.organization}.

{"With my skills in {', '.join(student.skills[:3])}, I am confident that I can contribute meaningfully to your team." if student.skills else "I am eager to contribute and learn."}

{"My academic background in {student.branch} has provided me with a solid foundation in relevant technical concepts." if student.branch else ""}

{"I have completed my{" " + str(student.year) + " year" if student.year else ""} of studies with a CGPA of {student.cgpa}, demonstrating my academic commitment." if student.cgpa else ""}

I am particularly drawn to this opportunity because {opportunity.description[:100]}

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your organization.

Best regards,
{student.name}"""

def get_scanner_agent() -> OpportunityScannerAgent:
    return OpportunityScannerAgent()

def get_matcher_agent() -> MatchingAgent:
    return MatchingAgent()

def get_cover_letter_agent() -> CoverLetterGeneratorAgent:
    return CoverLetterGeneratorAgent()