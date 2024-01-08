"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "../components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api-blog/${session.user.id}`);
        const data = await response.json();

        setMyBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    if (session?.user.id) fetchBlogs();
  }, [session?.user.id]);

  // const handleEdit = (post) => {
  //   router.push(`/update-prompt?id=${post._id}`);
  // };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`DELETE ROUTE`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center flex-col mt-10">
        <h1 className="head_text purple_gradient mb-3">Sorry!</h1>
        <h3>You don't have an account :(</h3>
      </div>
    )
  }

  return (
    <section>
      <Profile
        name={session?.user.name.split(' ')[0]}
        profileImage={session?.user.image}
        desc='Welcome to your personalized profile page. Share your exceptional AI Arts and inspire others with the power of your imagination'
        blog={myBlogs}
        // handleEdit={handleEdit}
        // handleDelete={handleDelete}
      />
    </section>
  );
};

export default MyProfile;