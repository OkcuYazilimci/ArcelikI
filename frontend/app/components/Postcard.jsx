// Define the Postcard component
const Postcard = ({ blog }) => {
  return (
    <div className="max-w-md mx-5 bg-white rounded-xl overflow-hidden shadow-md p-4 post_box_shadow">
      <div className="flex items-center mb-3">
        <img
          src={blog.user.imageurl}
          height={30}
          width={30}
          alt=""
          className="rounded-full mr-3 border-2 border-violet-500"
        />
          <p className="text-gray-800 font-semibold">{blog.user?.displayName}</p>
          <p className="text-xs text-gray-400 ml-auto my-auto">1 day ago</p>
      </div>
      <img
        className="w-full h-56 object-fit rounded-sm mb-4"
        src="https://picsum.photos/500/300"
        alt="Post Image"
      />
      <div>
        <h2 className="font-bold text-xl mb-2">{blog.title}</h2>
        <p className="text-gray-700">{blog.description}</p>
      </div>
    </div>
  );
};

export default Postcard;
