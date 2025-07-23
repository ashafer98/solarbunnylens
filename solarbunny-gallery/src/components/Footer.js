import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-6 mt-12">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Solar Bunny Gallery. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
