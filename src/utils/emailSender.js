import nodemailer from 'nodemailer';
import "dotenv/config";

const transpoter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendVarificationEmail = async(email,token) => {
    const verificationLink = `http://yourdomain.com/verify-email?token=${token}`;
    await transpoter.sendMail({
        from: '"app name" <no-reply@yourdomain.com>',
        to:email,
        subject: 'verify your email',
        html: `Click <a href="${verificationLink}">here</a> to verify your email.\n code: ${token}`
    });

    return "sended";
}

export const sendFogotPasswordEmail = async(email,token) => {
    const verificationLink = `http://yourdomain.com/fogot-password?token=${token}`;
    await transpoter.sendMail({
        from: '"app name" <no-reply@yourdomain.com>',
        to:email,
        subject: 'Password reset request',
        html: `Click <a href="${verificationLink}">here</a> to verify your email.\n code: ${token}`
    });

    return "sended";
}