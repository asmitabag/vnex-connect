
import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { Camera, Upload, X, Send, AlertTriangle, Buildings } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Interface for the animal report data
interface AnimalReport {
  id: string;
  location: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  status: 'pending' | 'in-progress' | 'resolved';
  sentToApollo: boolean;
  campus: string;
}

const StrayAnimal = () => {
  const { toast } = useToast();
  const [reports, setReports] = useState<AnimalReport[]>([]);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [campus, setCampus] = useState('Chennai');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);
      
      // Create preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  // Open file dialog
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Open camera
  const triggerCameraInput = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  // Remove selected image
  const removeImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  // Submit the report
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!location.trim()) {
      toast({
        title: "Missing location",
        description: "Please provide the location of the animal",
        variant: "destructive",
      });
      return;
    }
    
    if (!description.trim()) {
      toast({
        title: "Missing description",
        description: "Please provide a description of the animal's condition",
        variant: "destructive",
      });
      return;
    }
    
    if (!image) {
      toast({
        title: "Missing image",
        description: "Please upload or take a photo of the animal",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real application, you would upload the image to a storage service
    // For now, we'll use the preview URL as a placeholder
    setTimeout(() => {
      const newReport: AnimalReport = {
        id: uuidv4(),
        location,
        description,
        imageUrl: previewUrl || '',
        createdAt: new Date().toISOString(),
        status: 'pending',
        sentToApollo: false,
        campus: campus,
      };
      
      setReports(prevReports => [newReport, ...prevReports]);
      
      // Reset form
      setLocation('');
      setDescription('');
      setImage(null);
      setPreviewUrl(null);
      setIsSubmitting(false);
      
      toast({
        title: "Report submitted",
        description: "Your stray animal report has been submitted successfully!",
      });

      // Send notification to campus authorities automatically
      toast({
        title: "Notification sent",
        description: `Your report has been sent to ${campus} campus authorities`,
      });
    }, 1500);
  };

  // Delete a report
  const handleDelete = (id: string) => {
    setReports(prevReports => prevReports.filter(report => report.id !== id));
    toast({
      title: "Report deleted",
      description: "Your report has been deleted",
    });
  };

  // Send report to Apollo Hospital
  const sendToApollo = (id: string) => {
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === id 
          ? { ...report, sentToApollo: true } 
          : report
      )
    );
    
    toast({
      title: "Report sent to Apollo Hospital",
      description: `Your report has been sent to Apollo Hospital in ${
        reports.find(r => r.id === id)?.campus || "Chennai"
      } for emergency care`,
      variant: "default",
    });
  };

  return (
    <div className="vnex-container py-8">
      <h1 className="vnex-heading">Stray Animal Reporting</h1>
      <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
        Help injured or malnourished stray animals on campus by reporting them with photos. 
        Your reports will be sent to campus authorities who can take appropriate action. 
        Critical cases can be forwarded to Apollo Hospital for emergency care.
      </p>
      
      {/* Reporting Form */}
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="vnex-card space-y-4">
          {/* Campus selection */}
          <div>
            <label className="vnex-label">Select Campus</label>
            <Select value={campus} onValueChange={setCampus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select VIT Campus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Chennai">VIT Chennai</SelectItem>
                <SelectItem value="Vellore">VIT Vellore</SelectItem>
                <SelectItem value="Bhopal">VIT Bhopal</SelectItem>
                <SelectItem value="Amaravati">VIT Amaravati</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Location input */}
          <div>
            <label htmlFor="location" className="vnex-label">Location on Campus</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={`e.g., Near Block A, Outside Library, etc. in ${campus}`}
              className="vnex-input"
            />
          </div>
          
          {/* Description input */}
          <div>
            <label htmlFor="description" className="vnex-label">Animal's Condition</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the animal's condition, species, etc."
              rows={3}
              className="vnex-input"
            />
          </div>
          
          {/* Image upload/camera section */}
          <div>
            <label className="vnex-label">Photo of the Animal</label>
            <div className="mt-2 flex flex-col items-center">
              {previewUrl ? (
                <div className="relative w-full max-w-md">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-64 object-cover rounded-md shadow-md"
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
          
          {/* Submit button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="vnex-button-primary flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit Report</span>
              )}
            </button>
          </div>
        </form>
      </div>
      
      {/* Reports list */}
      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="vnex-subheading">Your Reports</h2>
        {reports.length === 0 ? (
          <div className="vnex-card text-center py-8">
            <p className="text-gray-500">You haven't submitted any reports yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map(report => (
              <div key={report.id} className="vnex-card flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3">
                  <img 
                    src={report.imageUrl} 
                    alt="Animal" 
                    className="w-full h-48 object-cover rounded-md shadow-sm"
                  />
                </div>
                <div className="md:w-2/3 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500">
                        {new Date(report.createdAt).toLocaleString()}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Buildings className="w-4 h-4 text-primary-600" />
                        <span className="font-medium">{report.campus}</span>
                      </div>
                      <p className="font-medium mt-1">{report.location}</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          report.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1).replace('-', ' ')}
                        </span>
                        
                        {report.sentToApollo && (
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                            Sent to Apollo
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex">
                      {!report.sentToApollo && (
                        <button
                          onClick={() => sendToApollo(report.id)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-colors mr-2"
                          title="Send to Apollo Hospital"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(report.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete Report"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2 flex-grow">{report.description}</p>
                  
                  {!report.sentToApollo && (
                    <div className="mt-3 flex items-center text-amber-600 text-sm">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      <span>For critical cases, send this report to Apollo Hospital</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StrayAnimal;
