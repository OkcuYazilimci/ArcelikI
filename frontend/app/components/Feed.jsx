'use client'

import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { GET } from '../api/user/route';
import Postcard from './Postcard';

// Define the Feed component
const Feed = () => {
  // State for storing the blog data
  const [blogData, setBlogData] = useState([]);
  // const blogs = [
  //   { title: "Blog 1", description: "Description 1", image: "Image 1","user":{"displayName":"Umut Uygun","imageurl":"https://lh3.googleusercontent.com/a/ACg8ocIwY8dZ4BhczQGdFD3Jp2mEB839aofyHaHh2Jqz2p6p=s96-c"} },
  //   { title: "Blog 2", description: "Description 2", image: "Image 2", "user":{"displayName":"Umut Uygun","imageurl":"https://lh3.googleusercontent.com/a/ACg8ocIwY8dZ4BhczQGdFD3Jp2mEB839aofyHaHh2Jqz2p6p=s96-c"} },
  //   { title: "Blog 2", description: "Description 2", image: "Image 2", "user":{"displayName":"Umut Uygun","imageurl":"https://lh3.googleusercontent.com/a/ACg8ocIwY8dZ4BhczQGdFD3Jp2mEB839aofyHaHh2Jqz2p6p=s96-c"} },
  //   { title: "Blog 2", description: "Description 2", image: "Image 2", "user":{"displayName":"Umut Uygun","imageurl":"https://lh3.googleusercontent.com/a/ACg8ocIwY8dZ4BhczQGdFD3Jp2mEB839aofyHaHh2Jqz2p6p=s96-c"} },
  //   { title: "Blog 2", description: "Description 2", image: "Image 2", "user":{"displayName":"Umut Uygun","imageurl":"https://lh3.googleusercontent.com/a/ACg8ocIwY8dZ4BhczQGdFD3Jp2mEB839aofyHaHh2Jqz2p6p=s96-c"} },
  //   { title: "Blog 2", description: "Description 2", image: "Image 2", "user":{"displayName":"Umut Uygun","imageurl":"https://lh3.googleusercontent.com/a/ACg8ocIwY8dZ4BhczQGdFD3Jp2mEB839aofyHaHh2Jqz2p6p=s96-c"} },
  //   { title: "Blog 2", description: "Description 2", image: "Image 2", "user":{"displayName":"Umut Uygun","imageurl":"https://lh3.googleusercontent.com/a/ACg8ocIwY8dZ4BhczQGdFD3Jp2mEB839aofyHaHh2Jqz2p6p=s96-c"} },
  //   { title: "Blog 2", description: "Description 2", image: "Image 2", "user":{"displayName":"Umut Uygun","imageurl":"https://lh3.googleusercontent.com/a/ACg8ocIwY8dZ4BhczQGdFD3Jp2mEB839aofyHaHh2Jqz2p6p=s96-c"} },
  //   { title: "Blog 2", description: "Description 2", image: "Image 2", "user":{"displayName":"Umut Uygun","imageurl":"https://lh3.googleusercontent.com/a/ACg8ocIwY8dZ4BhczQGdFD3Jp2mEB839aofyHaHh2Jqz2p6p=s96-c"} },

  //   // Add more blog objects as needed
  // ];

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { success, data, error } = await GET();

        if (success) {
          console.log('Fetched data:', data); // Log the data
          setBlogData(data.blogs);
        } else {
          console.error('Error2 fetching data:', error);
        }
      } catch (error) {
        console.error('Error2 fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
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
      <div className="search-bar-container">
          <input
            type='text'
            placeholder='Search for a username'
            value={searchText}
            onChange={handleSearchChange}
            required
            className='search_input peer mb-20'
          />
        </div>
      <div className="flex flex-wrap justify-center gap-5 mx-auto">
        {/* Map over the appropriate array and render Postcard components */}
        {renderData.map((blog, index) => (
          <Postcard key={index} blog={blog} />
        ))}
      </div>
    </section>
  );
};

// Export the Feed component
export default Feed;
