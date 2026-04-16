"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { API_URL } from "@/lib/utils";
import { 
  Search, MapPin, Building, ExternalLink, 
  Trash2, Briefcase, GraduationCap, Bookmark
} from "lucide-react";

interface SavedOpportunity {
  id: number;
  opp_id: number;
  title: string;
  organization: string;
  type: string;
  url: string;
  description: string;
  deadline?: string;
  location?: string;
}

export default function SavedPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [savedOpps, setSavedOpps] = useState<SavedOpportunity[]>([]);

  useEffect(() => {
    const studentId = localStorage.getItem("student_id");
    if (!studentId) {
      router.push("/login");
      return;
    }

    const fetchSaved = async () => {
      try {
        const res = await fetch(`${API_URL}/saved/${studentId}`);
        const data = await res.json();
        setSavedOpps(data.opportunities || []);
      } catch (error) {
        console.error("Failed to fetch saved:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, [router]);

  const filteredOps = savedOpps.filter(opp =>
    opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opp.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemove = async (oppId: number) => {
    setSavedOpps(prev => prev.filter(o => o.opp_id !== oppId));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "internship": return <Briefcase className="w-4 h-4" />;
      case "scholarship": return <GraduationCap className="w-4 h-4" />;
      default: return <Briefcase className="w-4 h-4" />;
    }
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
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search saved..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">{filteredOps.length}</span> saved opportunities
        </p>
      </div>

      <div className="grid gap-4">
        {filteredOps.map(opp => (
          <Card key={opp.opp_id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {getTypeIcon(opp.type)}
                      <span className="ml-1">{opp.type}</span>
                    </Badge>
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
                  onClick={() => handleRemove(opp.opp_id)}
                >
                  <Trash2 className="w-5 h-5 text-muted-foreground" />
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
                    Due: {opp.deadline}
                  </div>
                )}
              </div>
            </CardContent>
            <CardContent className="pt-0">
              <Button size="sm" asChild>
                <a href={opp.url} target="_blank" rel="noopener noreferrer">
                  View Opportunity
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOps.length === 0 && (
        <div className="text-center py-12">
          <Bookmark className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No saved opportunities</h3>
          <p className="text-muted-foreground">Save opportunities to view them later</p>
          <Button className="mt-4" onClick={() => router.push("/user/explore")}>
            Explore Opportunities
          </Button>
        </div>
      )}
    </div>
  );
}