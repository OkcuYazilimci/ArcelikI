"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "../../components/Profile";

const UserProfile = ({ params }) => {

  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const blankUser = "https://i.ibb.co/wQdPNQK/Untitled-design-1.png";

  const [userBlogs, setUserBlogs] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(`http://localhost:3000/api-user/${params.id}`, {
      credentials: 'include'});
      const data = await response.json();

      setUserBlogs(data.users.blogs);
      setUserData(data.users)
    };

    fetchBlogs();
  }, [params.id]);

  return (
    <Profile
      name={userData.displayName}
      profileImage={userData.imageUrl == null ? blankUser : userData.imageUrl}
      desc={`Welcome to ${userData.displayName}'s personalized profile page. Explore ${userData.displayName}'s exceptional AI Arts and be inspired by the power of their imagination`}
      blog={userBlogs}
      isVerified={userData.isVerified}
    />
  );
};

export default UserProfile;