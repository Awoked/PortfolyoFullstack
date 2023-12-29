import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export function Mars(props) {
  const { nodes, materials } = useGLTF("/mars.glb");
  const marsRef = useRef(null);
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    marsRef.current.rotation.y = elapsedTime / 8;
    // cloudsRef.current.rotation.y = elapsedTime / 7.6;
    // starsRef.current.rotation.y = elapsedTime / 42;
  });

  useEffect(() => {
    setTimeout(() => {
      gsap.to(marsRef.current.scale, {
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
    <group {...props} dispose={null} ref={marsRef} position={[1, -1, -3]}>
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials["Material.001"]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.4, 0.4, 0.4]}
      />
    </group>
  );
}
