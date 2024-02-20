"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "../../components/Profile";
import Loading from "../loading";

const UserProfile = ({ params }) => {

  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const blankUser = "https://i.ibb.co/wQdPNQK/Untitled-design-1.png";

  const [userBlogs, setUserBlogs] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:3000/api-user/${params.id}`, {
      credentials: 'include'});
      const data = await response.json();
      console.log("User fetching: ", data);
      setUserData(data.users);
    };

    fetchUser();
  }, [params.id]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(`http://localhost:3000/api-blog/${params.id}`, {
      credentials: 'include'});
      const data = await response.json();
      console.log("Blog fetching: ", data);
      setUserBlogs(data.blogs);
    };

    fetchBlogs();
  }, [params.id]);

  return (
    <Suspense fallback={<Loading />}>
      <Profile
        name={userData.displayName}
        profileImage={userData.imageUrl == null ? blankUser : userData.imageUrl}
        desc={`Welcome to ${userData.displayName}'s personalized profile page. Explore ${userData.displayName}'s exceptional AI Arts and be inspired by the power of their imagination`}
        blogs={userBlogs}
        isVerified={userData.isEmailVerified}
      />
    </Suspense>
  );
};

export default UserProfile;