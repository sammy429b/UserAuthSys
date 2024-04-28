import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
    isAuthenticated : boolean,
    toggleAuth: () => void
}

export const AuthContext = createContext();

export const AuthProvider: React.FC = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const toggleAuth = () => {
        setAuthenticated(prevState => !prevState);

    };

    const contextValue: AuthContextType = {
        isAuthenticated,
        toggleAuth
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ():AuthContextType => useContext(AuthContext);
