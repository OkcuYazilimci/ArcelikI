import User from "../model/User";
import { createToken } from "./authToken";

const verifyEmail = async (req, res) => {
try {
    const emailToken = req.emailToken;

    if (!emailToken) {
        return res.status(404).json("Email token cannot be found!");
    }

    const user = await User.findOne({ emailToken });

    if (user) {
        user.emailToken = null;
        user.isEmailVerified = true;

        await user.save();

        const token = createToken(user._id);

        res.status(200).json({
            token,
            isEmailVerified: user.isEmailVerified
        });
    } else {
        res.status(404).json({ message: "Email verification failed, Invalid Token"});
    }} catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
};