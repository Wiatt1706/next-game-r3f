import { ContactShadows, useGLTF } from "@react-three/drei";
import { Suspense, useDeferredValue } from "react";
import { useControls } from "leva";
const MODELS = {
  Beech:
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-beech/model.gltf",
  Lime: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-lime/model.gltf",
  Spruce:
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf",
};
export default function Test() {
  const { model } = useControls({
    model: { value: "Beech", options: Object.keys(MODELS) },
  });
  return (
    <group position={[0, 0, 0]}>
      <Suspense>
        <Model position={[0, 0.25, 0]} url={MODELS[model]} />
        <Model position={[20, 0.25, 0]} url={MODELS[model]} />
      </Suspense>
    </group>
  );
}
function Model({ url, ...props }) {
  const deferred = useDeferredValue(url);
  const { scene } = useGLTF(deferred);
  // <primitive object={...} mounts an already existing object
  return <primitive object={scene.clone()} {...props} />;
}
