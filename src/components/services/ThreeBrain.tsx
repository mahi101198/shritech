"use client"

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function ThreeBrain() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const brainRef = useRef<THREE.Group | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0x8b5cf6, 2, 100);
        pointLight1.position.set(5, 5, 5);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xec4899, 2, 100);
        pointLight2.position.set(-5, -5, 5);
        scene.add(pointLight2);

        // Create Neural Network Brain
        const brainGroup = new THREE.Group();
        brainRef.current = brainGroup;

        // Create nodes (neurons)
        const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
        const nodes: THREE.Mesh[] = [];
        const nodeCount = 80;

        for (let i = 0; i < nodeCount; i++) {
            const phi = Math.acos(-1 + (2 * i) / nodeCount);
            const theta = Math.sqrt(nodeCount * Math.PI) * phi;

            const x = 2 * Math.cos(theta) * Math.sin(phi);
            const y = 2 * Math.sin(theta) * Math.sin(phi);
            const z = 2 * Math.cos(phi);

            const hue = (i / nodeCount) * 0.3 + 0.6;
            const nodeMaterial = new THREE.MeshPhongMaterial({
                color: new THREE.Color().setHSL(hue, 1, 0.6),
                emissive: new THREE.Color().setHSL(hue, 1, 0.3),
                shininess: 100,
                transparent: true,
                opacity: 0.9
            });

            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
            node.position.set(x, y, z);
            brainGroup.add(node);
            nodes.push(node);
        }

        // Create connections (synapses)
        const connections: { line: THREE.Line; start: number; end: number }[] = [];
        for (let i = 0; i < nodes.length; i++) {
            const connectionsPerNode = 3;
            for (let j = 0; j < connectionsPerNode; j++) {
                const targetIndex = Math.floor(Math.random() * nodes.length);
                if (targetIndex !== i) {
                    const points = [];
                    points.push(nodes[i].position);
                    points.push(nodes[targetIndex].position);

                    const geometry = new THREE.BufferGeometry().setFromPoints(points);
                    const material = new THREE.LineBasicMaterial({
                        color: 0x8b5cf6,
                        transparent: true,
                        opacity: 0.2
                    });

                    const line = new THREE.Line(geometry, material);
                    brainGroup.add(line);
                    connections.push({ line, start: i, end: targetIndex });
                }
            }
        }

        // Add central core
        const coreGeometry = new THREE.IcosahedronGeometry(0.5, 1);
        const coreMaterial = new THREE.MeshPhongMaterial({
            color: 0xec4899,
            emissive: 0xec4899,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.6,
            wireframe: true
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        brainGroup.add(core);

        // Add outer wireframe sphere
        const outerGeometry = new THREE.SphereGeometry(2.5, 32, 32);
        const outerMaterial = new THREE.MeshBasicMaterial({
            color: 0x6366f1,
            wireframe: true,
            transparent: true,
            opacity: 0.1
        });
        const outerSphere = new THREE.Mesh(outerGeometry, outerMaterial);
        brainGroup.add(outerSphere);

        scene.add(brainGroup);

        // Particle system
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount2 = 1000;
        const positions = new Float32Array(particleCount2 * 3);

        for (let i = 0; i < particleCount2 * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 20;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particleMaterial = new THREE.PointsMaterial({
            color: 0x8b5cf6,
            size: 0.05,
            transparent: true,
            opacity: 0.6
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        // Animation
        let time = 0;
        const animate = () => {
            animationFrameRef.current = requestAnimationFrame(animate);
            time += 0.005;

            if (brainRef.current) {
                // Rotate brain
                brainRef.current.rotation.y += 0.002;
                brainRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
            }

            // Pulse nodes
            nodes.forEach((node, i) => {
                const scale = 1 + Math.sin(time * 2 + i * 0.1) * 0.3;
                node.scale.set(scale, scale, scale);
            });

            // Pulse core
            core.rotation.x += 0.01;
            core.rotation.y += 0.02;
            const coreScale = 1 + Math.sin(time * 2) * 0.2;
            core.scale.set(coreScale, coreScale, coreScale);

            // Rotate outer sphere
            outerSphere.rotation.y -= 0.001;
            outerSphere.rotation.x += 0.0005;

            // Animate particles
            particles.rotation.y += 0.0005;

            // Update connections opacity
            connections.forEach((conn, i) => {
                const opacity = 0.1 + Math.sin(time * 3 + i * 0.5) * 0.15;
                conn.line.material.opacity = Math.max(0.05, opacity);
            });

            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMouseMove);

            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (container && renderer.domElement && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    const onMouseMove = (e: MouseEvent) => {
        if (brainRef.current) {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            brainRef.current.rotation.y = x * 0.5;
            brainRef.current.rotation.x = y * 0.3;
        }
    };

    return (
        <div ref={containerRef} className="w-full h-full" />
    );
}
