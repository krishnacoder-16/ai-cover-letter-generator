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
    DETAILS FROM CANDIDATE INPUT:
    Candidate Name: ${name || "Not Provided"}
    Target Role: ${role}
    Target Company: ${company}
    Candidate Skills: ${skills || "Not Provided"}
    Candidate Phone: ${phone || "Not Provided"}
    Candidate Email: ${email || "Not Provided"}
    Candidate City: ${city || "Not Provided"}
    RESUME CONTENT:

    ${resumeText}

    INSTRUCTIONS:
    Write a professional cover letter for the candidate applying for the role of ${role} at ${company}.
    
    CRITICAL DATA EXTRACTION:
    If any of the "Candidate Name", "Phone", "Email", or "City" are marked as "Not Provided" above, **EXTRACT** them from the RESUME CONTENT.
    
    IMPORTANT FORMATTING RULES:
    1.  The output must start with this EXACT header format:
    [Candidate Name]
    [Candidate Phone] | [Candidate Email]
    [Candidate City]

    ${date}

    ${managerName}
    ${role}
    ${company}

    2.  After the header, write "Dear ${managerName},"
    3.  Write 3 concise paragraphs highlighting skills and fit for the role.
      - Reference specific experience from the Resume.
    4.  End with "Sincerely,\n[Candidate Name]".
    5.  **Replace [Brackets] with actual extracted data.** Do NOT leave them as placeholders.
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
