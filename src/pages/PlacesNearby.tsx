
import React from 'react';
import { useProfile } from '../contexts/ProfileContext';
import { MapPin, Coffee, Utensils, Book, Building, Hotel, ShoppingBag } from 'lucide-react';

// Define campus-specific places
const campusPlaces = {
  Chennai: [
    { name: 'VR Mall', category: 'Shopping', distance: '3.5 km', icon: <ShoppingBag className="h-5 w-5" /> },
    { name: 'Phoenix Market City', category: 'Shopping', distance: '7 km', icon: <ShoppingBag className="h-5 w-5" /> },
    { name: 'Murugan Idli Shop', category: 'Food', distance: '2 km', icon: <Utensils className="h-5 w-5" /> },
    { name: 'Adyar Ananda Bhavan', category: 'Food', distance: '1.5 km', icon: <Utensils className="h-5 w-5" /> },
    { name: 'Starbucks Sholinganallur', category: 'Cafe', distance: '4 km', icon: <Coffee className="h-5 w-5" /> },
    { name: 'ITC Grand Chola', category: 'Hotel', distance: '10 km', icon: <Hotel className="h-5 w-5" /> },
    { name: 'OMR Public Library', category: 'Study', distance: '5 km', icon: <Book className="h-5 w-5" /> }
  ],
  Vellore: [
    { name: 'Vellore Fort', category: 'Tourist', distance: '8 km', icon: <Building className="h-5 w-5" /> },
    { name: 'CMC Hospital', category: 'Healthcare', distance: '6 km', icon: <Building className="h-5 w-5" /> },
    { name: "Hundred's Heritage", category: 'Food', distance: '5 km', icon: <Utensils className="h-5 w-5" /> },
    { name: 'Adayar Ananda Bhavan', category: 'Food', distance: '4 km', icon: <Utensils className="h-5 w-5" /> },
    { name: 'Cafe Coffee Day', category: 'Cafe', distance: '3 km', icon: <Coffee className="h-5 w-5" /> },
    { name: 'Fortune Park', category: 'Hotel', distance: '7 km', icon: <Hotel className="h-5 w-5" /> },
    { name: 'Gandhi Road Market', category: 'Shopping', distance: '6.5 km', icon: <ShoppingBag className="h-5 w-5" /> }
  ],
  Bhopal: [
    { name: 'DB Mall', category: 'Shopping', distance: '12 km', icon: <ShoppingBag className="h-5 w-5" /> },
    { name: 'New Market', category: 'Shopping', distance: '10 km', icon: <ShoppingBag className="h-5 w-5" /> },
    { name: 'Bapu Ki Kutia', category: 'Food', distance: '8 km', icon: <Utensils className="h-5 w-5" /> },
    { name: 'Under The Mango Tree', category: 'Food', distance: '7 km', icon: <Utensils className="h-5 w-5" /> },
    { name: 'Indian Coffee House', category: 'Cafe', distance: '9 km', icon: <Coffee className="h-5 w-5" /> },
    { name: 'Jehan Numa Palace', category: 'Hotel', distance: '15 km', icon: <Hotel className="h-5 w-5" /> },
    { name: 'Regional Science Centre', category: 'Education', distance: '11 km', icon: <Book className="h-5 w-5" /> }
  ],
  Amaravati: [
    { name: 'PVP Mall', category: 'Shopping', distance: '15 km', icon: <ShoppingBag className="h-5 w-5" /> },
    { name: 'RK Beach', category: 'Tourist', distance: '20 km', icon: <Building className="h-5 w-5" /> },
    { name: 'Raju Gari Dhaba', category: 'Food', distance: '5 km', icon: <Utensils className="h-5 w-5" /> },
    { name: 'Barbeque Nation', category: 'Food', distance: '12 km', icon: <Utensils className="h-5 w-5" /> },
    { name: 'Cafe Coffee Day', category: 'Cafe', distance: '8 km', icon: <Coffee className="h-5 w-5" /> },
    { name: 'The Gateway Hotel', category: 'Hotel', distance: '18 km', icon: <Hotel className="h-5 w-5" /> },
    { name: 'Andhra University', category: 'Education', distance: '16 km', icon: <Book className="h-5 w-5" /> }
  ]
};

const PlacesNearby = () => {
  const { campus } = useProfile();
  
  // Get places for the selected campus
  const places = campus ? campusPlaces[campus] : [];

  return (
    <div className="vnex-container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-2 mb-8">
          <MapPin className="w-8 h-8 text-primary-600" />
          <h1 className="text-3xl font-bold">Places Nearby</h1>
        </div>

        {!campus ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <p className="text-yellow-700">
              Please select a campus in your profile to see nearby places.
            </p>
          </div>
        ) : (
          <>
            <p className="text-lg mb-6">
              Discover places near VIT {campus} campus. These locations are popular among students and faculty.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {places.map((place, index) => (
                <div key={index} className="vnex-card hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    {place.icon}
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold">{place.name}</h3>
                      <div className="flex items-center text-gray-600 mt-1">
                        <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full text-sm font-medium mr-2">
                          {place.category}
                        </span>
                        <span className="text-sm">{place.distance} from campus</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlacesNearby;
