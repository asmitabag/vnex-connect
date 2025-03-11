
import React, { useState } from 'react';
import { MapPin, Calendar, Clock, User, Phone, ChevronDown, ChevronUp, Search, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TripRequest {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  name: string;
  contactNumber: string;
  totalSeats: number;
  availableSeats: number;
  notes?: string;
  createdAt: string;
}

const CabPartner = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Omit<TripRequest, 'id' | 'createdAt'>>({
    from: '',
    to: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    name: '',
    contactNumber: '',
    totalSeats: 4,
    availableSeats: 3,
    notes: ''
  });

  const [trips, setTrips] = useState<TripRequest[]>([
    {
      id: '1',
      from: 'VIT Main Gate',
      to: 'Chennai Airport',
      date: '2023-10-25',
      time: '14:00',
      name: 'Rishi Garg',
      contactNumber: '9876543210',
      totalSeats: 4,
      availableSeats: 2,
      notes: 'Will be leaving at 2 PM sharp. Fare will be split equally.',
      createdAt: '2023-10-20T10:30:00Z'
    },
    {
      id: '2',
      from: 'Chennai Central',
      to: 'VIT Campus',
      date: '2023-10-26',
      time: '09:30',
      name: 'Asmita Bag',
      contactNumber: '8765432109',
      totalSeats: 4,
      availableSeats: 3,
      createdAt: '2023-10-20T11:45:00Z'
    },
    {
      id: '3',
      from: 'VIT Campus',
      to: 'Vellore Bus Stand',
      date: '2023-10-24',
      time: '18:00',
      name: 'Naman Sharma',
      contactNumber: '7654321098',
      totalSeats: 4,
      availableSeats: 1,
      notes: 'Will be sharing Uber. Payment through UPI.',
      createdAt: '2023-10-19T15:20:00Z'
    },
    {
      id: '4',
      from: 'Katpadi Railway Station',
      to: 'VIT Campus',
      date: '2023-10-23',
      time: '21:30',
      name: 'Trisha Singh',
      contactNumber: '6543210987',
      totalSeats: 4,
      availableSeats: 2,
      createdAt: '2023-10-19T09:15:00Z'
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'totalSeats' || name === 'availableSeats' ? parseInt(value) : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!formData.from || !formData.to || !formData.date || !formData.time || !formData.name || !formData.contactNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.availableSeats >= formData.totalSeats) {
      toast({
        title: "Error",
        description: "Available seats must be less than total seats",
        variant: "destructive"
      });
      return;
    }
    
    const newTrip: TripRequest = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    setTrips([newTrip, ...trips]);
    setShowForm(false);
    
    // Reset form
    setFormData({
      from: '',
      to: '',
      date: new Date().toISOString().split('T')[0],
      time: '',
      name: '',
      contactNumber: '',
      totalSeats: 4,
      availableSeats: 3,
      notes: ''
    });
    
    toast({
      title: "Success",
      description: "Your trip has been posted successfully!",
    });
  };

  const handleJoinTrip = (id: string) => {
    setTrips(
      trips.map(trip => 
        trip.id === id && trip.availableSeats > 0
          ? { ...trip, availableSeats: trip.availableSeats - 1 }
          : trip
      )
    );
    
    const trip = trips.find(t => t.id === id);
    if (trip && trip.availableSeats > 0) {
      toast({
        title: "Request Sent",
        description: `Your request to join the trip to ${trip.to} has been sent to ${trip.name}. They will contact you shortly.`,
      });
    }
  };

  // Filter trips based on search term
  const filteredTrips = trips.filter(trip => {
    if (!searchTerm) return true;
    return (
      trip.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (trip.notes && trip.notes.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Sort trips by date (upcoming first)
  const sortedTrips = [...filteredTrips].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`).getTime();
    const dateB = new Date(`${b.date}T${b.time}`).getTime();
    return dateA - dateB;
  });

  return (
    <div className="vnex-container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Cab Partner</h1>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="vnex-button-primary flex items-center gap-2"
        >
          {showForm ? (
            <>
              <ChevronUp className="w-5 h-5" />
              <span>Cancel</span>
            </>
          ) : (
            <>
              <Users className="w-5 h-5" />
              <span>Post a Trip</span>
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="mb-8 vnex-card animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Post a Trip</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="vnex-label">From*</label>
                <input 
                  type="text"
                  name="from"
                  value={formData.from}
                  onChange={handleInputChange}
                  placeholder="Starting point"
                  className="vnex-input"
                  required
                />
              </div>
              
              <div>
                <label className="vnex-label">To*</label>
                <input 
                  type="text"
                  name="to"
                  value={formData.to}
                  onChange={handleInputChange}
                  placeholder="Destination"
                  className="vnex-input"
                  required
                />
              </div>
              
              <div>
                <label className="vnex-label">Date*</label>
                <input 
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="vnex-input"
                  required
                />
              </div>
              
              <div>
                <label className="vnex-label">Time*</label>
                <input 
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="vnex-input"
                  required
                />
              </div>
              
              <div>
                <label className="vnex-label">Your Name*</label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="vnex-input"
                  required
                />
              </div>
              
              <div>
                <label className="vnex-label">Contact Number*</label>
                <input 
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                  className="vnex-input"
                  required
                />
              </div>
              
              <div>
                <label className="vnex-label">Total Seats</label>
                <select
                  name="totalSeats"
                  value={formData.totalSeats}
                  onChange={handleInputChange}
                  className="vnex-input"
                >
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                </select>
              </div>
              
              <div>
                <label className="vnex-label">Available Seats</label>
                <select
                  name="availableSeats"
                  value={formData.availableSeats}
                  onChange={handleInputChange}
                  className="vnex-input"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="vnex-label">Additional Notes</label>
              <textarea 
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any additional information about the trip"
                className="vnex-input"
                rows={3}
              />
            </div>
            
            <div className="flex justify-end">
              <button type="submit" className="vnex-button-primary">
                Post Trip
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by location or name..."
            className="pl-10 vnex-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {sortedTrips.length === 0 ? (
          <div className="vnex-card text-center py-8">
            <p className="text-gray-500">No trips found. Be the first to post a trip!</p>
          </div>
        ) : (
          sortedTrips.map((trip) => (
            <div key={trip.id} className="vnex-card hover:shadow-lg transition-all">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className="rounded-full bg-primary-100 p-1.5">
                      <MapPin className="h-5 w-5 text-primary-700" />
                    </div>
                    <div className="ml-2 flex items-center">
                      <span className="font-medium">{trip.from}</span>
                      <span className="mx-2 text-gray-400">→</span>
                      <span className="font-medium">{trip.to}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{formatDate(trip.date)}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{formatTime(trip.time)}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span>{trip.name}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{trip.contactNumber}</span>
                    </div>
                  </div>
                  
                  {trip.notes && (
                    <div className="mb-4 text-gray-600 text-sm border-l-2 border-gray-200 pl-3">
                      {trip.notes}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col justify-between items-end mt-4 md:mt-0 md:ml-4">
                  <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
                    <Users className="h-4 w-4 mr-1.5 text-gray-600" />
                    <span className="text-sm font-medium">
                      {trip.availableSeats} / {trip.totalSeats} seats available
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleJoinTrip(trip.id)}
                    disabled={trip.availableSeats === 0}
                    className={`mt-4 px-4 py-2 rounded-md font-medium transition-colors ${
                      trip.availableSeats > 0
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {trip.availableSeats > 0 ? 'Join Trip' : 'No Seats Available'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short',
    month: 'short', 
    day: 'numeric' 
  });
}

function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

export default CabPartner;
