'use client';

// Import necessary modules and components
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import logoImage from '../../public/assets/logo-beyaz.svg';

const Nav = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const { user, logout } = useAuth();
  
  const router = useRouter();  // Get the router instance

  const handleLogout = async () => {
    router.push('/login');  // Reload the page after logout
    await logout();
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
        <div className={`hidden sm:flex gap-8 items-center text-xl flex-grow justify-center`}>
          <Link href="/" className="nav-links">
            Home
          </Link>
          <Link href="/create-post" className="nav-links">
            Create
          </Link>
          <Link href="/profile" className="nav-links">
            My Collection
          </Link>
          {/* Add other navigation links here */}
        </div>

        {user ? (
          <button type="button" className="bn3" onClick={handleLogout}>
            Sign out
          </button>
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
