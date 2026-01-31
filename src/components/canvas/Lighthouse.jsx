import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import CanvasLoader from "../Loader";
import { useGlobalContext } from "../../Context/GlobalContext";

const Lighthouse = () => {
  const group = useRef();
  const { isMobile } = useGlobalContext();
  const { scene, animations } = useGLTF("./lighthouse/scene.gltf");
  const { actions } = useAnimations(animations, group);
  const { lightningVisible } = useGlobalContext();

  useEffect(() => {
    //Take 001 is the name of the animation
    actions["Take 001"].play();
  }, [actions]);

  return (
    <mesh>
      <hemisphereLight
        intensity={lightningVisible ? 2 : 0.05}
        groundColor="black"
      />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={0.3}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={0.05} />
      <primitive
        ref={group}
        object={scene}
        scale={isMobile ? 0.06 : 0.1}
        position={isMobile ? [0, -3.0, 0] : [0, -3.2, 0]}
        rotation={[0, 0, 0]}
      />
    </mesh>
  );
};

const LighthouseCanvas = () => {
  const controls = useRef();

  // This useEffect hook updates the controls in the animation loop
  useEffect(() => {
    const animate = () => {
      controls?.current?.update();
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 30 }}
      gl={{ preserveDrawingBuffer: true }}
      className="absolute inset-0 w-full h-full"
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate={true}
          autoRotateSpeed={0.2}
          ref={controls}
        />
        <Lighthouse />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default LighthouseCanvas;

useGLTF.preload("/lighthouse/scene.gltf");