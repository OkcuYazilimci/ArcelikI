'use client'

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';

const Form = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    prompt: '',
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you have a backend API endpoint for handling blog submissions
    const response = await fetch('/api/posts/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        user: session?.user?.id,
      }),
    });

    if (response.ok) {
      console.log('Blog entry submitted successfully!');
      // Optionally, you can redirect the user to another page or perform any other action
    } else {
      console.error('Error submitting blog entry');
    }
  };

  return (
    <section className='w-full max-w-full flex items-center justify-center flex-col mt-10'>
      <h1 className='head_text text-left'>
        <span className='purple_gradient'>Create an Art</span>
      </h1>
      <p className='desc text-center max-w-md'>
        Create and share amazing AI Art with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Write and create your AI Art
          </span>
          <textarea
            name='prompt' // Added 'name' attribute to match state key
            value={formData.prompt}
            onChange={handleChange}
            placeholder='Write your prompt here...'
            required
            className='form_textarea border'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Title for your post</span>
          <input
            name='title' // Added 'name' attribute to match state key
            value={formData.title}
            onChange={handleChange}
            type='text'
            placeholder='Title for your post'
            required
            className='form_input border'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Description</span>
          <input
            name='description' // Added 'name' attribute to match state key
            value={formData.description}
            onChange={handleChange}
            type='text'
            placeholder='Description for your post'
            required
            className='form_input border'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-white text-sm border bg-red-500 rounded-full px-5 py-1.5'>
            Cancel
          </Link>

          <button
            type='submit'
            className='px-5 py-1.5 text-sm bg-green-500 rounded-full text-white border'
          >
            Create
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;