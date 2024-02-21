import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Environment, SoftShadows, Stats } from "@react-three/drei";
import Lights from "@/components/Lights";
import Ground from "@/components/Ground";
import Trees from "@/components/Tree";
import Player from "@/components/Player";
import { Physics } from "@react-three/rapier";
import { Suspense, useRef, useState, useTransition } from "react";
import Test from "@/components/Test";
import { useControls } from "leva";
import PcBook from "@/components/PcBook";

export default function Home() {
  // We turn this into a spring animation that interpolates between 0 and 1
  const testing = false;
  const { enabled, ...config } = useControls({
    enabled: true,
    size: { value: 6, min: 0, max: 100 },
    focus: { value: 0, min: 0, max: 2 },
    samples: { value: 10, min: 1, max: 20, step: 1 },
  });
  return (
    <div className="h-screen">
      <Canvas
        shadows
        camera={{ position: [0, 3, 2], far: 50, fov: 75, near: 0.1 }}
      >
        {testing && <axesHelper />}
        {testing && <Stats />}
        {testing && <gridHelper args={[50, 50]} />}
        <color attach="background" args={["#fff"]} />
        <fog attach="fog" args={["#fff", 10, 60]} />
        <Lights />
        {enabled && <SoftShadows {...config} />}
        <Env />
        <Suspense>
          <Physics>
            <Ground />
            <Trees boundary={50} count={40} />
            <Player />
          </Physics>
        </Suspense>
        <Test />
        <PcBook  scale={0.2} position={[1, 1, 3]}/>
      </Canvas>
    </div>
  );
}

function Env() {
  const [preset, setPreset] = useState("city");
  // You can use the "inTransition" boolean to react to the loading in-between state,
  // For instance by showing a message
  const [inTransition, startTransition] = useTransition();
  const { blur } = useControls({
    blur: { value: 1, min: 0, max: 1 },
    preset: {
      value: preset,
      options: [
        "sunset",
        "dawn",
        "night",
        "warehouse",
        "forest",
        "apartment",
        "studio",
        "city",
        "park",
        "lobby",
      ],
      // If onChange is present the value will not be reactive, see https://github.com/pmndrs/leva/blob/main/docs/advanced/controlled-inputs.md#onchange
      // Instead we transition the preset value, which will prevents the suspense bound from triggering its fallback
      // That way we can hang onto the current environment until the new one has finished loading ...
      onChange: (value) => startTransition(() => setPreset(value)),
    },
  });
  return <Environment preset={preset} background blur={blur} />;
}
