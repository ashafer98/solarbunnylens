import React from 'react';

const Cart = ({
  cartItems,
  updateQuantity,
  removeItem,
  onCheckout,
  clearCart,
  showOptions = true,
  hideRemoveButtons = false,
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const API_URL =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_API_URL_LOCAL
      : process.env.REACT_APP_API_URL;

  const handleCheckout = async () => {
    try {
      const response = await fetch(`${API_URL}/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({
          items: cartItems.map(item => ({
            name: item.title,
            quantity: item.quantity,
            price: Math.round(item.price * 100), // convert dollars to cents
          })),
        }),
      });

      const data = await response.json();

      if (data.url) {
        onCheckout();
        clearCart();
        window.location.href = data.url;
      } else {
        alert('Failed to start checkout session.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during checkout.');
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
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
          <div className="flex-grow space-y-4">
            {cartItems.map(({ id, title, price, quantity }) => (
              <div key={id} className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-gray-500">${price.toFixed(2)} × {quantity}</p>

                  {showOptions && !hideRemoveButtons && (
                    <button
                      onClick={() => removeItem(id)}
                      className="text-red-500 hover:text-red-700 text-sm mt-1"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {showOptions && (
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => updateQuantity(id, parseInt(e.target.value, 10))}
                    className="w-16 border rounded px-2 py-1 text-center"
                  />
                )}

                <p className="font-medium ml-4">${(price * quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {showOptions && (
            <>
              <div className="mt-6 border-t pt-4 text-right space-y-1 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Tax and shipping will be calculated at checkout.
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
        </>
      )}
    </div>
  );
};

export default Cart;
