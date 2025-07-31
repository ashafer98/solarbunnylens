import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

const concertImages = [
  "/images/Concert/ImagesOfEden.jpg",
  // ...
];
const modelImages = [
  "/images/Model/Amayah.jpg",
  "/images/Model/AmayahI.jpg",
  "/images/Model/AmayahII.jpg",
  "/images/Model/AmayahIII.jpg",
  "/images/Model/AmayahIV.jpg",
];
const eventImages = [
  "/images/Event/Prom.jpg",
  "/images/Event/PromI.jpg",
  "/images/Event/PromII.jpg",
  "/images/Event/PromIII.jpg",
  "/images/Event/PromIV.jpg",
];

const slides = [

  {
    title: 'Concert Photography',
    image: concertImages[0],
    link: '/portfolio#concert',
  },
  {
    title: 'Model Photography',
    image: modelImages[4],
    link: '/portfolio#model',
  },
  {
    title: 'Event Photography',
    image: eventImages[3], 
    link: '/portfolio#event',
  },
];

export default function GalleryCarousel() {
  return (
    <div className="w-full max-w-5xl mx-auto py-10">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link to={slide.link}>
              <div className="rounded-2xl overflow-hidden shadow-lg group cursor-pointer transform transition-transform hover:scale-105">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-white dark:bg-zinc-800">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
                    {slide.title}
                  </h3>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
