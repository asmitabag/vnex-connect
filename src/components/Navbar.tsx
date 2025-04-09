
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Home, MessageSquare, MapPin, Search, Car, Calendar, MapPinOff, Building, AlertCircle } from 'lucide-react';
import ProfileSelector from './ProfileSelector';
import { useProfile } from '../contexts/ProfileContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { profileType } = useProfile();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Tab color mapping with professional color choices
  const getTabColor = (path) => {
    const colorMap = {
      '/': 'text-primary-600 hover:text-primary-800',
      '/hostel-complaints': 'text-blue-600 hover:text-blue-800',
      '/mess-complaints': 'text-emerald-600 hover:text-emerald-800',
      '/stray-animal': 'text-amber-600 hover:text-amber-800',
      '/medical-emergency': 'text-red-600 hover:text-red-800',
      '/places-nearby': 'text-indigo-600 hover:text-indigo-800',
      '/lost-found': 'text-orange-600 hover:text-orange-800',
      '/cab-partner': 'text-cyan-600 hover:text-cyan-800',
      '/academic-notes': 'text-violet-600 hover:text-violet-800',
      '/events': 'text-rose-600 hover:text-rose-800',
    };
    
    return location.pathname === path 
      ? `${colorMap[path]} font-medium` 
      : 'text-gray-700 hover:' + (colorMap[path] || 'text-primary-600');
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
                className={`flex items-center space-x-1 transition-colors ${getTabColor(item.path)}`}
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
                      className={`flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-50 ${getTabColor(item.path)}`}
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
                className={`flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-md ${getTabColor(item.path)}`}
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
