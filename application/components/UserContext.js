import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = userData => setUser(userData);

    const logout = () => setUser(null);

    const contextValue = {user, login, logout};

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser doit être appelé au sein d'un UserProvider");
    }
    return context;
}
