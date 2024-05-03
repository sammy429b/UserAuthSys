import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
    isAuthenticated : boolean,
}

// Create and export the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Use AuthContextType as a generic parameter to createContext
// and provide undefined as the default value
export const AuthProvider: React.FC = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false); 
   
    const contextValue = {
        isAuthenticated,
        setAuthenticated
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Define useAuth hook
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
