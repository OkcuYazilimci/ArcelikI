// File: /pages/api/auth/set-jwt.js

import { getSession } from "next-auth/react";
import { createToken } from '../../../../utils/authToken';
import { serialize } from 'cookie';

export default async function setJWT(req, res) {
    // Get the session from NextAuth
    const session = await getSession({ req });

    // If the session exists, create a JWT token and set a cookie
    if (session) {
        const token = await createToken(session.user.id);

        // Serialize the token into a cookie string
        const cookie = serialize('token', token, {
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        // Set the cookie in the response header
        res.setHeader('Set-Cookie', cookie);
        res.status(200).end();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}
