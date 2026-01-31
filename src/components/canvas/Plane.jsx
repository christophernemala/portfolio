import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Preload,
  TrackballControls,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import CanvasLoader from "../Loader";
import { useGlobalContext } from "../../Context/GlobalContext";

const Plane = () => {
  const group = useRef();
  const { isMobile } = useGlobalContext();
  const { scene, animations } = useGLTF("./plane/scene.gltf");
  const { actions } = useAnimations(animations, group);
  const { lightningVisible } = useGlobalContext();

  useEffect(() => {
    //Take 001 is the name of the animation
    actions["Take 001"].play();
  }, [actions]);

  return (
    <mesh>
      <hemisphereLight
        intensity={lightningVisible ? 2 : 0.02}
        groundColor="white"
      />
      <spotLight
        /** 
          The spotlight positioned at [0, 0, 200](Z index) focuses exclusively on the front side of the plane, 
          regardless of its angle.
        */
        position={[0, 0, -200]}
        angle={0.5}
        penumbra={1}
        intensity={3}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={5} />
      <primitive
        ref={group}
        object={scene}
        scale={!isMobile ? 0.9 : 1.5}
        position={[-1, 0.5, -0.3]}
        rotation={[0, Math.PI, 0]}
      />
    </mesh>
  );
};

const PlaneCanvas = () => {
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
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="absolute inset-0 w-full h-full"
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* TrackballControls are employed here to enable a 360-degree rotation of the 3D model,
        whereas OrbitControls are restricted to horizontal rotation of 3D models. */}
        <TrackballControls ref={controls} noZoom />
        <Plane />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default PlaneCanvas;

useGLTF.preload("/plane/scene.gltf");
