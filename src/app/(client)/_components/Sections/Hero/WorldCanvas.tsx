"use client";
import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

import EarthDayMap from "@/assets/textures/8k_earth_daymap.jpg";
import EarthClouds from "@/assets/textures/8k_earth_clouds.jpg";
import EarthNightMap from "@/assets/textures/8k_earth_nightmap.jpg";
import EarthNormalMap from "@/assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "@/assets/textures/8k_earth_specular_map.jpg";

import { TextureLoader, DoubleSide, Mesh, Group } from "three";
import gsap from "gsap";

function Globe() {
  const [colorMap, normalMap, specularMap, cloudMap, nightMap] = useLoader(
    TextureLoader,
    [
      EarthDayMap.src,
      EarthNormalMap.src,
      EarthSpecularMap.src,
      EarthClouds.src,
      EarthNightMap.src,
    ]
  );
  const earthRef = useRef<Mesh>(null!);
  const cloudsRef = useRef<Mesh>(null!);
  const starsRef = useRef<any>(null!);
  const globeRef = useRef<Group>(null!);
  const isMobile = matchMedia("(max-width:1023px)").matches;

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    earthRef.current.rotation.y = elapsedTime / 8;
    cloudsRef.current.rotation.y = elapsedTime / 7.6;
    starsRef.current.rotation.y = elapsedTime / 42;
  });

  useEffect(() => {
    setTimeout(() => {
      gsap.to(globeRef.current.scale, {
        x: 0.6,
        y: 0.6,
        z: 0.6,
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 90%",
          end: "bottom 65%",
          scrub: 1,
        },
      });
    }, 1000);
  }, []);

  return (
    <>
      <pointLight color={"#f6f3ea"} position={[0.8, 0.1, 5]} intensity={32.2} />
      <Stars
        radius={255}
        depth={60}
        count={isMobile ? 4000 : 6000}
        factor={5}
        saturation={0.5}
        fade={true}
        ref={starsRef}
      />
      <group ref={globeRef} scale={[1, 1, 1]} position={[0, -1.5, 0]}>
        <mesh ref={cloudsRef} position={[0, 0, 3]}>
          <sphereGeometry args={[1.02, 32, 32]} />
          <meshPhongMaterial
            map={cloudMap}
            opacity={0.4}
            depthWrite={true}
            transparent={true}
            side={DoubleSide}
          />
        </mesh>
        <mesh ref={earthRef} position={[0, 0, 3]}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhongMaterial specularMap={specularMap} />
          <meshStandardMaterial
            map={colorMap}
            normalMap={normalMap}
            metalness={0.4}
            roughness={1}
          />
        </mesh>
      </group>
    </>
  );
}

export default function WorldCanvas() {
  return (
    <>
      <div className="relative w-full h-full">
        <Canvas className="w-max h-max absolute left-0">
          <Globe />
        </Canvas>
      </div>
    </>
  );
}
