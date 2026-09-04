import { useState } from "react";
import "./index.css";

import LiveCallMonitor from "./components/LiveCallMonitor";
import AudioUploader from "./components/AudioUploader";
import AudioRecorder from "./components/AudioRecorder";
import AnalysisResult from "./components/AnalysisResult";

function App() {
  const [activeMode, setActiveMode] = useState(null);
  const [analysisData, setAnalysisData] = useState([]);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [audioFile, setAudioFile] = useState(null);

  const handleLiveAnalysis = (data) => {
    setActiveMode("LIVE CALL");
    setCurrentAnalysis(data);
    setAnalysisData((previous) => [...previous, data]);
  };

  const handleLiveStart = () => {
    setActiveMode("LIVE CALL");
    setAnalysisData([]);
    setCurrentAnalysis(null);
    setSessionEnded(false);
  };

  const handleLiveStop = () => {
    setSessionEnded(true);
  };

  const handleUpload = (file) => {
    setAudioFile(file);
    setActiveMode("UPLOAD");
    setAnalysisData([]);
    setCurrentAnalysis(null);
    setSessionEnded(false);
  };

  const handleRecording = (file) => {
    setAudioFile(file);
    setActiveMode("RECORDING");
    setAnalysisData([]);
    setCurrentAnalysis(null);
    setSessionEnded(false);
  };

  const runDemoAnalysis = () => {
    const syntheticProbability = Math.floor(Math.random() * 60) + 5;
    const spectralAnomaly = Math.floor(Math.random() * 50) + 5;
    const prosodyAnomaly = Math.floor(Math.random() * 45) + 5;
    const speakerSimilarity = Math.floor(Math.random() * 30) + 70;
    const modelConfidence = Math.floor(Math.random() * 15) + 82;

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

    const data = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      syntheticProbability,
      spectralAnomaly,
      prosodyAnomaly,
      speakerSimilarity,
      modelConfidence,
      riskScore,
      riskLevel,
    };

    setCurrentAnalysis(data);
    setAnalysisData([data]);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="brand">
          <div className="brand-shield">🛡</div>

          <div>
            <div className="logo">
              VoxShield <span>AI</span>
            </div>

            <div className="brand-subtitle">
              REAL-TIME VOICE INTEGRITY PLATFORM
            </div>
          </div>
        </div>

        <div className="system-status">
          <span className="online-dot"></span>
          SYSTEM ONLINE
        </div>
      </nav>

      <main className="dashboard">
        <section className="hero">
          <div className="hero-left">
            <div className="tag">
              AI-POWERED VOICE SECURITY
            </div>

            <h1>
              Detect Voice Cloning
              <span> Before It Becomes a Threat.</span>
            </h1>

            <p>
              VoxShield AI monitors voice streams and recordings to identify
              synthetic speech, cloned voices, acoustic anomalies and possible
              impersonation attempts.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-btn"
                onClick={() =>
                  document
                    .getElementById("analysis")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Start Monitoring →
              </button>

              <div className="privacy-mini">
                🔐 Privacy-Aware Analysis
              </div>
            </div>
          </div>

          <div className="hero-engine-card">
            <div className="engine-top">
              <span>VOICE INTEGRITY ENGINE</span>

              <span className="engine-active">
                ● ACTIVE
              </span>
            </div>

            <div className="engine-shield">
              🛡
            </div>

            <div className="engine-feature">
              ✓ Synthetic Voice Detection
            </div>

            <div className="engine-feature">
              ✓ Speaker Consistency Analysis
            </div>

            <div className="engine-feature">
              ✓ Real-Time Risk Monitoring
            </div>
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <span>Detection Engine</span>
            <strong>ACTIVE</strong>
          </div>

          <div className="stat-card">
            <span>Analysis Mode</span>
            <strong>
              {activeMode || "READY"}
            </strong>
          </div>

          <div className="stat-card">
            <span>Monitoring</span>
            <strong>
              {activeMode === "LIVE CALL"
                ? "LIVE"
                : "STANDBY"}
            </strong>
          </div>

          <div className="stat-card">
            <span>Privacy Mode</span>
            <strong>SECURE</strong>
          </div>
        </section>

        <section id="analysis" className="analysis-section">
          <div className="section-header">
            <div className="tag">
              VOICE ANALYSIS
            </div>

            <h2>Choose Analysis Mode</h2>

            <p>
              Start real-time monitoring, upload an existing audio recording,
              or record a new voice sample.
            </p>
          </div>

          <div className="analysis-options">
            <LiveCallMonitor
              onStart={handleLiveStart}
              onStop={handleLiveStop}
              onAnalysis={handleLiveAnalysis}
            />

            <AudioUploader
              onFileSelected={handleUpload}
            />

            <AudioRecorder
              onRecordingReady={handleRecording}
            />
          </div>

          {activeMode !== "LIVE CALL" && audioFile && (
            <div className="manual-analysis">
              <div>
                <span>Selected Mode</span>
                <strong>{activeMode}</strong>
              </div>

              <button
                className="primary-btn"
                onClick={runDemoAnalysis}
              >
                Analyze Voice →
              </button>
            </div>
          )}
        </section>

        {(currentAnalysis || analysisData.length > 0) && (
          <AnalysisResult
            currentAnalysis={currentAnalysis}
            analysisData={analysisData}
            mode={activeMode}
            sessionEnded={sessionEnded}
          />
        )}
      </main>

      <footer className="footer">
        <strong>VoxShield AI</strong>

        <span>
          Real-Time Voice Integrity & Impersonation Detection
        </span>
      </footer>
    </div>
  );
}

export default App;