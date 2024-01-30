'use client'

import { useState, useEffect } from "react";
import Loadingcard from "./Loadingcard";
import Postcard from "./Postcard";

const Profile = ({ name, desc, profileImage, blog, handleEdit, handleDelete }) => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call or any asynchronous operation
    const fetchData = async () => {
      // Simulating a delay of 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    fetchData();
  }, []); 

  return (
    <section className='w-full max-w-full flex items-center justify-center flex-col mt-10'>
      <img
        src={profileImage}
        alt="Profile Picture"
        className="rounded-full border-2 border-gray-500 shadow-xl mt-10"
        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
      />
      <h1 className="head_text purple_gradient text-center">{name}'s Collection</h1>
      <p className="mt-4">{desc}</p>
      <div className='mt-10 post_layout'>
        {/* Display loading card while loading */}
        {isLoading ? (
          <Loadingcard />
        ) : (
          // Display Personal Posts once loading is complete
          <div className="flex flex-wrap justify-center gap-5 mx-auto">
            {blog.map((blogItem, index) => (
              <Postcard
                key={index}
                blog={blogItem}
                // handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete(blogItem._id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
};

export default Profile;
