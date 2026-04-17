"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  User, Briefcase, GraduationCap, Award, Languages, Heart, Plus, Trash2, Download,
  Settings, Monitor, Palette, Type, Layout, FileText, Link2, Eye, Image, X,
  Mail, Phone, MapPin, Globe, Palette as PaletteIcon
} from "lucide-react";

interface Basics {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  url: string;
  summary: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  summary: string;
}

interface Education {
  id: string;
  institution: string;
  studyType: string;
  area: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

interface Skill {
  id: string;
  name: string;
  level: number;
}

interface ResumeConfig {
  template: string;
  theme: { primary: string; text: string; background: string };
  typography: { font: { family: string } };
  fontSize: number;
  lineHeight: number;
  page: { margin: number };
}

interface ResumeData {
  basics: Basics;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

const defaultResume: ResumeData = {
  basics: { name: "", headline: "", email: "", phone: "", location: "", url: "", summary: "" },
  experience: [],
  education: [],
  skills: [],
};

const defaultConfig: ResumeConfig = {
  template: "onyx",
  theme: { primary: "#6366f1", text: "#1f2937", background: "#ffffff" },
  typography: { font: { family: "Inter" } },
  fontSize: 11,
  lineHeight: 1.5,
  page: { margin: 40 },
};

interface TemplateStyles {
  header: string;
  name: string;
  headline: string;
  contact: string;
  sectionTitle: string;
  sectionItem: string;
  skill: string;
}

const getTemplateStyles = (template: string, primaryColor: string): TemplateStyles => {
  switch (template) {
    case "pikachu":
      return {
        header: `background: linear-gradient(135deg, #fff5f5 0%, #ffffff 100%); border-bottom: 4px solid ${primaryColor}; padding-bottom: 20px; margin-bottom: 20px;`,
        name: `font-size: 26pt; font-weight: bold; color: ${primaryColor}; letter-spacing: -0.5px;`,
        headline: "font-size: 12pt; color: #666; margin-top: 4px; font-weight: 500;",
        contact: "font-size: 9pt; color: #888; margin-top: 8px;",
        sectionTitle: `font-size: 12pt; font-weight: bold; color: ${primaryColor}; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 4px; margin-bottom: 10px;`,
        sectionItem: "margin-bottom: 12pt;",
        skill: `background: ${primaryColor}; color: white; padding: 3px 10px; border-radius: 12px; font-size: 8pt;`,
      };
    case "chikorita":
      return {
        header: `border-left: 6px solid ${primaryColor}; border-bottom: none; padding-left: 16px; padding-bottom: 0; margin-bottom: 16px;`,
        name: `font-size: 24pt; font-weight: 300; color: ${primaryColor};`,
        headline: "font-size: 11pt; color: #555; margin-top: 4px; font-style: italic;",
        contact: "font-size: 9pt; color: #777; margin-top: 6px;",
        sectionTitle: `font-size: 11pt; font-weight: 600; color: ${primaryColor}; margin-bottom: 8px; padding-bottom: 0; border-bottom: none;`,
        sectionItem: "margin-bottom: 8pt; padding-left: 12px; border-left: 2px solid #eee;",
        skill: `border: 1px solid ${primaryColor}; color: ${primaryColor}; padding: 2px 8px; font-size: 8pt;`,
      };
    case "glalie":
      return {
        header: "background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%); border-radius: 8px; padding: 20px; border: 1px solid #e2e8f0;",
        name: "font-size: 28pt; font-weight: 800; color: #1e293b;",
        headline: `font-size: 13pt; color: ${primaryColor}; margin-top: 6px; font-weight: 600;`,
        contact: "font-size: 9pt; color: #64748b; margin-top: 10px;",
        sectionTitle: `font-size: 14pt; font-weight: 700; color: #334155; border-bottom: 3px solid ${primaryColor}; padding-bottom: 6px; margin-bottom: 12px;`,
        sectionItem: "margin-bottom: 14pt; background: #f8fafc; padding: 10px; border-radius: 4px;",
        skill: `background: linear-gradient(135deg, ${primaryColor}20, ${primaryColor}40); color: ${primaryColor}; padding: 4px 10px; font-size: 9pt; font-weight: 500;`,
      };
    case "leafish":
      return {
        header: `display: grid; grid-template-columns: auto 1fr; gap: 20px; align-items: center; border-bottom: 2px solid ${primaryColor}; padding-bottom: 16px;`,
        name: `font-size: 20pt; font-weight: bold; color: ${primaryColor};`,
        headline: "font-size: 10pt; color: #666; margin-top: 2px;",
        contact: "font-size: 8pt; color: #888; margin-top: 4px;",
        sectionTitle: `font-size: 10pt; font-weight: bold; color: ${primaryColor}; background: ${primaryColor}15; padding: 6px 12px; border-radius: 4px; display: inline-block; margin-bottom: 10px;`,
        sectionItem: "margin-bottom: 10pt;",
        skill: `background: #f0fdf4; color: ${primaryColor}; padding: 2px 8px; font-size: 8pt; border-radius: 2px;`,
      };
    default:
      return {
        header: `border-bottom: 3px solid ${primaryColor}; padding-bottom: 16px; margin-bottom: 16px;`,
        name: "font-size: 22pt; font-weight: bold;",
        headline: `font-size: 11pt; color: ${primaryColor}; margin-top: 2px;`,
        contact: "font-size: 9pt; color: #666; margin-top: 6px;",
        sectionTitle: `font-size: 11pt; font-weight: bold; color: ${primaryColor}; margin-bottom: 8pt; padding-bottom: 3pt; border-bottom: 1px solid #ddd;`,
        sectionItem: "margin-bottom: 10pt;",
        skill: `background: ${primaryColor}15; padding: 2px 8px; border-radius: 3px; font-size: 8pt; color: ${primaryColor};`,
      };
  }
};

const templates = [
  { id: "onyx", name: "Onyx" },
  { id: "pikachu", name: "Pikachu" },
  { id: "chikorita", name: "Chikorita" },
  { id: "leafish", name: "Leafish" },
  { id: "glalie", name: "Glalie" },
];

const fonts = ["Inter", "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins"];
const colors = ["#6366f1", "#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6"];

const sectionList = [
  { id: "basics", name: "Personal", icon: User },
  { id: "summary", name: "Summary", icon: FileText },
  { id: "experience", name: "Experience", icon: Briefcase },
  { id: "education", name: "Education", icon: GraduationCap },
  { id: "skills", name: "Skills", icon: Award },
  { id: "settings", name: "Design", icon: PaletteIcon },
];

export default function ResumePage() {
  const [resume, setResume] = useState<ResumeData>(defaultResume);
  const [config, setConfig] = useState<ResumeConfig>(defaultConfig);
  const [activeSection, setActiveSection] = useState("basics");
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Resume Builder | CareerCompass";
  }, []);

