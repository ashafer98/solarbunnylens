import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartCount = 0, toggleCart }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-darkBg text-lightBg p-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Solar Bunny Gallery
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 font-semibold items-center">
          <Link to="/shop" className="hover:text-accent transition">
            Shop
          </Link>
          <a href="#about" className="hover:text-accent transition">
            About
          </a>
          <a href="#contact" className="hover:text-accent transition">
            Contact
          </a>

          {/* Cart Icon */}
          <button
            onClick={toggleCart}
            aria-label="Toggle cart"
            className="relative ml-4 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 5m12-5l1.6-3.2m-6 8a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-darkBg rounded-full px-2 text-xs font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={toggleCart}
            aria-label="Toggle cart"
            className="relative focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 5m12-5l1.6-3.2m-6 8a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-darkBg rounded-full px-2 text-xs font-bold">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={toggleMenu}
            className="focus:outline-none"
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
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-darkBg mt-2 space-y-2 p-4 font-semibold text-center">
          <Link
            to="/shop"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-accent transition"
          >
            Shop
          </Link>
          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-accent transition"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-accent transition"
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
