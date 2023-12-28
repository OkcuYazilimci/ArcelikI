import Postcard from "./Postcard";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";


const Profile = ({ name, desc, data, blog, handleEdit, handleDelete }) => {
  const { data: session } = useSession(); // Retrieve session information
  const [userBlogs, setUserBlogs] = useState([]);

  useEffect (() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api-blog/${session.user.id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        setUserBlogs(data.blogs)
        console.log('Data from API:', data);
        return { success: true, data };
      } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, error };
      }
    };

    fetchPosts()
  }, []);

  return session?.user ? (
    <section className='w-full max-w-full flex items-center justify-center flex-col mt-10'>
      <img
        src={session?.user.image}
        alt="Profile Pic"
        className="rounded-full border-2 border-violet-500 mt-10"
        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
      />
      <h1 className="head_text purple_gradient">{session?.user.name.split(' ')[0]}'s Collection</h1>
      <p className="mt-4">{desc}</p>
      <div className='mt-10 post_layout'>
        {/* Display Personal Posts */}
        <div className="flex flex-wrap justify-center gap-5 mx-auto">
          {userBlogs.map((blog, index) => (
          <Postcard
            key={index}
            blog={blog}
            // handleEdit={() => handleEdit && handleEdit(post)}
            // handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
        </div>
      </div>
    </section>
  ) : (
    <div className="flex items-center justify-center flex-col mt-10">
      <h1 className="head_text purple_gradient mb-3">Sorry!</h1>
      <h3>You don't have an account :(</h3>
    </div>
  );
};

export default Profile;
