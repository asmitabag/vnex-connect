
import React, { useState } from 'react';
import { useProfile } from '../contexts/ProfileContext';
import { MapPin, Calendar, Clock, Info, PawPrint, Upload, AlertCircle, Send } from 'lucide-react';
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
import CameraCapture from '@/components/CameraCapture';

interface Animal {
  id: string;
  species: string;
  location: string;
  condition: string;
  description: string;
  reportedDate: string;
  reportedTime: string;
  image?: string;
  status: 'pending' | 'in-progress' | 'resolved';
  response?: {
    text: string;
    respondent: string;
    responseDate: string;
  };
}

const StatusBadge = ({ status }: { status: Animal['status'] }) => {
  const colors = {
    'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
    'resolved': 'bg-green-100 text-green-800 border-green-200'
  };
  
  const statusText = {
    'pending': 'Pending',
    'in-progress': 'In Progress',
    'resolved': 'Resolved'
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
      {statusText[status]}
    </span>
  );
};

const StrayAnimal = () => {
  const { profileType } = useProfile();
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [responseDialog, setResponseDialog] = useState<{ open: boolean, animalId: string }>({
    open: false,
    animalId: ''
  });
  const [responseText, setResponseText] = useState('');
  
  const [animals, setAnimals] = useState<Animal[]>([
    {
      id: '1',
      species: 'Dog',
      location: 'Near Library',
      condition: 'Injured leg',
      description: 'A medium-sized stray dog with a visible injury on its front leg. Seems to be in pain but not aggressive.',
      reportedDate: '2025-03-15',
      reportedTime: '14:30',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
      status: 'pending'
    },
    {
      id: '2',
      species: 'Cat',
      location: 'Men\'s Hostel Block C',
      condition: 'Dehydrated',
      description: 'A small kitten that appears to be dehydrated and hungry. Very timid and hiding under a bench.',
      reportedDate: '2025-03-14',
      reportedTime: '09:15',
      status: 'in-progress',
      response: {
        text: 'Team dispatched to provide food and water. Will assess health condition on-site.',
        respondent: 'Dr. Sharma',
        responseDate: '2025-03-14'
      }
    },
    {
      id: '3',
      species: 'Bird',
      location: 'Technology Tower',
      condition: 'Injured wing',
      description: 'A pigeon with an injured wing, unable to fly. Located near the entrance of Technology Tower.',
      reportedDate: '2025-03-13',
      reportedTime: '16:45',
      status: 'resolved',
      response: {
        text: 'Bird has been rescued and taken to the veterinary hospital for treatment. Will be released once healed.',
        respondent: 'Dr. Patel',
        responseDate: '2025-03-13'
      }
    }
  ]);
  
  const [newAnimal, setNewAnimal] = useState<Omit<Animal, 'id' | 'reportedDate' | 'reportedTime' | 'status'>>({
    species: '',
    location: '',
    condition: '',
    description: '',
    image: undefined
  });
  
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAnimal(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setNewAnimal(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleCameraCapture = (file: File) => {
    setUploadedImage(file);
    const imageUrl = URL.createObjectURL(file);
    setNewAnimal(prev => ({ ...prev, image: imageUrl }));
  };
  
  const reportAnimal = () => {
    // Validate fields
    if (!newAnimal.species || !newAnimal.location || !newAnimal.condition) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const now = new Date();
    const reportedDate = now.toISOString().split('T')[0];
    const reportedTime = now.toTimeString().split(' ')[0].substring(0, 5);
    
    const newAnimalWithId = {
      ...newAnimal,
      id: `${Date.now()}`,
      reportedDate,
      reportedTime,
      status: 'pending' as const
    };

    setAnimals(prev => [newAnimalWithId, ...prev]);
    setOpenDialog(false);
    setNewAnimal({
      species: '',
      location: '',
      condition: '',
      description: '',
      image: undefined
    });
    setUploadedImage(null);

    toast({
      title: "Report Submitted",
      description: "Your report has been submitted successfully",
    });
  };
  
  const submitResponse = () => {
    if (!responseText) {
      toast({
        title: "Missing Information",
        description: "Please enter a response",
        variant: "destructive",
      });
      return;
    }
    
    setAnimals(prev => prev.map(animal => 
      animal.id === responseDialog.animalId
        ? {
            ...animal,
            status: 'in-progress' as const,
            response: {
              text: responseText,
              respondent: 'Hospital Staff',
              responseDate: new Date().toISOString().split('T')[0]
            }
          }
        : animal
    ));
    
    setResponseDialog({ open: false, animalId: '' });
    setResponseText('');
    
    toast({
      title: "Response Submitted",
      description: "Your response has been submitted successfully",
    });
  };
  
  const markResolved = (id: string) => {
    setAnimals(prev => prev.map(animal => 
      animal.id === id
        ? { ...animal, status: 'resolved' as const }
        : animal
    ));
    
    toast({
      title: "Report Resolved",
      description: "The report has been marked as resolved",
    });
  };
  
  // Filter animals based on profile type
  const visibleAnimals = profileType === 'hospital'
    ? animals
    : animals;

  return (
    <div className="vnex-container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <PawPrint className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold">Stray Animal Reports</h1>
          </div>
          
          {profileType !== 'hospital' && (
            <Button 
              onClick={() => setOpenDialog(true)}
              className="flex items-center gap-2"
            >
              <AlertCircle className="h-4 w-4" />
              Report Animal
            </Button>
          )}
        </div>

        {visibleAnimals.length === 0 ? (
          <div className="text-center py-12">
            <PawPrint className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600">No reports found</h3>
            <p className="text-gray-500 mt-2">
              {profileType !== 'hospital'
                ? 'Click "Report Animal" to submit a new report.'
                : 'There are no animal reports to review at this time.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {visibleAnimals.map(animal => (
              <div key={animal.id} className="vnex-card">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold">{animal.species}</h2>
                  <StatusBadge status={animal.status} />
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> Location
                        </h3>
                        <p>{animal.location}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 flex items-center gap-1">
                          <Info className="h-4 w-4" /> Condition
                        </h3>
                        <p>{animal.condition}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 flex items-center gap-1">
                          <Calendar className="h-4 w-4" /> Reported Date
                        </h3>
                        <p>{animal.reportedDate}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 flex items-center gap-1">
                          <Clock className="h-4 w-4" /> Reported Time
                        </h3>
                        <p>{animal.reportedTime}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-500">Description</h3>
                      <p className="mt-1 text-gray-600">{animal.description}</p>
                    </div>
                  </div>
                  
                  {animal.image && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Image</h3>
                      <img 
                        src={animal.image} 
                        alt={`${animal.species}`} 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
                
                {animal.response && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500">Response from {animal.response.respondent}</h3>
                    <p className="mt-1 text-gray-600">{animal.response.text}</p>
                    <p className="mt-1 text-xs text-gray-500">Responded on {animal.response.responseDate}</p>
                  </div>
                )}
                
                {profileType === 'hospital' && animal.status !== 'resolved' && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end gap-2">
                    {!animal.response && (
                      <Button 
                        onClick={() => setResponseDialog({ open: true, animalId: animal.id })}
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Send className="h-4 w-4" />
                        Respond
                      </Button>
                    )}
                    
                    <Button 
                      onClick={() => markResolved(animal.id)}
                      className="flex items-center gap-1"
                    >
                      Mark as Resolved
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Report Animal Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Report Stray Animal</DialogTitle>
            <DialogDescription>
              Provide details about the stray animal you've encountered.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="species">Animal Type/Species *</Label>
              <Input
                id="species"
                name="species"
                value={newAnimal.species}
                onChange={handleInputChange}
                placeholder="e.g., Dog, Cat, Bird"
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                name="location"
                value={newAnimal.location}
                onChange={handleInputChange}
                placeholder="e.g., Near Library, Hostel Block A"
              />
            </div>
            
            <div>
              <Label htmlFor="condition">Condition *</Label>
              <Input
                id="condition"
                name="condition"
                value={newAnimal.condition}
                onChange={handleInputChange}
                placeholder="e.g., Injured leg, Dehydrated"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newAnimal.description}
                onChange={handleInputChange}
                placeholder="Provide more details about the animal and its condition"
                rows={3}
              />
            </div>
            
            <div>
              <Label>Image</Label>
              <div className="mt-1 flex space-x-2">
                <div className="flex-1">
                  <Label 
                    htmlFor="image-upload" 
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </Label>
                </div>
                
                <div className="flex items-center">
                  <span className="text-gray-500">OR</span>
                </div>
                
                <div className="flex-1 flex items-center justify-center">
                  <CameraCapture onImageCapture={handleCameraCapture} />
                </div>
              </div>
              
              {newAnimal.image && (
                <div className="mt-2">
                  <div className="relative w-full h-40 rounded-md overflow-hidden border border-gray-200">
                    <img 
                      src={newAnimal.image}
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      onClick={() => {
                        setNewAnimal(prev => ({ ...prev, image: undefined }));
                        setUploadedImage(null);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={reportAnimal}>Submit Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Response Dialog */}
      <Dialog 
        open={responseDialog.open} 
        onOpenChange={(open) => setResponseDialog({ ...responseDialog, open })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Respond to Report</DialogTitle>
            <DialogDescription>
              Provide a response to the animal report.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="response">Response</Label>
              <Textarea
                id="response"
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Enter your response..."
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setResponseDialog({ open: false, animalId: '' });
                setResponseText('');
              }}
            >
              Cancel
            </Button>
            <Button onClick={submitResponse}>Submit Response</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StrayAnimal;
