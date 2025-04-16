import { useEffect, useRef } from 'react';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }

    const gl = canvas.getContext("webgl");
    if (!gl) {
      alert("Unable to initialize WebGL.");
      return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }, []); // Runs once when the component mounts

  return <canvas ref={canvasRef} width="640" height="480"></canvas>;
}

export default App;