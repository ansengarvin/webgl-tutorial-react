import { useEffect, useRef } from 'react';
import { initShaderProgram } from './lib/webGL/shaders';
import { ProgramInfo } from './lib/webGL/programInfo';
import { initBuffers } from './lib/webGL/buffers';
import { drawSceneCube, drawSceneSquare } from './lib/webGL/drawScene';

// Vertex shader program
const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

const fsSource = `
  varying lowp vec4 vColor;

  void main() {
    gl_FragColor = vColor;
  }
`;

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

    // Initialize a shader program; this is where all the lighting
    // for the vertices and so forth is established.
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    let cubeRotation = 0.0;
    let deltaTime = 0;

    if (!shaderProgram) {
      console.error("Failed to initialize shader program")
      return;
    }

    // Collect all the info needed to use the shader program.
    // Look up which attribute our shader program is using
    // for aVertexPosition and look up uniform locations.
    const programInfo: ProgramInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
      },
    };

    const buffers = initBuffers(gl);

    let then = 0

    function render(now: number) {
      now *= 0.001;
      deltaTime = now - then;
      then = now;

      if (gl) {
        drawSceneCube(gl, programInfo, buffers, cubeRotation)
        cubeRotation += deltaTime;
      }
      
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

  }, []); // Runs once when the component mounts

  return <canvas ref={canvasRef} width="640" height="480"></canvas>;
}

export default App;