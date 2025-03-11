
import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

interface NearbyPlace {
  id: string;
  name: string;
  category: string;
  distance: string;
  address: string;
  description: string;
  mapLink: string;
  imageUrl: string;
}

const places: NearbyPlace[] = [
  {
    id: '1',
    name: 'Green Trends Salon',
    category: 'Services',
    distance: '2.4 km',
    address: 'Padur Main Road, Kelambakkam',
    description: 'Professional hair salon offering haircuts, styling, and other grooming services.',
    mapLink: 'https://maps.google.com',
    imageUrl: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2Fsb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '2',
    name: 'Annalakshmi Restaurant',
    category: 'Food',
    distance: '3.1 km',
    address: 'ECR Road, Kovalam',
    description: 'Popular South Indian restaurant with a variety of vegetarian options.',
    mapLink: 'https://maps.google.com',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '3',
    name: 'Titan Eye Plus',
    category: 'Eyewear',
    distance: '4.5 km',
    address: 'Sholinganallur Main Road',
    description: 'Optical store offering eye testing and a wide range of spectacles and sunglasses.',
    mapLink: 'https://maps.google.com',
    imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZXllZ2xhc3Nlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '4',
    name: 'Airtel Store',
    category: 'Mobile & Electronics',
    distance: '3.7 km',
    address: 'OMR Road, Navallur',
    description: 'Official Airtel store for SIM cards, mobile plans, and customer service.',
    mapLink: 'https://maps.google.com',
    imageUrl: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlJTIwc3RvcmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '5',
    name: 'Apollo Pharmacy',
    category: 'Healthcare',
    distance: '2.8 km',
    address: 'Kelambakkam Main Road',
    description: 'Pharmacy store with medicines, personal care products, and basic healthcare equipment.',
    mapLink: 'https://maps.google.com',
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGhhcm1hY3l8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  },
];

const categories = ['All', 'Food', 'Healthcare', 'Mobile & Electronics', 'Eyewear', 'Services'];

const PlacesNearby = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredPlaces = places.filter(place => {
    const matchesCategory = activeCategory === 'All' || place.category === activeCategory;
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          place.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="vnex-container py-8">
      <h1 className="vnex-heading">Places Near VIT Chennai</h1>
      <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
        Discover essential services and places around the campus to make your campus life easier.
        All distances are calculated from VIT Chennai, Kelambakkam.
      </p>

      {/* Search and filter */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search places..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="vnex-input"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 rounded-full text-sm ${
                  activeCategory === category 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Places list */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map(place => (
              <div key={place.id} className="vnex-card overflow-hidden flex flex-col h-full">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={place.imageUrl} 
                    alt={place.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4 flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{place.name}</h3>
                      <p className="text-sm text-gray-500">{place.category}</p>
                    </div>
                    <span className="flex items-center text-sm font-medium text-primary-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {place.distance}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-2">{place.description}</p>
                  <p className="text-sm text-gray-500 mt-2">{place.address}</p>
                </div>
                <div className="px-4 pb-4">
                  <a 
                    href={place.mapLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-2 bg-primary-50 text-primary-600 rounded-md hover:bg-primary-100 transition-colors"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 vnex-card text-center py-8">
              <p className="text-gray-500">No places found matching your criteria. Try a different search or category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlacesNearby;
