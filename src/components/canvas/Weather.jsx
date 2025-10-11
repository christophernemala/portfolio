import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LightningStrike } from "three/examples/jsm/geometries/LightningStrike.js";
import { Preload, useTexture } from "@react-three/drei";
import { smoke } from "../../assets";
import { useGlobalContext } from "../../Context/GlobalContext";

const Rain = ({ rainCount }) => {
  const rainGeo = useRef(new THREE.BufferGeometry());
  const rainVertices = useRef(new Float32Array(rainCount * 6));
  const raindropsFallingSpeed = 1.5;

  useEffect(() => {
    const length = 0.5; // Fixed length for raindrops
    for (let i = 0; i < rainCount; i++) {
      const x = Math.random() * 400 - 200;
      const y = Math.random() * 500 - 250;
      const z = Math.random() * 400 - 200;
      rainVertices.current[i * 6] = x;
      rainVertices.current[i * 6 + 1] = y;
      rainVertices.current[i * 6 + 2] = z;
      rainVertices.current[i * 6 + 3] = x;
      rainVertices.current[i * 6 + 4] = y - length; // Fixed length
      rainVertices.current[i * 6 + 5] = z;
    }
    rainGeo.current.setAttribute(
      "position",
      new THREE.BufferAttribute(rainVertices.current, 3)
    );
  }, [rainCount]);

  useFrame(() => {
    const positions = rainGeo.current.attributes.position.array;
    for (let i = 0; i < rainCount; i++) {
      positions[i * 6 + 1] -= raindropsFallingSpeed; // Falling speed
      positions[i * 6 + 4] -= raindropsFallingSpeed; // Falling speed
      if (positions[i * 6 + 1] < -250) {
        // When a drop reaches the bottom, reset its position
        const x = Math.random() * 400 - 200;
        const z = Math.random() * 400 - 200;
        positions[i * 6] = x;
        positions[i * 6 + 1] = 250; // Reset to top
        positions[i * 6 + 2] = z;
        positions[i * 6 + 3] = x;
        positions[i * 6 + 4] = 250 - 0.5;
        positions[i * 6 + 5] = z;
      }
    }
    rainGeo.current.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments geometry={rainGeo.current}>
      <lineBasicMaterial attach="material" color={0xaaaaaa} transparent />
    </lineSegments>
  );
};

const Clouds = ({ lightningVisible }) => {
  const cloudParticles = useRef([]);
  const [renderCount, setRenderCount] = useState(0);
  const cloudGeo = useRef(new THREE.PlaneGeometry(300, 300));
  const texture = useTexture(smoke);
  const highlightColor = new THREE.Color(0xB0E0E6);
  const originalColor = new THREE.Color(0xffffff);

  useEffect(() => {
    setRenderCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    for (let p = 0; p < 25; p++) {
      let cloud = new THREE.Mesh(
        cloudGeo.current,
        new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true,
          opacity: 0.2,
          depthTest: true,
          color: originalColor,
        })
      );
      cloud.position.set(
        Math.random() * 800 - 400, // Spread horizontally
        Math.random() * 100 + 150, // Position the clouds higher in the scene
        Math.random() * 200 - 100 // Spread slightly in depth
      );
      cloud.rotation.set(1.16, -0.12, Math.random() * 360);
      cloudParticles.current.push(cloud);
    }
  }, [texture]);

  useFrame(() => {
    cloudParticles.current.forEach((p) => {
      p.position.x -= 0.1; // Move clouds horizontally
      if (p.position.x < -400) {
        p.position.x = 400; // Reset position to the right
      }
      p.rotation.z -= 0.001; // Rotate clouds

      // Enhanced cloud highlighting with color change
      if (lightningVisible) {
        p.material.opacity = 0.8;
        p.material.color.lerp(highlightColor, 0.3);
      } else {
        p.material.opacity = 0.2;
        p.material.color.lerp(originalColor, 0.1);
      }
    });
  });

  return (
    <>
      {cloudParticles.current.map((cloud, index) => (
        <primitive object={cloud} key={index * renderCount} />
      ))}
    </>
  );
};

