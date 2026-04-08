import cvData from "../data/cvData";

export function buildCVContext(query: string, lang: "en" | "tr"): string {
  const lowerQuery = query.toLowerCase();
  let context = "";

  // Skills match
  if (lowerQuery.match(/skill|ability|expert|proficien|react|typescript|python|c#|design|develop|agility|competency/)) {
    const skillsText = cvData.skills.slice(0, 15).join(", ");
    context += (lang === "en" ? "## Skills\n" : "## Beceriler\n") + skillsText + "\n\n";
  }

  // Experience match
  if (lowerQuery.match(/experience|work|job|company|c&d|çanakkale|nokta|founder|designer|developer|career|role|position/)) {
    context += lang === "en" ? "## Experience\n" : "## Deneyim\n";
    cvData.experience.slice(0, 3).forEach((exp) => {
      const years = exp.endYear ? `${exp.startYear}-${exp.endYear}` : `${exp.startYear}-Present`;
      context += `- **${exp.position}** at ${exp.company} (${years}): ${exp.description}\n`;
    });
    context += "\n";
  }

  // Education match
  if (lowerQuery.match(/education|degree|university|study|learn|istanbul|trakya|background|training|school/)) {
    context += lang === "en" ? "## Education\n" : "## Eğitim\n";
    cvData.education.forEach((edu) => {
      const year = edu.graduationYear || edu.startYear;
      context += `- ${edu.field} at ${edu.school} (${year}): ${edu.description}\n`;
    });
    context += "\n";
  }

  // Projects match
  if (lowerQuery.match(/project|portfolio|work|media|radio|build|create|launch|product/)) {
    context += lang === "en" ? "## Projects\n" : "## Projeler\n";
    cvData.projects.forEach((proj) => {
      const years = proj.endYear ? `${proj.startYear}-${proj.endYear}` : `${proj.startYear}-Present`;
      context += `- **${proj.name}** (${proj.type}, ${years}): `;
      if (proj.metrics) {
        context += `${Object.values(proj.metrics).join(", ")}`;
      }
      context += "\n";
    });
    context += "\n";
  }

  // Certifications match
  if (lowerQuery.match(/certification|cert|course|training|bootcamp|huawei|ai|python|react|learning|certificate/)) {
    context += lang === "en" ? "## Certifications\n" : "## Sertifikalar\n";
    cvData.certifications.slice(0, 5).forEach((cert) => {
      context += `- ${cert.title} (${cert.issuer}, ${cert.year})\n`;
    });
    context += "\n";
  }

  // If no match, return general intro
  if (!context) {
    context = lang === "en"
      ? "I'm Cenk, a 23-year-old designer, developer, and AI enthusiast from Çanakkale, Turkey. I specialize in modern web development, design, and AI/LLM technologies.\n\n"
      : "Ben Cenk, Çanakkale'den 23 yaşında bir tasarımcı, geliştirici ve AI meraklısı. Modern web geliştirme, tasarım ve AI/LLM teknolojilerine uzmanlaşmış durumdayım.\n\n";
  }

  return context.trim();
}
