// Define the Postcard component

function timeAgo(timestamp) {
  const currentDate = new Date();
  const previousDate = new Date(timestamp);

  const timeDifference = currentDate - previousDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days === 1) {
    return `a day ago`;
  } else {
    return `${days} days ago`;
  }
}

const Postcard = ({ blog }) => {
  const formattedTimeAgo = timeAgo(blog.createdAt);

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
          <p className="text-xs text-gray-400 ml-auto my-auto">{formattedTimeAgo}</p>
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
