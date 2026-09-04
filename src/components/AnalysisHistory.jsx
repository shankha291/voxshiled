function AnalysisHistory({ analysisData }) {
  if (!analysisData.length) {
    return null;
  }

  return (
    <div className="history-card">
      <div className="result-card-title">
        Analysis Timeline
      </div>

      <div className="history-list">
        {[...analysisData]
          .reverse()
          .map((item) => (
            <div
              className="history-row"
              key={item.id}
            >
              <span>
                {item.timestamp}
              </span>

              <span
                className={`risk-label ${item.riskLevel.toLowerCase()}`}
              >
                {item.riskLevel}
              </span>

              <strong>
                {item.riskScore}%
              </strong>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AnalysisHistory;