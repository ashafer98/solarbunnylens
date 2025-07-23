import React from 'react';
import ArtworkCard from './ArtworkCard';

const ArtworkGrid = ({ artwork, onAddToCart }) => {
  if (!artwork || artwork.length === 0) {
    return <p className="text-center text-gray-600">No artwork available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
      {artwork.map((art) => (
        <ArtworkCard key={art.id} art={art} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default ArtworkGrid;
