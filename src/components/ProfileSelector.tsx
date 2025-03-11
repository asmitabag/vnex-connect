
import React, { useState } from 'react';
import { useProfile } from '../contexts/ProfileContext';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Building } from 'lucide-react';

const ProfileSelector = () => {
  const { toast } = useToast();
  const { profileType, setProfileType, campus, setCampus, isAuthenticated, setIsAuthenticated } = useProfile();
  const [open, setOpen] = useState(!isAuthenticated);
  const [selectedProfile, setSelectedProfile] = useState<string | undefined>(undefined);
  const [selectedCampus, setSelectedCampus] = useState<string | undefined>(undefined);

  const handleSubmit = () => {
    if (!selectedProfile || !selectedCampus) {
      toast({
        title: "Selection required",
        description: "Please select both profile type and campus",
        variant: "destructive"
      });
      return;
    }

    setProfileType(selectedProfile as any);
    setCampus(selectedCampus as any);
    setIsAuthenticated(true);
    setOpen(false);
    
    toast({
      title: "Profile set successfully",
      description: `You're now using VIT Nexus as a ${selectedProfile} in the ${selectedCampus} campus`,
    });
  };

  return (
    <>
      <Button 
        onClick={() => setOpen(true)} 
        variant="outline"
        className="flex items-center gap-2"
      >
        {profileType === 'student' ? (
          <GraduationCap className="h-4 w-4" />
        ) : profileType === 'faculty' ? (
          <Building className="h-4 w-4" />
        ) : null}
        {isAuthenticated ? (
          <>
            {profileType} | {campus}
          </>
        ) : 'Set Profile'}
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select your profile</DialogTitle>
            <DialogDescription>
              Choose your profile type and campus to personalize your experience.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Profile Type</label>
              <Select
                value={selectedProfile}
                onValueChange={setSelectedProfile}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select profile type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Campus</label>
              <Select
                value={selectedCampus}
                onValueChange={setSelectedCampus}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select campus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Chennai">Chennai</SelectItem>
                  <SelectItem value="Vellore">Vellore</SelectItem>
                  <SelectItem value="Bhopal">Bhopal</SelectItem>
                  <SelectItem value="Amaravati">Amaravati</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={handleSubmit}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileSelector;
