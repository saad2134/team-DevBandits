# CrewAI Agents - Project Decision

## Current Implementation
We are **NOT** using CrewAI. Our agents are built-in FastAPI endpoints:

| Agent | Endpoint | Function |
|-------|----------|----------|
| Scout | `/api/agent/scout` | Opportunity discovery |
| Analyzer | `/api/agent/analyzer` | Parse & extract requirements |
| Matcher | `/api/agent/matcher` | Vectorized skill matching |
| Auditor | `/api/agent/auditor/*` | Resume evaluation + cover letter |
| Learner | `/api/agent/learner/feedback` | Track user behavior |

## Why CrewAI Was Excluded
- Build issues: Requires GCC >= 8.4
- Per AGENTS.md: *"crewAI excluded due to build issues (requires GCC >= 8.4)"*

## Should We Use CrewAI?

### Pros
- Structured multi-agent collaboration
- Built-in task delegation between agents
- Easier to define agent roles/backstories

### Cons
- Additional dependency overhead
- Requires LLM API (OpenAI/Anthropic) - adds cost
- Slower (makes LLM calls for each agent)
- Build issues on some systems

## Current Agent Architecture

### Scout Agent
- Uses SerpAPI for web scraping
- Falls back to database opportunities

### Analyzer Agent  
- Regex/parsing for requirement extraction
- Falls back to defaults

### Matcher Agent
- Uses sentence-transformers embeddings (all-MiniLM-L6-v2)
- No LLM required - fast and free

### Auditor Agent
- Vectorized matching for resume evaluation
- Gemini API for AI cover letters (with template fallback)

### Learner Agent
- Engagement tracking in database

## Recommendation
Keep current implementation. It's:
- Faster (no LLM calls for matching)
- Cheaper (no API costs for skill matching)
- More reliable (works without external AI services)
- Easier to deploy (fewer dependencies)