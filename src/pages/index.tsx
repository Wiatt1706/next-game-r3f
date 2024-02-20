import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Stats,
} from "@react-three/drei";
import Lights from "@/components/Lights";
import Ground from "@/components/Ground";
import Trees from "@/components/Tree";
import Player from "@/components/Player";
import { GlassBox } from "@/components/GlassBox";
import { Text3DModel } from "@/components/Text";

export default function Home() {
  const testing = false;

  return (
    <div className="h-screen">
      <Canvas shadows camera={{ position: [0, 3, 2] }}>
        {testing && <axesHelper />}
        {testing && <Stats />}
        {testing && <gridHelper args={[50, 50]} />}
        <color attach="background" args={["#fff"]} />
        <fog attach="fog" args={["#fff", 10, 60]} />
        <Lights />
        <Ground />
        <Trees boundary={50} count={40} />
        <Player />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
