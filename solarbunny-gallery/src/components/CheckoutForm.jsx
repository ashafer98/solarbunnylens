// src/components/CheckoutForm.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ cartItems, clearCart }) => {
  const stripe = useStripe();
  const elements = useElements();

  // Form state without phone
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('US'); // default to US
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [success, setSuccess] = useState(false);

  // Shipping and tax constants
  const SHIPPING_COST = 5.99; // flat shipping rate
  const TAX_RATE = 0.08; // 8% tax rate example

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Calculate tax and total including shipping
  const taxAmount = +(subtotal * TAX_RATE).toFixed(2);
  const totalAmount = +(subtotal + SHIPPING_COST + taxAmount).toFixed(2);
  const amountInCents = Math.round(totalAmount * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    if (!stripe || !elements) {
      setErrorMsg('Stripe has not loaded yet.');
      setLoading(false);
      return;
    }

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !address1.trim() ||
      !city.trim() ||
      !state.trim() ||
      !zip.trim() ||
      !country.trim()
    ) {
      setErrorMsg('Please fill out all required fields.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:4242/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountInCents }),
      });

      const { clientSecret } = await response.json();

      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${firstName} ${lastName}`,
            email,
            address: {
              line1: address1,
              line2: address2 || undefined,
              city,
              state,
              postal_code: zip,
              country,
            },
          },
        },
      });

      if (paymentResult.error) {
        setErrorMsg(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === 'succeeded') {
        setSuccess(true);
        clearCart();
      }
    } catch (error) {
      setErrorMsg('Payment failed. Please try again.');
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="p-6 text-center text-green-700">
        <h2 className="text-2xl font-semibold mb-4">Payment Successful!</h2>
        <p>Thank you for your purchase.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 border rounded shadow bg-white"
    >
      <h2 className="text-2xl font-semibold mb-6">Complete Your Payment</h2>

      {/* Order Summary */}
      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map(({ id, title, quantity, price }) => (
              <li key={id} className="flex justify-between mb-2">
                <span>{title} × {quantity}</span>
                <span>${(price * quantity).toFixed(2)}</span>
              </li>
            ))}
            <li className="border-t pt-2 flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </li>
            <li className="flex justify-between">
              <span>Shipping</span>
              <span>${SHIPPING_COST.toFixed(2)}</span>
            </li>
            <li className="flex justify-between">
              <span>Tax (8%)</span>
              <span>${taxAmount.toFixed(2)}</span>
            </li>
            <li className="border-t pt-2 font-semibold flex justify-between">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </li>
          </ul>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-medium mb-1" htmlFor="firstName">
            First Name <span className="text-red-600">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#D9BB96]"
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="lastName">
            Last Name <span className="text-red-600">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#D9BB96]"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1" htmlFor="email">
          Email Address <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#D9BB96]"
        />
      </div>

      <fieldset className="mb-4 border p-4 rounded">
        <legend className="font-semibold mb-2">Shipping Address</legend>

        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="address1">
            Address Line 1 <span className="text-red-600">*</span>
          </label>
          <input
            id="address1"
            type="text"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#D9BB96]"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="address2">
            Address Line 2 (optional)
          </label>
          <input
            id="address2"
            type="text"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#D9BB96]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1" htmlFor="city">
              City <span className="text-red-600">*</span>
            </label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#D9BB96]"
            />
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="state">
              State <span className="text-red-600">*</span>
            </label>
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#D9BB96]"
            >
              <option value="">Select state</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="zip">
              Zip <span className="text-red-600">*</span>
            </label>
            <input
              id="zip"
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#D9BB96]"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="country">
            Country <span className="text-red-600">*</span>
          </label>
          <select
            id="country"
            value={country}
            disabled
            className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
          >
            <option value="US">United States</option>
          </select>
        </div>
      </fieldset>

      <div className="mb-6 p-4 border rounded">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#383659',
                '::placeholder': { color: '#a0aec0' },
              },
              invalid: { color: '#e53e3e' },
            },
          }}
        />
      </div>

      {errorMsg && (
        <div className="mb-4 text-red-600 font-semibold">{errorMsg}</div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-[#D9BB96] text-[#272640] py-3 rounded font-semibold hover:bg-opacity-90 transition"
      >
        {loading ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
