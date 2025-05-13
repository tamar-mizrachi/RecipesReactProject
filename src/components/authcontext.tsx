/*import React, { createContext, useContext, useState, type ReactNode} from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        // בדוק אם יש ערך ב-localStorage
        return localStorage.getItem('userId') !== null;
    });

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
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
};*/

import React, { createContext, useContext, useState } from 'react';

// הגדרת סוגי הנתונים בהקשר
interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    registerUser: (userData: { Id:number,fullName: string; username: string; password: string; phone: string; email: string; tz: string }) => void;
}

// יצירת ההקשר
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// רכיב ספק ההקשר
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const registerUser = (userData: { Id:number,fullName: string; username: string; password: string; phone: string; email: string; tz: string }) => {
        // שמירת פרטי המשתמש ב-localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userId', userData.Id.toString());
        
        setIsLoggedIn(true); // עדכון מצב ההתחברות
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, registerUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// הוק של ההקשר
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};



