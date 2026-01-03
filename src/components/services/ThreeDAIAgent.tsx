"use client"

import React, { useEffect, useRef, useState } from 'react';

export function ThreeDAIAgent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [threeLoaded, setThreeLoaded] = useState(false);
    const rendererRef = useRef<any>(null);
    const animationFrameRef = useRef<number | null>(null);

    // Load Three.js
    useEffect(() => {
        if ((window as any).THREE) {
            setThreeLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js';
        script.async = true;
        script.onload = () => setThreeLoaded(true);
        document.body.appendChild(script);

        return () => { };
    }, []);

    useEffect(() => {
        if (!threeLoaded || !containerRef.current) return;

        const THREE = (window as any).THREE;
        const container = containerRef.current;

        // Cleanup
        if (rendererRef.current) {
            try {
                if (container.contains(rendererRef.current.domElement)) {
                    container.removeChild(rendererRef.current.domElement);
                }
                rendererRef.current.dispose();
            } catch (e) { }
        }

        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 8);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        rendererRef.current = renderer;
        container.appendChild(renderer.domElement);

        // Group for the main agent
        const agentGroup = new THREE.Group();
        scene.add(agentGroup);

        // 1. BASE IMAGE (The Robot)
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
            '/images/ai-agent-ref.png',
            (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                // Original Image Aspect Ratio handling
                const aspect = texture.image.width / texture.image.height;
                const height = 4.5;
                const width = height * aspect;

                const geometry = new THREE.PlaneGeometry(width, height);
                const material = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,
                    side: THREE.FrontSide
                });
                const mesh = new THREE.Mesh(geometry, material);
                // Center the "Robot" part visually. Image might have whitespace.
                mesh.position.y = 0.2;
                agentGroup.add(mesh);

                // Ground Reflection (Shadow)
                const shadowGeo = new THREE.PlaneGeometry(width, height);
                const shadowMat = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,
                    opacity: 0.15,
                    side: THREE.FrontSide
                });
                const shadow = new THREE.Mesh(shadowGeo, shadowMat);
                shadow.scale.y = -1; // Flip vertical
                shadow.position.y = -height + 0.3; // Below
                // Add a gradient fade mask to shadow? (Complex via shader, skip for simplified)
                agentGroup.add(shadow);

                setupOverlays(width, height);
            },
            undefined,
            (err) => console.error(err)
        );

        const setupOverlays = (width: number, height: number) => {
            // 2. ACTIVE SCREEN OVERLAY (Positioned over laptop)
            const canvas = document.createElement('canvas');
            canvas.width = 512; canvas.height = 512;
            const ctx = canvas.getContext('2d');
            const codeTexture = new THREE.CanvasTexture(canvas);

            const screenGeo = new THREE.PlaneGeometry(1.6, 1.1);
            const screenMat = new THREE.MeshBasicMaterial({
                map: codeTexture,
                transparent: true,
                opacity: 0.85,
                blending: THREE.AdditiveBlending
            });
            const screen = new THREE.Mesh(screenGeo, screenMat);
            // Tune these positions carefully based on the specific image 'uploaded_image_1765831222471.png'
            screen.position.set(1.4, -0.9, 0.1);
            screen.rotation.z = 0.03;
            screen.rotation.y = -0.15;
            agentGroup.add(screen);

            // Loop for code animation
            const updateCode = (t: number) => {
                if (!ctx) return;
                ctx.fillStyle = "rgba(0, 20, 0, 0.2)"; // Trail
                ctx.fillRect(0, 0, 512, 512);
                ctx.fillStyle = "#00ff41"; // Matrix Green
                ctx.font = "20px monospace";

                for (let i = 0; i < 10; i++) {
                    const x = Math.random() * 512;
                    const y = (t * 200 + i * 50) % 512;
                    const char = String.fromCharCode(0x30A0 + Math.random() * 96); // Katakana/Matrix-like
                    ctx.fillText(char, x, y);
                }
                // Add some "Blocks"
                ctx.fillStyle = "rgba(0, 255, 100, 0.3)";
                ctx.fillRect(Math.sin(t) * 100 + 200, Math.cos(t) * 100 + 200, 50, 50);

                codeTexture.needsUpdate = true;
            };

            // 3. EYE GLOW (Positioned over robot eyes)
            // Adjust positions: Robot head is top-leftish?
            const eyeGeo = new THREE.CircleGeometry(0.08, 16);
            const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.6 });

            const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
            leftEye.position.set(-0.5, 1.8, 0.1); // Guessed pos
            agentGroup.add(leftEye);

            const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
            rightEye.position.set(0.1, 1.8, 0.1); // Guessed pos
            agentGroup.add(rightEye);

            // 4. HOLOGRAPHIC RINGS (Surrounding the agent)
            const ringGeo = new THREE.TorusGeometry(3, 0.02, 16, 100);
            const ringMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.3 });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.rotation.x = Math.PI / 1.8;
            ring.position.y = -1;
            agentGroup.add(ring);

            // 5. FLOATING CHART (3D Element)
            const chartGroup = new THREE.Group();
            chartGroup.position.set(-2.5, 0, 1);
            for (let i = 0; i < 5; i++) {
                const barGeo = new THREE.BoxGeometry(0.2, 1, 0.2);
                const barMat = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.6 });
                const bar = new THREE.Mesh(barGeo, barMat);
                bar.position.x = i * 0.3;
                bar.scale.y = 0.1; // Start small
                bar.userData = { speed: Math.random() * 0.02 + 0.01, phase: Math.random() * Math.PI };
                chartGroup.add(bar);
            }
            agentGroup.add(chartGroup);

            return { updateCode, chartGroup, ring, leftEye, rightEye };
        };

        // Animation vars
        let animators: any = null;
        let time = 0;

        const animate = () => {
            animationFrameRef.current = requestAnimationFrame(animate);
            time += 0.01;

            if (scene.children[0] && (scene.children[0] as any).children.length > 2 && !animators) {
                // Hacky re-find or just wait for setupOverlays to run? 
                // Better structure: we don't have direct access to 'setupOverlays' return from here easily due to async load.
                // Moving logic inside setupOverlays or just doing general updates.
            }

            // General Group Float
            agentGroup.position.y = Math.sin(time) * 0.1;
            agentGroup.rotation.y = Math.sin(time * 0.5) * 0.05; // Gentle 3D wiggle

            // Find our dynamic elements by simple traversal or just rebuild chart update logic here casually
            agentGroup.children.forEach(child => {
                // Chart bars?
                if (child.type === 'Group' && child.position.x === -2.5) {
                    child.children.forEach((bar: any) => {
                        bar.scale.y = 1 + Math.sin(time * 3 + bar.userData.phase) * 0.5;
                        bar.position.y = bar.scale.y / 2;
                    });
                    child.rotation.y += 0.01;
                }
                // Ring?
                if (child.type === 'Mesh' && (child.geometry as any).type === 'TorusGeometry') {
                    child.rotation.z += 0.005;
                }
                // Screen?
                if (child.type === 'Mesh' && (child.material as any).map && (child.material as any).map.isCanvasTexture) {
                    // Update code texture
                    const texture = (child.material as any).map;
                    const canvas = texture.image;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.fillStyle = "rgba(0, 10, 0, 0.1)";
                        ctx.fillRect(0, 0, 512, 512);
                        ctx.fillStyle = "#00ff00";
                        ctx.font = "20px monospace";
                        if (Math.random() > 0.5) {
                            const x = Math.random() * 512;
                            const y = Math.random() * 512;
                            ctx.fillText(String.fromCharCode(0x30A0 + Math.random() * 96), x, y);
                        }
                        texture.needsUpdate = true;
                    }
                }
            });

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            if (!container) return;
            const width = container.clientWidth;
            const height = container.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            if (rendererRef.current) rendererRef.current.dispose();
        };

    }, [threeLoaded]);

    return (
        <div ref={containerRef} className="w-full h-full relative" />
    );
}
