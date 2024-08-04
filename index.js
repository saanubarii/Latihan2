const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const Groq = require('groq-sdk');

const app = express();
const port = process.env.PORT || 3001;

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.use(cors());
app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30 // Limit each IP to 30 requests per `window` (here, per minute)
});

app.use(limiter);

app.post('/roasting', async (req, res) => {
  const { username } = req.query;
  const { prompt } = req.body;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192'
    });

    res.json({ response: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
