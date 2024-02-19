import { useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BoxHelper } from "three";

type Props = {
  isTesting: boolean;
};
export const AnimatedBox: React.FC<Props> = ({ isTesting }) => {
  const meshref = useRef<THREE.Mesh>(null);

  {
    isTesting && useHelper(meshref, BoxHelper, "red");
  }

  useFrame(() => {
    if (meshref.current) {
      meshref.current.rotateX(0.01);
    }
  });
  return (
    <mesh ref={meshref} scale={[0.5, 0.5, 0.5]}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
};
