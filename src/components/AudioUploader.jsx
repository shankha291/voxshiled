import { useState } from "react";

function AudioUploader({ onFileSelected }) {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setFileName(file.name);
    onFileSelected(file);
  };

  return (
    <div className="option-card">
      <div className="option-icon">
        📁
      </div>

      <h3>Upload Audio</h3>

      <p>
        Upload an existing voice recording for
        synthetic voice and impersonation analysis.
      </p>

      <label className="upload-box">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
        />

        <span>
          {fileName
            ? `✓ ${fileName}`
            : "Choose Audio File"}
        </span>
      </label>
    </div>
  );
}

export default AudioUploader;