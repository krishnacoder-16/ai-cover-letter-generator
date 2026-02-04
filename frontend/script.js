const nameInput = document.getElementById("name");
const roleInput = document.getElementById("role");
const companyInput = document.getElementById("company");
const skillsInput = document.getElementById("skills");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const cityInput = document.getElementById("city");
const hiringManagerInput = document.getElementById("hiringManager");

const generateBtn = document.getElementById("generateBtn");
const outputBox = document.getElementById("output");
const copyBtn = document.getElementById("copyBtn");

generateBtn.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const role = roleInput.value.trim();
  const company = companyInput.value.trim();
  const skills = skillsInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const city = cityInput.value.trim();
  const hiringManager = hiringManagerInput.value.trim();

  if (!name || !role || !company || !skills || !email || !phone || !city) {
    alert("Please fill in all fields");
    return;
  }

  // Loading state
  generateBtn.disabled = true;
  generateBtn.textContent = "Generating...";
  outputBox.innerHTML = "<p>Generating your cover letter...</p>";
  copyBtn.classList.add("hidden");

  try {
    const response = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        role,
        company,
        company,
        skills,
        email,
        phone,
        city,
        hiringManager,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    outputBox.textContent = data.letter;
    copyBtn.classList.remove("hidden");
  } catch (error) {
    outputBox.innerHTML =
      "<p>❌ Failed to generate cover letter. Please try again.</p>";
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = "Generate Cover Letter";
  }
});

// Copy to clipboard
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(outputBox.innerText).then(() => {
    copyBtn.textContent = "Copied ✔️";
    setTimeout(() => {
      copyBtn.textContent = "Copy to Clipboard";
    }, 1500);
  });
});
