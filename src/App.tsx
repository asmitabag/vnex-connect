
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HostelComplaints from "./pages/HostelComplaints";
import MessComplaints from "./pages/MessComplaints";
import StrayAnimal from "./pages/StrayAnimal";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hostel-complaints" element={<HostelComplaints />} />
          <Route path="/mess-complaints" element={<MessComplaints />} />
          <Route path="/stray-animal" element={<StrayAnimal />} />
          {/* These routes will be implemented in future iterations */}
          <Route path="/places-nearby" element={<NotFound />} />
          <Route path="/lost-found" element={<NotFound />} />
          <Route path="/cab-partner" element={<NotFound />} />
          <Route path="/academic-notes" element={<NotFound />} />
          <Route path="/events" element={<NotFound />} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
