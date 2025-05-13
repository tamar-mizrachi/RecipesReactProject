import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
  userId: string | null;
  setUserId: (id: string | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'));
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('userId'));

  return (
    <UserContext.Provider value={{ userId, setUserId, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext must be used within a UserProvider');
  return context;
};
