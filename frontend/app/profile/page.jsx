"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "../components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api-blog/${session.user.id}`);
        const blog = await response.json();

        setMyPosts(blog);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  // const handleEdit = (post) => {
  //   router.push(`/update-prompt?id=${post._id}`);
  // };

  // const handleDelete = async (post) => {
  //   const hasConfirmed = confirm(
  //     "Are you sure you want to delete this prompt?"
  //   );

  //   if (hasConfirmed) {
  //     try {
  //       await fetch(`/api/prompt/${post._id.toString()}`, {
  //         method: "DELETE",
  //       });

  //       const filteredPosts = myPosts.filter((item) => item._id !== post._id);

  //       setMyPosts(filteredPosts);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  return (
    <Profile
      name='Profile'
      desc='Welcome to your personalized profile page. Share your exceptional AI Arts and inspire others with the power of your imagination'
      blog={myPosts}
      // handleEdit={handleEdit}
      // handleDelete={handleDelete}
    />
  );
};

export default MyProfile;