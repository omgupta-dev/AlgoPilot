import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserPreferences } from '../types';
import { storageService } from '../services/storageService';

interface AuthContextType {
  user: UserProfile;
  isAuthenticated: boolean;
  loginDemo: (name?: string, email?: string) => void;
  logoutDemo: () => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  resetDemoData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => storageService.getUserProfile());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => storageService.isDemoAuthActive());

  useEffect(() => {
    storageService.saveUserProfile(user);
  }, [user]);

  const loginDemo = (name?: string, email?: string) => {
    setUser(prev => ({
      ...prev,
      name: name || prev.name,
      email: email || prev.email
    }));
    setIsAuthenticated(true);
    storageService.setDemoAuthActive(true);
  };

  const logoutDemo = () => {
    setIsAuthenticated(false);
    storageService.setDemoAuthActive(false);
  };

  const updatePreferences = (prefs: Partial<UserPreferences>) => {
    const updated = storageService.updatePreferences(prefs);
    setUser(updated);
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    setUser(prev => {
      const updated = { ...prev, ...profile };
      storageService.saveUserProfile(updated);
      return updated;
    });
  };

  const resetDemoData = () => {
    storageService.resetAllDemoData();
    const fresh = storageService.getUserProfile();
    setUser(fresh);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loginDemo,
        logoutDemo,
        updatePreferences,
        updateProfile,
        resetDemoData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
