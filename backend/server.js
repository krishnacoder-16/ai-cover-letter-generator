import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config({ path: "../.env" });
console.log("Loaded API Key:", process.env.GEMINI_API_KEY?.slice(0, 6));


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


// API route
app.post("/generate", async (req, res) => {
  try {
    const { name, role, company, skills, email, phone, city, hiringManager } = req.body;
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const managerName = hiringManager || "Hiring Manager";

    const prompt = `
Write a professional cover letter for ${name} applying for the role of ${role} at ${company}.
Skills: ${skills}.

IMPORTANT FORMATTING RULES:
1.  The output must start with this EXACT header format:
    ${name}
    ${phone} | ${email}
    ${city}

    ${date}

    ${managerName}
    ${role}
    ${company}

2.  After the header, write "Dear ${managerName},"
3.  Write 3 concise paragraphs highlighting my skills and fit for the role.
4.  End with "Sincerely,\n${name}".
5.  Do NOT include any placeholders like [Your Address]. Use the real data provided.
`;

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
