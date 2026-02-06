# Project: AI Cover Letter Generator

This document records how AI tools were used during the development of the AI Cover Letter Generator project.

## Project Understanding & Planning

**Prompt style used:**

> Explain how an AI-based cover letter generator should be built step by step.

**Purpose:**

*   Understand the problem statement clearly
*   Break the project into Level 1, Level 2, and Level 3 requirements
*   Decide the correct order of implementation (UI → AI → personalization)
*   Focus on learning the workflow before writing code

## Frontend UI & Form Logic

**Prompt style used:**

> Explain how to design a professional form-based UI and handle user input logically.

**Purpose:**

*   Build a clean, professional UI suitable for real users
*   Understand form input handling and validation
*   Decide which fields are required vs optional
*   Improve UX through clear layout and feedback

## AI Integration & API Understanding (Level 2)

**Prompt style used:**

> Explain how an AI API works and how to send dynamic prompts securely.

**Purpose:**

*   Understand how Gemini/OpenAI APIs process prompts
*   Learn async/await in real API calls
*   Handle loading states during AI response time
*   Secure API keys using environment variables instead of hardcoding

## Prompt Engineering for Cover Letter Generation

**Prompt style used:**

> Help me design a prompt that generates a professional and realistic cover letter.

**Purpose:**

*   Control AI tone and structure
*   Avoid robotic or generic responses
*   Enforce paragraph-based formatting
*   Generate job-ready, human-like cover letters

## Backend Setup & Environment Configuration

**Prompt style used:**

> Explain how frontend and backend should communicate securely in an AI project.

**Purpose:**

*   Understand the role of a backend in securing API keys
*   Learn how .env files work and why they must not be pushed to GitHub
*   Debug issues related to environment variable loading
*   Understand real-world full-stack architecture

## Resume Upload & File Handling (Level 3)

**Prompt style used:**

> Explain how file uploads work and how PDF resumes can be processed in a web app.

**Purpose:**

*   Understand multipart/form-data vs JSON
*   Learn why multer is required for file uploads
*   Extract resume text from PDF files using pdf-parse
*   Handle optional resume uploads without breaking the application

## Resume-Based AI Personalization (Advanced)

**Prompt style used:**

> Show how resume text can be used to generate a personalized AI response.

**Purpose:**

*   Feed extracted resume content into the AI prompt
*   Generate context-aware, personalized cover letters
*   Avoid copying resume text verbatim
*   Improve relevance of AI output based on real experience

## Validation Logic & UX Decisions

**Prompt style used:**

> Explain how conditional validation should work when multiple input paths exist.

**Purpose:**

*   Allow users to either fill the form or upload a resume
*   Prevent unnecessary validation errors
*   Design flexible, user-friendly logic
*   Mimic real SaaS-style application behavior

## Error Handling & Real-World Debugging (Example)

**Prompt style used:**

> I am getting a 404 error while calling the Gemini API. The model is not found even though the API key is valid.
> Explain why this is happening and how to fix it logically.

**Error encountered:**

> [404 Not Found] models/gemini-pro is not found for API version v1beta

**Purpose:**

*   Understand that AI APIs evolve and some models become deprecated
*   Learn the difference between UI model names and API-supported model names
*   Avoid changing unrelated code when debugging API errors

**Outcome:**

*   Identified that gemini-pro was no longer supported
*   Switched to a valid Gemini model compatible with the API version
*   Restored AI functionality successfully
*   Gained practical understanding of API versioning and model compatibility

## Documentation & Professional Practices

**Prompt style used:**

> How should an AI-based internship project be documented professionally?

**Purpose:**

*   Write clear and honest documentation
*   Explain features and logic in simple terms
*   Be transparent about AI usage and learning process
*   Follow ethical and professional development practices

## 🧠 Overall Reflection

Using AI as a guidance and learning tool helped me:

*   Understand AI integration instead of blindly using APIs
*   Learn prompt engineering and output control
*   Debug real frontend and backend issues confidently
*   Build the project progressively from Level 1 to Level 3
*   Think like a product developer, not just a coder

## ✅ Final Note

AI tools were used to understand concepts, debug issues, and improve implementation quality.
All final code decisions were made after reasoning and testing, ensuring genuine learning and professional practice.