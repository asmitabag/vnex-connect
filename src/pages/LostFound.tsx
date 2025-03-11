
import React, { useState } from 'react';
import { Plus, Search, MapPin, Calendar, User, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LostFoundItem {
  id: string;
  title: string;
  description: string;
  category: 'lost' | 'found';
  location: string;
  date: string;
  contactName: string;
  contactInfo: string;
  imageUrl?: string;
  status: 'open' | 'closed';
}

const LostFound = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'lost' | 'found'>('all');
  
  const [items, setItems] = useState<LostFoundItem[]>([
    {
      id: '1',
      title: 'Lost Black Wallet',
      description: 'I lost my black leather wallet near the library. It has my ID card and some cash inside.',
      category: 'lost',
      location: 'University Library',
      date: '2023-10-15',
      contactName: 'Rishi Garg',
      contactInfo: '9876543210',
      imageUrl: 'https://images.unsplash.com/photo-1627843240167-b1f9411c4141?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdhbGxldHxlbnwwfHwwfHx8MA%3D%3D',
      status: 'open'
    },
    {
      id: '2',
      title: 'Found Water Bottle',
      description: 'Found a blue hydro flask water bottle in the MGB block classroom 403.',
      category: 'found',
      location: 'MGB Block, Room 403',
      date: '2023-10-17',
      contactName: 'Asmita Bag',
      contactInfo: '8765432109',
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2F0ZXIlMjBib3R0bGV8ZW58MHx8MHx8fDA%3D',
      status: 'open'
    },
    {
      id: '3',
      title: 'Found Calculator',
      description: 'Found a Texas Instruments scientific calculator in the TT Building.',
      category: 'found',
      location: 'Technology Tower',
      date: '2023-10-12',
      contactName: 'Trisha Singh',
      contactInfo: '7654321098',
      imageUrl: 'https://images.unsplash.com/photo-1574607383476-f517f260d30b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FsY3VsYXRvcnxlbnwwfHwwfHx8MA%3D%3D',
      status: 'open'
    },
    {
      id: '4',
      title: 'Lost Airpods',
      description: 'I lost my Apple Airpods in a white case somewhere in the food court area.',
      category: 'lost',
      location: 'Food Court',
      date: '2023-10-16',
      contactName: 'Karan Jain',
      contactInfo: '6543210987',
      imageUrl: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycG9kc3xlbnwwfHwwfHx8MA%3D%3D',
      status: 'closed'
    }
  ]);

  const [newItem, setNewItem] = useState<Omit<LostFoundItem, 'id' | 'status'>>({
    title: '',
    description: '',
    category: 'lost',
    location: '',
    date: new Date().toISOString().split('T')[0],
    contactName: '',
    contactInfo: '',
    imageUrl: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!newItem.title || !newItem.location || !newItem.contactName || !newItem.contactInfo) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const createdItem: LostFoundItem = {
      ...newItem,
      id: Date.now().toString(),
      status: 'open'
    };
    
    setItems([createdItem, ...items]);
    setShowForm(false);
    
    // Reset form
    setNewItem({
      title: '',
      description: '',
      category: 'lost',
      location: '',
      date: new Date().toISOString().split('T')[0],
      contactName: '',
      contactInfo: '',
      imageUrl: ''
    });
    
    toast({
      title: "Success",
      description: `Your ${newItem.category} item report has been submitted.`,
    });
  };

  const handleStatusToggle = (id: string) => {
    setItems(
      items.map(item => 
        item.id === id 
          ? { ...item, status: item.status === 'open' ? 'closed' : 'open' } 
          : item
      )
    );
    
    const item = items.find(item => item.id === id);
    toast({
      title: item?.status === 'open' ? "Item Closed" : "Item Reopened",
      description: `The status of "${item?.title}" has been updated.`,
    });
  };

  // Filter items based on search and tab
  const filteredItems = items
    .filter(item => {
      if (activeTab === 'all') return true;
      return item.category === activeTab;
    })
    .filter(item => {
      if (!searchTerm) return true;
      return (
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  return (
    <div className="vnex-container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Lost & Found</h1>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="vnex-button-primary flex items-center gap-2"
        >
          <Plus size={18} />
          <span>{showForm ? 'Cancel' : 'Report Item'}</span>
        </button>
      </div>

      {showForm && (
        <div className="mb-8 vnex-card animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Report an Item</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="vnex-label">Item Type*</label>
                <select 
                  name="category" 
                  value={newItem.category}
                  onChange={handleInputChange}
                  className="vnex-input"
                  required
                >
                  <option value="lost">Lost Item</option>
                  <option value="found">Found Item</option>
                </select>
              </div>
              
              <div>
                <label className="vnex-label">Item Name*</label>
                <input 
                  type="text"
                  name="title"
                  value={newItem.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Black Wallet, Blue Backpack"
                  className="vnex-input"
                  required
                />
              </div>

              <div>
                <label className="vnex-label">Location*</label>
                <input 
                  type="text"
                  name="location"
                  value={newItem.location}
                  onChange={handleInputChange}
                  placeholder="Where lost/found?"
                  className="vnex-input"
                  required
                />
              </div>
              
              <div>
                <label className="vnex-label">Date*</label>
                <input 
                  type="date"
                  name="date"
                  value={newItem.date}
                  onChange={handleInputChange}
                  className="vnex-input"
                  required
                />
              </div>
              
              <div>
                <label className="vnex-label">Your Name*</label>
                <input 
                  type="text"
                  name="contactName"
                  value={newItem.contactName}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="vnex-input"
                  required
                />
              </div>
              
              <div>
                <label className="vnex-label">Contact Number*</label>
                <input 
                  type="text"
                  name="contactInfo"
                  value={newItem.contactInfo}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                  className="vnex-input"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="vnex-label">Description</label>
              <textarea 
                name="description"
                value={newItem.description}
                onChange={handleInputChange}
                placeholder="Describe the item in detail"
                className="vnex-input"
                rows={3}
              />
            </div>
            
            <div>
              <label className="vnex-label">Upload Image</label>
              <input 
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary-50 file:text-primary-700
                  hover:file:bg-primary-100"
              />
              {newItem.imageUrl && (
                <div className="mt-2">
                  <img 
                    src={newItem.imageUrl} 
                    alt="Preview" 
                    className="h-32 w-auto rounded-md object-cover"
                  />
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <button type="submit" className="vnex-button-primary">
                Submit Report
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                activeTab === 'all'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
              } border`}
            >
              All Items
            </button>
            <button
              onClick={() => setActiveTab('lost')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'lost'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
              } border-t border-b border-r`}
            >
              Lost Items
            </button>
            <button
              onClick={() => setActiveTab('found')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                activeTab === 'found'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
              } border-t border-b border-r`}
            >
              Found Items
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search items..."
              className="pl-10 vnex-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="vnex-card text-center py-8">
            <p className="text-gray-500">No items found. Be the first to report an item!</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div 
              key={item.id} 
              className={`vnex-card hover:shadow-lg transition-all ${
                item.status === 'closed' ? 'opacity-75' : ''
              }`}
            >
              <div className="flex flex-col md:flex-row gap-4">
                {item.imageUrl && (
                  <div className="w-full md:w-1/4">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-40 md:h-full object-cover rounded-md"
                    />
                  </div>
                )}
                
                <div className={`flex-1 ${!item.imageUrl ? 'w-full' : 'md:w-3/4'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span 
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            item.category === 'lost' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {item.category === 'lost' ? 'Lost' : 'Found'}
                        </span>
                        
                        <span 
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            item.status === 'open'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {item.status === 'open' ? 'Open' : 'Closed'}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
                    </div>
                    
                    <button
                      onClick={() => handleStatusToggle(item.id)}
                      className={`px-3 py-1 text-sm rounded ${
                        item.status === 'open'
                          ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                          : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                      }`}
                    >
                      {item.status === 'open' ? 'Mark as Closed' : 'Reopen'}
                    </button>
                  </div>
                  
                  <p className="text-gray-600 mt-2">
                    {item.description}
                  </p>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{item.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{item.contactName}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">{item.contactInfo}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LostFound;
