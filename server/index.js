const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Groq } = require('groq-sdk');

dotenv.config();

const app = express();

// Open CORS — this API is public and uses no cookies/auth headers,
// so wildcard origin is safe and avoids env-var configuration issues.
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/recipe', async (req, res) => {
    try {
        const { ingredients } = req.body;
        if (!ingredients) {
            return res.status(400).json({ error: 'Ingredients are required' });
        }

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a top-tier chef. You will be provided with a list of ingredients. Please generate a delicious, easy-to-follow recipe using these ingredients, and provide some chef tips for making it."
                },
                {
                    role: "user",
                    content: ingredients
                }
            ],
            model: "llama-3.1-8b-instant", // Using a fast model on Groq
        });

        res.json({ recipe: completion.choices[0].message.content });
    } catch (error) {
        console.error("Error generating recipe:", error);
        res.status(500).json({ error: 'Failed to generate recipe' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
