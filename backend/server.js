import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import multer from "multer";
import { parseResume } from "./utils/parseResume.js";


dotenv.config({ path: "../.env" });

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
const upload = multer({
  storage: multer.memoryStorage(),
});


// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


// API route
app.post("/generate", upload.single("resume"), async (req, res) => {
  try {
    const { name, role, company, skills, email, phone, city, hiringManager } = req.body;
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const managerName = hiringManager || "Hiring Manager";
    let resumeText = "";
    if (req.file) {
      resumeText = await parseResume(req.file.buffer);
    }

    // Verify data reception
    console.log("Request Body:", req.body);

    const prompt = `
Write a professional cover letter for the candidate below.

Candidate Name: {name}
Job Role: {role}
Company Name: {company}
Key Skills: {skills}

Guidelines:
- Use a professional and confident tone
- Write 3 short paragraphs
- Mention relevant skills naturally
- Do NOT exaggerate experience
- Do NOT use bullet points
- Keep the letter concise and well structured
- End with a polite closing

The output should look like a real cover letter, not AI-generated text.

`;

    console.log("Generated Prompt:", prompt);

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ letter: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate cover letter" });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend with Gemini is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
