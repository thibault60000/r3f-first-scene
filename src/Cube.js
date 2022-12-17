import { forwardRef } from "react";
import { TransformControls } from "@react-three/drei";

export const Cube = forwardRef(({ scale = 1 }, ref) => (
  <>
    <mesh position-x={3} scale={scale} ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color='mediumpurple' />
    </mesh>
    <TransformControls object={ref} mode='scale' />
  </>
));
