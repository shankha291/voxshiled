import { jsPDF } from "jspdf";

export const generateReport = (analysisData, mode) => {
  const doc = new jsPDF();

  const risks = analysisData.map(
    (item) => item.riskScore
  );

  const averageRisk =
    risks.reduce(
      (sum, value) => sum + value,
      0
    ) / risks.length;

  const highestRisk =
    Math.max(...risks);

  const highRiskDetected =
    highestRisk >= 65;

  doc.setFontSize(22);

  doc.text(
    "VoxShield AI",
    20,
    20
  );

  doc.setFontSize(12);

  doc.text(
    "Voice Integrity & Impersonation Detection Report",
    20,
    30
  );

  doc.line(
    20,
    35,
    190,
    35
  );

  doc.setFontSize(14);

  doc.text(
    "Session Summary",
    20,
    50
  );

  doc.setFontSize(11);

  doc.text(
    `Analysis Mode: ${mode}`,
    20,
    62
  );

  doc.text(
    `Analysis Windows: ${analysisData.length}`,
    20,
    70
  );

  doc.text(
    `Average Risk Score: ${averageRisk.toFixed(1)}%`,
    20,
    78
  );

  doc.text(
    `Highest Risk Score: ${highestRisk}%`,
    20,
    86
  );

  const highestCategory =
    highestRisk >= 65
      ? "HIGH"
      : highestRisk >= 35
      ? "MEDIUM"
      : "LOW";

  doc.text(
    `Highest Risk Category: ${highestCategory}`,
    20,
    94
  );

  doc.setFontSize(14);

  doc.text(
    "Analysis Timeline",
    20,
    110
  );

  let y = 122;

  analysisData.forEach(
    (item, index) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(10);

      doc.text(
        `${index + 1}. ${item.timestamp} | ${item.riskLevel} | Risk: ${item.riskScore}%`,
        20,
        y
      );

      y += 8;
    }
  );

  y += 10;

  if (y > 260) {
    doc.addPage();
    y = 20;
  }

  doc.setFontSize(14);

  doc.text(
    "Security Recommendation",
    20,
    y
  );

  y += 12;

  doc.setFontSize(10);

  const recommendation =
    highRiskDetected
      ? "High risk indicators were detected. Do not approve sensitive actions without secondary identity verification. Use a trusted callback channel and escalate to the security team."
      : highestRisk >= 35
      ? "Moderate risk indicators were detected. Additional identity verification is recommended before sensitive actions."
      : "No significant synthetic voice indicators were detected during this monitoring session.";

  const lines =
    doc.splitTextToSize(
      recommendation,
      170
    );

  doc.text(
    lines,
    20,
    y
  );

  doc.save(
    `VoxShield_AI_Report_${Date.now()}.pdf`
  );
};