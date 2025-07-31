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
        I am a Ukrainian-born conceptual artist working primarily in drawing and painting. After moving to the United States, I encountered pop surrealism while visiting galleries in San Francisco. That experience deeply influenced my creative direction, introducing me to a visual language that reflects both dislocation and imagination.
      </p>
      <p className="mb-6">
        My work explores themes of memory, migration, and identity through a surrealist lens. Drawing is my way of storytelling, blending personal history with symbolic and dreamlike imagery. Each piece becomes a reflection of belonging and transformation within a layered cultural landscape.
      </p>
    </section>
  );
}
