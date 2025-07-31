import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // make sure you have react-router-dom installed
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ContactForm from './ContactForm';
import About from '../components/About';

const concertImages = [
  "/images/Concert/ImagesOfEden.jpg",
  "/images/Concert/ImagesOfEdenI.jpg",
  "/images/Concert/ImagesOfEdenII.jpg",
  "/images/Concert/ImagesOfEdenIII.jpg",
  "/images/Concert/ImagesOfEdenIV.jpg",
  "/images/Concert/ImagesOfEdenV.jpg",
  "/images/Concert/Kickstands.jpg",
  "/images/Concert/KickstandsI.jpg",
  "/images/Concert/KickstandsII.jpg",
  "/images/Concert/KickstandsIII.jpg",
  "/images/Concert/KickstandsIV.jpg",
  "/images/Concert/SinCircus.jpg",
  "/images/Concert/SinCircusI.jpg",
  "/images/Concert/SinCircusII.jpg",
  "/images/Concert/SinCircusIII.jpg",
  "/images/Concert/SinCircusIV.jpg",
  "/images/Concert/SinCircusV.jpg",
];

const modelImages = [
  "/images/Model/Amayah.jpg",
  "/images/Model/AmayahI.jpg",
  "/images/Model/AmayahII.jpg",
  "/images/Model/AmayahIII.jpg",
  "/images/Model/AmayahIV.jpg",
  "/images/Model/Anya.jpg",
  "/images/Model/Lexi.jpg",
  "/images/Model/LexiI.jpg",
  "/images/Model/LexiII.jpg",
  "/images/Event/SarahDawn.jpg",
  "/images/Event/SarahDawnI.jpg",
  "/images/Event/SarahDawnII.jpg",
];

const eventImages = [
  "/images/Event/Prom.jpg",
  "/images/Event/PromI.jpg",
  "/images/Event/PromII.jpg",
  "/images/Event/PromIII.jpg",
  "/images/Event/PromIV.jpg",
  "/images/Event/Fundraiser.jpg",
  "/images/Event/FundraiserI.jpg",
  "/images/Event/FundraiserII.jpg",
  "/images/Event/FundraiserIII.jpg",
  "/images/Event/LVAwards.jpg",
  "/images/Event/LVAwardsI.jpg",
  "/images/Event/LVAwardsII.jpg",
  "/images/Event/LVAwardsIII.jpg",
  "/images/Event/LVAwardsIV.jpg",
  "/images/Event/LopezWD.jpg",
  "/images/Event/LopezWDI.jpg",
];

export default function PortfolioCarousel() {
  const imageWidth = 800;
  const imageHeight = 500;

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        const yOffset = -80; // adjust this offset to your fixed header height
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [location]);

  const renderCarousel = (images, title, ariaLabel, id) => (
    <section className="max-w-4xl mx-auto py-10 relative">
      {/* Invisible spacer for anchor offset */}
      <div id={id} className="absolute -top-20" /> 
      {/* -top-20 = -80px offset; adjust if your header is taller */}
      
      <h2 className="text-3xl font-semibold text-center mb-6">{title}</h2>
      <Carousel
        showThumbs={true}
        autoPlay
        infiniteLoop
        showStatus={false}
        interval={4000}
        swipeable
        emulateTouch
        dynamicHeight={false}
        ariaLabel={ariaLabel}
        thumbWidth={100}
        useKeyboardArrows
      >
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`${title} Image ${index + 1}`}
              loading="lazy"
              width={imageWidth}
              height={imageHeight}
              className="rounded-xl shadow-lg object-contain mx-auto max-h-[500px] w-full"
              style={{ maxWidth: '100%', height: 'auto' }}
              decoding="async"
            />
          </div>
        ))}
      </Carousel>
    </section>
  );

  return (
    <>
      {/* Introductory text with navigation anchors */}
      <section className="max-w-4xl mx-auto px-6 py-10 text-center" style={{ paddingTop: '80px' }}>
        <h1 className="text-4xl font-bold mb-4">Photography Services</h1>
        <p className="mb-6 text-lg text-gray-700 max-w-3xl mx-auto">
          I offer professional photography services specializing in Concert, Model, and Event photography. Browse through my galleries below to explore my work and see the unique moments I've captured.
        </p>
        <nav className="space-x-6">
          <a href="#concert" className="text-accent font-semibold hover:underline">Concert</a>
          <a href="#model" className="text-accent font-semibold hover:underline">Model</a>
          <a href="#event" className="text-accent font-semibold hover:underline">Event</a>
        </nav>
      </section>

      {/* Carousels */}
      {renderCarousel(concertImages, "Concert Gallery", "Concert photos carousel", "concert")}
      {renderCarousel(modelImages, "Model Gallery", "Model photos carousel", "model")}
      {renderCarousel(eventImages, "Special Event Gallery", "Event photos carousel", "event")}

      {/* About Section */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-12">
        <About />
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-12">
        <ContactForm />
      </section>
    </>
  );
}
