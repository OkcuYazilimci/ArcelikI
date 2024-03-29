// File: /pages/api/auth/set-jwt.js

import { getSession } from "next-auth/react";
import { createToken } from '../../../../utils/authToken.js';
import { serialize } from 'cookie';

export default async function setJWT(req, res) {
    const session = await getSession({ req });

    if (session) {
        const token = await createToken(session.user.id);

        const cookie = serialize('token', token, {
            maxAge: 60 * 60 * 24,
            path: '/',
        });

        console.log("token: ", token);
        res.setHeader('Set-Cookie', cookie);
        res.status(200).end();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}
