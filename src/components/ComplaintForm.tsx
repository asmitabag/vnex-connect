
import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { validateComplaintForm, validateMessComplaintForm } from '@/utils/validators';
import { Camera, Upload, X } from 'lucide-react';

interface ComplaintFormValues {
  regNo: string;
  block: string;
  roomNo: string;
  name: string;
  description: string;
  mess?: string;
  mealType?: string;
  imageUrl?: string | null;
}

interface ComplaintFormProps {
  type: 'hostel' | 'mess';
  onSubmit: (values: ComplaintFormValues) => void;
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({ type, onSubmit }) => {
  const { toast } = useToast();
  const [values, setValues] = useState<ComplaintFormValues>({
    regNo: '',
    block: '',
    roomNo: '',
    name: '',
    description: '',
    mess: type === 'mess' ? 'SRRC' : undefined,
    mealType: type === 'mess' ? 'Veg' : undefined,
    imageUrl: null,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);
      
      // Create preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
        setValues({ ...values, imageUrl: fileReader.result as string });
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
    setValues({ ...values, imageUrl: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = type === 'mess' 
      ? validateMessComplaintForm(values as any) 
      : validateComplaintForm(values);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(values);
      
      // Reset form
      setValues({
        regNo: '',
        block: '',
        roomNo: '',
        name: '',
        description: '',
        mess: type === 'mess' ? 'SRRC' : undefined,
        mealType: type === 'mess' ? 'Veg' : undefined,
        imageUrl: null,
      });
      
      setImage(null);
      setPreviewUrl(null);
      setIsSubmitting(false);
      
      toast({
        title: "Success",
        description: `Your ${type} complaint has been submitted successfully!`,
      });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="vnex-card space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="regNo" className="vnex-label">Registration Number</label>
          <input
            type="text"
            id="regNo"
            name="regNo"
            value={values.regNo}
            onChange={handleChange}
            placeholder="e.g. 23BCE1701"
            className={`vnex-input ${errors.regNo ? 'border-red-500' : ''}`}
          />
          {errors.regNo && <p className="text-red-500 text-xs mt-1">{errors.regNo}</p>}
        </div>
        
        <div>
          <label htmlFor="name" className="vnex-label">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Your Name"
            className={`vnex-input ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="block" className="vnex-label">Block</label>
          <input
            type="text"
            id="block"
            name="block"
            value={values.block}
            onChange={handleChange}
            placeholder="e.g. A"
            className={`vnex-input ${errors.block ? 'border-red-500' : ''}`}
          />
          {errors.block && <p className="text-red-500 text-xs mt-1">{errors.block}</p>}
        </div>
        
        <div>
          <label htmlFor="roomNo" className="vnex-label">Room Number</label>
          <input
            type="text"
            id="roomNo"
            name="roomNo"
            value={values.roomNo}
            onChange={handleChange}
            placeholder="e.g. 123"
            className={`vnex-input ${errors.roomNo ? 'border-red-500' : ''}`}
          />
          {errors.roomNo && <p className="text-red-500 text-xs mt-1">{errors.roomNo}</p>}
        </div>
        
        {type === 'mess' && (
          <>
            <div>
              <label htmlFor="mess" className="vnex-label">Mess</label>
              <select
                id="mess"
                name="mess"
                value={values.mess}
                onChange={handleChange}
                className={`vnex-input ${errors.mess ? 'border-red-500' : ''}`}
              >
                <option value="SRRC">SRRC</option>
                <option value="Shakthi">Shakthi</option>
                <option value="Zenith">Zenith</option>
              </select>
              {errors.mess && <p className="text-red-500 text-xs mt-1">{errors.mess}</p>}
            </div>
            
            <div>
              <label htmlFor="mealType" className="vnex-label">Meal Type</label>
              <select
                id="mealType"
                name="mealType"
                value={values.mealType}
                onChange={handleChange}
                className={`vnex-input ${errors.mealType ? 'border-red-500' : ''}`}
              >
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Special">Special</option>
              </select>
              {errors.mealType && <p className="text-red-500 text-xs mt-1">{errors.mealType}</p>}
            </div>
          </>
        )}
      </div>
      
      <div>
        <label htmlFor="description" className="vnex-label">Complaint Description</label>
        <textarea
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe your complaint in detail"
          className={`vnex-input ${errors.description ? 'border-red-500' : ''}`}
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
      </div>
      
      {/* Image upload section */}
      <div>
        <label className="vnex-label">Upload Image (Optional)</label>
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
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="vnex-button-primary flex items-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Submitting...</span>
            </>
          ) : (
            <span>Submit Complaint</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default ComplaintForm;
