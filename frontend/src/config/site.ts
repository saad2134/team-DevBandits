export const siteConfig = {
  name: "CareerCompass",
  version: "v1.0.0",
  url: "http://localhost:3000",
  getStartedUrl: "/",
  ogImage: "",
  tagline: "AI-Powered Opportunity Matcher for Students",
  description:
    "An AI-powered platform that matches students with tailored opportunities and generates personalized cover letters.",
  links: {
    twitter: "",
    github: "https://github.com/saad2134/team-DevBandits",
    email: "",
    phone: "",
  },
};

export type SiteConfig = typeof siteConfig;

export const CORE_CONFIG = {
  appName: siteConfig.name,
  appDescription: siteConfig.description,
};

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  endpoints: {
    signup: "/auth/signup",
    login: "/auth/login",
    profile: "/profile",
    opportunities: "/opportunities",
    matches: "/matches",
    audit: "/audit",
    shortlist: "/shortlist",
    engage: "/engage",
    status: "/status",
  },
};

export const SOCIAL_LINKS = siteConfig.links;