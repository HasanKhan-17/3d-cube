import * as THREE from "three";
import { useEffect, useRef } from "react";

function TexturedCube() {
  const refContainer = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111122);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    refContainer.current.appendChild(renderer.domElement);

    // -------- LIGHTING --------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1);
    dirLight1.position.set(2, 3, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight2.position.set(-3, 1, -2);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight3.position.set(0, 2, -5);
    scene.add(dirLight3);

    // -------- TEXTURE LOADER --------
    const loader = new THREE.TextureLoader();

    function loadTextureWithFallback(path, fallbackColor) {
      const texture = loader.load(
        path,
        undefined,
        undefined,
        () => console.warn(`Image not found: ${path}, using fallback color`)
      );
      return new THREE.MeshStandardMaterial({
        map: texture,
        color: fallbackColor,
      });
    }

    // Image textures (adjust paths if your files are named differently)
const rightMat = loadTextureWithFallback("https://onlinebooksoutlet.com/cdn/shop/files/Human-Computer-Interaction-3rd-Edition-by-Alan-Dix-Author-Janet-E.-Finlay-Author-2-more-OnlineBooksOutlet_0ac5016a-cb36-47de-88bb-99dc98704bb3.jpg", 0xff0000);
const leftMat  = loadTextureWithFallback("https://onlinebooksoutlet.com/cdn/shop/files/Human-Computer-Interaction-3rd-Edition-by-Alan-Dix-Author-Janet-E.-Finlay-Author-2-more-OnlineBooksOutlet_0ac5016a-cb36-47de-88bb-99dc98704bb3.jpg", 0x00ff00);
const frontMat = loadTextureWithFallback("https://onlinebooksoutlet.com/cdn/shop/files/Human-Computer-Interaction-3rd-Edition-by-Alan-Dix-Author-Janet-E.-Finlay-Author-2-more-OnlineBooksOutlet_0ac5016a-cb36-47de-88bb-99dc98704bb3.jpg", 0x0000ff);
const backMat  = loadTextureWithFallback("https://onlinebooksoutlet.com/cdn/shop/files/Human-Computer-Interaction-3rd-Edition-by-Alan-Dix-Author-Janet-E.-Finlay-Author-2-more-OnlineBooksOutlet_0ac5016a-cb36-47de-88bb-99dc98704bb3.jpg", 0xffff00);

    // -------- TEXT TEXTURES (Your Name & Seat Number) --------
    function createTextTexture(text, bgColor, textColor) {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = textColor;
      ctx.font = "bold 30px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      return new THREE.MeshBasicMaterial({ map: texture });
    }

    const topMat = createTextTexture("Muhammad Hasan Khan", "#ff6b6b", "#ffffff");
    const bottomMat = createTextTexture("B23110006099", "#4ecdc4", "#ffffff");

    // -------- CUBE (6 materials) --------
    const cubeMaterials = [
      rightMat,  // right
      leftMat,   // left
      topMat,    // top
      bottomMat, // bottom
      frontMat,  // front
      backMat    // back
    ];

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const cube = new THREE.Mesh(geometry, cubeMaterials);
    scene.add(cube);

    // -------- ANIMATION --------
    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.015;
      renderer.render(scene, camera);
    }
    animate();

    // -------- RESIZE HANDLER --------
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      refContainer.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={refContainer} style={{ width: "100%", height: "100vh" }} />;
}

export default TexturedCube;
