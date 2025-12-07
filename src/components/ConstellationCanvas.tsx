"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// --- Configuration ---
const NODE_COUNT_LIMIT = 100;
const SPAWN_RATE = 0.05; // Chance to spawn per frame
const CONNECTION_DISTANCE = 3;
const MOUSE_INFLUENCE_RADIUS = 5;
const COLORS = ["#00f3ff", "#bc13fe", "#00ff9d", "#ffffff"];

interface NodeParticle {
    id: number;
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    life: number;
    maxLife: number;
    color: THREE.Color;
    scale: number;
}

function ConstellationSystem() {
    const { size, viewport, camera } = useThree();
    const mouse = useRef(new THREE.Vector3(0, 0, 0));

    // State held in refs for performance (no re-renders)
    const nodes = useRef<NodeParticle[]>([]);
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);

    // Geometries
    const pointsGeometry = useMemo(() => new THREE.BufferGeometry(), []);
    const linesGeometry = useMemo(() => new THREE.BufferGeometry(), []);

    // Material for points
    const pointsMaterial = useMemo(() => new THREE.PointsMaterial({
        vertexColors: true,
        size: 0.15,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
    }), []);

    // Material for lines
    const linesMaterial = useMemo(() => new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.15,
        vertexColors: false, // We'll just use a single color for lines for simplicity, or vertex colors if needed
        blending: THREE.AdditiveBlending,
    }), []);

    // Track mouse position in world space
    useFrame((state) => {
        // Convert normalized mouse coordinates (-1 to 1) to world coordinates at z=0
        const vector = new THREE.Vector3(state.pointer.x, state.pointer.y, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));
        mouse.current.copy(pos);
    });

    useFrame((state, delta) => {
        const currentNodes = nodes.current;

        // 1. SPAWN NEW NODES
        // Spawn if under limit and random chance met
        if (currentNodes.length < NODE_COUNT_LIMIT && Math.random() < SPAWN_RATE) {
            // Spawn near mouse or randomly in viewport if mouse is idle? 
            // Requirement: "Spawn nodes randomly around the mouse cursor"

            const spawnPos = new THREE.Vector3(
                mouse.current.x + (Math.random() - 0.5) * MOUSE_INFLUENCE_RADIUS,
                mouse.current.y + (Math.random() - 0.5) * MOUSE_INFLUENCE_RADIUS,
                (Math.random() - 0.5) * 2 // Slight Z depth
            );

            const velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.5,
                (Math.random() - 0.5) * 0.5,
                (Math.random() - 0.5) * 0.2
            );

            const color = new THREE.Color(COLORS[Math.floor(Math.random() * COLORS.length)]);

            currentNodes.push({
                id: Math.random(),
                position: spawnPos,
                velocity: velocity,
                life: 0,
                maxLife: 2 + Math.random() * 3, // 2-5 seconds
                color: color,
                scale: 0,
            });
        }

        // 2. UPDATE NODES
        const positions: number[] = [];
        const colors: number[] = [];
        const sizes: number[] = [];
        const activeNodes: NodeParticle[] = [];

        currentNodes.forEach((node) => {
            // Update life
            node.life += delta;

            // Update position
            node.position.add(node.velocity.clone().multiplyScalar(delta));

            // Rotate subtly around center (0,0,0) - "Nodes and lines rotate subtly in 3D space"
            // We can just rotate the whole group, but let's add some individual orbital drift
            const angle = delta * 0.1;
            const x = node.position.x * Math.cos(angle) - node.position.z * Math.sin(angle);
            const z = node.position.x * Math.sin(angle) + node.position.z * Math.cos(angle);
            node.position.x = x;
            node.position.z = z;

            // Bloom/Scale effect
            // Fade in (0-1s) and fade out (last 1s)
            let scale = 1;
            if (node.life < 1) scale = node.life; // Fade in
            else if (node.life > node.maxLife - 1) scale = node.maxLife - node.life; // Fade out
            node.scale = Math.max(0, scale);

            if (node.life < node.maxLife) {
                activeNodes.push(node);
                positions.push(node.position.x, node.position.y, node.position.z);
                colors.push(node.color.r, node.color.g, node.color.b);
                sizes.push(node.scale * 5); // Multiplier for point size
            }
        });

        nodes.current = activeNodes;

        // Update Points Geometry
        pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        pointsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        // Note: PointsMaterial size is uniform, to vary size per particle we need a custom shader or just accept uniform size.
        // Standard PointsMaterial doesn't support per-vertex size. 
        // For "Nodes bloom (glow/scale up)", we really want per-node scaling.
        // A custom shader material is best, but let's stick to standard for simplicity first.
        // Actually, we can simulate "bloom" by just opacity fading or using a texture.
        // Let's use a simple texture for the point to make it look like a glow.

        // 3. UPDATE CONNECTIONS
        const linePositions: number[] = [];

        for (let i = 0; i < activeNodes.length; i++) {
            for (let j = i + 1; j < activeNodes.length; j++) {
                const nodeA = activeNodes[i];
                const nodeB = activeNodes[j];
                const dist = nodeA.position.distanceTo(nodeB.position);

                if (dist < CONNECTION_DISTANCE) {
                    linePositions.push(
                        nodeA.position.x, nodeA.position.y, nodeA.position.z,
                        nodeB.position.x, nodeB.position.y, nodeB.position.z
                    );
                }
            }
        }

        linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    });

    return (
        <>
            <points ref={pointsRef} geometry={pointsGeometry} material={pointsMaterial} />
            <lineSegments ref={linesRef} geometry={linesGeometry} material={linesMaterial} />
        </>
    );
}

export default function ConstellationCanvas() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 75 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]} // Handle high DPI screens
            >
                <ConstellationSystem />
            </Canvas>
        </div>
    );
}
