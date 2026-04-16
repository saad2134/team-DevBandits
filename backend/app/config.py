app_config = {
    "name": "CareerCompass API",
    "version": "v1.1.5",
    "description": "AI-powered opportunity matching for students",
    "tagline": "AI-Powered Opportunity Matcher for Students",
}

# Load API keys from environment
import os
SERP_API_KEY = os.getenv("SERP_PRIVATE_KEY", "")
GEMINI_API_KEY = os.getenv("GEMENI_API_KEY", "")