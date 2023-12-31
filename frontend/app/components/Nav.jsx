'use client';

// Import necessary modules and components
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import logoImage from '../../public/assets/black.svg';

// Navigation component
const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchData();
  }, []);

  return (
    <nav className="bg-white p-4 shadow-2xl">
      <div className="container mx-auto flex items-center justify-between">
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
            <p className="text-black tracking-widest">Arch</p>
          </div>
        </Link>

        {/* Links in the center */}
        <div className="hidden sm:flex gap-8 justify-center items-center text-xl flex-grow">
          <Link href="/" className="nav-links">
            Home
          </Link>
          <Link href="/create-post" className="nav-links">
            Create
          </Link>
          <Link href="/profile" className="nav-links">
            Collection
          </Link>
          {/* Add other navigation links here */}
        </div>

        {/* Desktop Navigation */}
        <div className="flex items-center">
          {session?.user ? (
            <div className="flex items-center gap-3 md:gap-5">
            <button type="button" onClick={signOut} className="outline_btn hidden md:block">
              Sign Out
            </button>

              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className="rounded-full hidden md:block"
                  alt="profile"
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="outline_btn"
                  >
                    Sign in
                  </button>
                ))}
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
          {/* Mobile user actions */}
          {session?.user ? (
            <div className="flex">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
                onClick={() => setToggleDropdown(!toggleDropdown)}
              />

              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Collection
                  </Link>
                  <Link
                    href="/create-post"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Post
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className="mt-5 w-full black_btn"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Mobile sign-in buttons
            <>
              {providers &&
                Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                className="outline_btn"
              >
                Sign in
              </button>
              ))}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// Export the Navigation component
export default Nav;
