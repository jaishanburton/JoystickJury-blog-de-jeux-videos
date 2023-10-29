import React, { useState } from 'react';
import Header from '../components/header';
import Navbar from '../components/navbar';
import { useUser } from '../components/UserContext'; 

function LoginControlledPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { login } = useUser(); 
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        login(formData);
    };
    return (
        <div className="p-8"><Header/><Navbar />
            <h1 className="mb-4 text-2xl font-bold">Connexion (Contrôlée)</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium mb-2">Nom d'utilisateur:</label>
                    <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        className="border p-2 rounded" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium mb-2">Mot de passe:</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        className="border p-2 rounded" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Soumettre</button>
            </form>
        </div>
    );
}

export default LoginControlledPage;
