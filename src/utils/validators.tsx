
// Validator functions for VNex forms

// Validate VIT registration number (e.g., 23BCE1701)
export const isValidRegNo = (regNo: string): boolean => {
  const pattern = /^\d{2}[A-Z]{3}\d{4}$/;
  return pattern.test(regNo);
};

// Validate block (uppercase letters only)
export const isValidBlock = (block: string): boolean => {
  const pattern = /^[A-Z]+$/;
  return pattern.test(block);
};

// Validate room number (digits only)
export const isValidRoomNo = (roomNo: string): boolean => {
  const pattern = /^\d+$/;
  return pattern.test(roomNo);
};

// Validate that the string is not empty
export const isNotEmpty = (str: string): boolean => {
  return str.trim().length > 0;
};

// Validate whatsapp number (10 digits)
export const isValidWhatsApp = (number: string): boolean => {
  const pattern = /^\d{10}$/;
  return pattern.test(number);
};

// Form validator that returns errors object
export const validateComplaintForm = (values: {
  regNo: string;
  block: string;
  roomNo: string;
  name: string;
  description: string;
}) => {
  const errors: Record<string, string> = {};

  if (!isValidRegNo(values.regNo)) {
    errors.regNo = "Invalid registration number (e.g., 23BCE1701)";
  }

  if (!isValidBlock(values.block)) {
    errors.block = "Block should contain uppercase letters only";
  }

  if (!isValidRoomNo(values.roomNo)) {
    errors.roomNo = "Room number should contain digits only";
  }

  if (!isNotEmpty(values.name)) {
    errors.name = "Name is required";
  }

  if (!isNotEmpty(values.description)) {
    errors.description = "Description is required";
  }

  return errors;
};

// Validate mess complaint form
export const validateMessComplaintForm = (values: {
  regNo: string;
  block: string;
  roomNo: string;
  name: string;
  description: string;
  mess: string;
  mealType: string;
}) => {
  const errors: Record<string, string> = {};
  
  // Reuse the basic validation
  const basicErrors = validateComplaintForm(values);
  Object.assign(errors, basicErrors);
  
  if (!isNotEmpty(values.mess)) {
    errors.mess = "Mess selection is required";
  }
  
  if (!isNotEmpty(values.mealType)) {
    errors.mealType = "Meal type is required";
  }
  
  return errors;
};
