import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import { useGlobalContext } from "../../Context/GlobalContext";

const Bus = () => {
  const { scene } = useGLTF("./battle_bus/scene.gltf");
  const { isMobile } = useGlobalContext();

  return (
    <mesh>
      <hemisphereLight intensity={1} color={"#FFAC1C"} groundColor="white" />
      <spotLight
        position={[200, 0, 20]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={3} color={"#FFAC1C"}/>
      <primitive
        object={scene}
        scale={isMobile ? 0.03 : 0.04}
        position={isMobile ? [4, -2.5, 0] : [4, -2.5, 0]}
        rotation={[0, 0, 0]}
      />
    </mesh>
  );
};

const BusCanvas = () => {
  return (
    <Canvas
      frameloop="demand" // Setting it to "demand" means the renderer will only render frames when necessary, typically when something changes in the scene.
      shadows // To use shadows, you need to configure lights (like directionalLight or spotLight) to cast shadows and materials (MeshStandardMaterial or MeshPhongMaterial) to receive shadows.
      dpr={[1, 2]} // dpr stands for Device Pixel Ratio. Setting it as an array [1, 2] indicates that the canvas should use different pixel ratios depending on the device's capabilities. Here, [1, 2] means it will use a DPR of 1 (normal resolution) for lower-resolution devices and DPR of 2 (high resolution) for high-resolution devices, improving rendering quality on high-density screens.
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }} // gl allows you to pass WebGL context attributes to the underlying Three.js renderer (THREE.WebGLRenderer). preserveDrawingBuffer: true ensures that the contents of the canvas remain intact after being rendered, allowing you to capture the canvas or perform post-processing effects.
      className="absolute inset-0 w-full h-full"
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate={true}
          autoRotateSpeed={-5.0}
        />
        <Bus />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BusCanvas;

useGLTF.preload("/battle_bus/scene.gltf");
