// src/pages/Contact.jsx
import React from 'react';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      <ContactForm />
    </div>
  );
}
