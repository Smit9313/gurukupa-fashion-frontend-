import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

function MyComponent() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Create a new Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create a new instance of the OBJLoader class
    const loader = new OBJLoader();

    // Load the OBJ file
    console.log(loader)
    loader.load("`C:\Users\PRANAV\Downloads\cow-nonormals.obj`", function (obj) {
      // Check if the object contains any children
      console.log(obj)
      if (obj.children.length > 0) {
        // Create a new Mesh with the geometry of the first child object
        const mesh = new THREE.Mesh(obj.children[0].geometry);

        // Add the mesh to the scene
        scene.add(mesh);
      } else {
        console.error("OBJ file does not contain any objects");
      }
    });

    // Add a light to the scene
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 10);
    scene.add(light);

    // Position the camera
    camera.position.z = 5;

    // Render the scene
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    // Clean up Three.js resources when the component unmounts
    return () => {
      renderer.dispose();
      loader.dispose();
      scene.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
}

export default MyComponent;
