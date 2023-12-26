'use client'

import Form from "../components/PostForm";
import { useSession } from "next-auth/react";

const CreatePost = () => {
  const { data: session } = useSession();
  if (!session?.user) {
    return (
      <div className="flex items-center justify-center flex-col mt-10">
        <h1 className="head_text purple_gradient mb-3">Sorry!</h1>
        <h3>You don't have an account :(</h3>
      </div>
    );
  } else {
    return (
      <Form
        type='Create'
        // post={post}
        // setPost={setPost}
        // submitting={submitting}
        // handleSubmit={createPost}
      />
    );
  }
};

export default CreatePost;
