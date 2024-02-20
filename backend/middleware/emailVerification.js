import User from "../model/User.js";
import { createToken } from "./authToken.js";
import  Jwt  from "jsonwebtoken";
import nodemailer from "nodemailer";

const verifyEmail = async (req, res) => {
    try {
        const email = req.email;

        if(!email) return res.status(404).json("Email not found");

        const user = await User.findOne({ email });

        if (user) {
            user.emailToken = null;
            user.isEmailVerified = true;

            await user.save();

            res.status(200).json({
                message: "Email Verifed! Now you can Login",
                displayName: user.displayName,
                email: user.email,
                isEmailVerified: user.isEmailVerified
            })
        } else res.status(404).json("Email verification failed");
    } catch (err) {
        console.log(err);
        res.status(404).json(err.message);
    }
}

const createMailTransporter = () => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_LOG,
            pass: process.env.GMAIL_PASS
        },
    });
    console.log(process.env.GMAIL_LOG, "-------", process.env.GMAIL_PASS)
    return transporter;
}

const sendMail = (user) => {
    const transporter = createMailTransporter();

    const mailOptions = {
        from: '<gereksiz.umutuygun@gmail.com>',
        to: user.email,
        subject: 'ArchAI mail verification',
        html: `http://localhost:3000/api-mail/emailToken?emailToken=${user.emailToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
        } else {
            console.log("verification email senté");
        }
    })
}



export {verifyEmail, sendMail}