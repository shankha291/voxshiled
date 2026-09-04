function RiskCard({ score = 87, risk = "LOW" }) {
  const riskColor =
    risk === "HIGH"
      ? "#ff5c5c"
      : risk === "MEDIUM"
      ? "#ffb84d"
      : "#72e6a5";

  return (
    <div className="risk-card">
      <div className="risk-header">
        <div>
          <p className="tag">AUTHENTICITY SCORE</p>
          <h2>{score}%</h2>
        </div>

        <div
          className="risk-badge"
          style={{ color: riskColor, borderColor: riskColor }}
        >
          ● {risk} RISK
        </div>
      </div>

      <div className="score-bar">
        <div
          className="score-fill"
          style={{
            width: `${score}%`,
            background: riskColor,
          }}
        />
      </div>

      <div className="risk-message">
        <span>✓</span>
        <p>
          No significant voice cloning indicators detected.
        </p>
      </div>
    </div>
  );
}

export default RiskCard;