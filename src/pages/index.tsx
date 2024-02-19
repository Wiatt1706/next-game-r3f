import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import Lights from "@/components/Lights";
import Ground from "@/components/Ground";
import Trees from "@/components/Tree";
import Player from "@/components/Player";

export default function Home() {
  const testing = true;

  return (
    <div className="h-screen">
      <Canvas shadows camera={{ position: [0, 3, 2] }}>
        {testing && <axesHelper />}
        {testing && <Stats />}
        {testing && <gridHelper args={[50, 50]} />}
        <Lights />
        <Ground />
        <Trees boundary={50} count={40} />
        <Player />
      </Canvas>
    </div>
  );
}