const Lightning = ({ onLightningVisible, lightningVisible }) => {
  const lightningMesh = useRef(null);
  const lightningStrikeRef = useRef(null);
  const [lightningIntensity, setLightningIntensity] = useState(0);
  const flashLightRef = useRef(null);

  useEffect(() => {
    const sourceOffsetX = Math.random() * 2 - 1; // Between -1 and 1 (left to right)
    const sourceOffsetZ = Math.random() * 2 - 1; // Between -1 and 1 (front to back)
    const sourceOffset = new THREE.Vector3(sourceOffsetX, 100, sourceOffsetZ);
    const lightningParams = {
      sourceOffset: sourceOffset,
      destOffset: new THREE.Vector3(0, -100, 0),
      radius0: 2, // Increased radius for thicker lightning
      radius1: 0.5,
      minRadius: 0.3,
      maxIterations: 9, // More iterations for more detail
      isEternal: false,
      timeScale: 0.15, // Slower time scale for more dramatic effect
      propagationTimeFactor: 0.3, // Slower propagation
      vanishingTimeFactor: 2.0, // Longer vanishing time
      subrayPeriod: 3.0,
      subrayDutyCycle: 0.6,
      maxSubrayRecursion: 4, // More recursion for more branches
      ramification: 12, // More branches
      recursionProbability: 0.6,
      roughness: 0.9, // More roughness for more natural look
      straightness: 0.6, // Less straightness for more organic shape
    };

    const lightningStrike = new LightningStrike(lightningParams);
    lightningStrikeRef.current = lightningStrike;

    // Create multiple materials for a more intense effect
    const lightningMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xB0E0E6,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });

    const mesh = new THREE.Mesh(lightningStrike, lightningMaterial);
    lightningMesh.current = mesh;

    // Create flash light for screen illumination
    const flashLight = new THREE.PointLight(0xB0E0E6, 0, 1000);
    flashLight.position.copy(sourceOffset);
    flashLightRef.current = flashLight;

    // Lightning strike interval - REDUCED FREQUENCY
    const strikeLightning = () => {
      onLightningVisible(true);
      setLightningIntensity(1);
      
      // Multiple flashes for more realistic effect
      setTimeout(() => {
        setLightningIntensity(0.3);
      }, 100);
      
      setTimeout(() => {
        setLightningIntensity(0.8);
      }, 150);
      
      setTimeout(() => {
        setLightningIntensity(0.2);
      }, 200);
      
      setTimeout(() => {
        setLightningIntensity(0);
        onLightningVisible(false);
      }, 500);
    };

    // Start lightning strikes with REDUCED FREQUENCY
    const interval = setInterval(() => {
      strikeLightning();
    }, Math.random() * (15000 - 8000) + 8000);

    const initialStrike = setTimeout(() => {
      strikeLightning();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialStrike);
    };
  }, [onLightningVisible]);

  useFrame((state, delta) => {
    if (lightningMesh.current && lightningStrikeRef.current) {
      lightningStrikeRef.current.update(delta);
      
      // Animate lightning intensity
      if (lightningIntensity > 0) {
        const intensity = lightningIntensity * (0.8 + Math.random() * 0.4);
        lightningMesh.current.material.opacity = intensity;
        
        if (flashLightRef.current) {
          flashLightRef.current.intensity = intensity * 5;
        }
        
        // Gradually decrease intensity
        setLightningIntensity(prev => Math.max(0, prev - delta * 2));
      }
    }
  });

  return (
    <>
      {lightningVisible && lightningMesh.current && (
        <>
          <primitive object={lightningMesh.current} />
          <primitive object={flashLightRef.current} />
        </>
      )}
    </>
  );
};

const Scene = () => {
  const { lightningVisible, setLightningVisible } = useGlobalContext();
  const ambientLightRef = useRef();
  const directionalLightRef = useRef();

  const handleLightningVisible = (isVisible) => {
    setLightningVisible(isVisible);
    
    // Enhance ambient lighting during lightning strike
    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = isVisible ? 1.2 : 0.5;
    }
    if (directionalLightRef.current) {
      directionalLightRef.current.intensity = isVisible ? 0.8 : 0.5;
    }
  };

  return (
    <>
      <fog attach="fog" args={["#00000f", 0.001]} />
      <ambientLight ref={ambientLightRef} intensity={0.5} />
      <directionalLight ref={directionalLightRef} position={[0, 0, 1]} intensity={0.5} />
      <Clouds lightningVisible={lightningVisible} />
      <Rain rainCount={150000} />
      <Lightning
        onLightningVisible={handleLightningVisible}
        lightningVisible={lightningVisible}
      />
    </>
  );
};

const WeatherCanvas = () => {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none z-[-1]">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [0, 1, 1], rotation: [1.16, -0.12, 0.25] }}
        style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default WeatherCanvas;