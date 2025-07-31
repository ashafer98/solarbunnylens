// src/components/About.js
import React from 'react';

export default function About() {
  return (
    <section
      id="about"
      className="max-w-4xl mx-auto p-6 bg-gray-50 rounded shadow"
      style={{
        paddingTop: '10px',
        marginTop: '2rem',
        marginBottom: '2rem',
        paddingBottom: '2rem',
      }}
    >
      <h2 className="text-3xl font-bold mb-4 text-center">Artist Statement</h2>

      {/* Image above the statement */}
      <div className="flex justify-center mb-6">
        <img
          src="/images/Angelica_Artist.jpg"
          alt="Angelica portrait"
          className="rounded max-w-full h-auto shadow-lg"
        />
      </div>

      <p className="mb-4">
    I am a Ukrainian-born visual artist, and my journey through drawing and painting has always been about exploring the stories that shape who we are. After moving to the U.S., I encountered pop surrealism during a visit to San Francisco’s galleries, and it left a lasting impact on me. This visual language became a way to express the duality of two worlds and the complexity of storytelling.
  </p>
  <p className="mb-4">
    My work explores themes of memory, migration, and identity through a surrealist lens. Drawing has always been my preferred method of storytelling, where I blend personal history with symbolic and dreamlike imagery. Each piece reflects a sense of belonging and transformation within a layered cultural landscape.
  </p>
  <p className="mb-6">
    In addition to my visual art practice, I have spent the past decade immersed in concert, event, wedding, and model photography. Photography has become a parallel passion, allowing me to capture fleeting moments and emotions that transform into lasting memories. I am especially drawn to genuine smiles and the joy they reflect. The music and fashion industries have also deeply influenced my lifestyle and creative sensibilities, constantly shaping my aesthetic and approach across various mediums.
  </p>
    </section>
  );
}
