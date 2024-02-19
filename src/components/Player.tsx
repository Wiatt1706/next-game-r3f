import { useEffect, useRef, useState } from "react";
import { useInput } from "@/hooks/useInput";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

let walkDirection = new THREE.Vector3();
let rotateAngle = new THREE.Vector3(0, 1, 0);
let rotateQuarternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();

const directionOffset = ({ forward, backward, left, right }: any) => {
  var directionOffset = 0; // w

  if (forward) {
    if (left) {
      directionOffset = Math.PI / 4; // w+a
    }
    if (right) {
      directionOffset = -Math.PI / 4; // w+d
    }
  } else if (backward) {
    if (left) {
      directionOffset = Math.PI / 4 + Math.PI / 2; // s+a
    } else if (right) {
      directionOffset = -Math.PI / 4 - Math.PI / 2; // s+d
    } else {
      directionOffset = Math.PI; // s
    }
  } else if (left) {
    directionOffset = Math.PI / 2; // a
  } else if (right) {
    directionOffset = -Math.PI / 2; // d
  }

  return directionOffset;
};

const Player = () => {
  const [autoRotate, setAutoRotate] = useState(true);
  const model = useGLTF("./models/player.glb");
  model.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });
  const { forward, backward, left, right, shift, jump } = useInput();
  const { actions } = useAnimations(model.animations, model.scene);

  const currentAction = useRef("");
  const controlsRef = useRef<typeof OrbitControls>();
  const camera = useThree((state) => state.camera);

  const updateCameraTarget = (moveX: number, moveZ: number) => {
    // 移动相机
    camera.position.x += moveX;
    camera.position.z += moveZ;

    // 旋转相机
    cameraTarget.x = model.scene.position.x;
    cameraTarget.y = model.scene.position.y + 2;
    cameraTarget.z = model.scene.position.z;
    if (controlsRef.current) controlsRef.current.target = cameraTarget;
  };

  useEffect(() => {
    let action = "";
    setAutoRotate(false);
    if (forward || backward || left || right) {
      action = "walking";
      if (shift) {
        action = "running";
      }
    } else if (jump) {
      action = "jump";
    } else {
      action = "idle";
    }

    if (currentAction.current != action) {
      const nextActionToPlay = actions?.[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.3);
      nextActionToPlay?.reset().fadeIn(0.3).play();
      currentAction.current = action;
    }
    // actions?.idel?.play();
  }, [forward, backward, left, right, shift, jump]);

  useFrame((state, delta) => {
    if (
      currentAction.current == "running" ||
      currentAction.current == "walking"
    ) {
      // 向摄像机方向计算
      let angleYCameraDirection = Math.atan2(
        camera.position.x - model.scene.position.x,
        camera.position.z - model.scene.position.z
      );

      // 对角线移动角偏移
      let newDirectionOffset = directionOffset({
        forward,
        backward,
        left,
        right,
      });

      // 旋转
      rotateQuarternion.setFromAxisAngle(
        rotateAngle,
        angleYCameraDirection + newDirectionOffset
      );
      model.scene.quaternion.rotateTowards(rotateQuarternion, 0.2);

      // 计算方向
      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);

      // 移动速度
      const velocity = currentAction.current == "running" ? 8 : 3;

      // 移动
      const moveX = walkDirection.x * velocity * delta;
      const moveZ = walkDirection.z * velocity * delta;
      model.scene.position.x += moveX;
      model.scene.position.z += moveZ;
      updateCameraTarget(moveX, moveZ);
    }
  });

  return (
    <>
      <OrbitControls
        enablePan={false}
        enableDamping
        maxPolarAngle={Math.PI / 2}
        autoRotate={autoRotate}
        dampingFactor={0.1}
        minDistance={1}
        maxDistance={5}
        ref={controlsRef}
      />
      <primitive object={model.scene} />
    </>
  );
};

export default Player;
