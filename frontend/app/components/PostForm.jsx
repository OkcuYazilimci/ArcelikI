'use client'

// Import the necessary dependencies
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';


const Form = () => {
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
      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay rounded-xl">
            <div id="wifi-loader">
              <svg className="circle-outer" viewBox="0 0 86 86">
                  <circle className="back" cx="43" cy="43" r="40"></circle>
                  <circle className="front" cx="43" cy="43" r="40"></circle>
                  <circle className="new" cx="43" cy="43" r="40"></circle>
              </svg>
              <svg className="circle-middle" viewBox="0 0 60 60">
                  <circle className="back" cx="30" cy="30" r="27"></circle>
                  <circle className="front" cx="30" cy="30" r="27"></circle>
              </svg>
              <svg class="circle-inner" viewBox="0 0 34 34">
                  <circle className="back" cx="17" cy="17" r="14"></circle>
                  <circle className="front" cx="17" cy="17" r="14"></circle>
              </svg>
              <div className="text" data-text="Generating"></div>
            </div>
        </div>
      )}

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
          
        <div className='flex-center mx-7 my-5 gap-5'>
          <button type='submit' class="button7">
            <div class="dots_border"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="sparkle"
            >
              <path
                class="path"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke="black"
                fill="black"
                d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
              ></path>
              <path
                class="path"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke="black"
                fill="black"
                d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
              ></path>
              <path
                class="path"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke="black"
                fill="black"
                d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
              ></path>
            </svg>
            <span class="text_button">Generate</span>
          </button>


          {/* <button
          type='submit'
          className='px-5 py-1.5 text-sm border create-button rounded-full bg-white text-black border-black transition-all duration-300 hover:bg-black hover:text-white hover:font-bold'
          disabled={loading} // Disable the button when loading
          >
          {loading ? 'Creating...' : 'Create'}
        </button> */}
        </div>
      </form>
    </section>
  );
};

export default Form;
