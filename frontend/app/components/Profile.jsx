import Postcard from "./Postcard";

const Profile = ({ name, desc, profileImage, blog, handleEdit, handleDelete }) => {

  return (
    <section className='w-full max-w-full flex items-center justify-center flex-col mt-10'>
      <img
        src={profileImage}
        alt="Profile Picture"
        className="rounded-full border-2 border-violet-500 mt-10"
        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
      />
      <h1 className="head_text purple_gradient">{name}'s Collection</h1>
      <p className="mt-4">{desc}</p>
      <div className='mt-10 post_layout'>
        {/* Display Personal Posts */}
        <div className="flex flex-wrap justify-center gap-5 mx-auto">
          {blog.map((blog, index) => (
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
  )
};

export default Profile;
