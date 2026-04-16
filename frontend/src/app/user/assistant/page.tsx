"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Loader2,
  Lightbulb,
  TrendingUp,
  BookOpen,
  Target,
  MessageSquare,
  Copy,
  Check
} from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const quickActions = [
  { label: "Find opportunities", icon: Target },
  { label: "Resume tips", icon: BookOpen },
  { label: "Career advice", icon: TrendingUp },
  { label: "Interview prep", icon: Lightbulb },
];

export default function AIAssistantPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content: "Hi there! I'm your AI Career Assistant. I'm here to help you with your career journey - finding opportunities, improving your resume, preparing for interviews, and more! How can I help you today?",
      timestamp: new Date(),
      suggestions: ["Find opportunities", "Resume tips", "Career advice", "Interview prep"]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    document.title = "AI Assistant | CareerCompass";
  }, []);

  const generateResponse = (userInput: string): { content: string; suggestions: string[] } => {
    const inputLower = userInput.toLowerCase();
    
    if (inputLower.includes("opportunit") || inputLower.includes("job") || inputLower.includes("internship") || inputLower.includes("find")) {
      return {
        content: "I can help you find opportunities! Based on your profile, here are some tips:\n\n**1. Update Your Profile**: Make sure your skills and goals are current.\n\n**2. Check Daily Brief**: Visit your dashboard to see new matches.\n\n**3. Use Filters**: Apply filters like location, type, and deadline on the Explore page.\n\n**4. Set Alerts**: Enable notifications to get notified of new opportunities.\n\nWould you like me to scan for specific opportunities?",
        suggestions: ["How to improve my profile?", "Show my matches", "Set alerts"]
      };
    }

    if (inputLower.includes("resume") || inputLower.includes("cv")) {
      return {
        content: "Here are some resume tips to help you stand out:\n\n**1. Keep it Concise**: 1-2 pages maximum.\n\n**2. Quantify Achievements**: Use numbers (e.g., \"Increased efficiency by 25%\").\n\n**3. Tailor for Each Job**: Match keywords from the job description.\n\n**4. Highlight Skills**: List relevant technical and soft skills.\n\n**5. Include Projects**: Show practical application of your skills.\n\nWould you like to use our Resume Builder to create one?",
        suggestions: ["Open Resume Builder", "Cover letter tips", "LinkedIn tips"]
      };
    }

    if (inputLower.includes("interview") || inputLower.includes("prep")) {
      return {
        content: "Interview preparation tips:\n\n**Before Interview:**\n• Research the company thoroughly\n• Practice common questions\n• Prepare your own questions\n• Test your tech setup (for virtual)\n\n**Common Questions:**\n• \"Tell me about yourself\"\n• \"Why do you want to work here?\"\n• \"What are your strengths/weaknesses?\"\n• \"Where do you see yourself in 5 years?\"\n\n**During:**\n• Be confident and make eye contact\n• Listen carefully\n• Ask clarifying questions\n• Follow the STAR method for behavioral questions\n\nWould you like practice questions?",
        suggestions: ["STAR method tips", "Common questions", "Questions to ask"]
      };
    }

    if (inputLower.includes("career") || inputLower.includes("advice") || inputLower.includes("guidance")) {
      return {
        content: "Career guidance depends on your goals. Here's a framework:\n\n**1. Self-Assessment**\n• Identify your strengths\n• Determine your interests\n• Clarify your values\n\n**2. Goal Setting**\n• Short-term (3-6 months)\n• Long-term (1-5 years)\n\n**3. Skill Building**\n• Technical skills for your field\n• Soft skills (communication, teamwork)\n\n**4. networking**\n• Connect with professionals\n• Attend events\n• Use LinkedIn actively\n\n**5. Keep Learning**\n• Stay updated in your field\n• Take courses\n• Build projects\n\nWhat's your target role? I can help you plan!",
        suggestions: ["Tech career paths", "Skills to learn", "Networking tips"]
      };
    }

    return {
      content: "I'm here to help! You can ask me about:\n\n• **Finding opportunities** - Jobs, internships, scholarships\n• **Resume help** - Tips and building\n• **Interview prep** - Preparation strategies\n• **Career advice** - Planning your path\n• **Skills development** - What to learn\n\nJust type your question or use one of the quick actions above!",
      suggestions: ["Find opportunities", "Resume tips", "Interview prep", "Career advice"]
    };
  };

  const handleSend = async (suggestionText?: string) => {
    const messageText = suggestionText || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: messages.length,
      role: "user",
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(messageText);
      const assistantMessage: Message = {
        id: messages.length + 1,
        role: "assistant",
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleCopy = (content: string, id: number) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-full flex flex-col p-4">

      <Card className="flex-1 min-h-0 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
          Online
        </Badge>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"} gap-2`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  message.role === "user" ? "bg-primary" : "bg-primary/10"
                }`}>
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <Bot className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div className="space-y-2">
                  <div className={`p-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.role === "assistant" && (
                      <button
                        onClick={() => handleCopy(message.content, message.id)}
                        className="absolute top-2 right-2 p-1 rounded hover:bg-muted-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedId === message.id ? (
                          <Check className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                  {message.suggestions && message.role === "assistant" && (
                    <div className="flex flex-wrap gap-1">
                      {message.suggestions.map((suggestion, i) => (
                        <Button
                          key={i}
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSend(suggestion)}
                          className="text-xs h-7 bg-muted hover:bg-muted/80"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="p-3 rounded-2xl bg-muted">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 border-t border-foreground/10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>

      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => handleSend(action.label)}
            className="text-xs"
          >
            <action.icon className="w-3 h-3 mr-1" />
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}