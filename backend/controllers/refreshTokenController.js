import User from "../model/User";
import jwt from "jsonwebtoken";

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.status(401);

    const refreshToken = cookies.jwt;

    res.clearCookie('jwt' , {
        httpOnly: true,
        sameSite: 'None',
        secure: true
    });

    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) {
        jwt.verify(refreshToken,
            process.env.JWT_SECRET,
            async (err, decoded) => {
                if (err) return res.status(403);
                const hackedUser = await User.findOne({ email: decoded.email }).exec();
                hackedUser.refreshToken = []; //remove all the refresh token
                const result = await hackedUser.save();
                console.log(result);
            }
        )
        return res.status(403);
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

    jwt.verify(
        refreshToken,
        process.env.JWT_SECRET,
        async (err, decoded) => {
            if (err) {
                foundUser.refreshToken = [...newRefreshTokenArray];
                const result = await foundUser.save();
            }
            if (err || foundUser.email !== decoded.email) return res.status(403);

            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": decoded.email,
                        "roles": roles
                    }
                },
                proces.env.JWT_SECRET,
                {expiresIn: '10s'}
            );
            res.json({roles, accessToken});
        }
    );
}