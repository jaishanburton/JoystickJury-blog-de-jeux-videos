import React from 'react';
import Header from '../components/header';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../app/globals.css';
<link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>


const Home = () => {
return (
    <>
      <Header />
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className="text-center">
          <div className="wt-title text-5xl font-bold text-gray-700 mb-10">Bienvenue sur mon blog !</div>
        </div>
      </div>
      <Footer />
    </>
);
};

export default Home;
