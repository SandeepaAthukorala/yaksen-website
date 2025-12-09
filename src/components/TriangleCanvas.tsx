"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import Delaunator from "delaunator";

const MeshAnimator = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { mouse, clock } = useThree();

    const cols = 50;
    const rows = 30;
    const count = (cols + 1) * (rows + 1);
    const GRID_WIDTH = 40;
    const GRID_HEIGHT = 20;

    const [clickEffect, setClickEffect] = useState<{ time: number, x: number, y: number } | null>(null);

    const { positions, indices, initialPositions, currentPositions } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const initPos = new Float32Array(count * 3);
        const curPos = new Float32Array(count * 3);
        const points2D: [number, number][] = [];

        for (let i = 0; i <= rows; i++) {
            for (let j = 0; j <= cols; j++) {
                const xNorm = (j / cols) * 2 - 1;
                const yNorm = (i / rows) * 2 - 1;

                const index = i * (cols + 1) + j;

                const xOffset = (Math.random() - 0.5) * 0.05;
                const yOffset = (Math.random() - 0.5) * 0.05;

                pos[index * 3] = (xNorm + xOffset) * (GRID_WIDTH / 2);
                pos[index * 3 + 1] = (yNorm + yOffset) * (GRID_HEIGHT / 2);
                pos[index * 3 + 2] = 0;

                initPos[index * 3] = pos[index * 3];
                initPos[index * 3 + 1] = pos[index * 3 + 1];
                initPos[index * 3 + 2] = 0;

                curPos[index * 3] = pos[index * 3];
                curPos[index * 3 + 1] = pos[index * 3 + 1];
                curPos[index * 3 + 2] = 0;

                points2D.push([pos[index * 3], pos[index * 3 + 1]]);
            }
        }

        const delaunay = Delaunator.from(points2D);
        const indices = new Uint16Array(delaunay.triangles);

        return { positions: pos, indices, initialPositions: initPos, currentPositions: curPos };
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();
        const positionsAttribute = meshRef.current.geometry.attributes.position;

        const viewport = state.viewport;
        const mouseX = (mouse.x * viewport.width) / 2;
        const mouseY = (mouse.y * viewport.height) / 2;

        // "Ghost" cursor for auto-animation
        // Moves in a figure-8 Lissajous pattern
        // x = A * sin(at + d), y = B * sin(bt)
        const ghostX = Math.sin(time * 0.5) * (GRID_WIDTH * 0.35);
        const ghostY = Math.sin(time * 0.3) * (GRID_HEIGHT * 0.35);

        for (let i = 0; i < count; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            const initX = initialPositions[ix];
            const initY = initialPositions[iy];

            // 1. Ambient Wave
            const wave1 = Math.sin(initX * 0.4 + time * 1.2) * Math.cos(initY * 0.3 + time) * 0.6;
            const wave2 = Math.sin(initX * 1.0 - time * 0.5) * 0.3;
            let targetZ = wave1 + wave2;

            // 2. Mouse Interaction (Real Mouse)
            const dx = mouseX - initX;
            const dy = mouseY - initY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const roi = 4.5;

            if (dist < roi) {
                const force = (1 - dist / roi);
                targetZ -= force * 3.5;
            }

            // 3. Ghost Cursor Interaction (Auto-Animation)
            const gdx = ghostX - initX;
            const gdy = ghostY - initY;
            const gDist = Math.sqrt(gdx * gdx + gdy * gdy);
            // Slightly smaller ROI for ghost to be less intrusive
            const gRoi = 5.0;

            if (gDist < gRoi) {
                const gForce = (1 - gDist / gRoi);
                // Slightly gentler force for ghost
                targetZ -= gForce * 2.5;
            }

            // 4. Click Ripple (Shockwave)
            if (clickEffect) {
                const timeSinceClick = time - clickEffect.time;
                const rippleSpeed = 8;
                const rippleRadius = timeSinceClick * rippleSpeed;
                const rippleWidth = 2.5;

                const cdx = clickEffect.x - initX;
                const cdy = clickEffect.y - initY;
                const cDist = Math.sqrt(cdx * cdx + cdy * cdy);

                if (Math.abs(cDist - rippleRadius) < rippleWidth) {
                    const rippleForce = Math.sin(((cDist - rippleRadius) / rippleWidth) * Math.PI);
                    const dampen = Math.max(0, 1 - timeSinceClick * 0.5);
                    targetZ += rippleForce * 4 * dampen;
                }
            }

            // 5. Smoothing (Lerp)
            const smoothFactor = 0.1;
            currentPositions[iz] += (targetZ - currentPositions[iz]) * smoothFactor;
            positionsAttribute.setZ(i, currentPositions[iz]);
        }

        positionsAttribute.needsUpdate = true;
        meshRef.current.geometry.computeVertexNormals();
    });

    const { viewport } = useThree();
    useEffect(() => {
        const handleCanvasClick = () => {
            const x = (mouse.x * viewport.width) / 2;
            const y = (mouse.y * viewport.height) / 2;
            setClickEffect({ time: clock.getElapsedTime(), x, y });
        };
        window.addEventListener('mousedown', handleCanvasClick);
        return () => window.removeEventListener('mousedown', handleCanvasClick);
    }, [clock, mouse, viewport]);


    return (
        <mesh ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="index"
                    count={indices.length}
                    args={[indices, 1]}
                />
            </bufferGeometry>
            <meshStandardMaterial
                color="#f14835"
                wireframe={true}
                side={THREE.DoubleSide}
                emissive="#ff0000"
                emissiveIntensity={0.5}
                roughness={0.1}
                metalness={0.9}
            />
        </mesh>
    );
};

export default function TriangleCanvas() {
    const vignetteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (vignetteRef.current) {
                const x = e.clientX;
                const y = e.clientY;
                vignetteRef.current.style.setProperty('--x', `${x}px`);
                vignetteRef.current.style.setProperty('--y', `${y}px`);
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: false
                }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff4444" />
                <pointLight position={[-10, -10, 5]} intensity={1} color="#4444ff" />

                <MeshAnimator />

                <EffectComposer enableNormalPass={false}>
                    <Bloom
                        luminanceThreshold={0.1}
                        mipmapBlur
                        intensity={2.5}
                        radius={0.7}
                    />
                </EffectComposer>
            </Canvas>

            {/* Dynamic Mouse Vignette */}
            <div
                ref={vignetteRef}
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    background: 'radial-gradient(circle 800px at var(--x, 50%) var(--y, 50%), transparent 0%, rgba(0,0,0,0.85) 100%)',
                    transition: 'background 0.1s ease-out'
                }}
            />
        </div>
    );
}
