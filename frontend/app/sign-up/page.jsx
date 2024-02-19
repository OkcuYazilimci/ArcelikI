'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react';

const Signup = () => {
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api-user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User signed up successfully:', data.user);
        toast.success('User signed up successfully');
        router.push('/login');
      } else if (response.status === 400 && data.message.includes('User already exists')) {
        console.error('User with the same email already exists');
        toast.error('User with the same email already exists');
      } else {
        console.error('Error signing up:', data.message);
        toast.error('Error signing up');
      }
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <section className=''>
      <div className="flex items-center justify-center min-h-screen">
        <form onSubmit={handleSubmit}> {/* Wrap your input fields and button in a form */}
          <div
            className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl post_box_shadow rounded-2xl md:flex-row md:space-y-0"
          >
            <div className="flex flex-col justify-center p-8 md:p-14">
              <span className="mb-3 text-4xl font-bold">Sign Up</span>
              <span className="font-light text-gray-400 mb-4">
                Please enter your details below to Sign Up!
              </span>
              <div className="py-4">
                <span className="mb-2 text-md">First Name</span>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  name="firstName"
                  id="firstName"
                  onChange={handleChange}
                />
              </div>
              <div className="py-4">
                <span className="mb-2 text-md">Last Name</span>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  name="lastName"
                  id="lastName"
                  onChange={handleChange}
                />
              </div>
              <div className="py-4">
                <span className="mb-2 text-md">Email</span>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  name="email"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div className="py-4">
                <span className="mb-2 text-md">Password</span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                Already a member? <a href='/login' className='font-bold hover:underline'>Log in</a>
              </div>
              <div className="flex w-full justify-end mt-4">
                {/* Your Sign Up button */}
                <button
                  type="submit" // Specify the type as "submit" for the button
                  className="border border-2 bg-black text-white hover:text-gray-600 hover:bg-white create-button font-bold py-2 px-4 rounded-full"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
