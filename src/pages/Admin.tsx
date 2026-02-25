import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, LogOut, Eye, EyeOff, ArrowLeft, RefreshCw, Instagram, Facebook, Download, ImageIcon, ChevronDown, ChevronUp, Plus, Trash2, ExternalLink, Phone, Mail, Building2, Copy, Send, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Import marketing assets
import logoOriginal from "@/assets/logo-top-choice-moving.png";
import logoSharp from "@/assets/logo-top-choice-sharp.png";
import imgMoversLoading from "@/assets/instagram/movers-loading-truck.jpg";
import imgBoxesInTruck from "@/assets/instagram/boxes-in-truck.jpg";
import imgHappyMove from "@/assets/instagram/happy-move-complete.jpg";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  move_from: string | null;
  move_to: string | null;
  move_date: string | null;
  details: string | null;
  has_truck: boolean | null;
  truck_type: string | null;
  created_at: string;
}

interface Lead {
  id: string;
  company_name: string;
  contact_name: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  area: string | null;
  unit_count: string | null;
  notes: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [showAssets, setShowAssets] = useState(false);
  const [showLeads, setShowLeads] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [showEmailTemplate, setShowEmailTemplate] = useState(false);
  const [isSendingEmails, setIsSendingEmails] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchInquiries();
      fetchLeads();
    }
  }, [isAuthenticated]);

  const fetchLeads = async () => {
    setLoadingLeads(true);
    const token = sessionStorage.getItem("admin_token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-leads`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            "x-admin-token": token || "",
          },
        }
      );
      const data = await response.json();
      if (response.ok && data.leads) {
        setLeads(data.leads);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoadingLeads(false);
    }
  };

  const updateLeadStatus = async (id: string, status: string) => {
    const token = sessionStorage.getItem("admin_token");
    try {
      await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-leads`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            "x-admin-token": token || "",
          },
          body: JSON.stringify({ action: "update", lead: { id, status } }),
        }
      );
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    const token = sessionStorage.getItem("admin_token");
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-inquiries`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            "x-admin-token": token || "",
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.inquiries) {
        setInquiries(data.inquiries);
      } else {
        console.error("Error fetching inquiries:", data.error);
        setInquiries([]);
      }
    } catch (error) {
      console.error("Error:", error);
      setInquiries([]);
    } finally {
      setLoadingInquiries(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        sessionStorage.setItem("admin_token", password);
        setIsAuthenticated(true);
        setPassword("");
        toast({
          title: "Welcome!",
          description: "You've successfully logged in.",
        });
      } else {
        toast({
          title: "Access Denied",
          description: data.error || "Invalid password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "Failed to connect.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setInquiries([]);
    toast({ title: "Logged Out" });
  };

  // Stats calculations
  const thisWeekInquiries = inquiries.filter((i) => {
    const date = new Date(i.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return date >= weekAgo;
  }).length;

  const withTrucks = inquiries.filter((i) => i.has_truck).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-semibold">Admin Access</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="password" className="text-sm">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Compact Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Admin</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="h-8">
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4">
        {/* Stats as compact bullet list */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Quick Stats</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={fetchInquiries} 
              disabled={loadingInquiries}
              className="h-7 px-2 text-xs"
            >
              <RefreshCw className={`w-3 h-3 mr-1 ${loadingInquiries ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-muted-foreground">Page Views:</span>
              <span className="font-medium">580</span>
              <span className="text-muted-foreground text-xs">(all time)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-muted-foreground">Unique Visitors:</span>
              <span className="font-medium">333</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-muted-foreground">Total Inquiries:</span>
              <span className="font-medium">{inquiries.length}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-muted-foreground">This Week:</span>
              <span className="font-medium">{thisWeekInquiries}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-muted-foreground">With Trucks:</span>
              <span className="font-medium">{withTrucks}</span>
            </li>
        </ul>
        </section>

        {/* Social Media Links */}
        <section className="mb-6">
          <div className="flex items-center gap-4">
            <a 
              href="https://business.instagram.com/getting-started" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Instagram className="w-4 h-4" />
              Instagram Setup
            </a>
            <a 
              href="https://www.facebook.com/pages/create" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Facebook className="w-4 h-4" />
              Facebook Setup
            </a>
          </div>
        </section>

        {/* Leads Section */}
        <section className="mb-6">
          <button
            onClick={() => setShowLeads(!showLeads)}
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Building2 className="w-4 h-4" />
            Apartment Manager Leads ({leads.length})
            {showLeads ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showLeads && (
            <div className="mt-3">
              {loadingLeads ? (
                <p className="text-sm text-muted-foreground">Loading leads...</p>
              ) : leads.length === 0 ? (
                <p className="text-sm text-muted-foreground">No leads yet.</p>
              ) : (
                <div className="overflow-x-auto -mx-4 px-4">
                  <Table>
                    <TableHeader>
                      <TableRow className="text-xs">
                        <TableHead className="py-2">Company</TableHead>
                        <TableHead className="py-2">Area</TableHead>
                        <TableHead className="py-2">Units</TableHead>
                        <TableHead className="py-2">Contact</TableHead>
                        <TableHead className="py-2">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {[...leads].sort((a, b) => {
                      if (a.email && !b.email) return -1;
                      if (!a.email && b.email) return 1;
                      return 0;
                    }).map((lead) => (
                        <TableRow key={lead.id} className="text-sm">
                          <TableCell className="py-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{lead.company_name}</span>
                              {lead.email && <Badge variant="default" className="text-[10px] px-1.5 py-0">📧 Email</Badge>}
                            </div>
                            {lead.website && (
                              <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                                Website <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {lead.notes && <p className="text-xs text-muted-foreground mt-0.5">{lead.notes}</p>}
                          </TableCell>
                          <TableCell className="py-2 text-xs">{lead.area || "—"}</TableCell>
                          <TableCell className="py-2 text-xs">{lead.unit_count || "—"}</TableCell>
                          <TableCell className="py-2">
                            <div className="space-y-0.5">
                              {lead.contact_name && <div className="text-xs font-medium">{lead.contact_name}</div>}
                              {lead.phone && (
                                <a href={`tel:${lead.phone}`} className="text-xs text-primary hover:underline flex items-center gap-1">
                                  <Phone className="w-3 h-3" /> {lead.phone}
                                  <span className="text-[10px] text-muted-foreground ml-1">(Landline)</span>
                                </a>
                              )}
                              {lead.email && (
                                <a href={`mailto:${lead.email}`} className="text-xs text-primary hover:underline flex items-center gap-1">
                                  <Mail className="w-3 h-3" /> {lead.email}
                                </a>
                              )}
                              {!lead.contact_name && !lead.phone && !lead.email && <span className="text-xs text-muted-foreground">—</span>}
                            </div>
                          </TableCell>
                          <TableCell className="py-2">
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                              className="text-xs border rounded px-1.5 py-0.5 bg-background"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="interested">Interested</option>
                              <option value="not_interested">Not Interested</option>
                              <option value="converted">Converted</option>
                            </select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Email Outreach Templates */}
        <section className="mb-6">
          <button
            onClick={() => setShowEmailTemplate(!showEmailTemplate)}
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Send className="w-4 h-4" />
            Email Outreach — Ready to Send ({leads.filter(l => l.email).length} with email)
            {showEmailTemplate ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showEmailTemplate && (
            <div className="mt-3 space-y-4">
              {/* Send All Button */}
              {leads.filter(l => l.email && (l.status === "new" || l.status === "contacted")).length > 0 && (
                <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      🚀 {leads.filter(l => l.email).length} leads with email
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Sends from ron@topchoicemovinginc.com via your verified domain. Replies go to your Gmail.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    disabled={isSendingEmails}
                    onClick={async () => {
                      const emailLeads = leads.filter(l => l.email && (l.status === "new" || l.status === "contacted"));
                      if (emailLeads.length === 0) {
                        toast({ title: "No leads to email", description: "No leads with email addresses found." });
                        return;
                      }
                      setIsSendingEmails(true);
                      const token = sessionStorage.getItem("admin_token");
                      try {
                        const response = await fetch(
                          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-outreach`,
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
                              "x-admin-token": token || "",
                            },
                            body: JSON.stringify({ 
                              leadIds: emailLeads.map(l => l.id),
                              extraEmails: Object.fromEntries(
                                emailLeads
                                  .filter(l => l.company_name === "Acres Property Management")
                                  .map(l => [l.id, ["info@acresrealestate-wa.com"]])
                              )
                            }),
                          }
                        );
                        const data = await response.json();
                        if (response.ok) {
                          toast({
                            title: `✅ ${data.sent} emails sent!`,
                            description: data.failed > 0 ? `${data.failed} failed to send.` : "All emails delivered successfully.",
                          });
                          // Update local state
                          setLeads(prev => prev.map(l => 
                            emailLeads.find(el => el.id === l.id) ? { ...l, status: "contacted" } : l
                          ));
                        } else {
                          toast({ title: "Error", description: data.error || "Failed to send emails.", variant: "destructive" });
                        }
                      } catch (error) {
                        toast({ title: "Error", description: "Network error sending emails.", variant: "destructive" });
                      } finally {
                        setIsSendingEmails(false);
                      }
                    }}
                    className="gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {isSendingEmails ? "Sending..." : `Send ${leads.filter(l => l.email).length} Emails`}
                  </Button>
                </div>
              )}


              {leads.length === 0 ? (
                <p className="text-sm text-muted-foreground">No leads in database. Add apartment leads first.</p>
              ) : (
                [...leads].sort((a, b) => {
                  if (a.email && !b.email) return -1;
                  if (!a.email && b.email) return 1;
                  return 0;
                }).map((lead) => {
                  const name = lead.company_name;
                  const subject = `Quick intro — moving help for ${name} residents`;
                  const body = `Hi there,\n\nI'm Ron Stewart, owner of Top Choice Moving Inc. We're a local crew based right here in the Seattle metro area.\n\nWe specialize in helping folks move when the time comes — We are usually less expensive. We provide the labor paired with the client's truck of choice. By being labor-only, we can get the move done for less. We load...  We unload. Save your back — let us do it!\n\nWe'd like to partner with ${name} to offer your tenants professional moving experiance. We'd like to give you $30.00 on a Visa gift card for every completed move you refer our way. No strings — Just our way of saying thanks for thinking of us.\n\nHappy to swing by with some business cards you can hand out, or just save my number.\n\n📞 (253) 267-3212\n📧 Stewartron329@gmail.com\n🌐 Website: https://page-whisper-launch.lovable.app\n\nThanks for your time!\n\nRon Stewart\nTop Choice Moving Inc.`;

                  return (
                    <div key={lead.id} className="border rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between px-3 py-2 bg-muted/30">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{name}</span>
                          {lead.email && <Badge variant="default" className="text-[10px] px-1.5 py-0">📧 Has Email</Badge>}
                          {!lead.email && <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-muted-foreground">No Email</Badge>}
                          <span className={`text-xs px-1.5 py-0.5 rounded ${
                            lead.status === "new" ? "bg-primary/10 text-primary" :
                            lead.status === "contacted" ? "bg-accent/50 text-accent-foreground" :
                            lead.status === "converted" ? "bg-green-100 text-green-800" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {lead.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
                              className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90 inline-flex items-center gap-1"
                            >
                              <Mail className="w-3 h-3" /> Open in Email
                            </a>
                          )}
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(body);
                              toast({ title: "Copied!", description: `Email for ${name} copied to clipboard.` });
                            }}
                            className="text-xs border px-2 py-1 rounded hover:bg-muted inline-flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" /> Copy Body
                          </button>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(subject);
                              toast({ title: "Copied!", description: "Subject line copied." });
                            }}
                            className="text-xs border px-2 py-1 rounded hover:bg-muted inline-flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" /> Copy Subject
                          </button>
                        </div>
                      </div>
                      <div className="px-4 py-3 text-sm space-y-2 leading-relaxed max-h-48 overflow-y-auto">
                        <p className="text-xs text-muted-foreground"><strong>Subject:</strong> {subject}</p>
                        <hr className="border-border" />
                        <p>Hi there,</p>
                        <p>I'm Ron Stewart, owner of <strong>Top Choice Moving Inc.</strong> We're a local crew based right here in the Seattle metro area.</p>
                        <p>We specialize in helping folks move when the time comes — We are usually less expensive. We provide the labor paired with the client's truck of choice. By being labor-only, we can get the move done for less. We load...  We unload. Save your back — let us do it!</p>
                        <p>We'd like to partner with <strong className="text-primary">{name}</strong> to offer your tenants professional moving experiance. We'd like to give you <strong>$30.00 on a Visa gift card</strong> for every completed move you refer our way. No strings — Just our way of saying thanks for thinking of us.</p>
                        <p>Happy to swing by with some business cards you can hand out, or just save my number.</p>
                        <div className="space-y-0.5">
                          <p>📞 (253) 267-3212</p>
                          <p>📧 Stewartron329@gmail.com</p>
                          <p>🌐 <a href="https://page-whisper-launch.lovable.app" className="text-primary hover:underline">Website</a></p>
                        </div>
                        <p>Thanks for your time!</p>
                        <p><strong>Ron Stewart</strong><br />Top Choice Moving Inc.</p>
                      </div>
                    </div>
                  );
                })
              )}
              <p className="text-xs text-muted-foreground italic">
                💡 Tip: Right-click the Top Choice logo in Marketing Assets to copy it, then paste into your email for a professional look.
              </p>
            </div>
          )}
        </section>

        {/* Divider */}
        <hr className="border-border mb-4" />

        {/* Marketing Assets Toggle */}
        <section className="mb-6">
          <button
            onClick={() => setShowAssets(!showAssets)}
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ImageIcon className="w-4 h-4" />
            Marketing Assets
            {showAssets ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {showAssets && (
            <div className="mt-4 space-y-4">
              {/* Logos */}
              <div>
                <h3 className="text-xs font-medium text-muted-foreground mb-2">Logos (right-click image → "Copy image")</h3>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { src: logoOriginal, name: "logo-original.png", label: "Original" },
                    { src: logoSharp, name: "logo-sharp.png", label: "Sharp" },
                  ].map((item) => (
                    <div key={item.name} className="text-center">
                      <div className="bg-white border rounded p-2 hover:border-primary transition-colors">
                        <img src={item.src} alt={item.label} className="w-20 h-20 object-contain" />
                      </div>
                      <p className="text-xs mt-1 text-muted-foreground">{item.label}</p>
                      <a
                        href={item.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        Open full size
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instagram Photos */}
              <div>
                <h3 className="text-xs font-medium text-muted-foreground mb-2">Instagram Photos (right-click image → "Copy image")</h3>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { src: imgMoversLoading, name: "movers-loading.jpg", label: "Loading" },
                    { src: imgBoxesInTruck, name: "boxes-truck.jpg", label: "Boxes" },
                    { src: imgHappyMove, name: "happy-move.jpg", label: "Happy Move" },
                  ].map((item) => (
                    <div key={item.name} className="text-center">
                      <div className="border rounded overflow-hidden hover:border-primary transition-colors">
                        <img src={item.src} alt={item.label} className="w-24 h-24 object-cover" />
                      </div>
                      <p className="text-xs mt-1 text-muted-foreground">{item.label}</p>
                      <a
                        href={item.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        Open full size
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Divider */}
        <hr className="border-border mb-4" />
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Inquiries</h2>
          
          {loadingInquiries ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : inquiries.length === 0 ? (
            <p className="text-sm text-muted-foreground">No inquiries yet. They'll appear here when customers submit the contact form.</p>
          ) : (
            <div className="overflow-x-auto -mx-4 px-4">
              <Table>
                <TableHeader>
                  <TableRow className="text-xs">
                    <TableHead className="py-2">Date</TableHead>
                    <TableHead className="py-2">Name</TableHead>
                    <TableHead className="py-2">Phone</TableHead>
                    <TableHead className="py-2">Email</TableHead>
                    <TableHead className="py-2">Move</TableHead>
                    <TableHead className="py-2">Truck</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.map((inquiry) => (
                    <TableRow key={inquiry.id} className="text-sm">
                      <TableCell className="py-2 whitespace-nowrap">
                        {format(new Date(inquiry.created_at), "MMM d")}
                      </TableCell>
                      <TableCell className="py-2 font-medium">{inquiry.name}</TableCell>
                      <TableCell className="py-2">
                        <a href={`tel:${inquiry.phone}`} className="text-primary hover:underline">
                          {inquiry.phone}
                        </a>
                      </TableCell>
                      <TableCell className="py-2">
                        {inquiry.email ? (
                          <a href={`mailto:${inquiry.email}`} className="text-primary hover:underline">
                            {inquiry.email}
                          </a>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="py-2 text-xs">
                        {inquiry.move_from && inquiry.move_to ? (
                          <span>{inquiry.move_from} → {inquiry.move_to}</span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="py-2">
                        {inquiry.has_truck ? (
                          <span className="text-primary">Yes</span>
                        ) : (
                          <span className="text-muted-foreground">No</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Admin;
