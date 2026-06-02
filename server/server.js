require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // app password
    },
  });

  app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;
  
    try {
      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER,
        subject: "New Contact Message",
        text: `
  Name: ${name}
  Email: ${email}
  
  Message:
  ${message}
        `,
      });
  
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("EMAIL ERROR:", error);
      res.status(500).json({ success: false });
    }
  });

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });