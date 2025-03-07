
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { validateComplaintForm, validateMessComplaintForm } from '@/utils/validators';

interface ComplaintFormValues {
  regNo: string;
  block: string;
  roomNo: string;
  name: string;
  description: string;
  mess?: string;
  mealType?: string;
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
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
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
      });
      
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
