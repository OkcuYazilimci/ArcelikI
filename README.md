
# Update - March 2024

We're committed to continuously improving the security of our backend system. In this update, we've implemented several measures to enhance the overall security posture of our authentication process.

## Key Security Enhancements:

### 1. Access Token Storage:
We now store access tokens in memory. This improves performance and reduces the risk of exposure, ensuring that access tokens are securely managed within the backend.

### 2. Refresh Token Storage:
Refresh tokens are now securely stored in HttpOnly secure cookies. This provides an additional layer of protection against certain types of attacks, such as cross-site scripting (XSS). The "Secure" attribute ensures that the cookies are only transmitted over secure (HTTPS) connections.

### 3. Refresh Token Rotation:
To prevent the misuse of stolen refresh tokens, we've implemented refresh token rotation. With each use, a new refresh token is issued, enhancing the security of the authentication process.

### 4. API for revoking access token
If malicious attacks detected access token can be revoked.

# Arch - AI-Generated Images Web App
 
Welcome to Arch! This application allows users to create AI-generated images and share them on a feed. The project is structured into two main folders: `backend` and `frontend`, each handling the server-side and client-side components, respectively.
 
## Prerequisites
 
Before running the application, ensure that you have the following installed on your machine:
 
- Node.js
- npm (Node Package Manager)
- MongoDB
 
## Getting Started
 
1. Clone the repository to your local machine:
 
   ```bash
   git clone https://github.com/OkcuYazilimci/ArcelikI
 
2. Navigate to the project directory:
    ```bash
   cd ArcelikI
 
### Backend
 
1. Navigate to the backend folder:
    ```bash
   cd backend
 
2. Install dependencies:
    ```bash
   npm install
3. Run the backend server:
    ```bash
   npm run dev
 
 
The server will start on http://localhost:3000
 
 
### Frontend
 
1. Open a new terminal window/tab.
2. Navigate to the frontend folder:
    ```bash
   cd ../frontend
 
3. Install dependencies:
    ```bash
   npm install
4. Run the backend server:
    ```bash
   npm run dev
 
 
The server will start on http://localhost:3001
 
# Technologies Used
- Next.js
- React
- MongoDB
- Express.js
- Node.js
 
# License
This project is licensed under the MIT License.