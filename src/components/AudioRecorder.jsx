import { useRef, useState } from "react";

function AudioRecorder({ onRecordingReady }) {
  const [isRecording, setIsRecording] =
    useState(false);

  const [recorded, setRecorded] =
    useState(false);

  const mediaRecorderRef =
    useRef(null);

  const chunksRef = useRef([]);

  const startRecording = async () => {
    const stream =
      await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

    const recorder =
      new MediaRecorder(stream);

    mediaRecorderRef.current = recorder;

    chunksRef.current = [];

    recorder.ondataavailable = (event) => {
      chunksRef.current.push(event.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(
        chunksRef.current,
        {
          type: "audio/webm",
        }
      );

      const file = new File(
        [blob],
        "recorded-voice.webm",
        {
          type: "audio/webm",
        }
      );

      onRecordingReady(file);

      stream
        .getTracks()
        .forEach((track) => track.stop());

      setRecorded(true);
    };

    recorder.start();

    setIsRecording(true);
    setRecorded(false);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  return (
    <div className="option-card">
      <div className="option-icon">
        🎤
      </div>

      <h3>Record Voice</h3>

      <p>
        Record a voice sample directly from your
        microphone for integrity analysis.
      </p>

      {!isRecording ? (
        <button
          className="secondary-btn"
          onClick={startRecording}
        >
          🎙 Start Recording
        </button>
      ) : (
        <button
          className="danger-btn"
          onClick={stopRecording}
        >
          ⏹ Stop Recording
        </button>
      )}

      {recorded && (
        <div className="recorded-status">
          ✓ Recording Ready
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;