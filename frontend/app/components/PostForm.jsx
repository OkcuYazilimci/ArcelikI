'use client'

// Import the necessary dependencies
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';


const Form = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '', // Add the image field
    user: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Set loading to true when submitting the form

      const response = await fetch('http://localhost:3000/api-blog/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          user: cookies.userId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Created successfully!")
        router.push("/");
      } else {
        toast.error("Sorry! There was an error.")
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Set loading to false when the operation is completed
    }
  };
  

  return (
    <section className='w-full max-w-full flex items-center justify-center flex-col mt-10'>
      <p className='head_text text-white'>Create a post</p>
      <p className='text-gray-300 mt-5'>Share your exceptional AI Arts and inspire others with the power of your imagination!</p>
      <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
        {/* <label>
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
        </label> */}

        <label>
          <span className='font-satoshi font-semibold text-base text-white'>Title</span>
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
          <span className='font-satoshi font-semibold text-base text-white'>Description</span>
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

        {/* Image URL field */}
        {/*<label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Image URL</span>
          <input
            name='image'
            value={formData.image}
            onChange={handleChange}
            type='text'
            placeholder='Image URL for your post'
            required
            className='form_input border'

          />
        </label>*/}

        <div className='flex-end mx-3 mb-5 gap-5'>
          <Link href='/' className='px-5 py-1.5 text-sm border create-button rounded-full bg-white text-black border-black transition-all duration-300 hover:bg-black hover:text-white hover:font-bold inline-block text-center'>
            Cancel
          </Link>

          {/* Loading Overlay */}
          {loading && (
            <div className="loading-overlay rounded-xl">
              <div className="loading-spinner"></div>
            </div>
          )}

          <button
          type='submit'
          className='px-5 py-1.5 text-sm border create-button rounded-full bg-white text-black border-black transition-all duration-300 hover:bg-black hover:text-white hover:font-bold'
          disabled={loading} // Disable the button when loading
          >
          {loading ? 'Creating...' : 'Create'}
        </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
