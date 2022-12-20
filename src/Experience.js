import {
  softShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Environment,
  Sky,
  Html,
  Text,
  Float,
  OrbitControls,
  BakeShadows,
  PivotControls,
  MeshReflectorMaterial,
  useHelper,
  Lightformer,
} from "@react-three/drei";

// -- Override ThreeJS native shadows

// softShadows({
//   frustum: 3.75,
//   size: 0.005,
//   near: 9.5,
//   samples: 17,
//   rings: 11,
// });

import * as THREE from "three";
import { Perf } from "r3f-perf";
import { useRef } from "react";
import { useControls, button } from "leva";
import { useFrame } from "@react-three/fiber";

import { Cube } from "./Cube";

export default function Experience() {
  const sphereRef = useRef();
  const cubeRef = useRef();
  const directionalLight = useRef();

  const { perfVisible } = useControls({
    perfVisible: false,
  });

  useHelper(directionalLight, THREE.DirectionalLightHelper, 2, "hotpink");

  useFrame((state, delta) => {
    // const time = state.clock.elapsedTime;
    // cubeRef.current.rotation.x = 2 + Math.sin(time);
    cubeRef.current.rotation.x += delta * 0.2;
    cubeRef.current.rotation.y += delta * 0.2;
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

  const { shadowColor, opacity, blur } = useControls("Contact Shadows", {
    shadowColor: "#1d8f75",
    opacity: {
      value: 0.4,
      min: 0,
      max: 1,
    },
    blur: { value: 2.8, min: 0, max: 10 },
  });

  const { sunPosition } = useControls("Sky", {
    sunPosition: { value: [1, 2, 3] },
  });

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls("environment map", {
      envMapIntensity: { value: 7, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 28, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    });

  return (
    <>
      {perfVisible && <Perf position='bottom-right' />}

      <Environment
        background
        // resolution={32}
        preset='sunset'
        // files={[
        //   "./environmentMaps/2/px.jpg",
        //   "./environmentMaps/2/nx.jpg",
        //   "./environmentMaps/2/py.jpg",
        //   "./environmentMaps/2/ny.jpg",
        //   "./environmentMaps/2/pz.jpg",
        //   "./environmentMaps/2/nz.jpg",
        // ]}
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
      >
        {/* <Lightformer position-z={-5} scale={10} color='red' intensity={10} /> */}
      </Environment>

      {/* <BakeShadows /> */}

      <OrbitControls makeDefault />

      {/* -- Important : Not working with TransformControls -> <OrbitControls makeDefault /> */}
      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color='#316d49'
        opacity={0.6}
        frames={Infinity}
        blend={100}
        temporal
      >
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          position={[1, 2, 3]}
          bias={0.001}
        />
      </AccumulativeShadows> */}

      <ContactShadows
        position={[0, -0.99, 0]}
        scale={10}
        resolution={512}
        far={6}
        color={shadowColor}
        opacity={opacity}
        blur={blur}
        frames={1} // Bake shadows
      />

      {/* <directionalLight
        ref={directionalLight}
        position={[1, 2, 3]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={2}
        shadow-camera-right={2}
        shadow-camera-bottom={-2}
        shadow-camera-left={-2}
      /> */}
      {/* <ambientLight intensity={0.5} /> */}

      {/* <Sky sunPosition={sunPosition} /> */}

      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={5}
        axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
        scale={1.5}
        fixed={false}
      >
        {/* Shpere */}
        <mesh position-x={-3} ref={sphereRef}>
          <sphereGeometry />
          <meshStandardMaterial
            color='orange'
            envMapIntensity={envMapIntensity}
          />
        </mesh>
      </PivotControls>

      <Cube scale={1.2} ref={cubeRef} />

      {/* Torus */}
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

      {/* Plane */}
      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        {/* <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.5}
          color='greenyellow'
        /> */}
        <meshStandardMaterial
          color='greenyellow'
          envMapIntensity={envMapIntensity}
        />
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

      {/* -- Staging */}

      {/* <Stage
        contactShadow={{ opacity: 0.2, blur: 3 }}
        environment='sunset'
        preset='portrait'
        intensity={2}
      >
        <Cube scale={1.2} ref={cubeRef} />
      </Stage> */}
    </>
  );
}
