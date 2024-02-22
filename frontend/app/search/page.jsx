'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Postcard from '../components/Postcard';

const SearchPage = () => {
  const [blogResults, setBlogResults] = useState([]);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:3000/api-blog/search?search=${searchTerm}`);
        
        const data = await response.json();

        if (response.ok) {
          setBlogResults(data.blogResult);
          console.log(data.blogResult);
        } else {
          console.error('Error fetching data:', error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='flex items-center justify-start mt-20 mb-20 ml-72'>
      <svg class="w-16 h-16 text-gray-800 dark:text-white items-center flex justify-center mt-4 mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
      </svg>
      <h1 className='head_text text-white'>Results for "{searchTerm}"</h1>
      </div>
      {blogResults.length === 0 ? (
        <p className="text-center text-gray-300">There are no posts available.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-5 mx-auto">
          {blogResults.map((blog, index) => (
            <Postcard key={index} blog={blog} />
          ))}
        </div>
      )}
    </>
  )
}

export default SearchPage