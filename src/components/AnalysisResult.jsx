import AnalysisHistory from "./AnalysisHistory";
import ReportDownload from "./ReportDownload";

function AnalysisResult({
  currentAnalysis,
  analysisData,
  mode,
  sessionEnded,
}) {
  if (!currentAnalysis) return null;

  const {
    syntheticProbability,
    spectralAnomaly,
    prosodyAnomaly,
    speakerSimilarity,
    modelConfidence,
    riskScore,
    riskLevel,
  } = currentAnalysis;

  const recommendation =
    riskLevel === "HIGH"
      ? "Do not approve sensitive actions. Verify identity through a secondary trusted channel and escalate the event."
      : riskLevel === "MEDIUM"
      ? "Additional identity verification is recommended before taking sensitive action."
      : "No significant voice integrity threat detected. Continue monitoring.";

  return (
    <section className="results-section">
      <div className="section-header">
        <div className="tag">
          LIVE SECURITY ANALYSIS
        </div>

        <h2>Voice Integrity Report</h2>

        <p>
          Real-time indicators generated from
          the most recent analysis window.
        </p>
      </div>

      <div className="result-grid">
        <div className="risk-card">
          <span>OVERALL RISK SCORE</span>

          <div
            className={`risk-number ${riskLevel.toLowerCase()}`}
          >
            {riskScore}%
          </div>

          <div
            className={`risk-status ${riskLevel.toLowerCase()}`}
          >
            {riskLevel} RISK
          </div>
        </div>

        <div className="metrics-card">
          <Metric
            label="Synthetic Probability"
            value={syntheticProbability}
          />

          <Metric
            label="Spectral Anomaly"
            value={spectralAnomaly}
          />

          <Metric
            label="Prosody Anomaly"
            value={prosodyAnomaly}
          />

          <Metric
            label="Speaker Similarity"
            value={speakerSimilarity}
            positive
          />

          <Metric
            label="Model Confidence"
            value={modelConfidence}
            positive
          />
        </div>
      </div>

      <div className="recommendation-card">
        <div className="recommendation-icon">
          🛡
        </div>

        <div>
          <strong>
            Recommended Action
          </strong>

          <p>
            {recommendation}
          </p>
        </div>
      </div>

      <AnalysisHistory
        analysisData={analysisData}
      />

      {sessionEnded && (
        <div className="session-ended">
          <h3>
            ✓ Monitoring Session Completed
          </h3>

          <p>
            Final analysis summary is ready.
          </p>

          <ReportDownload
            analysisData={analysisData}
            mode={mode}
          />
        </div>
      )}
    </section>
  );
}

function Metric({
  label,
  value,
  positive = false,
}) {
  return (
    <div className="metric">
      <div className="metric-top">
        <span>{label}</span>

        <strong>
          {value}%
        </strong>
      </div>

      <div className="metric-bar">
        <div
          className={
            positive
              ? "metric-fill positive"
              : "metric-fill"
          }
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}

export default AnalysisResult;