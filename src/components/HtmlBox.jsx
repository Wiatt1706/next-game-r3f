import { useState } from "react";
import { Html, OrbitControls } from "@react-three/drei";
import Embed from "../pages/Embed";
import EmbeddedWebpage from "@/components/EmbeddedWebpage";
export function HtmlBox() {
  const [size, set] = useState(0.5);

  return (
    <mesh scale={size * 2} position={[0, 2, 0.5]}>
      <boxGeometry />
      <meshStandardMaterial />
      <Html
        occlude
        className="content-embed"
        distanceFactor={1.5}
        position={[0, 0, 0.51]}
        transform
      >
        <Embed />
      </Html>
      <EmbeddedWebpage url="https://www.deepcosmo.com" width={400} height={300}>
    </mesh>
  );
}
