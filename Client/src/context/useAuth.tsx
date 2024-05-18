import { createContext, useState, useContext, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Define the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [userMailId, setUserMailId] = useState(() => JSON.parse(localStorage.getItem("userMailId")) || '');
    const [isAuthenticated, setAuthenticated] = useState(() => JSON.parse(localStorage.getItem("isAuthenticated")) || false);

    useEffect(() => {
        localStorage.setItem("userMailId", JSON.stringify(userMailId));
    }, [userMailId]);

    useEffect(() => {
        localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    const handleLoginAuth = (mail) => {
        setUserMailId(mail);
        setAuthenticated(true);
    };

    const handleLogoutAuth = () => {
        setUserMailId("");
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ userMailId, isAuthenticated, handleLoginAuth, handleLogoutAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

// Define and export the useAuth hook
export const useAuth = () => {
    return useContext(AuthContext);
};
