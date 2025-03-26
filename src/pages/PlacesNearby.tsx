
import React from 'react';
import { useProfile } from '../contexts/ProfileContext';
import { MapPin, Coffee, Utensils, Book, Building, Hotel, ShoppingBag, Phone, Eye, Scissors } from 'lucide-react';

// Define campus-specific places
const campusPlaces = {
  Chennai: [
    { 
      name: 'VR Mall', 
      category: 'Shopping', 
      distance: '3.5 km', 
      icon: <ShoppingBag className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      name: 'Phoenix Market City', 
      category: 'Shopping', 
      distance: '7 km', 
      icon: <ShoppingBag className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=2069&auto=format&fit=crop'
    },
    { 
      name: 'Murugan Idli Shop', 
      category: 'Food', 
      distance: '2 km', 
      icon: <Utensils className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      name: 'Adyar Ananda Bhavan', 
      category: 'Food', 
      distance: '1.5 km', 
      icon: <Utensils className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      name: 'Starbucks Sholinganallur', 
      category: 'Cafe', 
      distance: '4 km', 
      icon: <Coffee className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1932&auto=format&fit=crop'
    },
    { 
      name: 'ITC Grand Chola', 
      category: 'Hotel', 
      distance: '10 km', 
      icon: <Hotel className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      name: 'OMR Public Library', 
      category: 'Study', 
      distance: '5 km', 
      icon: <Book className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      name: 'Quick Mobile Repairs', 
      category: 'Phone Repair', 
      distance: '2.3 km', 
      icon: <Phone className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop'
    },
    { 
      name: 'Vision Plus Opticals', 
      category: 'Eyewear', 
      distance: '3.1 km', 
      icon: <Eye className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1601821765780-754fa98637c1?q=80&w=2071&auto=format&fit=crop'
    },
    { 
      name: 'OMR Designer Tailors', 
      category: 'Tailor', 
      distance: '2.8 km', 
      icon: <Scissors className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1937&auto=format&fit=crop'
    }
  ],
  Vellore: [
    { 
      name: 'Vellore Fort', 
      category: 'Tourist', 
      distance: '8 km', 
      icon: <Building className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1596294532949-854a3b9c41b7?q=80&w=1974&auto=format&fit=crop'
    },
    { 
      name: 'CMC Hospital', 
      category: 'Healthcare', 
      distance: '6 km', 
      icon: <Building className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop'
    },
    { 
      name: "Hundred\"s Heritage", 
      category: 'Food', 
      distance: '5 km', 
      icon: <Utensils className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop'
    },
    { 
      name: 'Adayar Ananda Bhavan', 
      category: 'Food', 
      distance: '4 km', 
      icon: <Utensils className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop'
    },
    { 
      name: 'Cafe Coffee Day', 
      category: 'Cafe', 
      distance: '3 km', 
      icon: <Coffee className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1978&auto=format&fit=crop'
    },
    { 
      name: 'Fortune Park', 
      category: 'Hotel', 
      distance: '7 km', 
      icon: <Hotel className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      name: 'Gandhi Road Market', 
      category: 'Shopping', 
      distance: '6.5 km', 
      icon: <ShoppingBag className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=2074&auto=format&fit=crop'
    },
    { 
      name: 'Vellore Mobile World', 
      category: 'Phone Repair', 
      distance: '5.2 km', 
      icon: <Phone className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      name: 'Lens & Frames', 
      category: 'Eyewear', 
      distance: '4.8 km', 
      icon: <Eye className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      name: 'Vellore Fashion Tailors', 
      category: 'Tailor', 
      distance: '5.5 km', 
      icon: <Scissors className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop'
    }
  ],
  Bhopal: [
    { 
      name: 'DB Mall', 
      category: 'Shopping', 
      distance: '12 km', 
      icon: <ShoppingBag className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      name: 'New Market', 
      category: 'Shopping', 
      distance: '10 km', 
      icon: <ShoppingBag className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      name: 'Bapu Ki Kutia', 
      category: 'Food', 
      distance: '8 km', 
      icon: <Utensils className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      name: 'Under The Mango Tree', 
      category: 'Food', 
      distance: '7 km', 
      icon: <Utensils className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      name: 'Indian Coffee House', 
      category: 'Cafe', 
      distance: '9 km', 
      icon: <Coffee className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1932&auto=format&fit=crop'
    },
    { 
      name: 'Jehan Numa Palace', 
      category: 'Hotel', 
      distance: '15 km', 
      icon: <Hotel className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      name: 'Regional Science Centre', 
      category: 'Education', 
      distance: '11 km', 
      icon: <Book className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      name: 'Mobile Care Center', 
      category: 'Phone Repair', 
      distance: '9.5 km', 
      icon: <Phone className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop'
    },
    { 
      name: 'New Vision Opticals', 
      category: 'Eyewear', 
      distance: '8.2 km', 
      icon: <Eye className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1601821765780-754fa98637c1?q=80&w=2071&auto=format&fit=crop'
    },
    { 
      name: 'MP Handloom Tailors', 
      category: 'Tailor', 
      distance: '10.3 km', 
      icon: <Scissors className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1937&auto=format&fit=crop'
    }
  ],
  Amaravati: [
    { 
      name: 'PVP Mall', 
      category: 'Shopping', 
      distance: '15 km', 
      icon: <ShoppingBag className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      name: 'RK Beach', 
      category: 'Tourist', 
      distance: '20 km', 
      icon: <Building className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop'
    },
    { 
      name: 'Raju Gari Dhaba', 
      category: 'Food', 
      distance: '5 km', 
      icon: <Utensils className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      name: 'Barbeque Nation', 
      category: 'Food', 
      distance: '12 km', 
      icon: <Utensils className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop'
    },
    { 
      name: 'Cafe Coffee Day', 
      category: 'Cafe', 
      distance: '8 km', 
      icon: <Coffee className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1932&auto=format&fit=crop'
    },
    { 
      name: 'The Gateway Hotel', 
      category: 'Hotel', 
      distance: '18 km', 
      icon: <Hotel className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      name: 'Andhra University', 
      category: 'Education', 
      distance: '16 km', 
      icon: <Book className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1974&auto=format&fit=crop'
    },
    { 
      name: 'Cell Tech Solutions', 
      category: 'Phone Repair', 
      distance: '7.2 km', 
      icon: <Phone className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop'
    },
    { 
      name: 'Andhra Optics', 
      category: 'Eyewear', 
      distance: '9.5 km', 
      icon: <Eye className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1601821765780-754fa98637c1?q=80&w=2071&auto=format&fit=crop'
    },
    { 
      name: 'Amaravati Tailors', 
      category: 'Tailor', 
      distance: '11 km', 
      icon: <Scissors className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1937&auto=format&fit=crop'
    }
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
                <div key={index} className="vnex-card hover:shadow-md transition-shadow overflow-hidden">
                  {place.image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={place.image} 
                        alt={place.name} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4">
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
