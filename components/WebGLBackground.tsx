'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WebGLBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Grid Plane
    const geometry = new THREE.PlaneGeometry(200, 200, 60, 60);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xffffff, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.3 
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -15;
    scene.add(plane);

    // Save original vertices for animation
    const positionAttribute = geometry.attributes.position;
    const vertexData: { x: number, y: number, z: number, ang: number, amp: number, speed: number }[] = [];
    
    for (let i = 0; i < positionAttribute.count; i++) {
      vertexData.push({
        x: positionAttribute.getX(i),
        y: positionAttribute.getY(i),
        z: positionAttribute.getZ(i),
        ang: Math.random() * Math.PI * 2,
        amp: 0.5 + Math.random() * 1.5,
        speed: 0.01 + Math.random() * 0.02
      });
    }

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 4;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 30;
    camera.position.y = 5;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      targetX = mouseX * 10;
      targetY = mouseY * 10;

      // Breathe and distort grid
      for (let i = 0; i < positionAttribute.count; i++) {
        const data = vertexData[i];
        
        // Base breathing
        let z = data.z + Math.sin(time * data.speed + data.ang) * data.amp;
        
        // Magnetic mouse effect
        const dx = data.x - targetX * 5;
        const dy = data.y + targetY * 5; // Plane is rotated, y becomes z visually
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < 20) {
          z += (20 - dist) * 0.5; // Elevate points near mouse
        }

        positionAttribute.setZ(i, z);
      }
      positionAttribute.needsUpdate = true;

      // Float particles
      particlesMesh.rotation.y = time * 0.05;
      particlesMesh.rotation.x = time * 0.02;

      // Subtle camera movement
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 2 + 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-screen h-screen -z-10 pointer-events-none"
    />
  );
}
