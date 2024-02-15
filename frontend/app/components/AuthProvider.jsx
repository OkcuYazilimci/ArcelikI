'use client';

import { AuthProvider } from "../../context/AuthContext";

const SessionProvider = ({ children, user, login, logout }) => (
  <AuthProvider user={user} login={login} logout={logout}>
    {children}
  </AuthProvider>
)

export default SessionProvider;