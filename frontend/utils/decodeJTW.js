const jwt = require('jsonwebtoken');

const decodeJWT = (token) => {
  try {
    // Replace 'process.env.JWT_SECRET' with your actual secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Assuming the token payload includes user information
    return decoded;
  } catch (error) {
    // Handle decoding errors, for example, token expired
    console.error('Error decoding JWT:', error.message);
    return null;
  }
};

module.exports = decodeJWT;