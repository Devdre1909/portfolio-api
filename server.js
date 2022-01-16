const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

const app = express();
dotenv.config();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_MAIL,
    pass: process.env.GOOGLE_PASSWORD,
  },
});

console.log(process.env.GOOGLE_MAIL);

app.post("/send/mail", (req, res) => {
  const { name, email, message } = req.body;

  if (!message) {
    return res.status(400).json({
      message: "Please enter a message",
    });
  }

  mailTransporter
    .sendMail({
      from: process.env.GOOGLE_MAIL,
      to: "adegoketemitope1909@gmail.com",
      subject: `Message from Portfolio - ${name || email}`,
      text: `${message}
      
        ___________________________
        Mail from ${email}
      `,
    })
    .then((data) => {
      return res.status(200).json({
        message: "Message sent successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Message not sent",
      });
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
