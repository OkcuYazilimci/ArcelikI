'use client';

import React from 'react';
import { useEffect } from 'react';

const Login = () => {
  useEffect(() => {
    const handleGoogleLogin = () => {
<<<<<<< HEAD
      window.location.href = 'http://localhost:3000/auth/google/'; // Replace with your actual backend route
=======
      window.location.href = 'http://localhost:3000/auth/google'; // Replace with your actual backend route
>>>>>>> a852c82b9c883fb9eb9d3a71ce75a0ab3dbf4a95
    };

    const googleButton = document.getElementById('googleButton');
    googleButton.addEventListener('click', handleGoogleLogin);

    return () => {
      googleButton.removeEventListener('click', handleGoogleLogin);
    };
  }, []);

  return (
    <section className='post_box_shadow'>
      <div class="flex items-center justify-center min-h-screen">
      <div
        class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl post_box_shadow rounded-2xl md:flex-row md:space-y-0"
      >
        <div class="flex flex-col justify-center p-8 md:p-14">
          <span class="mb-3 text-4xl font-bold">Welcome to Arch!</span>
          <span class="font-light text-gray-400 mb-4">
            Please enter your details below
          </span>
          {/* <div class="py-4">
            <span class="mb-2 text-md">Email</span>
            <input
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
            />
          </div>
          <div class="py-4">
            <span class="mb-2 text-md">Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <button
            class="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white p-2 rounded-lg mb-8 hover:bg-white hover:bg-purple-400"
          >
            Sign in
          </button> */}
          <button
            id="googleButton"
            className="w-full border border-gray-300 text-md p-2 rounded-lg mb-3 hover:bg-gray-500 hover:text-white"
          >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="w-6 h-6 inline mr-2">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            <path d="M1 1h22v22H1z" fill="none"/>
          </svg>
            Sign in with Google
          </button>
          {/* <button class="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-gray-500 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="w-6 h-6 inline mr-2">
              <path
                fill="#000000"
                d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.284-.01-1.04-.015-2.042-3.338.724-4.042-1.61-4.042-1.61-.547-1.387-1.336-1.755-1.336-1.755-1.09-.745.083-.729.083-.729 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.809 1.304 3.496.998.109-.776.418-1.304.762-1.604-2.67-.305-5.467-1.336-5.467-5.93 0-1.31.468-2.38 1.237-3.22-.124-.304-.536-1.524.116-3.176 0 0 1.01-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.29-1.552 3.298-1.23 3.298-1.23.652 1.652.24 2.872.12 3.176.75.84 1.206 1.91 1.206 3.22 0 4.608-2.802 5.623-5.476 5.922.43.372.81 1.097.81 2.213 0 1.6-.015 2.887-.015 3.28 0 .32.21.695.825.576C20.565 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12"
              />
            </svg>
            Sign in with GitHub
          </button> */}

          <div class="text-center text-gray-400">
            Dont'have an account?
            <span class="font-bold text-black"> Sign up for free</span>
          </div>
        </div>
      </div>
    </div>
    </section>
  )
}

export default Login