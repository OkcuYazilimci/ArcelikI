import React from "react";
import logoImage from '../../public/assets/black.svg';
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="bg-white p-4 shadow-2xl rounded-2xl">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center">
            <Image
              src={logoImage}
              width={35}
              height={35}
              alt="logo"
              className="mr-2"
            />
            <p className="text-black tracking-widest"> Arch</p>
          </div>
        </Link>
        <div className="hidden sm:flex gap-8 justify-center align-center text-xl">
          <Link href="/" className="nav-links">Home</Link>
          <Link href="/profile" className="nav-links">Profile</Link>
          <Link href="/create-post" className="nav-links">Create</Link>
        </div>
        <div className="flex justify-end">
          <Link
            href='/login'
            className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white py-2 px-8 rounded-full hover:bg-purple-800 -mx-4">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
