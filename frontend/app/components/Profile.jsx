import Loadingcard from "./Loadingcard";
import Postcard from "./Postcard";

const Profile = ({ name, desc, profileImage, blogs, handleEdit, handleDelete, isVerified }) => {

  // <br />{isVerified ? (<span className="verified-text text-green-500">Email verified</span>) : (<span className="verified-text text-red-500">Please verify your email !</span>)}

  return (
    <section className='w-full max-w-full flex items-center justify-center flex-col mt-10'>
      <img
        src={profileImage}
        alt="Profile Picture"
        className="rounded-full border-2 border-gray-500 shadow-xl mt-10"
        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
      />
      <h1 className="head_text text-white text-center">{name}'s Collection</h1>
      <p className="mt-4 text-gray-300 text-center">{desc}</p>
      <div className='mt-10 post_layout'>
        {blogs && blogs.length > 0 ? (
          // Display Personal Posts once loading is complete and blogs exist
          <div className="flex flex-wrap justify-center gap-5 mx-auto">
            {blogs.map((blogItem, index) => (
              <Postcard
                key={index}
                blog={blogItem}
                // handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete(blogItem._id)}
              />
            ))}
          </div>
        ) : (
          // Display message when blogs are undefined or empty
          <p className="text-center text-gray-500 mt-5">There are no posts available.</p>
        )}
      </div>
    </section>
  )
};

export default Profile;
