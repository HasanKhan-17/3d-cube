import * as THREE from "three";
import { useEffect, useRef } from "react";

function TexturedCube() {
  const refContainer = useRef(null);

  useEffect(() => {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    refContainer.current.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();

    // image textures
    const texturePaths = [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo187BbScTWHiSErFZXVW50_Tg6wJx4TsPFA&s",
      "/textures/left.JPG",
      "/textures/front.jpg",
      "/textures/back.jpg",
    ];

    const materials = texturePaths.map((path) => {
      const texture = loader.load(path);
      // texture.colorSpace = THREE.SRGBColorSpace;

      return new THREE.MeshBasicMaterial({
        map: texture,
      });
    });

    // -------- TEXTURE FOR TEXT --------

    function createTextTexture(text) {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;

      const context = canvas.getContext("2d");

      context.fillStyle = "red";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "black";
      context.font = "bold 40px Arial";
      context.textAlign = "center";
      context.textBaseline = "middle";
      
        // draw text slightly lower to avoid clipping
      context.fillText(text, canvas.width / 2, canvas.height / 2 + 20);

      const texture = new THREE.CanvasTexture(canvas);
      return new THREE.MeshBasicMaterial({ map: texture });
    }

    const text1 = createTextTexture("Hasan Khan");
    const text2 = createTextTexture("B23110006099");

    // cube needs 6 materials
    const cubeMaterials = [
      materials[0], // right
      materials[1], // left
      text1,        // top
      text2,        // bottom
      materials[2], // front
      materials[3], // back
      
    ];

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const cube = new THREE.Mesh(geometry, cubeMaterials);

    scene.add(cube);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    animate();

  }, []);

  return <div ref={refContainer}></div>;
}

export default TexturedCube;
