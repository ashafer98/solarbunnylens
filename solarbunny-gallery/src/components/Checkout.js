import React from 'react';
import CheckoutForm from './CheckoutForm';

const Checkout = ({ cartItems, clearCart }) => {
  // Guard against undefined cartItems by defaulting to empty array
  const safeCartItems = cartItems || [];

  return (
    <div className="checkout-page p-6">
      <h1 className="text-2xl mb-4">Checkout</h1>
      {safeCartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <CheckoutForm cartItems={safeCartItems} clearCart={clearCart} />
      )}
    </div>
  );
};

export default Checkout;
