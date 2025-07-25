const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

// ==========================
// SETUP SQLITE DATABASE
// ==========================
const db = new sqlite3.Database("./contactMessages.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    db.run(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        message TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

// ==========================
// CONTACT FORM ENDPOINT
// ==========================
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Save to database
  db.run(
    "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
    [name, email, message],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to save message." });
      }

      // Send email
      const transporter = nodemailer.createTransport({
        service: "gmail", // or another SMTP provider
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.NOTIFY_EMAIL || process.env.EMAIL_USER, // You or whoever should receive messages
        subject: "New Contact Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Failed to send email:", err.message);
          return res.status(500).json({ error: "Message saved but email failed." });
        }
        res.status(200).json({ message: "Message received and email sent!" });
      });
    }
  );
});

// ==========================
// STRIPE PAYMENT ENDPOINT
// ==========================
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ==========================
// START SERVER
// ==========================
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
