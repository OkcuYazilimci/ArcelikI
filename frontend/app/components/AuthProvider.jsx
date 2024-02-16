'use client';

import { AuthProvider } from "../../context/AuthContext";

const SessionProvider = ({ children, user }) => (
  <AuthProvider user={user}>
    {children}
  </AuthProvider>
)

export default SessionProvider;