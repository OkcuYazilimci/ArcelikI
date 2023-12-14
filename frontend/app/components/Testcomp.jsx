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
      <h1>User Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {userData.map((user, index) => (
            <li key={index}>
              Name: {user.name}, Email: {user.email}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Users;