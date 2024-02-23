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
                hackedUser.refreshToken = [];
                const result = await hackedUser.save();
                console.log(result);
            }
        )
        return res.status(403);
    }
}