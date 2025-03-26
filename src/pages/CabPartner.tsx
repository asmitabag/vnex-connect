
import React, { useState } from 'react';
import { useProfile } from '../contexts/ProfileContext';
import { Car, Search, MapPin, Calendar, Clock, User, Phone, Building, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface RideShare {
  id: string;
  startLocation: string;
  destination: string;
  date: string;
  time: string;
  seatsAvailable: number;
  contactName: string;
  contactPhone: string;
  notes: string;
}

const CabPartner = () => {
  const { campus } = useProfile();
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [rides, setRides] = useState<RideShare[]>([
    {
      id: '1',
      startLocation: 'VIT Campus',
      destination: 'Airport',
      date: '2023-11-10',
      time: '14:00',
      seatsAvailable: 3,
      contactName: 'Alex Johnson',
      contactPhone: '9876543210',
      notes: 'Splitting cab fare equally. Luggage space available.'
    },
    {
      id: '2',
      startLocation: 'Railway Station',
      destination: 'VIT Campus',
      date: '2023-11-12',
      time: '10:30',
      seatsAvailable: 2,
      contactName: 'Priya Sharma',
      contactPhone: '8765432109',
      notes: 'Looking for 2 more people to share Uber XL.'
    }
  ]);
  
  const [newRide, setNewRide] = useState<Omit<RideShare, 'id'>>({
    startLocation: '',
    destination: '',
    date: '',
    time: '',
    seatsAvailable: 3,
    contactName: '',
    contactPhone: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRide(prev => ({ 
      ...prev, 
      [name]: name === 'seatsAvailable' ? parseInt(value) : value 
    }));
  };

  const addRide = () => {
    if (!newRide.startLocation || !newRide.destination || !newRide.date || !newRide.contactName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newRideWithId = {
      ...newRide,
      id: `${Date.now()}`,
    };

    setRides(prev => [...prev, newRideWithId]);
    setOpenDialog(false);
    setNewRide({
      startLocation: '',
      destination: '',
      date: '',
      time: '',
      seatsAvailable: 3,
      contactName: '',
      contactPhone: '',
      notes: ''
    });

    toast({
      title: "Ride Share Added",
      description: "Your ride share has been posted successfully",
    });
  };

  return (
    <div className="vnex-container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Car className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold">Cab Partner</h1>
          </div>
          
          <Button 
            onClick={() => setOpenDialog(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Post Ride Share
          </Button>
        </div>

        {!campus && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <p className="text-yellow-700">
              Please select a campus in your profile to see cab sharing options for your campus.
            </p>
          </div>
        )}
        
        <p className="text-lg mb-6">
          Find students or faculty heading to the same destination and share your cab fare.
        </p>
        
        {rides.length === 0 ? (
          <div className="text-center py-12">
            <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600">No ride shares available</h3>
            <p className="text-gray-500 mt-2">
              There are no ride shares posted yet. Be the first to share your ride!
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {rides.map(ride => (
              <div key={ride.id} className="vnex-card hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{ride.startLocation} to {ride.destination}</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">
                        {new Date(ride.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      <Clock className="h-4 w-4 text-gray-500 ml-2" />
                      <span className="text-gray-700">{ride.time}</span>
                    </div>
                  </div>
                  <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                    {ride.seatsAvailable} {ride.seatsAvailable === 1 ? 'seat' : 'seats'} available
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-start gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{ride.contactName}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{ride.contactPhone}</span>
                      </div>
                    </div>
                    
                    {ride.notes && (
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                        <p className="text-gray-700 mt-1">{ride.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Ride Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Post Ride Share</DialogTitle>
            <DialogDescription>
              Share your cab ride to split costs with others going to the same destination.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startLocation">Start Location *</Label>
                <Input
                  id="startLocation"
                  name="startLocation"
                  value={newRide.startLocation}
                  onChange={handleInputChange}
                  placeholder="e.g., VIT Campus"
                />
              </div>
              
              <div>
                <Label htmlFor="destination">Destination *</Label>
                <Input
                  id="destination"
                  name="destination"
                  value={newRide.destination}
                  onChange={handleInputChange}
                  placeholder="e.g., Airport, Railway Station"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={newRide.date}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={newRide.time}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="seatsAvailable">Seats Available *</Label>
                <Input
                  id="seatsAvailable"
                  name="seatsAvailable"
                  type="number"
                  min="1"
                  max="6"
                  value={newRide.seatsAvailable}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactName">Your Name *</Label>
                <Input
                  id="contactName"
                  name="contactName"
                  value={newRide.contactName}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <Label htmlFor="contactPhone">Phone Number *</Label>
                <Input
                  id="contactPhone"
                  name="contactPhone"
                  value={newRide.contactPhone}
                  onChange={handleInputChange}
                  placeholder="Your Contact Number"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Input
                id="notes"
                name="notes"
                value={newRide.notes}
                onChange={handleInputChange}
                placeholder="Any additional information..."
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={addRide}>Post Ride Share</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CabPartner;
