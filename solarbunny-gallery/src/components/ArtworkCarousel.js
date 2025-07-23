import React, { useState } from 'react';

const ArtworkCarousel = ({ artwork, onAddToCart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevArtwork = () => {
    setCurrentIndex((prev) => (prev === 0 ? artwork.length - 1 : prev - 1));
  };

  const nextArtwork = () => {
    setCurrentIndex((prev) => (prev === artwork.length - 1 ? 0 : prev + 1));
  };

  const selectArtwork = (index) => {
    setCurrentIndex(index);
  };

  const currentArt = artwork[currentIndex];

  return (
    <div className="max-w-5xl mx-auto mt-8"> {/* Added mt-8 for spacing from header */}
      <div className="relative mb-6 flex items-center justify-center">
        <button
          onClick={prevArtwork}
          aria-label="Previous artwork"
          className="absolute left-0 z-10 p-3 bg-primary text-white rounded-full hover:bg-secondary transition"
        >
          &#8592;
        </button>

        <img
          src={currentArt.image}
          alt={currentArt.title}
          className="w-full max-h-[500px] object-contain rounded shadow-lg"
        />

        <button
          onClick={nextArtwork}
          aria-label="Next artwork"
          className="absolute right-0 z-10 p-3 bg-primary text-white rounded-full hover:bg-secondary transition"
        >
          &#8594;
        </button>
      </div>

      <h2 className="mt-4 text-3xl font-bold text-primary">{currentArt.title}</h2>
      <p className="mt-2 text-primary">{currentArt.description}</p>
      <p className="mt-1 italic text-sm text-gray-600">Type: {currentArt.type}</p> {/* NEW LINE */}
      <p className="mt-1 font-semibold text-primary">${currentArt.price.toFixed(2)}</p>

      <button
        onClick={() => onAddToCart(currentArt)}
        className="mt-4 bg-accent text-white px-6 py-2 rounded hover:bg-accent-dark transition"
      >
        Add to Cart
      </button>

      <div className="flex space-x-4 overflow-x-auto mt-6 pb-2">
        {artwork.map((art, index) => (
          <button
            key={art.id}
            onClick={() => selectArtwork(index)}
            className={`flex-shrink-0 w-24 h-24 rounded overflow-hidden border-4 focus:outline-none
              ${
                index === currentIndex
                  ? 'border-accent'
                  : 'border-transparent hover:border-secondary'
              }
            `}
            aria-label={`View artwork: ${art.title}`}
          >
            <img
              src={art.image}
              alt={art.title}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ArtworkCarousel;
