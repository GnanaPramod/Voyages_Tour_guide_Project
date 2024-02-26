import React, { useEffect } from 'react';
import Swiper from 'swiper';
import img1 from '../../components/imgs/pondicherry.webp';

const DayNight = () => {
  useEffect(() => {
    const swiper = new Swiper(".swiper-container", {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
      },
    });
    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <img src={img1} alt="Slide 1" />
        </div>
        <div className="swiper-slide">
          <img src="https://via.placeholder.com/800x600" alt="Slide 2" />
        </div>
        <div className="swiper-slide">
          <img src="https://via.placeholder.com/800x600" alt="Slide 3" />
        </div>
        {/* Add more slides as needed */}
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default DayNight;
