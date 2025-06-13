
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Donate from "./pages/Donate";
import Volunteer from "./pages/Volunteer";
import ReportMissing from "./pages/ReportMissing";
import HowToHelp from "./pages/HowToHelp";
import LegalAid from "./pages/LegalAid";
import EmergencyHelplines from "./pages/EmergencyHelplines";
import CounsellingServices from "./pages/CounsellingServices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/report-missing" element={<ReportMissing />} />
          <Route path="/how-to-help" element={<HowToHelp />} />
          <Route path="/legal-aid" element={<LegalAid />} />
          <Route path="/emergency-helplines" element={<EmergencyHelplines />} />
          <Route path="/counselling-services" element={<CounsellingServices />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
