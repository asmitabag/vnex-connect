
import React, { useState } from 'react';
import { useProfile } from '../contexts/ProfileContext';
import { Search, Building, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Item {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  contactName: string;
  contactInfo: string;
  type: 'lost' | 'found';
}

const LostFound = () => {
  const { campus } = useProfile();
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [items, setItems] = useState<Item[]>([
    {
      id: '1',
      title: 'Lost iPhone 13 Pro',
      description: 'Lost a black iPhone 13 Pro with a clear case. Last seen in the library.',
      location: 'Library, 2nd Floor',
      date: '2023-10-15',
      contactName: 'John Smith',
      contactInfo: 'john.smith@example.com',
      type: 'lost'
    },
    {
      id: '2',
      title: 'Found Student ID Card',
      description: 'Found a student ID card near the cafeteria.',
      location: 'Main Cafeteria',
      date: '2023-10-18',
      contactName: 'Reception Desk',
      contactInfo: 'Campus Reception',
      type: 'found'
    }
  ]);
  
  const [filter, setFilter] = useState('all');
  const [newItem, setNewItem] = useState<Omit<Item, 'id'>>({
    title: '',
    description: '',
    location: '',
    date: '',
    contactName: '',
    contactInfo: '',
    type: 'lost'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const addItem = () => {
    if (!newItem.title || !newItem.description || !newItem.location || !newItem.contactName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newItemWithId = {
      ...newItem,
      id: `${Date.now()}`,
    };

    setItems(prev => [...prev, newItemWithId]);
    setOpenDialog(false);
    setNewItem({
      title: '',
      description: '',
      location: '',
      date: '',
      contactName: '',
      contactInfo: '',
      type: 'lost'
    });

    toast({
      title: "Item Added",
      description: "Your lost/found item has been added successfully",
    });
  };

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.type === filter);

  return (
    <div className="vnex-container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Search className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold">Lost & Found</h1>
          </div>
          
          <Button 
            onClick={() => setOpenDialog(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Report Item
          </Button>
        </div>

        {!campus && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <p className="text-yellow-700">
              Please select a campus in your profile to see lost and found items for your campus.
            </p>
          </div>
        )}
        
        <div className="flex gap-4 mb-6">
          <Button 
            variant={filter === 'all' ? "default" : "outline"} 
            onClick={() => setFilter('all')}
          >
            All Items
          </Button>
          <Button 
            variant={filter === 'lost' ? "default" : "outline"} 
            onClick={() => setFilter('lost')}
          >
            Lost Items
          </Button>
          <Button 
            variant={filter === 'found' ? "default" : "outline"} 
            onClick={() => setFilter('found')}
          >
            Found Items
          </Button>
        </div>
        
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600">No items found</h3>
            <p className="text-gray-500 mt-2">
              {filter === 'all' 
                ? 'There are no lost or found items reported yet.' 
                : `There are no ${filter} items reported yet.`}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="vnex-card hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-sm font-medium ${
                        item.type === 'lost' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {item.type === 'lost' ? 'Lost' : 'Found'}
                      </span>
                      <h2 className="text-xl font-semibold">{item.title}</h2>
                    </div>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                    <p>{item.location}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                    <p>{item.contactName}: {item.contactInfo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Item Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Report Lost or Found Item</DialogTitle>
            <DialogDescription>
              Provide details about the lost or found item to help others.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="title">Item Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={newItem.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Lost Wallet, Found Keys"
                />
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newItem.description}
                  onChange={handleInputChange}
                  placeholder="Describe the item and provide any distinguishing features..."
                  rows={3}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type *</Label>
                <select
                  id="type"
                  name="type"
                  value={newItem.type}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="lost">Lost</option>
                  <option value="found">Found</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={newItem.date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                name="location"
                value={newItem.location}
                onChange={handleInputChange}
                placeholder="e.g., Library, Cafeteria, Academic Block"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactName">Contact Name *</Label>
                <Input
                  id="contactName"
                  name="contactName"
                  value={newItem.contactName}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <Label htmlFor="contactInfo">Contact Information *</Label>
                <Input
                  id="contactInfo"
                  name="contactInfo"
                  value={newItem.contactInfo}
                  onChange={handleInputChange}
                  placeholder="Email or Phone Number"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={addItem}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LostFound;
