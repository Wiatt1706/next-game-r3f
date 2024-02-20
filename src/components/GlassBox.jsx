import { Float, MeshTransmissionMaterial, PivotControls } from "@react-three/drei";
import { useControls } from "leva";

export const GlassBox = ({ ...props }) => {
   
   return (
     <>
       <group {...props}>
        
        
         <Shape
           name="Rectangle 2"
           color="skyblue"
           position={[242.6, 207, -273.39]}
         />
       </group>
     </>
   );
};

function Shape({ name, float = 300, color, config, ...props }) {
  return (
    <Float floatIntensity={float} rotationIntensity={0} speed={2}>
      <mesh renderOrder={100}  {...props}>
        <boxGeometry />
        <MeshTransmissionMaterial
          color={color}
          toneMapped={false}
        />
      </mesh>
    </Float>
  );
}