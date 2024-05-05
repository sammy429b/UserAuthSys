import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    isAuthenticated: boolean,
    mail: string
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(() => {
        // Initialize isAuthenticated from localStorage if available
        const storedAuth = localStorage.getItem("isAuthenticated");
        return !!storedAuth && JSON.parse(storedAuth);
    });
    const [mail, setMail] = useState<string>(() => {
        // Initialize mail from localStorage if available
        const storedMail = localStorage.getItem("mail");
        return storedMail || "";
    });


    // Update localStorage when isAuthenticated or mail changes
    useEffect(() => {
        localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    useEffect(() => {
        localStorage.setItem("mail", mail);
    }, [mail]);

    const contextValue: AuthContextType = {
        isAuthenticated,
        mail,
        setAuthenticated,
        setMail
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
