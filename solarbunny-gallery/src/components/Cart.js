import React from 'react';

const Cart = ({ cartItems, updateQuantity, removeItem, onCheckout }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.07;
  const shipping = cartItems.length > 0 ? 5.99 : 0;
  const total = subtotal + tax + shipping;

  return (
    <div className="flex flex-col h-full p-6 bg-white shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-gray-500 flex-grow flex flex-col justify-center items-center">
          <p>Your cart is currently empty.</p>
          <a
            href="/shop"
            className="inline-block mt-4 text-sm text-[#D9BB96] font-semibold hover:underline"
          >
            Continue Shopping →
          </a>
        </div>
      ) : (
        <>
          <div className="flex-grow overflow-y-auto space-y-6">
            {cartItems.map(({ id, title, price, quantity, image }) => (
              <div
                key={id}
                className="flex items-center justify-between border-b pb-4 gap-4"
              >
                <img
                  src={image}
                  alt={title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.jpg';
                  }}
                  className="w-16 h-16 object-cover rounded-md bg-gray-100"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-500">${price.toFixed(2)} each</p>

                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() => updateQuantity(id, quantity - 1)}
                      className="px-2 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-40"
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <span className="min-w-[24px] text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(id, quantity + 1)}
                      className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(id)}
                      className="ml-4 text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-right min-w-[80px] font-medium text-gray-700">
                  ${(price * quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="pt-6 border-t text-right space-y-2">
            <div className="flex justify-end">
              <div className="w-full text-sm text-gray-700">
                <div className="flex justify-between mb-1">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Estimated Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-base font-semibold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="mt-6 w-full px-6 py-3 bg-[#D9BB96] text-[#272640] font-semibold rounded-md hover:bg-opacity-90 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
