import {
  Html,
  Text,
  Float,
  OrbitControls,
  PivotControls,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { Perf } from "r3f-perf";

import { useRef } from "react";
import { useControls, button } from "leva";

import { Cube } from "./Cube";

export default function Experience() {
  const sphereRef = useRef();
  const cubeRef = useRef();

  const { perfVisible } = useControls({
    perfVisible: false,
  });

  const { position, profondeur, color, visible } = useControls("Torus", {
    position: {
      value: {
        x: 0,
        y: 0,
      },
      joystick: "invertY",
      step: 0.01,
    },
    profondeur: {
      value: 0,
      step: 0.01,
      min: -3,
      max: 3,
    },
    color: "#e14392",
    visible: true,
    create: button(() => {
      console.log("create");
    }),
  });

  console.log("controls", position);

  return (
    <>
      {perfVisible && <Perf position='bottom-right' />}}
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={5}
        axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
        scale={1.5}
        fixed={false}
      >
        <mesh position-x={-3} ref={sphereRef}>
          <sphereGeometry />
          <meshStandardMaterial color='orange' />
        </mesh>
      </PivotControls>
      <Cube scale={2} ref={cubeRef} />
      <mesh
        visible={visible}
        position={[position.x, position.y, profondeur]}
        scale={0.5}
      >
        <torusKnotGeometry />
        <meshPhongMaterial color={color} />
        <Html
          position={[0.6, 0.6, 0]}
          wrapperClass='cube'
          center
          distanceFactor={8}
          occlude={[sphereRef, cubeRef]}
        >
          Un p'tit Torus 🦄
        </Html>
      </mesh>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.5}
          color='greenyellow'
        />
        {/* <meshStandardMaterial color='greenyellow' /> */}
      </mesh>
      <Float speed={3} floatIntensity={2}>
        <Text
          font='./bangers-v20-latin-regular.woff'
          fontSize={1.5}
          color='teal'
          position-y={3}
          maxWidth={8}
          textAlign='center'
        >
          React Three Fiber
        </Text>
      </Float>
    </>
  );
}
