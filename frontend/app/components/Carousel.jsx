import React from 'react';

const LandingPageCarousel = () => {
  return (
    <>
      <div className="pyramid">
        <div className="glow"></div>
        <div>
          <span style={{ '--i': 0 }}></span>
          <span style={{ '--i': 1 }}></span>
          <span style={{ '--i': 2 }}></span>
          <span style={{ '--i': 3 }}></span>
        </div>
      </div>
    </>
  );
};

export default LandingPageCarousel;
