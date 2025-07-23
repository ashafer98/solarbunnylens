import React, { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-darkBg text-lightBg p-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#top" className="text-2xl font-bold">
          Solar Bunny Gallery
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 font-semibold">
          <a href="/shop" className="hover:text-accent transition">Shop</a>
          <a href="#about" className="hover:text-accent transition">About</a>
          <a href="#contact" className="hover:text-accent transition">Contact</a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-darkBg mt-2 space-y-2 p-4 font-semibold text-center">
          <a href="/shop" onClick={() => setMenuOpen(false)} className="block hover:text-accent transition">
            Shop
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)} className="block hover:text-accent transition">
            About
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="block hover:text-accent transition">
            Contact
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
