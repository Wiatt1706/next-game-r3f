import { Instance, Instances, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Grid } from "./GridBox";
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
      {/* <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial
          // map={map}
          // normalMap={normalMap}
          // roughnessMap={roughnessMap}
          // displacementMap={displacementMap}
          // map-repeat={[240, 240]}
          // normalMap-repeat={[240, 240]}
          // roughnessMap-repeat={[240, 240]}
          // displacementMap-repeat={[240, 240]}
          color={"#ffffff"}
        />
      </mesh> */}
      <Grid />
    </>
  );
};

export default Ground;
