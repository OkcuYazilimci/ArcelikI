"use client";

import { useAuth } from "@/context/AuthContext";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "../components/Profile";
import Loading from "./loading";

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
        setMyBlogs(data.users.blogs);
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

  console.log("USER DATA", userData)
  console.log("BLOG DATA", myBlogs)


  return (
    <section>
      <Suspense fallback={<Loading />}>
        <Profile
          name={userData.displayName}
          profileImage={userData.imageurl == null ? blankUser : userData.imageurl}
          desc='Welcome to your personalized profile page. Share your exceptional AI Arts and inspire others with the power of your imagination'
          blogs={myBlogs}
          // handleEdit={handleEdit}
          handleDelete={handleDelete}
          isVerified={userData.isEmailVerified}
        />
      </Suspense>
    </section>
  );
};

export default MyProfile;