'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

export default function RotatingStars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    // Clean previous canvas if any
    containerRef.current.innerHTML = '';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(160, 160);
    containerRef.current.appendChild(renderer.domElement);

    const starsGeometry = new THREE.BufferGeometry();
    const starColor = theme === 'dark' ? 0xffffff : 0x000000; // white in dark mode, black in light
    const starsMaterial = new THREE.PointsMaterial({
      color: starColor,
      size: 0.7,
      sizeAttenuation: true,
    });

    const starsCount = 200;
    const positions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      const radius = 20 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }

    starsGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    // Central star (gold)
    const centerStarGeometry = new THREE.BufferGeometry();
    const centerStarVertices: number[] = [];

    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5;
      const innerRadius = 5;
      const outerRadius = 10;

      centerStarVertices.push(
        Math.cos(angle) * outerRadius,
        Math.sin(angle) * outerRadius,
        0
      );
      const innerAngle = angle + Math.PI / 5;
      centerStarVertices.push(
        Math.cos(innerAngle) * innerRadius,
        Math.sin(innerAngle) * innerRadius,
        0
      );
    }

    centerStarGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(centerStarVertices, 3)
    );
    const centerStarMaterial = new THREE.LineBasicMaterial({
      color: theme === 'dark' ? 0xffd700 : 0xff8c00, // brighter gold in dark, orange-gold in light
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    const centerStar = new THREE.LineLoop(
      centerStarGeometry,
      centerStarMaterial
    );

    scene.add(stars);
    scene.add(centerStar);
    camera.position.z = 60;

    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.y += 0.002;
      stars.rotation.x += 0.001;
      centerStar.rotation.z += 0.005;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }

      scene.remove(stars);
      scene.remove(centerStar);
      starsGeometry.dispose();
      starsMaterial.dispose();
      centerStarGeometry.dispose();
      centerStarMaterial.dispose();
      renderer.dispose();
    };
  }, [theme]); // Re-run effect when theme changes

  return <div ref={containerRef} className="w-40 h-40 mx-auto" />;
}
