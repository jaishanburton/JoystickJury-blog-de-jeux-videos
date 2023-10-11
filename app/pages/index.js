import React from 'react';
import Header from '../components/header';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../app/globals.css';

const Home = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="wt-title">Bienvenue sur mon blog !</div>
      <Footer />
    </>
  );
};

export default Home;
