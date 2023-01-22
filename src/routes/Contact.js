import React from 'react';
import Footer from './Footer';
import Start from '../components/Start';
import ContactForm from '../components/ContactForm';
import Navbar from "../components/navbar/Navbar";

function Contact() {
  return (
    <>
    <Navbar/>
      <Start cName='hero-contact'
        title="Contact Us"
        text='We will be happy to assist you with any question ragarding purchases.'
        // buttonText='Shop Now'
        btnClass='hide'
      />
      <ContactForm/>
      <Footer/>
    </>
  )
}

export default Contact