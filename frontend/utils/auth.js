// utils/auth.js
import jwt from 'jsonwebtoken';

const getAuthToken = () => {
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  const tokenCookie = cookies.find(cookie => cookie.startsWith('jsonwebtoken='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
};

const setAuthToken = (token) => {
  localStorage.setItem('jsonwebtoken', token);
};

const removeAuthToken = () => {
  localStorage.removeItem('jsonwebtoken');
};

const fetchUserInfo = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/api-user/${userId}`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user information:', error);
    return null;
  }
};

const getDecodedToken = async () => {
  const token = getAuthToken();
  if (token) {
    try {
      const decodedToken = jwt.decode(token);
      if (decodedToken && decodedToken.userId) {
        const userId = decodedToken.userId;
        const userInfo = await fetchUserInfo(userId);
        return { ...decodedToken, userInfo };
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  return null;
};

export { getAuthToken, setAuthToken, removeAuthToken, fetchUserInfo, getDecodedToken };
