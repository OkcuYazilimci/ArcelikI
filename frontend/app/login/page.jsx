'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Ensure router is used correctly

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form
    try {
      const response = await fetch('http://localhost:3000/api-user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        console.log('Login successful');
        router.push('/'); // Redirect after successful login
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred while logging in:', error);
    } finally {
      setLoading(false); // Set loading to false when the operation is completed
    }
  };

  return (
    <section className="post_box_shadow">
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl post_box_shadow rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold">Login</span>
            <span className="font-light text-gray-400 mb-4">
              Please enter your details below to Log in!
            </span>
            <form onSubmit={handleSubmit}>
              <div className="py-4">
                <span className="mb-2 text-md">Email</span>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  name="email"
                  id="email"
                  value={formData.email}
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
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-end mt-4">
                {/* Your Sign In button */}
                <button
                  type="submit"
                  className="border border-2 text-black hover:text-gray-600 create-button font-bold py-2 px-4 rounded-full mt-4"
                  disabled={loading}
                >
                  Sign In
                </button>
              </div>
            </form>
            {/* Google Sign In Button (assuming it's just a placeholder for now) */}
            <button
              className="border border-2 text-black hover:text-gray-600 create-button font-bold py-2 px-4 rounded-full mt-4"
            >
              Sign In with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

