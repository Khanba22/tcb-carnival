"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RegisterContextProps {
    isRegistered: boolean;
    setIsRegistered: (isRegistered: boolean) => void;
}

const RegisterContext = createContext<RegisterContextProps | undefined>(undefined);

export const RegisterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isRegistered, setIsRegistered] = useState<boolean>(false);

    return (
        <RegisterContext.Provider value={{ isRegistered, setIsRegistered }}>
            {children}
        </RegisterContext.Provider>
    );
};

export const useRegister = (): RegisterContextProps => {
    const context = useContext(RegisterContext);
    if (!context) {
        throw new Error('useRegister must be used within a RegisterProvider');
    }
    return context;
};