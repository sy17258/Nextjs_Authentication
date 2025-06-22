import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"; 

export const sendEmail = async({email, emailType, userId}) => {
    try {
        // create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set: {    
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            });
        }

        // Configure mail for usage
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            },
        });

        const mailOptions = {
            from: 'sy172580@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
            // subject: emailType === "VERIFY" ? "VERIFY YOUR EMAIL" : "RESET YOUR PASSWORD",
            // html: `<p>Click <a href="${process.env.DOMAIN}/verifymail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} 
            // or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/verifymail?token=${hashedToken}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error ) {
        throw new Error(error.message);
    }
}