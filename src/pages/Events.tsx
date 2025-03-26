
import React, { useState } from 'react';
import { useProfile } from '../contexts/ProfileContext';
import { Building, Calendar, Link as LinkIcon, Plus, User, Phone, MapPin, Clock, Info, Upload } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// Define campus-specific venues
const campusVenues = {
  Chennai: [
    "Main Auditorium", "Mini Auditorium", "Silver Jubilee Tower", "Technology Tower", 
    "Men's Hostel Grounds", "Women's Hostel Grounds", "GD Naidu Hall", "Anna Auditorium"
  ],
  Vellore: [
    "Anna Auditorium", "Library Conference Hall", "TT Gallery", "Amphitheater", 
    "Main Building", "SJT Auditorium", "SMV Auditorium", "MBA Block"
  ],
  Bhopal: [
    "Main Auditorium", "Seminar Hall", "Open Air Theatre", "Academic Block A", 
    "Academic Block B", "Central Lawn", "Sports Complex", "Convention Centre"
  ],
  Amaravati: [
    "Central Auditorium", "Multi-Purpose Hall", "Academic Block 1", "Academic Block 2",
    "Open Theatre", "Main Grounds", "Indoor Stadium", "Administration Block"
  ]
};

// Define campus-specific registration links
const registrationLinks = {
  Chennai: "https://events.vit.ac.in/chennai/register",
  Vellore: "https://events.vit.ac.in/vellore/register",
  Bhopal: "https://events.vit.ac.in/bhopal/register",
  Amaravati: "https://events.vit.ac.in/amaravati/register"
};

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  registrationLink: string;
  organizer: string;
  studentCoordinator: string;
  studentContact: string;
  facultyCoordinator: string;
  facultyContact: string;
  posterUrl?: string;
}

const Events = () => {
  const { profileType, campus } = useProfile();
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Tech Symposium 2023',
      description: 'Annual technical symposium featuring competitions, workshops, and guest lectures.',
      date: '2023-11-15',
      time: '09:00 AM',
      venue: 'Main Auditorium',
      registrationLink: 'https://events.vit.ac.in/register',
      organizer: 'School of Computer Science',
      studentCoordinator: 'Rahul Sharma',
      studentContact: '9876543210',
      facultyCoordinator: 'Dr. Priya Venkat',
      facultyContact: 'priya.venkat@vit.ac.in',
      posterUrl: ''
    },
    {
      id: '2',
      title: 'Cultural Fest',
      description: 'Annual cultural festival with music, dance, and drama performances.',
      date: '2023-12-10',
      time: '05:00 PM',
      venue: 'Open Air Theatre',
      registrationLink: 'https://events.vit.ac.in/register',
      organizer: 'Student Cultural Committee',
      studentCoordinator: 'Ananya Patel',
      studentContact: '8765432109',
      facultyCoordinator: 'Dr. Ramesh Kumar',
      facultyContact: 'ramesh.kumar@vit.ac.in',
      posterUrl: ''
    },
  ]);
  
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    registrationLink: campus ? registrationLinks[campus] : '',
    organizer: '',
    studentCoordinator: '',
    studentContact: '',
    facultyCoordinator: '',
    facultyContact: '',
    posterUrl: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const addEvent = () => {
    // Validate fields
    if (!newEvent.title || !newEvent.date || !newEvent.venue || !newEvent.registrationLink) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newEventWithId = {
      ...newEvent,
      id: `${Date.now()}`,
    };

    setEvents(prev => [...prev, newEventWithId]);
    setOpenDialog(false);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      venue: '',
      registrationLink: campus ? registrationLinks[campus] : '',
      organizer: '',
      studentCoordinator: '',
      studentContact: '',
      facultyCoordinator: '',
      facultyContact: '',
      posterUrl: ''
    });

    toast({
      title: "Event Added",
      description: "The event has been added successfully",
    });
  };

  return (
    <div className="vnex-container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Calendar className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold">College Events</h1>
          </div>
          
          {profileType === 'faculty' && (
            <Button 
              onClick={() => setOpenDialog(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          )}
        </div>

        {!campus && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <p className="text-yellow-700">
              Please select a campus in your profile to see campus-specific events.
            </p>
          </div>
        )}
        
        {events.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600">No events found</h3>
            <p className="text-gray-500 mt-2">
              {profileType === 'faculty' 
                ? 'Click "Add Event" to create the first event.' 
                : 'There are no upcoming events at this time.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {events.map(event => (
              <div key={event.id} className="vnex-card hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold">{event.title}</h2>
                  <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                </div>
                
                <p className="text-gray-600 mt-2">{event.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <Clock className="h-4 w-4" /> Time
                    </h3>
                    <p>{event.time}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> Venue
                    </h3>
                    <p>{event.venue}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <Building className="h-4 w-4" /> Organizer
                    </h3>
                    <p>{event.organizer}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <LinkIcon className="h-4 w-4" /> Registration
                    </h3>
                    <a 
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline flex items-center gap-1"
                    >
                      Register Here
                    </a>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <User className="h-4 w-4" /> Student Coordinator
                      </h3>
                      <p>{event.studentCoordinator}</p>
                      <p className="text-sm text-gray-500">{event.studentContact}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <User className="h-4 w-4" /> Faculty Coordinator
                      </h3>
                      <p>{event.facultyCoordinator}</p>
                      <p className="text-sm text-gray-500">{event.facultyContact}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Event Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Create a new event for students to participate in.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div>
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                placeholder="e.g., Annual Tech Symposium"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                placeholder="Describe the event..."
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={newEvent.date}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={newEvent.time}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="venue">Venue *</Label>
              <select
                id="venue"
                name="venue"
                value={newEvent.venue}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select a venue</option>
                {campus && campusVenues[campus].map((venue, index) => (
                  <option key={index} value={venue}>{venue}</option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor="organizer">Organizing Club/Department *</Label>
              <Input
                id="organizer"
                name="organizer"
                value={newEvent.organizer}
                onChange={handleInputChange}
                placeholder="e.g., School of Computer Science"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentCoordinator">Student Coordinator *</Label>
                <Input
                  id="studentCoordinator"
                  name="studentCoordinator"
                  value={newEvent.studentCoordinator}
                  onChange={handleInputChange}
                  placeholder="Student Coordinator Name"
                />
              </div>
              
              <div>
                <Label htmlFor="studentContact">Contact Number</Label>
                <Input
                  id="studentContact"
                  name="studentContact"
                  value={newEvent.studentContact}
                  onChange={handleInputChange}
                  placeholder="Student Contact Number"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="facultyCoordinator">Faculty Coordinator *</Label>
                <Input
                  id="facultyCoordinator"
                  name="facultyCoordinator"
                  value={newEvent.facultyCoordinator}
                  onChange={handleInputChange}
                  placeholder="Faculty Coordinator Name"
                />
              </div>
              
              <div>
                <Label htmlFor="facultyContact">Contact Email</Label>
                <Input
                  id="facultyContact"
                  name="facultyContact"
                  value={newEvent.facultyContact}
                  onChange={handleInputChange}
                  placeholder="Faculty Email"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="registrationLink">Registration Link *</Label>
              <Input
                id="registrationLink"
                name="registrationLink"
                value={newEvent.registrationLink}
                onChange={handleInputChange}
                placeholder="https://example.com/register"
              />
              {campus && (
                <p className="text-xs text-gray-500 mt-1">
                  Default registration link: {registrationLinks[campus]}
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="posterUpload">Event Poster</Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="posterUpload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500"
                    >
                      <span>Upload poster</span>
                      <input id="posterUpload" name="posterUpload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={addEvent}>Add Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;
