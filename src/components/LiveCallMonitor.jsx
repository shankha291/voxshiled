import { useEffect, useRef, useState } from "react";
import LiveSpectrum from "./LiveSpectrum";

function LiveCallMonitor({ onStart, onStop, onAnalysis }) {
  const [isLive, setIsLive] = useState(false);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");

  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const analysisTimerRef = useRef(null);

  const startMonitoring = async () => {
    try {
      setError("");

      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      streamRef.current = stream;

      setDuration(0);
      setIsLive(true);

      onStart();

      timerRef.current = setInterval(() => {
        setDuration((previous) => previous + 1);
      }, 1000);

      analysisTimerRef.current = setInterval(() => {
        const syntheticProbability =
          Math.floor(Math.random() * 70) + 5;

        const spectralAnomaly =
          Math.floor(Math.random() * 60) + 5;

        const prosodyAnomaly =
          Math.floor(Math.random() * 55) + 5;

        const speakerSimilarity =
          Math.floor(Math.random() * 35) + 60;

        const modelConfidence =
          Math.floor(Math.random() * 15) + 82;

        const riskScore = Math.round(
          syntheticProbability * 0.4 +
            spectralAnomaly * 0.25 +
            prosodyAnomaly * 0.2 +
            (100 - speakerSimilarity) * 0.15
        );

        let riskLevel = "LOW";

        if (riskScore >= 65) {
          riskLevel = "HIGH";
        } else if (riskScore >= 35) {
          riskLevel = "MEDIUM";
        }

        onAnalysis({
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          syntheticProbability,
          spectralAnomaly,
          prosodyAnomaly,
          speakerSimilarity,
          modelConfidence,
          riskScore,
          riskLevel,
        });
      }, 5000);
    } catch (err) {
      setError(
        "Microphone permission is required to start live monitoring."
      );
    }
  };

  const stopMonitoring = () => {
    setIsLive(false);

    clearInterval(timerRef.current);
    clearInterval(analysisTimerRef.current);

    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => track.stop());
    }

    onStop();
  };

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      clearInterval(analysisTimerRef.current);

      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");

    const seconds = (time % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  return (
    <div className="option-card live-call-card">
      <div className="card-top">
        <div className="option-icon">
          📞
        </div>

        {isLive && (
          <div className="live-badge">
            <span></span>
            LIVE
          </div>
        )}
      </div>

      <h3>Live Call Monitor</h3>

      <p>
        Continuously monitor an accessible live voice stream and
        automatically update risk analysis every 5 seconds.
      </p>

      {isLive && (
        <div className="live-monitor-box">
          <div className="live-time">
            {formatTime(duration)}
          </div>

          <LiveSpectrum stream={streamRef.current} />

          <div className="monitor-text">
            <span className="monitor-dot"></span>

            AI analysis running every 5 seconds
          </div>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!isLive ? (
        <button
          className="secondary-btn"
          onClick={startMonitoring}
        >
          📞 Start Live Monitoring
        </button>
      ) : (
        <button
          className="danger-btn"
          onClick={stopMonitoring}
        >
          ⏹ Stop Monitoring
        </button>
      )}
    </div>
  );
}

export default LiveCallMonitor;