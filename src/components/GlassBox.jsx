import {
  Float,
  MeshTransmissionMaterial,
  PivotControls,
  useGLTF,
} from "@react-three/drei";
import { useControls } from "leva";
import EmbeddedWebpage from "./EmbeddedWebpage";
import { Annotation } from "./Annotation";

export const GlassBox = ({ ...props }) => {
  const { nodes, materials } = useGLTF("/models/mac-draco.glb");
  return (
    <>
      <group {...props}>
         
        
      </group>
    </>
  );
};
