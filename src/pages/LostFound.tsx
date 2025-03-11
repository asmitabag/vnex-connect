
import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { Camera, Upload, X, Phone, Mail, MessageCircle } from 'lucide-react';

interface LostItem {
  id: string;
  type: 'lost' | 'found';
  name: string;
  description: string;
  location: string;
  contactName: string;
  contactMethod: string;
  contactValue: string;
  imageUrl: string | null;
  date: string;
}

const LostFound = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<LostItem[]>([
    {
      id: '1',
      type: 'lost',
      name: 'Blue Water Bottle',
      description: 'Metal blue water bottle with VIT logo, lost near the main library',
      location: 'Main Library, 2nd Floor',
      contactName: 'Naman Sharma',
      contactMethod: 'whatsapp',
      contactValue: '9876543210',
      imageUrl: null,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      type: 'found',
      name: 'Calculator',
      description: 'Scientific calculator (Casio fx-991EX) found in Classroom AB-502',
      location: 'AB Building, Room 502',
      contactName: 'Asmita Bag',
      contactMethod: 'email',
      contactValue: 'asmita.bag2023@vit.ac.in',
      imageUrl: null,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    }
  ]);

  const [activeTab, setActiveTab] = useState<'all' | 'lost' | 'found'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<LostItem, 'id' | 'date'>>({
    type: 'lost',
    name: '',
    description: '',
    location: '',
    contactName: '',
    contactMethod: 'whatsapp',
    contactValue: '',
    imageUrl: null,
  });
  
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);
      
      // Create preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
        setFormData({ ...formData, imageUrl: fileReader.result as string });
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const triggerCameraInput = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl(null);
    setFormData({ ...formData, imageUrl: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name.trim()) {
      toast({
        title: "Missing name",
        description: "Please provide a name for the item",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.location.trim()) {
      toast({
        title: "Missing location",
        description: `Please provide where you ${formData.type === 'lost' ? 'lost' : 'found'} the item`,
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.contactValue.trim()) {
      toast({
        title: "Missing contact information",
        description: "Please provide your contact information",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newItem: LostItem = {
        ...formData,
        id: uuidv4(),
        date: new Date().toISOString(),
      };
      
      setItems(prevItems => [newItem, ...prevItems]);
      
      // Reset form
      setFormData({
        type: 'lost',
        name: '',
        description: '',
        location: '',
        contactName: '',
        contactMethod: 'whatsapp',
        contactValue: '',
        imageUrl: null,
      });
      
      setImage(null);
      setPreviewUrl(null);
      setIsSubmitting(false);
      setIsModalOpen(false);
      
      toast({
        title: "Item posted",
        description: `Your ${formData.type} item has been posted successfully!`,
      });
    }, 1000);
  };

  const handleDelete = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Your post has been removed successfully",
    });
  };

  const filteredItems = items.filter(item => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  return (
    <div className="vnex-container py-8">
      <h1 className="vnex-heading">Lost & Found</h1>
      <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
        Lost something or found someone else's belongings? Post it here to help reunite items with their owners.
      </p>
      
      {/* Main content */}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'all' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setActiveTab('lost')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'lost' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Lost Items
            </button>
            <button
              onClick={() => setActiveTab('found')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'found' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Found Items
            </button>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="vnex-button-primary"
          >
            Post New Item
          </button>
        </div>
        
        {/* Items list */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="vnex-card text-center py-8">
              <p className="text-gray-500">No items found in this category.</p>
            </div>
          ) : (
            filteredItems.map(item => (
              <div 
                key={item.id}
                className={`vnex-card border-l-4 ${
                  item.type === 'lost' ? 'border-l-red-500' : 'border-l-green-500'
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  {item.imageUrl && (
                    <div className="md:w-1/4 mb-4 md:mb-0 md:mr-4">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                  
                  <div className={`${item.imageUrl ? 'md:w-3/4' : 'w-full'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          item.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        } mb-2`}>
                          {item.type === 'lost' ? 'Lost Item' : 'Found Item'}
                        </span>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(item.date).toLocaleDateString()} • {item.location}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Remove Item"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <p className="mt-2 text-gray-700">{item.description}</p>
                    
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium">Contact: {item.contactName}</p>
                      <div className="flex items-center mt-1">
                        {item.contactMethod === 'whatsapp' && (
                          <MessageCircle className="w-4 h-4 text-green-600 mr-2" />
                        )}
                        {item.contactMethod === 'phone' && (
                          <Phone className="w-4 h-4 text-blue-600 mr-2" />
                        )}
                        {item.contactMethod === 'email' && (
                          <Mail className="w-4 h-4 text-purple-600 mr-2" />
                        )}
                        <span className="text-sm">{item.contactValue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Modal for adding a new item */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Post a {formData.type === 'lost' ? 'Lost' : 'Found'} Item</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'lost' })}
                    className={`flex-1 py-2 rounded-md ${
                      formData.type === 'lost' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    I Lost Something
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'found' })}
                    className={`flex-1 py-2 rounded-md ${
                      formData.type === 'found' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    I Found Something
                  </button>
                </div>
                
                <div>
                  <label htmlFor="name" className="vnex-label">Item Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Blue Water Bottle, Calculator, ID Card"
                    className="vnex-input"
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="vnex-label">
                    {formData.type === 'lost' ? 'Where did you lose it?' : 'Where did you find it?'}
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Main Library, Classroom AB-502"
                    className="vnex-input"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="vnex-label">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Provide details about the item to help identify it correctly"
                    className="vnex-input"
                  />
                </div>
                
                <div>
                  <label htmlFor="contactName" className="vnex-label">Your Name</label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="vnex-input"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactMethod" className="vnex-label">Contact Method</label>
                    <select
                      id="contactMethod"
                      name="contactMethod"
                      value={formData.contactMethod}
                      onChange={handleChange}
                      className="vnex-input"
                    >
                      <option value="whatsapp">WhatsApp</option>
                      <option value="phone">Phone</option>
                      <option value="email">Email</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="contactValue" className="vnex-label">Contact Details</label>
                    <input
                      type="text"
                      id="contactValue"
                      name="contactValue"
                      value={formData.contactValue}
                      onChange={handleChange}
                      placeholder={
                        formData.contactMethod === 'email' 
                          ? 'your.email@vit.ac.in' 
                          : '9876543210'
                      }
                      className="vnex-input"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="vnex-label">Upload Image (Optional)</label>
                  <div className="mt-2 flex flex-col items-center">
                    {previewUrl ? (
                      <div className="relative w-full max-w-md">
                        <img 
                          src={previewUrl} 
                          alt="Preview" 
                          className="w-full h-48 object-cover rounded-md shadow-md"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-full flex flex-col gap-2 sm:flex-row sm:justify-center">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                        <input
                          type="file"
                          ref={cameraInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          capture="environment"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={triggerFileInput}
                          className="vnex-button-secondary flex items-center justify-center gap-2"
                        >
                          <Upload className="w-5 h-5" />
                          <span>Upload Photo</span>
                        </button>
                        <button
                          type="button"
                          onClick={triggerCameraInput}
                          className="vnex-button-secondary flex items-center justify-center gap-2"
                        >
                          <Camera className="w-5 h-5" />
                          <span>Take Photo</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="vnex-button-secondary mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="vnex-button-primary"
                  >
                    {isSubmitting ? 'Posting...' : 'Post Item'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LostFound;
