import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, LogOut, Eye, EyeOff, BarChart3, DollarSign, MousePointerClick, TrendingUp } from "lucide-react";
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
  const { toast } = useToast();

  // Check for existing session
  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch inquiries when authenticated
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
          description: "You've successfully logged in to the admin dashboard.",
        });
      } else {
        toast({
          title: "Access Denied",
          description: data.error || "Invalid password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "Failed to connect. Please try again.",
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
    toast({
      title: "Logged Out",
      description: "You've been logged out successfully.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <CardDescription>
              Enter your password to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
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
                {isLoading ? "Verifying..." : "Access Dashboard"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your advertising campaigns</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Inquiries
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inquiries.length}</div>
              <p className="text-xs text-muted-foreground">From all campaigns</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                This Week
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inquiries.filter((i) => {
                  const date = new Date(i.created_at);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return date >= weekAgo;
                }).length}
              </div>
              <p className="text-xs text-muted-foreground">New inquiries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                With Trucks
              </CardTitle>
              <MousePointerClick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inquiries.filter((i) => i.has_truck).length}
              </div>
              <p className="text-xs text-muted-foreground">Customers with trucks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Conversion Rate
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">Track manually</p>
            </CardContent>
          </Card>
        </div>

        {/* Inquiries Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Inquiries</CardTitle>
            <CardDescription>
              All customer inquiries from your advertising campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingInquiries ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading inquiries...
              </div>
            ) : inquiries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="mb-2">No inquiries to display yet.</p>
                <p className="text-sm">
                  Note: Inquiries will appear here once customers submit the contact form.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Move Details</TableHead>
                      <TableHead>Has Truck</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inquiries.map((inquiry) => (
                      <TableRow key={inquiry.id}>
                        <TableCell className="whitespace-nowrap">
                          {format(new Date(inquiry.created_at), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell className="font-medium">{inquiry.name}</TableCell>
                        <TableCell>
                          <a
                            href={`tel:${inquiry.phone}`}
                            className="text-primary hover:underline"
                          >
                            {inquiry.phone}
                          </a>
                        </TableCell>
                        <TableCell>
                          {inquiry.email ? (
                            <a
                              href={`mailto:${inquiry.email}`}
                              className="text-primary hover:underline"
                            >
                              {inquiry.email}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="max-w-[200px]">
                          <div className="text-sm">
                            {inquiry.move_from && inquiry.move_to ? (
                              <>
                                <span className="font-medium">From:</span> {inquiry.move_from}
                                <br />
                                <span className="font-medium">To:</span> {inquiry.move_to}
                              </>
                            ) : (
                              <span className="text-muted-foreground">Not specified</span>
                            )}
                            {inquiry.move_date && (
                              <>
                                <br />
                                <span className="font-medium">Date:</span> {inquiry.move_date}
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {inquiry.has_truck ? (
                            <span className="text-primary font-medium">
                              Yes ({inquiry.truck_type || "Type N/A"})
                            </span>
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
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
