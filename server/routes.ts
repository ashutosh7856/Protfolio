import type { Express } from "express";
import { createServer, type Server } from "http";
import nodemailer from "nodemailer";

// Setup nodemailer with Gmail app password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ar2165895@gmail.com", // Sender email
    pass: "wjsp wicu thqo xizk",  // App password
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    // Validate fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email format",
      });
    }

    try {
      // Send email
      await transporter.sendMail({
        from: `"Portfolio Contact" <ar2165895@gmail.com>`,
        to: "ashutoshkkr60@gmail.com",
        subject: `New Contact Message from ${name}`,
        text: `
Name: ${name}
Email: ${email}
Message: ${message}
        `,
      });

      return res.json({
        success: true,
        message: "Message sent! I'll reply within 24 hours.",
      });
    } catch (err) {
      console.error("Email send failed:", err);
      return res.status(500).json({
        success: false,
        error: "Failed to send message. Please try again later.",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
