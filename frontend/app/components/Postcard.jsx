// Import React
import React from 'react';

// Define the Postcard component
const Postcard = ({ blog }) => {
  return (
    <div className="max-w-md mx-5 bg-white rounded-xl overflow-hidden shadow-md p-1 px-4 post_box_shadow">
      <div className="pt-2 pl-2 pb-3 flex flex-row">
        <img
          src="https://picsum.photos/30/30"
          alt=""
          className="rounded-full mr-1 border-2 border-violet-500"
        />
        <p className="pt-1 pl-1 text-gray-800">{blog.user.name}</p>
      </div>
      <img
        className="w-full h-100 object-cover rounded-xl"
        src="https://picsum.photos/500/300"
        alt="Post Image"
      />
      <div className="p-6">
        <h2 className="font-bold text-xl mb-2">{blog.title}</h2>
        <p className="text-gray-600">{blog.description}</p>
      </div>
    </div>
  );
};

// Export the Postcard component
export default Postcard;
