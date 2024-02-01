import { createToken } from '../../../../utils/authToken';

export const createNewToken = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const token = await createToken(userId);

        res.status(200).json({ token });
    } catch (error) {
        console.error("token error LOG: ", error);
        res.status(500).json({ error: "token error!" });
    }
}
