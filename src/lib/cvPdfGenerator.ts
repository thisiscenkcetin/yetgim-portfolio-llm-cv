import jsPDF from "jspdf";
import cvData from "../data/cvData";

export function generateCVPdf(lang: "en" | "tr"): Blob {
  const pdf = new jsPDF();
  let yPosition = 10;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 10;

  // Header
  pdf.setFontSize(20);
  pdf.text(cvData.personal.name, margin, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.text(cvData.personal.title, margin, yPosition);
  yPosition += 6;

  // Personal Info
  pdf.setFontSize(9);
  pdf.text(`${cvData.personal.location} | ${cvData.personal.email}`, margin, yPosition);
  yPosition += 8;

  // Education Section
  pdf.setFontSize(12);
  pdf.text(lang === "en" ? "Education" : "Eğitim", margin, yPosition);
  yPosition += 6;

  pdf.setFontSize(9);
  cvData.education.forEach((edu) => {
    pdf.text(`${edu.field} - ${edu.school}`, margin + 2, yPosition);
    yPosition += 4;
  });
  yPosition += 4;

  // Experience Section
  pdf.setFontSize(12);
  pdf.text(lang === "en" ? "Experience" : "Deneyim", margin, yPosition);
  yPosition += 6;

  pdf.setFontSize(9);
  cvData.experience.forEach((exp, idx) => {
    if (idx < 3) {
      const years = exp.endYear ? `${exp.startYear}-${exp.endYear}` : `${exp.startYear}-Present`;
      pdf.text(`${exp.position} - ${exp.company} (${years})`, margin + 2, yPosition);
      yPosition += 4;
    }
  });
  yPosition += 4;

  // Skills Section
  pdf.setFontSize(12);
  pdf.text(lang === "en" ? "Skills" : "Beceriler", margin, yPosition);
  yPosition += 6;

  pdf.setFontSize(8);
  const skillsText = cvData.skills.slice(0, 20).join(", ");
  const splitSkills = pdf.splitTextToSize(skillsText, pageWidth - 2 * margin);
  pdf.text(splitSkills, margin + 2, yPosition);
  yPosition += splitSkills.length * 3 + 4;

  // Projects Section
  if (yPosition < 180) {
    pdf.setFontSize(12);
    pdf.text(lang === "en" ? "Projects" : "Projeler", margin, yPosition);
    yPosition += 6;

    pdf.setFontSize(9);
    cvData.projects.forEach((proj) => {
      if (yPosition < 270) {
        pdf.text(`${proj.name} (${proj.type})`, margin + 2, yPosition);
        yPosition += 4;
      }
    });
  }

  return pdf.output("blob");
}
