const nameInput = document.getElementById("name");
const roleInput = document.getElementById("role");
const companyInput = document.getElementById("company");
const skillsInput = document.getElementById("skills");

const generateBtn = document.getElementById("generateBtn");
const outputBox = document.getElementById("output");
const copyBtn = document.getElementById("copyBtn");

generateBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const role = roleInput.value.trim();
  const company = companyInput.value.trim();
  const skills = skillsInput.value.trim();

  if (!name || !role || !company || !skills) {
    alert("Please fill in all fields");
    return;
  }

  // Loading state
  generateBtn.disabled = true;
  generateBtn.textContent = "Generating...";

  outputBox.innerHTML = "<p>Generating your cover letter...</p>";
  copyBtn.classList.add("hidden");

  // Fake AI delay
  setTimeout(() => {
    const letter = generateMockCoverLetter(
      name,
      role,
      company,
      skills
    );

    outputBox.textContent = letter;

    generateBtn.disabled = false;
    generateBtn.textContent = "Generate Cover Letter";
    copyBtn.classList.remove("hidden");
  }, 1500);
});
function generateMockCoverLetter(name, role, company, skills) {
  return `Dear Hiring Manager at ${company},

I am writing to express my interest in the ${role} position at ${company}. My name is ${name}, and I am excited about the opportunity to contribute to your team.

I have hands-on experience with ${skills}, and I enjoy building clean, efficient, and user-focused solutions. I am constantly learning and improving my skills to stay aligned with industry standards.

I would welcome the opportunity to further discuss how my skills and enthusiasm can add value to ${company}. Thank you for considering my application.

Sincerely,  
${name}`;
}
copyBtn.addEventListener("click", () => {
  const textToCopy = outputBox.innerText;

  navigator.clipboard.writeText(textToCopy).then(() => {
    copyBtn.textContent = "Copied ✔️";

    setTimeout(() => {
      copyBtn.textContent = "Copy to Clipboard";
    }, 1500);
  });
});

