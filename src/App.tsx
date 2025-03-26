
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import HostelComplaints from "./pages/HostelComplaints";
import MessComplaints from "./pages/MessComplaints";
import StrayAnimal from "./pages/StrayAnimal";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { ProfileProvider, useProfile } from "./contexts/ProfileContext";
import PlacesNearby from "./pages/PlacesNearby";
import LostFound from "./pages/LostFound";
import CabPartner from "./pages/CabPartner";
import AcademicNotes from "./pages/AcademicNotes";
import SignIn from "./components/SignIn";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useProfile();
  
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useProfile();
  
  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/sign-in" element={isAuthenticated ? <Navigate to="/" replace /> : <SignIn />} />
        <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
        <Route path="/hostel-complaints" element={<ProtectedRoute><HostelComplaints /></ProtectedRoute>} />
        <Route path="/mess-complaints" element={<ProtectedRoute><MessComplaints /></ProtectedRoute>} />
        <Route path="/stray-animal" element={<ProtectedRoute><StrayAnimal /></ProtectedRoute>} />
        <Route path="/places-nearby" element={<ProtectedRoute><PlacesNearby /></ProtectedRoute>} />
        <Route path="/lost-found" element={<ProtectedRoute><LostFound /></ProtectedRoute>} />
        <Route path="/cab-partner" element={<ProtectedRoute><CabPartner /></ProtectedRoute>} />
        <Route path="/academic-notes" element={<ProtectedRoute><AcademicNotes /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ProfileProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ProfileProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
