import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_URL_LOCAL   // local dev
    : process.env.REACT_APP_API_URL;        // production


function SuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID found in URL.');
      setLoading(false);
      return;
    }

    async function fetchSession() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/checkout-session/${sessionId}`);

        if (!res.ok) {
          throw new Error('Failed to fetch checkout session');
        }
        const data = await res.json();
        setSession(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, [sessionId]);

  if (loading) return <p>Loading order summary...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  const formatPrice = (cents) => `$${(cents / 100).toFixed(2)}`;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Thank you for your purchase!</h1>
      <p>Your payment was successful.</p>

      <h2 className="mt-6 text-xl font-semibold">Order Summary</h2>
      {session.line_items?.data?.length > 0 ? (
        <ul>
          {session.line_items.data.map(item => (
            <li key={item.id} className="border-b py-2">
              {item.description} × {item.quantity} — {formatPrice(item.amount_total)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No line items found.</p>
      )}

      <p className="mt-4 font-semibold text-lg">
        Total paid: {formatPrice(session.amount_total)}
      </p>

      <Link
        to="/shop"
        className="inline-block mt-6 bg-[#D9BB96] text-[#272640] py-3 px-6 rounded font-semibold hover:bg-opacity-90 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default SuccessPage;
