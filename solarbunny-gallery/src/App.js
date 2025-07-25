import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Header from './components/Header';
import ArtworkCarousel from './components/ArtworkCarousel';
import Cart from './components/Cart';
import About from './components/About';
import Shop from './pages/shop';
import ContactForm from './components/ContactForm'; // ✅ Added import
import { artwork } from './data/art';

// Load your Stripe public key (replace with your actual key)
const stripePromise = loadStripe('pk_test_51RnukwBIf5dUFES1DkdVVNXrXC9CoixWjNAjXMIQ7yy7JPA0xDg4FqnrVGFUjG4kwTm0vApbIsBUAq4Urgo8Tzy200z6cdA3gY');

const AppContent = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addToCart = (art) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === art.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === art.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...art, quantity: 1 }];
    });
    setDrawerOpen(true);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const toggleCart = () => setDrawerOpen((open) => !open);

  // Just close the drawer on checkout because Cart.js handles redirect
  const onCheckout = () => {
    setDrawerOpen(false);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-[#383659] p-6 relative">
      <Header cartCount={cartCount} toggleCart={toggleCart} />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ArtworkCarousel artwork={artwork} onAddToCart={addToCart} />
                <About />
                <div className="py-12 bg-gray-50">
                  <ContactForm />
                </div>
              </>
            }
          />
          <Route path="/shop" element={<Shop onAddToCart={addToCart} />} />
          {/* Removed /checkout route and Checkout component */}
        </Routes>
      </main>

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen max-h-screen bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50
          flex flex-col
          ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}
          w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl`}
      >
        <div className="flex justify-end p-4 border-b">
          <button
            onClick={toggleCart}
            className="text-gray-700 hover:text-gray-900 focus:outline-none text-2xl font-bold"
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <Cart
            cartItems={cart}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            onCheckout={onCheckout}
            clearCart={clearCart}
          />
        </div>
      </div>

      {drawerOpen && (
        <div
          onClick={toggleCart}
          className="fixed inset-0 bg-black opacity-50 z-40"
        />
      )}

      <footer className="mt-20 p-6 bg-[#272640] text-[#D9BB96] text-center">
        &copy; 2025 Solar Bunny Gallery
      </footer>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
