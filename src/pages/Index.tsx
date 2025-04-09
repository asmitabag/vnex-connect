
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, MessageSquare, MapPin, Search, Car, Calendar, Book, Dog } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  const handleExternalLink = (url) => {
    // Navigate to external URL
    window.location.href = url;
  };

  const features = [
    {
      icon: <MessageSquare className="w-12 h-12 text-primary-600" />,
      title: 'Hostel Complaints',
      description: 'Report issues with electricity, furniture, plumbing, and more. Track their status and resolution.',
      link: '/hostel-complaints',
      color: 'bg-purple-50',
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-primary-600" />,
      title: 'Mess Complaints',
      description: 'Share feedback about mess food quality, service, and cleanliness to improve dining experience.',
      link: '/mess-complaints',
      color: 'bg-purple-50',
    },
    {
      icon: <Dog className="w-12 h-12 text-primary-600" />,
      title: 'Stray Animal Reporting',
      description: 'Help injured or malnourished stray animals on campus by reporting them with photos.',
      link: '/stray-animal',
      color: 'bg-purple-50',
    },
    {
      icon: <MapPin className="w-12 h-12 text-primary-600" />,
      title: 'Places Nearby',
      description: 'Discover essential services like phone shops, spectacles shops, and more near VIT Chennai.',
      link: '/places-nearby',
      color: 'bg-purple-50',
    },
    {
      icon: <Search className="w-12 h-12 text-primary-600" />,
      title: 'Lost & Found',
      description: 'Lost something? Found something? Connect with the owner through our platform.',
      link: '/lost-found',
      color: 'bg-purple-50',
    },
    {
      icon: <Car className="w-12 h-12 text-primary-600" />,
      title: 'Cab Partner Finder',
      description: 'Find cab sharing partners for airport/station trips and reduce your travel costs.',
      link: '/cab-partner',
      color: 'bg-purple-50',
    },
    {
      icon: <Book className="w-12 h-12 text-primary-600" />,
      title: 'Academic Notes',
      description: 'Share and access academic notes categorized by subjects to excel in your studies.',
      link: '/academic-notes',
      color: 'bg-purple-50',
    },
    {
      icon: <Calendar className="w-12 h-12 text-primary-600" />,
      title: 'Events',
      description: 'Stay updated with upcoming events, fests, and activities organized by various clubs.',
      link: '/events',
      color: 'bg-purple-50',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-600 to-primary-800 text-white">
        <div className="vnex-container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              VIT Nexus
              <span className="block text-2xl md:text-3xl mt-2 font-normal">Connecting Students with Solutions</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              A one-stop platform to streamline campus life at VIT. Raise complaints, find resources, connect with peers, and stay updated.
            </p>
          </div>
        </div>
        
        {/* Wave Separator */}
        <div className="relative h-16 md:h-24">
          <svg className="absolute bottom-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,138.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="vnex-container py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Everything You Need in One Place
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link 
              key={index} 
              to={feature.link}
              className="vnex-card hover:shadow-lg hover:border-primary-300 group"
            >
              <div className={`${feature.color} p-4 inline-block rounded-lg mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50">
        <div className="vnex-container py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to enhance your campus experience?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join VIT Nexus today and connect with solutions to make your college life easier and better.
            </p>
            <button 
              onClick={() => handleExternalLink('https://vitchennaievents.com/conf1/')}
              className="vnex-button-primary"
            >
              Register Here
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="vnex-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">VIT Nexus</h2>
              <p className="text-gray-400 mt-2">Connecting Students with Solutions</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/" className="hover:text-primary-400">Home</Link>
              <Link to="/hostel-complaints" className="hover:text-primary-400">Hostel Complaints</Link>
              <Link to="/mess-complaints" className="hover:text-primary-400">Mess Complaints</Link>
              <Link to="/places-nearby" className="hover:text-primary-400">Places Nearby</Link>
              <Link to="/lost-found" className="hover:text-primary-400">Lost & Found</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} VIT Nexus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
