'use client';

import { useState, useEffect } from "react";
import React from "react";
import logoImage from '../../public/assets/black.svg';
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

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
          {/* <Link href="/profile" className="nav-links">Profile</Link>
          <Link href="/create-post" className="nav-links">Create</Link> */}
        </div>
        <div className="flex justify-end">
          {/* Desktop */}
          {session?.user ? (
            <div className='flex gap-3 md:gap-5'>
              <Link href='/create-prompt' className='black_btn'>
                Create Post
              </Link>

              <button type='button' onClick={signOut} className='outline_btn'>
                Sign Out
              </button>

              <Link href='/profile'>
                <Image
                  src={session?.user.imageurl}
                  width={37}
                  height={37}
                  className='rounded-full'
                  alt='profile'
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type='button'
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className='black_btn'
                  >
                    Sign in
                  </button>
                ))}
            </>
          )}
        </div>
        {/* Mobile */}
      </div>
    </nav>
  );
}

export default Nav;
