import { generateReport } from "../utils/generateReport";

function ReportDownload({
  analysisData,
  mode,
}) {
  if (!analysisData.length) return null;

  return (
    <button
      className="download-btn"
      onClick={() =>
        generateReport(
          analysisData,
          mode
        )
      }
    >
      ⬇ Download PDF Security Report
    </button>
  );
}

export default ReportDownload;