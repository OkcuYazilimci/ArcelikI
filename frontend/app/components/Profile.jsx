import Postcard from "./Postcard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full max-w-full flex items-center justify-center flex-col mt-10'>
      <img src="https://picsum.photos/200" alt="" className="rounded-full border-2 border-violet-500 mt-10"/>
      <h1 className="head_text purple_gradient">{name} Collection</h1>
      <p className="mt-4">{desc}</p>
      <div className='mt-10 post_layout'>
        {/* Personal Posts */}
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            // handleEdit={() => handleEdit && handleEdit(post)}
            // handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;