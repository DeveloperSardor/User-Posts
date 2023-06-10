import nodemailer from "nodemailer";
import { generateCode } from "../utils/generateConfirmCode.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "developersardor7@gmail.com",
    pass: "igqtizrjhirpecpc",
  },
});
export const sendConfirmationEmail = async (userEmail, confirmationCode) => {
   // Tasdiqlash kodi generatsiyalansin
  const mailOptions = {
    from: "developersardor7@gmail.com",
    to: userEmail,
    subject: "Hi!",
    html: `<h1>
      Your password <br/>
     ${confirmationCode}
     <br/>
     Link for confirmation <a >http://localhost:5000/api/confirmation/${confirmationCode}</a>
    </h1>`,
  };
//   try {
    const result = await transporter.sendMail(mailOptions);
    return 'ok, sented to gmail!';
//   } catch (error) { 
//     console.log(error);
//     throw new Error("Email yuborishda xatolik yuz berdi");
//   }
};
