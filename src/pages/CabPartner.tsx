
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { Clock, MapPin, User, Calendar, X, MessageCircle, Phone } from 'lucide-react';

interface TripRequest {
  id: string;
  type: 'airport' | 'railway' | 'bus';
  destination: string;
  date: string;
  time: string;
  name: string;
  contact: string;
  contactType: 'whatsapp' | 'phone';
  seats: number;
  notes: string;
  createdAt: string;
}

const CabPartner = () => {
  const { toast } = useToast();
  const [tripRequests, setTripRequests] = useState<TripRequest[]>([
    {
      id: '1',
      type: 'airport',
      destination: 'Chennai International Airport',
      date: '2023-06-10',
      time: '14:30',
      name: 'Rishi Garg',
      contact: '9876543210',
      contactType: 'whatsapp',
      seats: 2,
      notes: 'Flight at 17:30, prefer to reach 2 hours early',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      type: 'railway',
      destination: 'Chennai Central Railway Station',
      date: '2023-06-12',
      time: '08:00',
      name: 'Preksha Chawla',
      contact: '9876543211',
      contactType: 'phone',
      seats: 1,
      notes: 'Train departure at 10:15 AM, have luggage',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  const [activeFilter, setActiveFilter] = useState<'all' | 'airport' | 'railway' | 'bus'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Omit<TripRequest, 'id' | 'createdAt'>>({
    type: 'airport',
    destination: '',
    date: '',
    time: '',
    name: '',
    contact: '',
    contactType: 'whatsapp',
    seats: 1,
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.destination.trim()) {
      toast({
        title: "Missing destination",
        description: "Please specify your destination",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.date) {
      toast({
        title: "Missing date",
        description: "Please select travel date",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.time) {
      toast({
        title: "Missing time",
        description: "Please select travel time",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.name.trim()) {
      toast({
        title: "Missing name",
        description: "Please provide your name",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.contact.trim()) {
      toast({
        title: "Missing contact",
        description: "Please provide your contact information",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newRequest: TripRequest = {
        ...formData,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };
      
      setTripRequests(prevRequests => [newRequest, ...prevRequests]);
      
      // Reset form
      setFormData({
        type: 'airport',
        destination: '',
        date: '',
        time: '',
        name: '',
        contact: '',
        contactType: 'whatsapp',
        seats: 1,
        notes: '',
      });
      
      setIsSubmitting(false);
      setIsModalOpen(false);
      
      toast({
        title: "Trip posted",
        description: "Your cab sharing request has been posted successfully!",
      });
    }, 1000);
  };

  const handleDelete = (id: string) => {
    setTripRequests(prevRequests => prevRequests.filter(request => request.id !== id));
    toast({
      title: "Trip removed",
      description: "Your cab sharing request has been removed",
    });
  };

  const filteredRequests = tripRequests.filter(request => {
    if (activeFilter === 'all') return true;
    return request.type === activeFilter;
  });

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'airport': return 'Airport';
      case 'railway': return 'Railway Station';
      case 'bus': return 'Bus Terminal';
      default: return type;
    }
  };

  return (
    <div className="vnex-container py-8">
      <h1 className="vnex-heading">Cab Partner Finder</h1>
      <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
        Find partners to share a cab with for airport, railway station, or bus terminal trips.
        Split the fare and make travel more affordable.
      </p>
      
      {/* Main content */}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                activeFilter === 'all' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Trips
            </button>
            <button
              onClick={() => setActiveFilter('airport')}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                activeFilter === 'airport' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Airport
            </button>
            <button
              onClick={() => setActiveFilter('railway')}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                activeFilter === 'railway' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Railway
            </button>
            <button
              onClick={() => setActiveFilter('bus')}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                activeFilter === 'bus' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bus
            </button>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="vnex-button-primary whitespace-nowrap"
          >
            Post Trip
          </button>
        </div>
        
        {/* Trip requests list */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="vnex-card text-center py-8">
              <p className="text-gray-500">No trip requests found in this category.</p>
            </div>
          ) : (
            filteredRequests.map(request => (
              <div 
                key={request.id}
                className={`vnex-card border-l-4 ${
                  request.type === 'airport' ? 'border-l-blue-500' : 
                  request.type === 'railway' ? 'border-l-green-500' : 
                  'border-l-amber-500'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      request.type === 'airport' ? 'bg-blue-100 text-blue-800' : 
                      request.type === 'railway' ? 'bg-green-100 text-green-800' : 
                      'bg-amber-100 text-amber-800'
                    } mb-2`}>
                      {getTypeLabel(request.type)}
                    </span>
                    <h3 className="font-semibold text-lg">{request.destination}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mt-1">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(request.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{request.time}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>{request.seats} {request.seats === 1 ? 'seat' : 'seats'}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(request.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Remove Request"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {request.notes && (
                  <p className="mt-3 text-gray-700">{request.notes}</p>
                )}
                
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Contact: {request.name}</p>
                    <div className="flex items-center mt-1">
                      {request.contactType === 'whatsapp' ? (
                        <MessageCircle className="w-4 h-4 text-green-600 mr-2" />
                      ) : (
                        <Phone className="w-4 h-4 text-blue-600 mr-2" />
                      )}
                      <span className="text-sm">{request.contact}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Posted {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Modal for adding a new trip request */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Post Cab Sharing Request</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="type" className="vnex-label">Destination Type</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="vnex-input"
                  >
                    <option value="airport">Airport</option>
                    <option value="railway">Railway Station</option>
                    <option value="bus">Bus Terminal</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="destination" className="vnex-label">Specific Destination</label>
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="e.g., Chennai International Airport, Chennai Central"
                    className="vnex-input"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="vnex-label">Travel Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="vnex-input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="vnex-label">Departure Time</label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="vnex-input"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="name" className="vnex-label">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="vnex-input"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactType" className="vnex-label">Contact Method</label>
                    <select
                      id="contactType"
                      name="contactType"
                      value={formData.contactType}
                      onChange={handleChange}
                      className="vnex-input"
                    >
                      <option value="whatsapp">WhatsApp</option>
                      <option value="phone">Phone</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="contact" className="vnex-label">Contact Number</label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className="vnex-input"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="seats" className="vnex-label">Number of Seats</label>
                  <select
                    id="seats"
                    name="seats"
                    value={formData.seats}
                    onChange={handleChange}
                    className="vnex-input"
                  >
                    {[1, 2, 3, 4].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="notes" className="vnex-label">Additional Notes (Optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any additional information about your travel plans"
                    className="vnex-input"
                  />
                </div>
                
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="vnex-button-secondary mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="vnex-button-primary"
                  >
                    {isSubmitting ? 'Posting...' : 'Post Request'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CabPartner;
