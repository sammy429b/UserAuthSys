import { createContext, useState, useContext } from 'react';

// Create the AuthContext
export const AuthContext = createContext();



// Define the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [userMailId, setUserMailId] = useState('');
    const [isAuthenticated, setAuthenticated] = useState(false);

    const handleLoginAuth = (mail:string) => {
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

