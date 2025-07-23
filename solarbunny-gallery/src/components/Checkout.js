import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cartItems, clearCart }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.07;
  const shipping = cartItems.length > 0 ? 5.99 : 0;
  const total = subtotal + tax + shipping;

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.state.trim()) newErrors.state = 'State is required';
    if (!form.zip.trim()) newErrors.zip = 'Zip code is required';
    if (!form.cardNumber.trim() || form.cardNumber.length < 13) newErrors.cardNumber = 'Valid card number is required';
    if (!form.expiry.trim()) newErrors.expiry = 'Expiry date is required';
    if (!form.cvv.trim() || form.cvv.length < 3) newErrors.cvv = 'Valid CVV is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Here you would integrate with payment processing API

    alert('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md my-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Order Summary */}
      <section className="mb-6 border p-4 rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <ul>
          {cartItems.map(({ id, title, quantity, price }) => (
            <li key={id} className="flex justify-between mb-2">
              <span>{title} x {quantity}</span>
              <span>${(price * quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t mt-4 pt-4 space-y-1 text-right">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Tax: ${tax.toFixed(2)}</p>
          <p>Shipping: ${shipping.toFixed(2)}</p>
          <p className="font-bold text-lg">Total: ${total.toFixed(2)}</p>
        </div>
      </section>

      {/* Checkout Form */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={form.address}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1" htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              value={form.city}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>

          <div className="flex-1">
            <label className="block font-semibold mb-1" htmlFor="state">State</label>
            <input
              type="text"
              name="state"
              id="state"
              value={form.state}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
          </div>

          <div className="flex-1">
            <label className="block font-semibold mb-1" htmlFor="zip">Zip Code</label>
            <input
              type="text"
              name="zip"
              id="zip"
              value={form.zip}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.zip ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
          </div>
        </div>

        {/* Payment Section */}
        <h2 className="text-xl font-semibold mb-4 mt-6">Payment Details</h2>

        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            id="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            maxLength={16}
            className={`w-full p-2 border rounded ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1" htmlFor="expiry">Expiry Date (MM/YY)</label>
            <input
              type="text"
              name="expiry"
              id="expiry"
              value={form.expiry}
              onChange={handleChange}
              maxLength={5}
              placeholder="MM/YY"
              className={`w-full p-2 border rounded ${errors.expiry ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry}</p>}
          </div>

          <div className="flex-1">
            <label className="block font-semibold mb-1" htmlFor="cvv">CVV</label>
            <input
              type="password"
              name="cvv"
              id="cvv"
              value={form.cvv}
              onChange={handleChange}
              maxLength={4}
              className={`w-full p-2 border rounded ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#D9BB96] text-[#272640] font-bold py-3 rounded hover:bg-opacity-90 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
