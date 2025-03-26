
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen, Home, MessageSquare, MapPin, Search, Car, Calendar, MapPinOff, Building, AlertCircle } from 'lucide-react';
import ProfileSelector from './ProfileSelector';
import { useProfile } from '../contexts/ProfileContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { profileType } = useProfile();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Filter nav items based on profile type
  const getNavItems = () => {
    const allNavItems = [
      { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
      { name: 'Hostel Complaints', path: '/hostel-complaints', icon: <MessageSquare className="w-5 h-5" /> },
      { name: 'Mess Complaints', path: '/mess-complaints', icon: <MessageSquare className="w-5 h-5" /> },
      { name: 'Stray Animal', path: '/stray-animal', icon: <MapPinOff className="w-5 h-5" /> },
      { name: 'Medical Emergency', path: '/medical-emergency', icon: <AlertCircle className="w-5 h-5" /> },
      { name: 'Places Nearby', path: '/places-nearby', icon: <MapPin className="w-5 h-5" /> },
      { name: 'Lost & Found', path: '/lost-found', icon: <Search className="w-5 h-5" /> },
      { name: 'Cab Partner', path: '/cab-partner', icon: <Car className="w-5 h-5" /> },
      { name: 'Academic Notes', path: '/academic-notes', icon: <BookOpen className="w-5 h-5" /> },
      { name: 'Events', path: '/events', icon: <Calendar className="w-5 h-5" /> },
    ];

    if (profileType === 'hospital') {
      return allNavItems.filter(item => 
        item.path === '/' || 
        item.path === '/stray-animal' || 
        item.path === '/medical-emergency'
      );
    }

    return allNavItems;
  };

  const navItems = getNavItems();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="vnex-container">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              VNex
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            {navItems.length > 5 && (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors">
                  <span>More</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-50">
                  {navItems.slice(5).map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ProfileSelector />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-primary-600 focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="p-3">
              <ProfileSelector />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
