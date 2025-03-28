"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

export default function DownloadPDFButton({ feedbackData }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);
    try {
      const doc = new jsPDF();
      let y = 10; // starting y coordinate

      // Title
      doc.setFontSize(18);
      doc.text("Interview Feedback", 10, y);
      y += 12;

      // Overall Impression
      doc.setFontSize(12);
      doc.text(
        `Overall Impression: ${feedbackData.totalScore || "---"}/100`,
        10,
        y
      );
      y += 10;

      // Date (formatted string already provided in feedbackData.createdAt)
      doc.text(`Date: ${feedbackData.createdAt || "N/A"}`, 10, y);
      y += 10;

      // Final Assessment
      doc.setFontSize(14);
      doc.text("Final Assessment:", 10, y);
      y += 8;
      doc.setFontSize(12);
      doc.text(
        doc.splitTextToSize(
          feedbackData.finalAssessment || "No assessment provided",
          180
        ),
        10,
        y
      );
      y += 20;

      // Interview Breakdown (Category Scores)
      if (
        feedbackData.categoryScores &&
        feedbackData.categoryScores.length > 0
      ) {
        doc.setFontSize(14);
        doc.text("Interview Breakdown:", 10, y);
        y += 10;
        doc.setFontSize(12);
        feedbackData.categoryScores.forEach((category, index) => {
          doc.text(
            `${index + 1}. ${category.name} (${category.score}/100)`,
            10,
            y
          );
          y += 8;
          doc.text(doc.splitTextToSize(category.comment || "", 180), 10, y);
          y += 12;
        });
        y += 10;
      }

      // Strengths
      if (feedbackData.strengths && feedbackData.strengths.length > 0) {
        doc.setFontSize(14);
        doc.text("Strengths:", 10, y);
        y += 10;
        doc.setFontSize(12);
        feedbackData.strengths.forEach((strength) => {
          doc.text(`- ${strength}`, 10, y);
          y += 8;
        });
        y += 5;
      }

      // Areas for Improvement
      if (
        feedbackData.areasForImprovement &&
        feedbackData.areasForImprovement.length > 0
      ) {
        doc.setFontSize(14);
        doc.text("Areas for Improvement:", 10, y);
        y += 10;
        doc.setFontSize(12);
        feedbackData.areasForImprovement.forEach((area) => {
          doc.text(`- ${area}`, 10, y);
          y += 8;
        });
      }

      // Save the PDF
      doc.save("feedback.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF.");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleDownload}
      className="btn-primary flex-1"
      disabled={loading}
    >
      {loading ? "Downloading..." : "Download PDF"}
    </button>
  );
}
