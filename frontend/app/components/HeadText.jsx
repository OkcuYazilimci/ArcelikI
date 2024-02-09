'use client';

import React, {useEffect, useState} from 'react';

const TypingComponent = () => {

  return (
    <div>
      <section className='main_text w-full flex-center flex-col mt-10 ml-10'>
          {/* <LandingPageCarousel /> */}
          <h1 className='head_text text-center text-white drop-shadow-2xl'>
            Welcome to Arch!
            <br className='max-md:hidden' />
          </h1>
          <div>
          <h1 className='typing-first text-white drop-shadow-2xl'>
            You can&nbsp;<span className="typewriter thick"></span>
          </h1>
          </div>
        </section> 
    </div>
  );
};

export default TypingComponent;
