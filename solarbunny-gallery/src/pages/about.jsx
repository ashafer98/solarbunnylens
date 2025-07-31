// src/pages/About.jsx
import React from 'react';

const About = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">About Me</h1>

      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <img
          src="/images/Angelica_Artist.jpg"
          alt="Angelica in artistic setting"
          className="w-full md:w-1/2 object-cover rounded-2xl shadow-lg"
        />
        <div className="text-lg text-gray-700 leading-relaxed">
          <p className="mb-4">
            My name is Angelica, and I'm located in Wyoming. I specialize in photography that captures emotion, story, and light. My passion is creating visual art that makes people feel seen and empowered.
          </p>
          <p>
            Whether it's concept shoots, model portfolios, or live events — my goal is to make your vision come to life.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <img
          src="/images/Angelica_Moskaliuk.jpg"
          alt="Angelica posing confidently"
          className="w-full md:w-2/3 object-cover rounded-2xl shadow-md"
        />
      </div>
    </section>
  );
};

export default About;
