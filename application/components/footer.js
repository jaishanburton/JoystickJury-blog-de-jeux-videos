import React, { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';


function Footer() {
    return (

        <footer className="bg-gray-100 text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            {/* Logo*/}
            <span className="ml-3 text-xl">VoiceReview</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            {/* Liens*/}
            <a className="mr-5 hover:text-gray-900">Home</a>
            <a className="mr-5 hover:text-gray-900">About</a>
            
          </nav>
          <div className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <FaFacebook className="w-5 h-5" />
            </a>
            <a href="#" className="ml-3 text-gray-500 hover:text-gray-900">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="#" className="ml-3 text-gray-500 hover:text-gray-900">
              <FaTiktok className="w-5 h-5" />
            </a>
            <a href="#" className="ml-3 text-gray-500 hover:text-gray-900">
              <FaYoutube className="w-5 h-5" />
            </a>
          </div>
          <p className="text-gray-500 sm:ml-6 sm:mt-0 mt-4">
            © {new Date().getFullYear()} VoiceReview
          </p>
        </div>
      </footer>
    );
  };
  

export default Footer;