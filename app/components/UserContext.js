// UserContext.js
import React, { createContext, useContext, useState } from 'react';

// Initialisation du contexte utilisateur
export const UserContext = createContext();

// Composant fournisseur englobant les composants enfants
export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    // Connecter l'utilisateur
    const login = userData => setUser(userData);

    // Déconnecter l'utilisateur
    const logout = () => setUser(null);

    // Valeurs fournies aux composants descendants
    const contextValue = {user, login, logout};

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}

// Hook pour accéder au contexte utilisateur
export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser doit être appelé au sein d'un UserProvider");
    }
    return context;
}
