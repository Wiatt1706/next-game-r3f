import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Annotation({ children, ...props }) {
  return (
    <Html
      {...props}
      style={{ userSelect: "none" }}
      castShadow
      receiveShadow
      occlude="blending"
      transform
    >
      {children}
    </Html>
  );
}

export function AnnotationModel(props) {
  const group = useRef();
  const light = useRef();
  const { nodes } = useGLTF("/models/graces-draco.glb");

  return (
    <group ref={group} {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Node_3.geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.2}
        dispose={null}
      >
        <meshLambertMaterial color="#404044" />
      </mesh>
      <Annotation position={[1.75, 3, 2.5]}>
        Thalia <span style={{ fontSize: "1.5em" }}>🌗</span>
      </Annotation>
      <Annotation position={[-4.5, 3.6, -3]}>
        Euphrosyne <span style={{ fontSize: "1.5em" }}>🌖</span>
      </Annotation>
      <Annotation position={[1.5, 8, -3]}>
        <span style={{ fontSize: "1.5em" }}>🌕</span> Aglaia
      </Annotation>
      <spotLight
        angle={0.5}
        penumbra={0.5}
        ref={light}
        castShadow
        intensity={10}
        shadow-mapSize={1024}
        shadow-bias={-0.001}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-10, 10, -10, 10, 0.1, 50]}
        />
      </spotLight>
    </group>
  );
}
