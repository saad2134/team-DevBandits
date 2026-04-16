"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_URL } from "@/lib/utils";
import { 
  Bell, Lock, Save, User, Briefcase, CheckCircle, MessageCircle, Phone, ExternalLink
} from "lucide-react";

interface StudentProfile {
  id: number;
  email: string;
  name: string;
  phone?: string;
  location?: string;
}

interface SettingsData {
  emailNotifications: boolean;
  pushNotifications: boolean;
  newOpportunities: boolean;
  applicationUpdates: boolean;
  weeklyDigest: boolean;
  marketingEmails: boolean;
}

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [accountData, setAccountData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [settings, setSettings] = useState<SettingsData>({
    emailNotifications: true,
    pushNotifications: true,
    newOpportunities: true,
    applicationUpdates: true,
    weeklyDigest: true,
    marketingEmails: false,
  });
  const [externalData, setExternalData] = useState({
    telegram: "",
    whatsapp: "",
    discord: "",
  });

  useEffect(() => {
    const studentId = localStorage.getItem("student_id");
    if (!studentId) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/profile/${studentId}`);
        const data = await res.json();
        setProfile(data);
        setAccountData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, [router]);

  const handleSaveAccount = async () => {
    const studentId = localStorage.getItem("student_id");
    if (!studentId) return;
    
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/profile/${studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: accountData.name,
          phone: accountData.phone || null,
        }),
      });
      
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.new !== passwordData.confirm) {
      alert("Passwords do not match");
      return;
    }
    if (passwordData.new.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    const studentId = localStorage.getItem("student_id");
    if (!studentId) return;
    
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: parseInt(studentId),
          current_password: passwordData.current,
          new_password: passwordData.new,
        }),
      });
      
      const data = await res.json();
      if (data.success) {
        setSaved(true);
        setPasswordData({ current: "", new: "", confirm: "" });
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert(data.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Failed to change password:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (key: keyof SettingsData, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 md:p-8 w-full space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Account Settings
            </CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={accountData.name}
                onChange={(e) => setAccountData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={accountData.email}
                disabled
                className="opacity-60"
              />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                type="tel" 
                value={accountData.phone}
                onChange={(e) => setAccountData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <Button onClick={handleSaveAccount} disabled={loading}>
              {saved ? <CheckCircle className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
              {saved ? "Saved!" : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive email updates</p>
              </div>
              <Switch 
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => updateSetting("emailNotifications", checked)} 
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push alerts</p>
              </div>
              <Switch 
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => updateSetting("pushNotifications", checked)} 
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Digest</Label>
                <p className="text-sm text-muted-foreground">Get weekly opportunity summary</p>
              </div>
              <Switch 
                checked={settings.weeklyDigest}
                onCheckedChange={(checked) => updateSetting("weeklyDigest", checked)} 
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Receive promotional content</p>
              </div>
              <Switch 
                checked={settings.marketingEmails}
                onCheckedChange={(checked) => updateSetting("marketingEmails", checked)} 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Opportunity Preferences
            </CardTitle>
            <CardDescription>Customize your opportunity recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>New Opportunities</Label>
                <p className="text-sm text-muted-foreground">Get notified about new matches</p>
              </div>
              <Switch 
                checked={settings.newOpportunities}
                onCheckedChange={(checked) => updateSetting("newOpportunities", checked)} 
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Application Updates</Label>
                <p className="text-sm text-muted-foreground">Track your application status</p>
              </div>
              <Switch 
                checked={settings.applicationUpdates}
                onCheckedChange={(checked) => updateSetting("applicationUpdates", checked)} 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              External Notifications
            </CardTitle>
            <CardDescription>Connect external apps for direct notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Telegram Username</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="@username" 
                  className="flex-1"
                  value={externalData.telegram}
                  onChange={(e) => setExternalData(prev => ({ ...prev, telegram: e.target.value }))}
                />
                <Button variant="outline" size="sm">Connect</Button>
              </div>
              <p className="text-xs text-muted-foreground">Bot username: @CareerCompassBot</p>
            </div>
            <div className="grid gap-2">
              <Label>WhatsApp Number</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="+91 98765 43210" 
                  className="flex-1"
                  value={externalData.whatsapp}
                  onChange={(e) => setExternalData(prev => ({ ...prev, whatsapp: e.target.value }))}
                />
                <Button variant="outline" size="sm">Verify</Button>
              </div>
              <p className="text-xs text-muted-foreground">Get OTP on WhatsApp to verify</p>
            </div>
            <div className="grid gap-2">
              <Label>Discord Webhook (optional)</Label>
              <Input 
                placeholder="https://discord.com/api/webhooks/..." 
                value={externalData.discord}
                onChange={(e) => setExternalData(prev => ({ ...prev, discord: e.target.value }))}
              />
              <p className="text-xs text-muted-foreground">Create a webhook in Discord server settings</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Security
            </CardTitle>
            <CardDescription>Manage your security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input 
                id="current-password" 
                type="password"
                value={passwordData.current}
                onChange={(e) => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input 
                id="new-password" 
                type="password"
                value={passwordData.new}
                onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input 
                id="confirm-password" 
                type="password"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
              />
            </div>
            <Button variant="outline" onClick={handleChangePassword} disabled={loading}>
              <Lock className="mr-2 h-4 w-4" />
              Update Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}