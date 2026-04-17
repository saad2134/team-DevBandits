app_config = {
    "name": "CareerCompass API",
    "version": "v1.1.6",
    "description": "AI-powered opportunity matching for students",
    "tagline": "AI-Powered Opportunity Matcher for Students",
}

# Load API keys from environment
import os
from pathlib import Path

env_path = Path(__file__).parent.parent / ".env"
if env_path.exists():
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                os.environ[key.strip()] = value.strip().strip('"')

SERP_API_KEY = os.getenv("SERP_PRIVATE_KEY", "")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
FIRECRAWL_API_KEY = os.getenv("FIRECRAWL_API_KEY", "")