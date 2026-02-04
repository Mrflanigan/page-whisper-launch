import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, LogOut, Eye, EyeOff, ArrowLeft, RefreshCw, Instagram, Facebook, Download, ImageIcon, ChevronDown, ChevronUp } from "lucide-react";
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

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [showAssets, setShowAssets] = useState(false);
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
    }
  }, [isAuthenticated]);

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
        sessionStorage.setItem("admin_token", data.token);
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
                <h3 className="text-xs font-medium text-muted-foreground mb-2">Logos</h3>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { src: logoOriginal, name: "logo-original.png", label: "Original" },
                    { src: logoSharp, name: "logo-sharp.png", label: "Sharp" },
                  ].map((item) => (
                    <a
                      key={item.name}
                      href={item.src}
                      download={item.name}
                      className="group relative bg-white border rounded p-2 hover:border-primary transition-colors"
                    >
                      <img src={item.src} alt={item.label} className="w-20 h-20 object-contain" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-xs text-center mt-1 text-muted-foreground">{item.label}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Instagram Photos */}
              <div>
                <h3 className="text-xs font-medium text-muted-foreground mb-2">Instagram Photos</h3>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { src: imgMoversLoading, name: "movers-loading.jpg", label: "Loading" },
                    { src: imgBoxesInTruck, name: "boxes-truck.jpg", label: "Boxes" },
                    { src: imgHappyMove, name: "happy-move.jpg", label: "Happy Move" },
                  ].map((item) => (
                    <a
                      key={item.name}
                      href={item.src}
                      download={item.name}
                      className="group relative border rounded overflow-hidden hover:border-primary transition-colors"
                    >
                      <img src={item.src} alt={item.label} className="w-24 h-24 object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-xs text-center py-1 bg-background text-muted-foreground">{item.label}</p>
                    </a>
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
