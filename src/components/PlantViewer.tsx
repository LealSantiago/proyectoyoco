'use client';

import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';

interface PlantViewerProps {
    scale?: number;
    leafColor?: number;
}

function Model({ leafColor }: { leafColor: number }) {
    // carga el glb
    const { scene: originalScene } = useGLTF('/models/yoco5.glb') as any;

    // clona el scene una sola vez por componente
    const scene = useMemo(() => {
        const cloned = originalScene.clone(true);

        // para que cada mesh tenga su propio material
        cloned.traverse((node: any) => {
            if (node.isMesh) {
                node.material = node.material.clone();
                // si quieres colorear sólo las hojas (suponiendo que se llaman "Leaf")
                if (node.material.name === 'Leaf') {
                    node.material.color.setHex(leafColor);
                }
            }
        });

        return cloned;
    }, [originalScene, leafColor]);

    return <primitive object={scene} />;
}

useGLTF.preload('/models/yoco5.glb');

export default function PlantViewer({
                                        scale = 1.9,
                                        leafColor = 0x2ecc71,
                                    }: PlantViewerProps) {
    return (
        <div className="w-full h-[350px] md:h-[450px] lg:h-[550px] bg-white rounded-lg overflow-hidden shadow">
            <Canvas
                camera={{ position: [0, 2, 3], fov: 27 }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />

                <Suspense fallback={null}>
                    <Stage adjustCamera={false} intensity={0.6} preset="soft">
                        <group scale={[scale, scale, scale]}>
                            <Model leafColor={leafColor!} />
                        </group>
                    </Stage>
                    <OrbitControls
                        enableZoom
                        autoRotate
                        autoRotateSpeed={0.5}
                        minDistance={1.59}
                        maxDistance={1.6}
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 2}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
