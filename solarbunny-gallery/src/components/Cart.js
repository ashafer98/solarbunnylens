import React from 'react';

const Cart = ({ cartItems, userEmail, clearCart }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.07;
  const shipping = cartItems.length > 0 ? 5.99 : 0;
  const total = subtotal + tax + shipping;

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          items: cartItems.map(item => ({
            name: item.title,
            price: Math.round(item.price * 100), // convert dollars to cents
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (data.url) {
        clearCart(); // optional: clear cart on successful session creation
        window.location.href = data.url; // redirect to Stripe Checkout
      } else {
        alert('Failed to start checkout session.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during checkout.');
    }
  };

  return (
    <div className="fixed right-0 top-0 w-96 h-full bg-white shadow-lg p-6 flex flex-col">
      <h2 className="text-3xl font-bold mb-6 border-b pb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center text-gray-500">
          <p>Your cart is currently empty.</p>
          <a href="/shop" className="mt-4 text-[#D9BB96] font-semibold hover:underline">
            Continue Shopping →
          </a>
        </div>
      ) : (
        <>
          <div className="flex-grow overflow-y-auto space-y-4">
            {cartItems.map(({ id, title, price, quantity }) => (
              <div key={id} className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-gray-500">${price.toFixed(2)} × {quantity}</p>
                </div>
                <p className="font-medium">${(price * quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4 text-right space-y-1 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (7%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className="mt-6 bg-[#D9BB96] text-[#272640] py-3 rounded font-semibold hover:bg-opacity-90 transition"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
