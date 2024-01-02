// Define the Postcard component
const Postcard = ({ blog }) => {
  
  function timeAgo(timestamp) {
    if (!timestamp) {
      return 'Unknown time ago';
    }
  
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

  const formattedTimeAgo = timeAgo(blog.createdAt);

  return (
    <div className="max-w-md mx-5 bg-white rounded-xl overflow-hidden shadow-md p-4 post_box_shadow mb-10">
      <div className="flex items-center mb-3">
        <img
          src={blog.user?.imageurl}
          height={30}
          width={30}
          alt=""
          className="rounded-full mr-3 border-2 border-violet-500"
        />
          <p className="text-gray-800 font-semibold">{blog.user?.displayName}</p>
          <p className="text-xs text-gray-400 ml-auto my-auto">{formattedTimeAgo}</p>
      </div>
      <div className="relative">
        <img
        className="w-full h-56 object-fit rounded-sm mb-4"
        src="https://picsum.photos/500/300"
        alt="Post Image"
        height={300}
        width={500}
        />
        {/* Price Tag */}
        <div className="absolute flex flex-row bottom-0 right-0 p-2 bg-black text-white rounded-bl z-10 mr-2 mb-2 rounded-xl bg-opacity-70">
          <img src="https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/ZJZZK5B2ZNF25LYQHMUTBTOMLU.png" alt="Ethereum Logo" height={20} width={20} className="mr-2" />
          <span className="text-sm font-semibold">Not for sale</span>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-xl mb-2">{blog.title}</h2>
        <p className="text-gray-700">{blog.description}</p>
      </div>
    </div>
  );
};

export default Postcard;
