import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import ArtworkCarousel from './components/ArtworkCarousel';
import Cart from './components/Cart';
import About from './components/About';
import Shop from './pages/shop';
import Checkout from './components/Checkout';  // import Checkout
import { artwork } from './data/art';

// Wrapper component to use hooks inside Router
const AppContent = () => {
  const location = useLocation();

  const [cart, setCart] = useState([]);

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

  return (
    <div className="min-h-screen bg-white text-[#383659] p-6">
      <Header />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ArtworkCarousel artwork={artwork} onAddToCart={addToCart} />
                <About />
              </>
            }
          />
          <Route path="/shop" element={<Shop onAddToCart={addToCart} />} />
          <Route
            path="/checkout"
            element={<Checkout cartItems={cart} clearCart={clearCart} />}
          />
        </Routes>

        {/* Render Cart only if NOT on checkout page */}
        {location.pathname !== '/checkout' && (
          <div className="bg-[#272640] text-[#D9BB96] rounded p-4 mt-10">
            <Cart
              cartItems={cart}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          </div>
        )}
      </main>

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
