import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center flex-col mt-10">
      <h1 className="head_text text-white mb-3">Oops!</h1>
      <h3 className='head_text text-white'>
        Go back and <a className='purple_gradient hover-effect-button' href='/login'>create an account</a> please!
      </h3>
    </div>
  );
}

export default NotFound;
