import { StrictMode } from "react";

import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Experience from "./Experience.js";

const root = ReactDOM.createRoot(document.querySelector("#root"));

const created = ({ gl, scene }) => {
  console.log("gl", gl);
  console.log("scene", scene);

  // -- 1. Change background with scene
  // scene.background = new THREE.Color('red')

  // -- 2. Change background with WebGL Renderer
  // gl.setClearColor("ivory", 1);
};

root.render(
  <StrictMode>
    <Canvas
      // shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      onCreated={created}
    >
      {/* -- 3. Change bacgrkound with R3F color */}
      <color args={["ivory"]} attach='background' />

      <Experience />
    </Canvas>
  </StrictMode>
);
