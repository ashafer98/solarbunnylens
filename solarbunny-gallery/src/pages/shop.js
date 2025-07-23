import React, { useState, useEffect } from 'react';
import ArtworkGrid from '../components/ArtworkGrid';  // reuse grid component
import { artwork } from '../data/art';

const Shop = ({ onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArt, setFilteredArt] = useState(artwork);

  useEffect(() => {
    // Simple search filter by title or description (case-insensitive)
    const filtered = artwork.filter((art) => 
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      art.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArt(filtered);
  }, [searchTerm]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-primaryText">Shop</h1>

      <input
        type="text"
        placeholder="Search artwork..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
      />

      {/* You can add filter controls here later */}

      <ArtworkGrid artwork={filteredArt} onAddToCart={onAddToCart} />
    </div>
  );
};

export default Shop;
