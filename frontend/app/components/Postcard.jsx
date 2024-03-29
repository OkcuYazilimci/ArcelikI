import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Define the Postcard component
const Postcard = ({ blog, handleDelete }) => {

  const pathName = usePathname();
  const router = useRouter();
  const { user } = useAuth();

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

  const handleProfileClick = () => {

    if (blog.user._id === user._id) return router.push("/profile");

    router.push(`/profile/${blog.user._id}`);
  };

  const formattedTimeAgo = timeAgo(blog.createdAt);
  const blankUser = "https://i.ibb.co/wQdPNQK/Untitled-design-1.png";
  console.log(blog)
  return (
    <div className="max-w-sm mx-2 bg-neutral-700 rounded-xl overflow-hidden box-shadow p-4 mb-5">
      <div className="flex items-center mb-3"
      >
        <img
          src={blog.user?.imageurl == null ? blankUser : blog.user?.imageurl}
          height={30}
          width={30}
          alt=""
          className="rounded-full mr-3 border-2 border-white hover:cursor-pointer"
          onClick={handleProfileClick}
        />
          <p className="text-white font-semibold hover:cursor-pointer hover:text-gray-500" onClick={handleProfileClick}>{blog.user?.displayName}</p>
          <p className="text-xs text-gray-200 ml-auto my-auto">{formattedTimeAgo}</p>
      </div>
      <div className="relative">
      <img
        className="w-full object-fit rounded-sm mb-4"
        src={blog.image && blog.image.startsWith("http") ? blog.image : "https://i.ibb.co/rZQC2VJ/Your-image-is-being-generated-at-the-moment.png"}
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
        <h2 className="font-bold text-white text-xl mb-2">{blog.title}</h2>
        <p className="text-white">{blog.description}</p>
      </div>
      {pathName === "/profile" && (
        <div className="flex items-center justify-center border-t mt-5">
          <button className="button8 mt-5" onClick={handleDelete}>
            <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
          </button>
        </div>
      )}
      {/* {pathName === "/profile" && (
        <div className="">
        <hr className="mt-2"/>
        <div className='w-100 text-center mt-5 border-gray-100 pt-3 flex items-center justify-center'>
          <p
            className='w-3/4 font-inter text-sm text-white cursor-pointer rounded-xl p-2 bg-red-500 hover:opacity-75'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
        </div>
      )} */}
      {/* {session?.user.id === blog.user._id && pathName === "/profile" && (
        <div className='w-100 text-center mt-5 flex-center border-t border-gray-100 pt-3'>
          <p
            className='w-3/4 font-inter text-sm text-white cursor-pointer rounded-xl p-2 bg-red-500 hover:opacity-75'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )} */}
    </div>
  );
};

export default Postcard;
