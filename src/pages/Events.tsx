
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Filter, Search, Tag } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  category: 'technical' | 'cultural' | 'sports' | 'workshop' | 'webinar';
  imageUrl: string;
  registrationUrl?: string;
}

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const events: Event[] = [
    {
      id: '1',
      title: 'Gravitas Technical Fest',
      description: 'The annual technical fest of VIT featuring coding competitions, robotics challenges, and technical exhibitions.',
      date: '2023-10-20',
      time: '9:00 AM - 6:00 PM',
      location: 'Technology Tower, VIT Campus',
      organizer: 'VIT Technical Club',
      category: 'technical',
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=500&auto=format&fit=crop',
      registrationUrl: '#'
    },
    {
      id: '2',
      title: 'Riviera Cultural Festival',
      description: 'Annual cultural festival showcasing dance, music, and art performances from students across the country.',
      date: '2023-11-15',
      time: '10:00 AM - 10:00 PM',
      location: 'Open Air Theatre, VIT Campus',
      organizer: 'VIT Cultural Committee',
      category: 'cultural',
      imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop',
      registrationUrl: '#'
    },
    {
      id: '3',
      title: 'Inter-University Cricket Tournament',
      description: 'Cricket tournament featuring teams from various universities across India competing for the championship.',
      date: '2023-10-25',
      time: '8:00 AM - 5:00 PM',
      location: 'VIT Cricket Ground',
      organizer: 'VIT Sports Department',
      category: 'sports',
      imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=500&auto=format&fit=crop',
      registrationUrl: '#'
    },
    {
      id: '4',
      title: 'AI & Machine Learning Workshop',
      description: 'Hands-on workshop on artificial intelligence and machine learning technologies with industry experts.',
      date: '2023-10-18',
      time: '2:00 PM - 5:00 PM',
      location: 'TT Building, Room 401',
      organizer: 'VIT AI Club',
      category: 'workshop',
      imageUrl: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=500&auto=format&fit=crop',
      registrationUrl: '#'
    },
    {
      id: '5',
      title: 'Career Opportunities in Data Science',
      description: 'Online webinar discussing career paths and opportunities in the field of data science.',
      date: '2023-10-15',
      time: '6:00 PM - 7:30 PM',
      location: 'Online (Zoom)',
      organizer: 'VIT Career Development Cell',
      category: 'webinar',
      imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=500&auto=format&fit=crop',
      registrationUrl: '#'
    },
    {
      id: '6',
      title: 'Annual Alumni Meet',
      description: 'Networking event for VIT alumni to connect with current students and faculty members.',
      date: '2023-11-05',
      time: '11:00 AM - 3:00 PM',
      location: 'Convention Center, VIT',
      organizer: 'VIT Alumni Association',
      category: 'cultural',
      imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=500&auto=format&fit=crop',
      registrationUrl: '#'
    }
  ];

  // Filter events based on search term and category
  const filteredEvents = events.filter(event => {
    const matchesSearch = !searchTerm || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filterCategory || event.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort events by date (upcoming first)
  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="vnex-container py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Campus Events</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search events..."
            className="pl-10 vnex-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative w-full">
            <select
              className="vnex-input pl-8 pr-4 appearance-none"
              value={filterCategory || ''}
              onChange={(e) => setFilterCategory(e.target.value || null)}
            >
              <option value="">All Categories</option>
              <option value="technical">Technical</option>
              <option value="cultural">Cultural</option>
              <option value="sports">Sports</option>
              <option value="workshop">Workshop</option>
              <option value="webinar">Webinar</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div className="flex border rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-primary-100 text-primary-700' : 'bg-white'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-primary-100 text-primary-700' : 'bg-white'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {sortedEvents.length === 0 ? (
        <div className="vnex-card text-center py-8">
          <p className="text-gray-500">No events found. Try adjusting your filters.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map(event => (
            <div key={event.id} className="vnex-card hover:shadow-lg transition-all overflow-hidden">
              <div className="h-48 w-full overflow-hidden">
                <img 
                  src={event.imageUrl} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(event.category)}`}>
                      {getCategoryLabel(event.category)}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="ml-1 text-xs font-medium text-gray-500">
                      {formatDate(event.date)}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mt-2">{event.title}</h3>
                
                <p className="text-gray-600 text-sm mt-1 line-clamp-3">
                  {event.description}
                </p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.organizer}</span>
                  </div>
                </div>
                
                {event.registrationUrl && (
                  <div className="mt-4">
                    <a 
                      href={event.registrationUrl} 
                      className="block w-full text-center py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                    >
                      Register Now
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedEvents.map(event => (
            <div key={event.id} className="vnex-card hover:shadow-lg transition-all">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/4 h-40 md:h-auto overflow-hidden">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                
                <div className="w-full md:w-3/4 p-4 md:p-0">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(event.category)}`}>
                        {getCategoryLabel(event.category)}
                      </span>
                      <h3 className="font-semibold text-lg mt-2">{event.title}</h3>
                    </div>
                    
                    <div className="flex items-center mt-2 md:mt-0">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="ml-1 text-sm font-medium text-gray-500">
                        {formatDate(event.date)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mt-2">
                    {event.description}
                  </p>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.organizer}</span>
                    </div>
                  </div>
                  
                  {event.registrationUrl && (
                    <div className="mt-4">
                      <a 
                        href={event.registrationUrl} 
                        className="py-1.5 px-4 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors inline-block"
                      >
                        Register Now
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function getCategoryLabel(category: string): string {
  switch (category) {
    case 'technical': return 'Technical';
    case 'cultural': return 'Cultural';
    case 'sports': return 'Sports';
    case 'workshop': return 'Workshop';
    case 'webinar': return 'Webinar';
    default: return category;
  }
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'technical': return 'bg-blue-100 text-blue-800';
    case 'cultural': return 'bg-purple-100 text-purple-800';
    case 'sports': return 'bg-green-100 text-green-800';
    case 'workshop': return 'bg-orange-100 text-orange-800';
    case 'webinar': return 'bg-teal-100 text-teal-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short',
    month: 'short', 
    day: 'numeric' 
  });
}

export default Events;
