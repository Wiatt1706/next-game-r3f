import {
  ContactShadows,
 
  useTexture,
} from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
const Ground: React.FC = () => {
  
  const map = useTexture("./textures/Stylized_Stone_Floor_005_basecolor.jpg");
  const displacementMap = useTexture(
    "textures/Stylized_Stone_Floor_005_height.png"
  );
  const normalMap = useTexture("textures/Stylized_Stone_Floor_005_normal.jpg");
  const roughnessMap = useTexture(
    "textures/Stylized_Stone_Floor_005_roughness.jpg"
  );

  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  displacementMap.wrapS = displacementMap.wrapT = THREE.RepeatWrapping;
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;
  return (
    <>
      <RigidBody type="fixed" colliders="trimesh">
        {/* <mesh position={[0, -0.1, 0]} rotation-x={-Math.PI / 2} receiveShadow>
          <planeGeometry args={[1000, 1000]} />
          <meshStandardMaterial
            map={map}
            normalMap={normalMap}
            roughnessMap={roughnessMap}
            displacementMap={displacementMap}
            map-repeat={[240, 240]}
            normalMap-repeat={[240, 240]}
            roughnessMap-repeat={[240, 240]}
            displacementMap-repeat={[240, 240]}
            color={"#fff"}
          />
        </mesh> */}

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.01, 0]}
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <shadowMaterial transparent opacity={0.4} />
        </mesh>
        <ContactShadows position={[0, 0, 0]} scale={200} blur={1} far={10} />
      </RigidBody>
    </>
  );
};

export default Ground;
