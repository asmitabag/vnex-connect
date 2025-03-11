
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ProfileType = 'student' | 'faculty' | null;
export type CampusType = 'Chennai' | 'Vellore' | 'Bhopal' | 'Amaravati' | null;

interface ProfileContextType {
  profileType: ProfileType;
  setProfileType: (type: ProfileType) => void;
  campus: CampusType;
  setCampus: (campus: CampusType) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profileType, setProfileType] = useState<ProfileType>(null);
  const [campus, setCampus] = useState<CampusType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ProfileContext.Provider
      value={{
        profileType,
        setProfileType,
        campus,
        setCampus,
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
