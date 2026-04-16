"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { API_URL } from "@/lib/utils";
import { 
  Search, Filter, Clock, MapPin, Building, ExternalLink, 
  Bookmark, BookmarkCheck, CheckCircle, Briefcase, GraduationCap
} from "lucide-react";

interface Opportunity {
  id: number;
  title: string;
  organization: string;
  type: string;
  url: string;
  description: string;
  requirements: string[];
  deadline?: string;
  location?: string;
  match_score?: number;
}

const opportunityTypes = ["All", "Internship", "Job", "Scholarship", "Research"];

export default function MatchedPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);

  useEffect(() => {
    const studentId = localStorage.getItem("student_id");
    if (!studentId) {
      router.push("/login");
      return;
    }

    const fetchMatches = async () => {
      try {
        const res = await fetch(`${API_URL}/matches/${studentId}`);
        const data = await res.json();
        if (data.matches) {
          setOpportunities(data.matches.map((m: any) => ({
            ...m.opportunity,
            match_score: m.match_score
          })));
        }
      } catch (error) {
        console.error("Failed to fetch matches:", error);
        setOpportunities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [router]);

  const filteredOps = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || opp.type === selectedType;
    return matchesSearch && matchesType;
  });

  const toggleSaved = (id: number) => {
    setSavedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "internship": return <Briefcase className="w-4 h-4" />;
      case "scholarship": return <GraduationCap className="w-4 h-4" />;
      default: return <Briefcase className="w-4 h-4" />;
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 w-full space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search opportunities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {opportunityTypes.map(type => (
          <Button
            key={type}
            variant={selectedType === type ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType(type)}
            className="rounded-full"
          >
            {type}
          </Button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredOps.length}</span> opportunities
        </p>
      </div>

      <div className="grid gap-4">
        {filteredOps.map((opp, index) => (
          <Card key={opp.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {getTypeIcon(opp.type)}
                      <span className="ml-1">{opp.type}</span>
                    </Badge>
                    {opp.match_score && (
                      <Badge className={`${getMatchColor(opp.match_score)} text-white text-xs`}>
                        {opp.match_score}% Match
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{opp.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Building className="w-4 h-4" />
                    {opp.organization}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleSaved(opp.id)}
                >
                  {savedIds.includes(opp.id) ? (
                    <BookmarkCheck className="w-5 h-5 text-primary" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {opp.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {opp.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {opp.location}
                  </div>
                )}
                {opp.deadline && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Due: {opp.deadline}
                  </div>
                )}
              </div>
              {opp.match_score && (
                <div className="mt-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Match Score</span>
                    <Progress value={opp.match_score} className="flex-1 h-2" />
                    <span className="font-medium">{opp.match_score}%</span>
                  </div>
                </div>
              )}
            </CardContent>
            <CardContent className="pt-0">
              <div className="flex gap-2">
                <Button size="sm" asChild>
                  <a href={opp.url} target="_blank" rel="noopener noreferrer">
                    Apply Now
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </Button>
                <Button variant="outline" size="sm" onClick={() => router.push(`/user/audit/${opp.id}`)}>
                  View Audit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOps.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No opportunities found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}