import React from 'react';
import Loadingcard from '../components/Loadingcard';

const Loading = () => {
  return (
    <section className='w-full max-w-full flex items-center justify-center flex-col mt-10 animate-pulse'>
      <div className='rounded-full h-36 w-36 bg-gray-200'></div>
      <div className='h-8 w-2/6 rounded-md bg-gray-200 mt-5'></div>
      <div className='h-6 w-2/3 rounded-md bg-gray-200 mt-5 mb-10'></div>
      <Loadingcard />
    </section>
  );
};

export default Loading;
