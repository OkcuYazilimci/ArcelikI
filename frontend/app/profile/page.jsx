"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "../components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const [myBlogs, setMyBlogs] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const blankUser = "https://i.ibb.co/wQdPNQK/Untitled-design-1.png";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api-user/getById`, {
          credentials: 'include'
        });
        const data = await response.json();
        setUserData(data.users);
        setMyBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {

    const hasConfirmed = confirm("Are you sure you want to delete this piece?");
  
    if (hasConfirmed) {
      try {
        await fetch(`http://localhost:3000/api-blog/${blogId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
  
        // Update state to remove the deleted blog
        const filteredBlogs = myBlogs.filter((item) => item._id !== blogId);
        setMyBlogs(filteredBlogs);
      } catch (error) {
        console.log(error);
      }
    }
  };
  console.log(userData)
  return (
    <section>
        <Profile
          name={userData.displayName}
          profileImage={userData.imageUrl == null ? blankUser : userData.imageUrl}
          desc='Welcome to your personalized profile page. Share your exceptional AI Arts and inspire others with the power of your imagination'
          blogs={myBlogs}
          // handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
    </section>
  );
};

export default MyProfile;