require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4242;

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;

  console.log('CLIENT_URL:', process.env.CLIENT_URL);
  console.log('Success URL:', `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`);
  console.log('Cancel URL:', `${process.env.CLIENT_URL}/cancel`);

  if (!items || !Array.isArray(items) || items.length === 0) {
    console.error("Invalid items received:", items);
    return res.status(400).json({ error: "Invalid or empty items array." });
  }

  try {
    console.log("Creating checkout session for items:", items);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      billing_address_collection: 'required',
      automatic_tax: { enabled: true }, // Stripe automatic tax
      shipping_address_collection: {    // collect shipping addresses
        allowed_countries: ['US', 'CA'],
      },
      shipping_options: [
        { shipping_rate: 'shr_1RwxwEBJz1MCpVJfpZfM04aB' } // your shipping rate
      ],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: { name: item.name || 'Unnamed Product' },
          unit_amount: item.price, // item price in cents
        },
        quantity: item.quantity && item.quantity > 0 ? item.quantity : 1,
      })),
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    console.log("Session created successfully:", session.id);
    res.status(200).json({ url: session.url, id: session.id });

  } catch (error) {
    console.error("Stripe session creation failed:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'New Contact Form Submission - SolarBunnyLens',
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    });

    console.log('Email sent successfully');
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

app.get('/api/checkout-session/:sessionId', async (req, res) => {
  const sessionId = req.params.sessionId;

  try {
    // Expand line_items so the client gets the full order details
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });

    res.json(session);
  } catch (error) {
    console.error('Error fetching checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
