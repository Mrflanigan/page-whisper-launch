import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MobilePreview from "./pages/MobilePreview";
import Builder from "./pages/Builder";
import CreateSite from "./pages/CreateSite";
import Site from "./pages/Site";
import MobileUpload from "./pages/MobileUpload";
import AdsLanding from "./pages/AdsLanding";
import ThankYou from "./pages/ThankYou";
import PromoFlyer from "./pages/PromoFlyer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ads" element={<AdsLanding />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/promo" element={<PromoFlyer />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/mobile-preview" element={<MobilePreview />} />
          <Route path="/create" element={<CreateSite />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/site/:id" element={<Site />} />
          <Route path="/upload/:token" element={<MobileUpload />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
