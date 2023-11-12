import React from 'react';
import Header from '../components/header';
import Navbar from '../components/navbar';
import '../app/globals.css';
import Footer from '../components/footer';
<link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>

function LoginPageNative() {
    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        console.log('Nom d\'utilisateur:', username);
        console.log('Mot de passe:', password);
    };

    return (
        <>
            <Header/>
            <Navbar />
            <div className="container mx-auto px-4">
                <div className="p-8">
                    <h1 className="mb-4 text-2xl font-bold">Connexion</h1>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium mb-2">Nom d'utilisateur:</label>
                            <input type="text" name="username" id="username" className="border p-2 rounded" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium mb-2">Mot de passe:</label>
                            <input type="password" name="password" id="password" className="border p-2 rounded" required />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Soumettre</button>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default LoginPageNative;
