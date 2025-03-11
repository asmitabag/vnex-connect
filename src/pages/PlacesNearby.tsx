
import React from 'react';
import { MapPin, Coffee, ShoppingBag, Utensils } from 'lucide-react';

interface NearbyPlace {
  id: string;
  name: string;
  category: 'cafe' | 'restaurant' | 'shopping' | 'convenience';
  distance: string;
  address: string;
  rating: number;
  imageUrl: string;
}

const PlacesNearby = () => {
  const places: NearbyPlace[] = [
    {
      id: '1',
      name: 'Amul Ice Cream Parlour',
      category: 'cafe',
      distance: '0.3 km',
      address: 'VIT Campus, Vellore',
      rating: 4.3,
      imageUrl: 'https://images.unsplash.com/photo-1581339486231-4a2e6fe1f91f?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: '2',
      name: 'Darling Bakery',
      category: 'cafe',
      distance: '0.5 km',
      address: 'Gandhi Road, Vellore',
      rating: 4.2,
      imageUrl: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: '3',
      name: 'Grand Krishna Restaurant',
      category: 'restaurant',
      distance: '0.7 km',
      address: 'Katpadi Road, Vellore',
      rating: 4.5,
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: '4',
      name: 'Delhi Highway Restaurant',
      category: 'restaurant',
      distance: '1.2 km',
      address: 'VIT Road, Vellore',
      rating: 4.0,
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: '5',
      name: 'Reliance Mart',
      category: 'shopping',
      distance: '1.5 km',
      address: 'Chittoor Road, Vellore',
      rating: 4.1,
      imageUrl: 'https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: '6',
      name: 'More Supermarket',
      category: 'convenience',
      distance: '0.9 km',
      address: 'Gandhi Road, Vellore',
      rating: 3.9,
      imageUrl: 'https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?q=80&w=500&auto=format&fit=crop'
    }
  ];

  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);

  const filteredPlaces = activeCategory 
    ? places.filter(place => place.category === activeCategory)
    : places;

  return (
    <div className="vnex-container py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Places Nearby</h1>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full ${activeCategory === null ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-800'}`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveCategory('cafe')}
            className={`px-4 py-2 rounded-full flex items-center gap-2 ${activeCategory === 'cafe' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-800'}`}
          >
            <Coffee size={16} />
            Cafes
          </button>
          <button 
            onClick={() => setActiveCategory('restaurant')}
            className={`px-4 py-2 rounded-full flex items-center gap-2 ${activeCategory === 'restaurant' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-800'}`}
          >
            <Utensils size={16} />
            Restaurants
          </button>
          <button 
            onClick={() => setActiveCategory('shopping')}
            className={`px-4 py-2 rounded-full flex items-center gap-2 ${activeCategory === 'shopping' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-800'}`}
          >
            <ShoppingBag size={16} />
            Shopping
          </button>
          <button 
            onClick={() => setActiveCategory('convenience')}
            className={`px-4 py-2 rounded-full flex items-center gap-2 ${activeCategory === 'convenience' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-800'}`}
          >
            <MapPin size={16} />
            Convenience
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaces.map(place => (
          <div key={place.id} className="vnex-card hover:shadow-lg transition-all">
            <div className="h-40 w-full overflow-hidden rounded-t-md">
              <img 
                src={place.imageUrl} 
                alt={place.name} 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{place.name}</h3>
              <div className="flex items-center gap-1 text-gray-600 mt-1">
                <MapPin size={16} />
                <span className="text-sm">{place.distance} • {place.address}</span>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill={i < Math.floor(place.rating) ? "currentColor" : "none"}
                      stroke="currentColor"
                      className={`w-4 h-4 ${i < Math.floor(place.rating) ? "text-yellow-500" : "text-gray-300"}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-sm font-medium">{place.rating}</span>
                </div>
                
                <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(place.category)}`}>
                  {getCategoryLabel(place.category)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function getCategoryLabel(category: string): string {
  switch (category) {
    case 'cafe': return 'Cafe';
    case 'restaurant': return 'Restaurant';
    case 'shopping': return 'Shopping';
    case 'convenience': return 'Convenience';
    default: return category;
  }
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'cafe': return 'bg-blue-100 text-blue-800';
    case 'restaurant': return 'bg-green-100 text-green-800';
    case 'shopping': return 'bg-purple-100 text-purple-800';
    case 'convenience': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export default PlacesNearby;
