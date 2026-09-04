import { useEffect, useRef } from "react";

function LiveSpectrum({ stream }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    if (!stream || !canvasRef.current) return;

    const audioContext =
      new (window.AudioContext ||
        window.webkitAudioContext)();

    audioContextRef.current = audioContext;

    const analyser =
      audioContext.createAnalyser();

    analyser.fftSize = 256;

    const source =
      audioContext.createMediaStreamSource(stream);

    source.connect(analyser);

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const bufferLength =
      analyser.frequencyBinCount;

    const dataArray =
      new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current =
        requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      const barWidth =
        canvas.width / bufferLength;

      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const height =
          (dataArray[i] / 255) *
          canvas.height;

        context.fillStyle =
          "rgba(103, 232, 249, 0.85)";

        context.fillRect(
          x,
          canvas.height - height,
          barWidth - 1,
          height
        );

        x += barWidth;
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(
        animationRef.current
      );

      audioContext.close();
    };
  }, [stream]);

  return (
    <div className="spectrum-wrapper">
      <canvas
        ref={canvasRef}
        width="500"
        height="120"
        className="spectrum-canvas"
      />
    </div>
  );
}

export default LiveSpectrum;