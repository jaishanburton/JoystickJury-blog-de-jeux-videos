import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Nav from '../components/navbar';
import '../app/globals.css';
<link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>

function UseStatePage() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Header />
            <Nav />
            <div className="container mx-auto px-4">
                <div className="p-8">
                    <h1 className="mb-4 text-2xl font-bold">Compteur: {count}</h1>
                    <button 
                        onClick={() => setCount(count + 1)}
                        className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition transform duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:scale-95"
                    >
                        Incrementer
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UseStatePage;
