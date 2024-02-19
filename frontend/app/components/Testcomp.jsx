'use client';

import React, { useEffect, useState } from 'react';
import { GET } from '../api/user/route';

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Before API call');
        const { success, data, error } = await GET();
        
        if (success) {
          console.log('Fetched data:', data);
          setUserData(data.users);
        } else {
          console.error('Error fetching data:', error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
        console.log('After API call and setLoading');
      }
    };

    console.log('Before fetchData');
    fetchData();
    console.log('After fetchData');
  }, []);

  return (
    <>
      Desktop Navigation
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
              {/* {providers &&
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
                ))} */}
              
              {/* Add Login Button and Redirect */}
              <Link href="/login"> {/* Replace "/login" with your actual login page path */}
                <button type="button" className="outline_btn">
                  Login or Sign Up
                </button>
              </Link>
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
              
              {/* Add Mobile Login Button and Redirect */}
              <Link href="/login">
                <button type="button" className="outline_btn">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
    </>
  );
};

export default Users;