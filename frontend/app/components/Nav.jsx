'use client';

// Import necessary modules and components
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import logoImage from '../../public/assets/logo-beyaz.svg';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for the toastify styles

const Nav = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const { user, logout } = useAuth();
  const blankUser = "https://i.ibb.co/wQdPNQK/Untitled-design-1.png";
  
  const router = useRouter();  // Get the router instance

  const handleLogout = async () => {
    router.push('/login');  // Reload the page after logout
    await logout();
  };

  const handleLinkClick = (path) => {
    if (!user) {
      // Display toast message and prevent navigation
      toast.error('Please log in or sign up first');
    } else {
      // Navigate to the link
      router.push(path);
    }
  };

  return (
    <nav className="p-4 shadow-2xl flex justify-center items-center">
      <div className="container flex justify-between items-center">
        {/* Logo on the left */}
        <Link href="/">
          <div className="flex items-center">
            <Image
              src={logoImage}
              width={35}
              height={35}
              alt="logo"
              className="mr-2"
            />
            <p className="text-white tracking-widest">Arch</p>
          </div>
        </Link>

        {/* Links in the center */}
        <div className={`hidden sm:flex gap-8 items-center text-xl justify-center ml-32`}>
          <button type="button" className="nav-links" onClick={() => handleLinkClick('/')}>
            Home
          </button>
          <button type="button" className="nav-links" onClick={() => handleLinkClick('/create-post')}>
            Create
          </button>
          <button type="button" className="nav-links" onClick={() => handleLinkClick('/profile')}>
            Collection
          </button>
          {/* Add other navigation links here */}
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <button type="button" className="bn3" onClick={handleLogout}>
              Sign out
            </button>
            <Link href="/profile">
              <img src={user.imageUrl == null ? blankUser : user.imageUrl} alt="Profile Picture" className="w-10 h-10 rounded-full mb-1 border-2 border-white hover:border-gray-400 cursor-pointer transition"/>
            </Link>
          </div>
        ) : (
          <Link href="/login"> {/* Replace "/login" with your actual login page path */}
            <button type="button" className="bn3">
              Login or Sign Up
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
