import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLightHelper } from "three";

const Lights: React.FC = () => {
  const lightRef = useRef<THREE.DirectionalLight>();

  // useHelper(lightRef, DirectionalLightHelper, 5, "red");
  return (
    <>
    
      <ambientLight intensity={1} color={"#ffffff"} />
      <directionalLight
        ref={lightRef}
        position={[0, 10, 10]}
        color={"#ffd700"}
        intensity={1.5}
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-bias={-0.002}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-20, 20, -20, 20, 0.1, 50]}
        />
      </directionalLight>
      <hemisphereLight args={["#654321", "#87CEEB", 0.9]} />
    </>
  );
};

export default Lights;
