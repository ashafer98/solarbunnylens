import React from 'react';

const ArtworkCard = ({ art, onAddToCart }) => {
  if (!art) return null; // Avoid error if art is undefined

  return (
    <div className="border rounded shadow p-4 hover:shadow-lg transition cursor-pointer">
      <img
        src={art.image}
        alt={art.title}
        className="w-full h-auto max-h-72 object-contain rounded"
      />
      <h3 className="font-bold text-xl">{art.title}</h3>
      <p className="text-gray-700">{art.description}</p>
      <p className="font-semibold mt-2">${art.price.toFixed(2)}</p>
      <button
        onClick={() => onAddToCart(art)}
        className="mt-2 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ArtworkCard;
