'use client';

import React, { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { GET } from '../api/posts/route';
import Postcard from './Postcard';
import Link from 'next/link';
import Loadingcard from './Loadingcard';

// Define the Feed component
const Feed = () => {
  // State for storing the blog data
  const [blogData, setBlogData] = useState([]);
  // State for managing the loading state
  const [isLoading, setIsLoading] = useState(true);

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading to true before fetching data
        const { success, data, error } = await GET();

        if (success) {
          console.log('Fetched data:', data); // Log the data
          setBlogData(data.blogs);
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

  const filterPrompts = (searchtext) => {
    const escapedSearchText = searchtext.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedSearchText, 'i'); // 'i' flag for case-insensitive search
    return blogData.filter(
      (item) =>
        regex.test(item.user.name) ||
        regex.test(item.title) ||
        regex.test(item.user.email) ||
        regex.test(item.description)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  // Determine which array to use for rendering
  const renderData = searchText ? searchedResults : blogData;

  // Return the JSX for rendering the component
  return (
    <section className="gap-2 mt-16">
      <div className="search-bar-container flex justify-center items-center gap-2">
        <input
          type="text"
          placeholder="Search for a username or description"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer mb-20"
        />
        <Link href="/create-post" className="mb-20 border rotating-border rounded-full p-2 hidden md:block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 items-center flex" viewBox="0 0 20 20" fill="black">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm4 11h-3v3a1 1 0 0 1-2 0v-3H6a1 1 0 0 1 0-2h3V6a1 1 0 0 1 2 0v3h3a1 1 0 0 1 0 2z"/>
          </svg>
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <Suspense fallback={<div className=""></div>}>
          <div className="flex flex-wrap justify-center gap-5 mx-auto">
            {isLoading ? (
              <Loadingcard />
            ) : renderData.length === 0 ? (
              <p className="text-center text-gray-500">There are no posts available.</p>
            ) : (
              renderData.map((blog, index) => <Postcard key={index} blog={blog} />)
            )}
          </div>
        </Suspense>
      </div>
    </section>
  );
};

// Export the Feed component
export default Feed;
