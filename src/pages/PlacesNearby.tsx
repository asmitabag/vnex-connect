import React, { useState } from "react";
import { MapPin, Phone, Star, ExternalLink, Building } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Place {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  rating: number;
  distance: string;
  campus: string;
}

const PlacesNearby = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCampus, setSelectedCampus] = useState<string>("Chennai");

  const allPlaces: Place[] = [
    {
      id: "1",
      name: "Phone Hub Electronics",
      category: "electronics",
      address: "123 Main St, Kelambakkam",
      phone: "+91 9876543210",
      rating: 4.5,
      distance: "0.8 km",
      campus: "Chennai",
    },
    {
      id: "2",
      name: "Vision Spectacles",
      category: "eyewear",
      address: "45 Market Road, Kelambakkam",
      phone: "+91 9876543211",
      rating: 4.2,
      distance: "1.2 km",
      campus: "Chennai",
    },
    {
      id: "3",
      name: "Food Circle Restaurant",
      category: "food",
      address: "78 Beach Road, Kelambakkam",
      phone: "+91 9876543212",
      rating: 4.7,
      distance: "1.5 km",
      campus: "Chennai",
    },
    {
      id: "4",
      name: "Mobile World",
      category: "electronics",
      address: "56 Gandhi Road, Vellore",
      phone: "+91 9876543220",
      rating: 4.3,
      distance: "1.0 km",
      campus: "Vellore",
    },
    {
      id: "5",
      name: "Clear Vision Optical",
      category: "eyewear",
      address: "89 College Road, Vellore",
      phone: "+91 9876543221",
      rating: 4.4,
      distance: "0.5 km",
      campus: "Vellore",
    },
    {
      id: "6",
      name: "Spice Garden",
      category: "food",
      address: "34 Temple Street, Vellore",
      phone: "+91 9876543222",
      rating: 4.6,
      distance: "1.3 km",
      campus: "Vellore",
    },
    {
      id: "7",
      name: "Tech Solutions",
      category: "electronics",
      address: "12 Lake Road, Bhopal",
      phone: "+91 9876543230",
      rating: 4.1,
      distance: "1.1 km",
      campus: "Bhopal",
    },
    {
      id: "8",
      name: "Eye Care Center",
      category: "eyewear",
      address: "67 Market Street, Bhopal",
      phone: "+91 9876543231",
      rating: 4.0,
      distance: "0.7 km",
      campus: "Bhopal",
    },
    {
      id: "9",
      name: "Digital Plaza",
      category: "electronics",
      address: "23 River Road, Amaravati",
      phone: "+91 9876543240",
      rating: 4.2,
      distance: "0.9 km",
      campus: "Amaravati",
    },
    {
      id: "10",
      name: "Perfect Vision",
      category: "eyewear",
      address: "90 Hill Street, Amaravati",
      phone: "+91 9876543241",
      rating: 4.3,
      distance: "1.4 km",
      campus: "Amaravati",
    },
  ];

  const filteredPlaces = allPlaces.filter(
    (place) =>
      (selectedCategory === "all" || place.category === selectedCategory) &&
      place.campus === selectedCampus
  );

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "electronics", label: "Electronics & Mobile Shops" },
    { value: "eyewear", label: "Spectacles & Eyewear" },
    { value: "food", label: "Restaurants & Cafes" },
    { value: "medical", label: "Medical Stores" },
    { value: "stationery", label: "Stationery Shops" },
  ];

  return (
    <div className="vnex-container py-8">
      <h1 className="vnex-heading">Places Nearby</h1>
      <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
        Discover essential services and places near your VIT campus. Find phone shops,
        spectacles stores, restaurants, and more within easy reach.
      </p>

      <div className="max-w-4xl mx-auto">
        <div className="vnex-card mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="vnex-label">Select Campus</label>
              <Select value={selectedCampus} onValueChange={setSelectedCampus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select campus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Chennai">VIT Chennai</SelectItem>
                  <SelectItem value="Vellore">VIT Vellore</SelectItem>
                  <SelectItem value="Bhopal">VIT Bhopal</SelectItem>
                  <SelectItem value="Amaravati">VIT Amaravati</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="vnex-label">Filter by Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {filteredPlaces.length === 0 ? (
          <div className="vnex-card text-center py-12">
            <MapPin className="w-12 h-12 mx-auto text-gray-400" />
            <p className="mt-4 text-gray-600">
              No places found for the selected category near {selectedCampus} campus.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPlaces.map((place) => (
              <div
                key={place.id}
                className="vnex-card hover:border-primary-300 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{place.name}</h3>
                  <div className="flex items-center bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 mr-1 fill-primary-500 text-primary-500" />
                    <span>{place.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Building className="w-4 h-4 mr-1" />
                  <span>{place.campus} Campus Area</span>
                </div>

                <p className="flex items-center text-sm text-gray-600 mt-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{place.address}</span>
                  <span className="ml-2 text-primary-600">({place.distance})</span>
                </p>
                
                <p className="flex items-center text-sm text-gray-600 mt-1">
                  <Phone className="w-4 h-4 mr-1" />
                  <span>{place.phone}</span>
                </p>
                
                <a
                  href={`https://maps.google.com/?q=${place.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary-600 text-sm mt-3 hover:underline"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  <span>View on Maps</span>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacesNearby;