  const updateBasics = (field: keyof Basics, value: string) => {
    setResume((prev) => ({ ...prev, basics: { ...prev.basics, [field]: value } }));
  };

  const addExperience = () => {
    setResume((prev) => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now().toString(), company: "", position: "", location: "", startDate: "", endDate: "", current: false, summary: "" }],
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => exp.id === id ? { ...exp, [field]: value } : exp),
    }));
  };

  const removeExperience = (id: string) => {
    setResume((prev) => ({ ...prev, experience: prev.experience.filter((exp) => exp.id !== id) }));
  };

  const addEducation = () => {
    setResume((prev) => ({
      ...prev,
      education: [...prev.education, { id: Date.now().toString(), institution: "", studyType: "", area: "", startDate: "", endDate: "", current: false }],
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string | boolean) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.map((edu) => edu.id === id ? { ...edu, [field]: value } : edu),
    }));
  };

  const removeEducation = (id: string) => {
    setResume((prev) => ({ ...prev, education: prev.education.filter((edu) => edu.id !== id) }));
  };

  const addSkill = () => {
    setResume((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now().toString(), name: "", level: 3 }],
    }));
  };

  const updateSkill = (id: string, field: keyof Skill, value: string | number) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => skill.id === id ? { ...skill, [field]: value } : skill),
    }));
  };

  const removeSkill = (id: string) => {
    setResume((prev) => ({ ...prev, skills: prev.skills.filter((skill) => skill.id !== id) }));
  };

  const updateConfig = (field: keyof ResumeConfig, value: string | number) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const updateTheme = (field: keyof ResumeConfig["theme"], value: string) => {
    setConfig((prev) => ({ ...prev, theme: { ...prev.theme, [field]: value } }));
  };

  const handleExport = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const primaryColor = config.theme.primary;
    const fontFamily = config.typography.font.family;
    const tpl = getTemplateStyles(config.template, primaryColor);

    const html = `<!DOCTYPE html>
<html>
<head>
  <title>${resume.basics.name || "Resume"}</title>
  <link href="https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, "+")}:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: '${fontFamily}', sans-serif; font-size: ${config.fontSize}pt; line-height: ${config.lineHeight}; color: ${config.theme.text}; background: white; margin: 0; padding: 20px; }
    @media print { body { padding: 0; } }
    .header { ${tpl.header} }
    .name { ${tpl.name} }
    .headline { ${tpl.headline} }
    .contact { font-size: 9pt; color: #666; margin-top: 6px; display: flex; flex-wrap: wrap; gap: 16px; }
    .section-title { ${tpl.sectionTitle} }
    .section-item { ${tpl.sectionItem} }
    .skill { ${tpl.skill} }
    @page { size: A4; margin: 0; }
  </style>
</head>
<body>
  <div style="width: 210mm; min-height: 297mm; padding: ${config.page.margin}px; margin: 0 auto;">
    ${(resume.basics.name || resume.basics.headline || resume.basics.email) ? `
      <div class="header">
        <div class="name">${resume.basics.name}</div>
        ${resume.basics.headline ? `<div class="headline">${resume.basics.headline}</div>` : ""}
        <div class="contact">
          ${resume.basics.email ? `<span>📧 ${resume.basics.email}</span>` : ""}
          ${resume.basics.phone ? `<span>📞 ${resume.basics.phone}</span>` : ""}
          ${resume.basics.location ? `<span>📍 ${resume.basics.location}</span>` : ""}
          ${resume.basics.url ? `<span>🌐 ${resume.basics.url}</span>` : ""}
        </div>
      </div>
    ` : ""}
    ${resume.basics.summary ? `
      <div style="margin-bottom: 14pt;">
        <div class="section-title">Summary</div>
        <div style="font-size: 9pt; color: #666;">${resume.basics.summary}</div>
      </div>
    ` : ""}
    ${resume.experience.length ? `
      <div style="margin-bottom: 14pt;">
        <div class="section-title">Experience</div>
        ${resume.experience.map(exp => `
          <div class="section-item">
            <div style="display: flex; justify-content: space-between;">
              <div>
                <div style="font-weight: 600; font-size: 10pt;">${exp.position}</div>
                <div style="font-size: 9pt; color: #666;">${exp.company}${exp.location ? ", " + exp.location : ""}</div>
              </div>
              <div style="font-size: 8pt; color: #999;">${exp.startDate || ""} - ${exp.current ? "Present" : exp.endDate || ""}</div>
            </div>
            ${exp.summary ? `<div style="font-size: 9pt; color: #666; margin-top: 4pt;">${exp.summary}</div>` : ""}
          </div>
        `).join("")}
      </div>
    ` : ""}
    ${resume.education.length ? `
      <div style="margin-bottom: 14pt;">
        <div class="section-title">Education</div>
        ${resume.education.map(edu => `
          <div class="section-item">
            <div style="display: flex; justify-content: space-between;">
              <div>
                <div style="font-weight: 600; font-size: 10pt;">${edu.studyType} in ${edu.area}</div>
                <div style="font-size: 9pt; color: #666;">${edu.institution}</div>
              </div>
              <div style="font-size: 8pt; color: #999;">${edu.startDate || ""} - ${edu.current ? "Present" : edu.endDate || ""}</div>
            </div>
          </div>
        `).join("")}
      </div>
    ` : ""}
    ${resume.skills.length ? `
      <div style="margin-bottom: 14pt;">
        <div class="section-title">Skills</div>
        <div style="display: flex; flex-wrap: wrap; gap: 5px;">
          ${resume.skills.map(skill => `<span class="skill">${skill.name}</span>`).join("")}
        </div>
      </div>
    ` : ""}
  </div>
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>`;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  const renderEditor = () => {
    switch (activeSection) {
      case "basics":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User size={18} />
              <h3 className="font-semibold">Personal Details</h3>
            </div>
            <div className="grid gap-3">
              <div>
                <Label className="text-xs">Full Name</Label>
                <Input value={resume.basics.name} onChange={(e) => updateBasics("name", e.target.value)} placeholder="John Doe" className="h-8" />
              </div>
              <div>
                <Label className="text-xs">Headline</Label>
                <Input value={resume.basics.headline} onChange={(e) => updateBasics("headline", e.target.value)} placeholder="Software Engineer" className="h-8" />
              </div>
              <div className="relative">
                <Label className="text-xs">Email</Label>
                <div className="relative">
                  <Mail size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input type="email" value={resume.basics.email} onChange={(e) => updateBasics("email", e.target.value)} placeholder="john@example.com" className="h-8 pl-8" />
                </div>
              </div>
              <div className="relative">
                <Label className="text-xs">Phone</Label>
                <div className="relative">
                  <Phone size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input value={resume.basics.phone} onChange={(e) => updateBasics("phone", e.target.value)} placeholder="+1 234 567 8900" className="h-8 pl-8" />
                </div>
              </div>
              <div className="relative">
                <Label className="text-xs">Location</Label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input value={resume.basics.location} onChange={(e) => updateBasics("location", e.target.value)} placeholder="New York, NY" className="h-8 pl-8" />
                </div>
              </div>
              <div className="relative">
                <Label className="text-xs">Website</Label>
                <div className="relative">
                  <Globe size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input value={resume.basics.url} onChange={(e) => updateBasics("url", e.target.value)} placeholder="https://example.com" className="h-8 pl-8" />
                </div>
              </div>
            </div>
          </div>
        );
      case "summary":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText size={18} />
              <h3 className="font-semibold">Summary</h3>
            </div>
            <Textarea value={resume.basics.summary} onChange={(e) => updateBasics("summary", e.target.value)} placeholder="Professional summary..." rows={5} />
          </div>
        );
      case "experience":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold">Experience</h3>
              <Button size="sm" variant="outline" onClick={addExperience}>
                <Plus size={14} className="mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-3">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="p-3 border border-foreground/10 rounded-lg space-y-3">
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)}>
                      <Trash2 size={14} className="text-red-500" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Input value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} placeholder="Company" className="h-8" />
                    <Input value={exp.position} onChange={(e) => updateExperience(exp.id, "position", e.target.value)} placeholder="Position" className="h-8" />
                    <Input value={exp.location} onChange={(e) => updateExperience(exp.id, "location", e.target.value)} placeholder="Location" className="h-8" />
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="month" value={exp.startDate} onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)} className="h-8" />
                      <Input type="month" value={exp.endDate} onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)} className="h-8" disabled={exp.current} />
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(exp.id, "current", e.target.checked)} />
                      <Label className="text-xs">Current</Label>
                    </div>
                    <Textarea value={exp.summary} onChange={(e) => updateExperience(exp.id, "summary", e.target.value)} placeholder="Description..." rows={2} />
                  </div>
                </div>
              ))}
              {resume.experience.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No experience added yet.</p>
              )}
            </div>
          </div>
        );
      case "education":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold">Education</h3>
              <Button size="sm" variant="outline" onClick={addEducation}>
                <Plus size={14} className="mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-3">
              {resume.education.map((edu) => (
                <div key={edu.id} className="p-3 border border-foreground/10 rounded-lg space-y-3">
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)}>
                      <Trash2 size={14} className="text-red-500" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Input value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} placeholder="Institution" className="h-8" />
                    <Input value={edu.studyType} onChange={(e) => updateEducation(edu.id, "studyType", e.target.value)} placeholder="Degree" className="h-8" />
                    <Input value={edu.area} onChange={(e) => updateEducation(edu.id, "area", e.target.value)} placeholder="Field of Study" className="h-8" />
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="month" value={edu.startDate} onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)} className="h-8" />
                      <Input type="month" value={edu.endDate} onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)} className="h-8" disabled={edu.current} />
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={edu.current} onChange={(e) => updateEducation(edu.id, "current", e.target.checked)} />
                      <Label className="text-xs">Current</Label>
                    </div>
                  </div>
                </div>
              ))}
              {resume.education.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No education added yet.</p>
              )}
            </div>
          </div>
        );
      case "skills":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold">Skills</h3>
              <Button size="sm" variant="outline" onClick={addSkill}>
                <Plus size={14} className="mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-3">
              {resume.skills.map((skill) => (
                <div key={skill.id} className="p-3 border border-foreground/10 rounded-lg space-y-2">
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" onClick={() => removeSkill(skill.id)}>
                      <Trash2 size={14} className="text-red-500" />
                    </Button>
                  </div>
                  <Input value={skill.name} onChange={(e) => updateSkill(skill.id, "name", e.target.value)} placeholder="Skill name" className="h-8" />
                  <div>
                    <Label className="text-xs">Level: {skill.level}/5</Label>
                    <input type="range" min="1" max="5" value={skill.level} onChange={(e) => updateSkill(skill.id, "level", parseInt(e.target.value))} className="w-full accent-primary" />
                  </div>
                </div>
              ))}
              {resume.skills.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No skills added yet.</p>
              )}
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Monitor size={18} />
              <h3 className="font-semibold">Template</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => updateConfig("template", t.id)}
                  className={`px-3 py-2 border border-foreground/10 rounded text-xs whitespace-nowrap ${
                    config.template === t.id ? "border-primary bg-primary/10" : ""
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <Palette size={18} />
              <h3 className="font-semibold">Colors</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => updateTheme("primary", c)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    config.theme.primary === c ? "border-foreground" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <Type size={18} />
              <h3 className="font-semibold">Typography</h3>
            </div>
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Font</Label>
                <select
                  value={config.typography.font.family}
                  onChange={(e) => setConfig((prev) => ({ ...prev, typography: { font: { family: e.target.value } } }))}
                  className="w-full h-8 px-2 rounded-md border border-foreground/10 bg-background text-sm"
                >
                  {fonts.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="text-xs">Size: {config.fontSize}px</Label>
                <input
                  type="range"
                  min="8"
                  max="14"
                  value={config.fontSize}
                  onChange={(e) => updateConfig("fontSize", parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
              <div>
                <Label className="text-xs">Line Height: {config.lineHeight}</Label>
                <input
                  type="range"
                  min="1"
                  max="2"
                  step="0.1"
                  value={config.lineHeight}
                  onChange={(e) => updateConfig("lineHeight", parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <Layout size={18} />
              <h3 className="font-semibold">Page</h3>
            </div>
            <div>
              <Label className="text-xs">Margin: {config.page.margin}px</Label>
              <input
                type="range"
                min="20"
                max="60"
                value={config.page.margin}
                onChange={(e) => setConfig((prev) => ({ ...prev, page: { margin: parseInt(e.target.value) } }))}
                className="w-full accent-primary"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col lg:flex-row">
      <div className="w-32 border-r border-foreground/10 overflow-y-auto shrink-0 p-2">
        {sectionList.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs mb-1 ${
                activeSection === section.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <Icon size={14} />
              <span className="truncate">{section.name}</span>
            </button>
          );
        })}
      </div>
      <div className="w-[280px] lg:w-[320px] overflow-y-auto p-3 border-r border-foreground/10 shrink-0">
        <Card>
          <CardContent className="p-3">{renderEditor()}</CardContent>
        </Card>
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-2 border-b border-foreground/10 bg-background flex justify-between items-center shrink-0">
          <h3 className="font-semibold text-sm">Preview</h3>
          <Button size="sm" onClick={handleExport}>
            <Download size={14} className="mr-1" /> PDF
          </Button>
        </div>
        <div className="flex-1 overflow-auto p-2 pb-4 bg-gray-100">
          {(() => {
            const tpl = getTemplateStyles(config.template, config.theme.primary);
            const parseStyles = (styleString: string) => {
              const style: Record<string, string> = {};
              styleString.split(';').forEach(s => {
                const [key, value] = s.split(':').map(s => s.trim());
                if (key && value) style[key.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = value;
              });
              return style;
            };
            const headerStyle = parseStyles(tpl.header);
            const nameStyle = parseStyles(tpl.name);
            const headlineStyle = parseStyles(tpl.headline);
            const sectionTitleStyle = parseStyles(tpl.sectionTitle);
            const skillStyle = parseStyles(tpl.skill);
            return (
          <div
            ref={printRef}
            className="bg-white shadow-lg mx-auto scale-[0.75] origin-top"
            style={{ 
              width: "210mm", 
              minHeight: "297mm", 
              fontFamily: config.typography.font.family, 
              fontSize: `${config.fontSize}pt`, 
              lineHeight: config.lineHeight, 
              color: config.theme.text, 
              padding: `${config.page.margin}px` 
            }}
          >
            {(resume.basics.name || resume.basics.headline || resume.basics.email) && (
              <div style={headerStyle}>
                <div style={nameStyle}>{resume.basics.name}</div>
                {resume.basics.headline && <div style={headlineStyle}>{resume.basics.headline}</div>}
                <div style={{ fontSize: "9pt", color: "#666", marginTop: "6px", display: "flex", flexWrap: "wrap", gap: "16px" }}>
                  {resume.basics.email && <span>📧 {resume.basics.email}</span>}
                  {resume.basics.phone && <span>📞 {resume.basics.phone}</span>}
                  {resume.basics.location && <span>📍 {resume.basics.location}</span>}
                  {resume.basics.url && <span>🌐 {resume.basics.url}</span>}
                </div>
              </div>
            )}
            {resume.basics.summary && (
              <div className="mb-4">
                <div style={sectionTitleStyle}>Summary</div>
                <div className="text-sm text-gray-600">{resume.basics.summary}</div>
              </div>
            )}
            {resume.experience.length > 0 && (
              <div className="mb-4">
                <div style={sectionTitleStyle}>Experience</div>
                {resume.experience.map((exp) => (
                  <div key={exp.id} className="mb-3">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-semibold text-sm">{exp.position}</div>
                        <div className="text-xs text-gray-500">
                          {exp.company}
                          {exp.location && `, ${exp.location}`}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {exp.startDate || ""} - {exp.current ? "Present" : exp.endDate || ""}
                      </div>
                    </div>
                    {exp.summary && <div className="text-xs text-gray-600 mt-1">{exp.summary}</div>}
                  </div>
                ))}
              </div>
            )}
            {resume.education.length > 0 && (
              <div className="mb-4">
                <div style={sectionTitleStyle}>Education</div>
                {resume.education.map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-semibold text-sm">
                          {edu.studyType} in {edu.area}
                        </div>
                        <div className="text-xs text-gray-500">{edu.institution}</div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {edu.startDate || ""} - {edu.current ? "Present" : edu.endDate || ""}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {resume.skills.length > 0 && (
              <div className="mb-4">
                <div style={sectionTitleStyle}>Skills</div>
                <div className="flex flex-wrap gap-1">
                  {resume.skills.map((skill) => (
                    <span
                      key={skill.id}
                      style={skillStyle}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {!resume.basics.name && resume.experience.length === 0 && resume.education.length === 0 && resume.skills.length === 0 && (
              <div className="text-center text-gray-400 py-20">Start filling in your information to see the preview</div>
            )}
          </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}