'use client';

import React, { useState, useEffect } from 'react';

const LandingPageCarousel = () => {
  const images = [
    'https://piktochart.com/wp-content/uploads/2023/11/pope-wearing-balenciaga-jacket-viral-ai-images.jpeg',
    'https://firebasestorage.googleapis.com/v0/b/arcelikai.appspot.com/o/images%2F1706623097744?alt=media&token=ce78fe3a-10b4-48d2-8899-ce4483d930ee',
    'https://piktochart.com/wp-content/uploads/2023/11/pope-wearing-balenciaga-jacket-viral-ai-images.jpeg',
    'https://img.freepik.com/free-photo/landscape-morning-fog-mountains-with-hot-air-balloons-sunrise_335224-794.jpg?w=740&t=st=1692619958~exp=1692620558~hmac=d2e0e7c3c55857d0bb617b4b5b4deb0c7c67c6677c1eaa8b4c73d50445ece5bf',
    'https://piktochart.com/wp-content/uploads/2023/11/pope-wearing-balenciaga-jacket-viral-ai-images.jpeg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [images.length]);

  return (
    <div className="img-container">
    {images.map((imageUrl, index) => (
      <div key={index} className={`box ${index === currentImageIndex ? 'active' : ''}`}>
        <div className='animate-pulse'></div>
      </div>
    ))}
  </div>
  );
};

export default LandingPageCarousel;
