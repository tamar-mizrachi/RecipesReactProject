import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserData {
  Id: number;
  fullName: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  tz: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  registerUser: (userData: UserData) => void;
  categoryid: string;
  setCategoryId: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [categoryid, setCategoryIdState] = useState<string>(() => {
    return localStorage.getItem('categoryId') || '';
  });

  const setCategoryId = (id: string) => {
    setCategoryIdState(id);
    localStorage.setItem('categoryId', id);
  };

  const registerUser = (userData: UserData) => {
    console.log('Registering user:', userData);
    // כאן אפשר להוסיף בקשת POST או לוגיקה אחרת.
  };

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  const [userId, setUserId] = useState<number | null>(() => {
    const saved = localStorage.getItem('userId');
    return saved ? Number(saved) : null;
  });

  useEffect(() => {
    if (userId !== null) {
      localStorage.setItem('userId', userId.toString());
    } else {
      localStorage.removeItem('userId');
    }
  }, [userId]);


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        registerUser,
        categoryid,
        setCategoryId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
/*
import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserData {
  Id: number;
  fullName: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  tz: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  registerUser: (userData: UserData) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const registerUser = (userData: UserData) => {
    console.log('Registering user:', userData);
    // כאן אפשר להוסיף בקשת POST או לוגיקה אחרת.
  };

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
*/
