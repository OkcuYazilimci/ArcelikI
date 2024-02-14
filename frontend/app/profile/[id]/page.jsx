"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "../../components/Profile";

const UserProfile = ({ params }) => {

  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userBlogs, setUserBlogs] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(`http://localhost:3000/api-blog/getById`, {
      credentials: 'include'});
      const data = await response.json();

      setUserBlogs(data.blogs);
    };

    fetchBlogs();
  }, [params.id]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:3000/api-user/getById`, {
        credentials: 'include'
      });
      const data = await response.json();

      setUserData(data);
    };

   fetchUser();
  }, [params.id]);

  return (
    <Profile
      name={userData.displayName}
      profileImage={userData.imageurl}
      desc={`Welcome to ${userData.displayName}'s personalized profile page. Explore ${userData.displayName}'s exceptional AI Arts and be inspired by the power of their imagination`}
      blog={userBlogs}
    />
  );
};

export default UserProfile;