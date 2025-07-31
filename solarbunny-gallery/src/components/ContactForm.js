import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:4242/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Message sent!');
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Failed to send message.');
    }
  } catch (err) {
    console.error('Error submitting form:', err);
    alert('Something went wrong.');
  }
};


  return (
    <div
      id="contact" // <-- Added this ID for anchor link
      className="max-w-lg mx-auto p-6 bg-lightBg rounded-md shadow-md"
    >
      <h2 className="text-2xl font-bold text-primaryText mb-6">Contact the Artist</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold text-primaryText">
            Name <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-primaryText rounded px-3 py-2 text-primaryText placeholder-primaryText focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-semibold text-primaryText">
            Email <span className="text-accent">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-primaryText rounded px-3 py-2 text-primaryText placeholder-primaryText focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-1 font-semibold text-primaryText">
            Message <span className="text-accent">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-primaryText rounded px-3 py-2 text-primaryText placeholder-primaryText resize-none focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Write your message here..."
          />
        </div>
        <button
          type="submit"
          className="bg-accent hover:bg-accentHover text-lightBg font-bold px-6 py-3 rounded transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
