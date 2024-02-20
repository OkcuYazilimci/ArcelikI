'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GET } from '../api/posts/route';
import Postcard from './Postcard';
import Loadingcard from './Loadingcard';

// Define the Feed component
const Feed = () => {
  // State for storing the blog data
  const [blogData, setBlogData] = useState([]);
  // State for managing the loading state
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState([]);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading to true before fetching data
        const { success, data, error } = await GET();

        if (success) {
          setBlogData(data.blogs);
          console.log(data.blogs);

        } else {
          console.error('Error fetching data:', error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = () => {
    // Redirect to search page with the search term
    router.push(`/search?searchTerm=${searchText}`);
  };
  

  // Return the JSX for rendering the component
  return (
    <section className="gap-2 mt-16">
      {/* SEARCH BAR */}
      <div className="search-bar-container flex justify-center items-center gap-2">
        <input
          type="text"
          placeholder="Search for a username or description"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer mb-20"
        />
        <button 
        onClick={handleButtonClick} 
        className="mb-20 border border-gray-300 bg-white rounded-md p-2.5 create-button">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 items-center flex" viewBox="0 0 50 50" fill="gray">
            <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
          </svg>
        </button>
      </div>
      <div className="flex justify-center items-center">
        {isLoading ? (
          <Loadingcard />
        ) : blogData.length === 0 ? (
          <p className="text-center text-gray-300">There are no posts available.</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-5 mx-auto">
            {blogData.map((blog, index) => (
              <Postcard key={index} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Export the Feed component
export default Feed;

