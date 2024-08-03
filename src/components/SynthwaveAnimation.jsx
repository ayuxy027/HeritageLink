import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import * as THREE from 'three';

const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        const moveCursor = (e) => {
            const { clientX, clientY } = e;
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
            }
        };

        window.addEventListener('mousemove', moveCursor);
        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed pointer-events-none z-50"
            style={{
                width: '20px',
                height: '20px',
                marginLeft: '-10px',
                marginTop: '-10px',
            }}
        >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 1.5L18.5 9.5L9.5 11.5L7.5 18.5L1.5 1.5Z" stroke="white" strokeWidth="2" />
            </svg>
        </div>
    );
};
const LoadingAnimation = () => (
    <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black z-50"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
    >
        <motion.div
            className="w-32 h-32 grid grid-cols-3 gap-2"
        >
            {[...Array(9)].map((_, i) => (
                <motion.div
                    key={i}
                    className="bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-green-400"
                    animate={{
                        scale: [1, 0, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                    }}
                />
            ))}
        </motion.div>
    </motion.div>
);

const FuturisticGrid = () => {
    const containerRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [gridColor, setGridColor] = useState('#00ffff');
    const [particleColor, setParticleColor] = useState('#ffffff');
    const [rotationSpeed, setRotationSpeed] = useState(0.001);
    const [waveIntensity, setWaveIntensity] = useState(0.1);
    const controls = useAnimation();

    useEffect(() => {
        let scene, camera, renderer, grid, particles, raycaster, mouse, clock;

        const init = () => {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            containerRef.current.appendChild(renderer.domElement);

            clock = new THREE.Clock();

            // Create grid
            const size = 50;
            const divisions = 50;
            grid = new THREE.GridHelper(size, divisions, gridColor, gridColor);
            scene.add(grid);

            // Create particles
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 10000;
            const posArray = new Float32Array(particlesCount * 3);

            for (let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 50;
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.01,
                color: particleColor,
                transparent: true,
                opacity: 0.8,
            });

            particles = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particles);

            // Position camera
            camera.position.z = 15;
            camera.position.y = 5;
            camera.lookAt(0, 0, 0);

            // Add directional light
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(5, 5, 5);
            scene.add(directionalLight);

            // Add ambient light
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            // Setup raycaster for interactivity
            raycaster = new THREE.Raycaster();
            mouse = new THREE.Vector2();

            // Add event listeners
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('resize', onWindowResize);

            animate();
        };

        const onMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            // The highlight effect has been removed from here
        };

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            grid.rotation.x += rotationSpeed;
            grid.rotation.y += rotationSpeed;

            particles.rotation.x -= rotationSpeed * 0.5;
            particles.rotation.y -= rotationSpeed * 0.5;

            // Add wave effect to particles
            const positions = particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                const x = positions[i];
                const y = positions[i + 1];
                const z = positions[i + 2];

                positions[i + 1] = y + Math.sin(elapsedTime + x) * waveIntensity;
            }
            particles.geometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        };

        init();
        setTimeout(() => {
            setLoading(false);
            controls.start({ opacity: 1, y: 0 });
        }, 2000);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onWindowResize);
            renderer.dispose();
            containerRef.current.removeChild(renderer.domElement);
        };
    }, [controls, gridColor, particleColor, rotationSpeed, waveIntensity]);

    const handleColorChange = (gridColor, particleColor) => {
        setGridColor(gridColor);
        setParticleColor(particleColor);
    };

    const handleSpeedChange = (speed) => {
        setRotationSpeed(speed);
    };

    const handleWaveIntensityChange = (intensity) => {
        setWaveIntensity(intensity);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black via-purple-900 to-black cursor-none">
            <CustomCursor />
            {loading && <LoadingAnimation />}
            <motion.div
                ref={containerRef}
                className="w-full h-full"
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                transition={{ duration: 1, ease: 'easeOut' }}
            />
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-green-400">
                    Try Controls Below
                </h1>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                    <button
                        onClick={() => handleColorChange('#00ffff', '#ffffff')}
                        className="px-6 py-3 bg-cyan-500 rounded-full hover:bg-cyan-600 transition-all transform hover:scale-105 text-black font-semibold"
                    >
                        Cyan Grid
                    </button>
                    <button
                        onClick={() => handleColorChange('#ff00ff', '#ffff00')}
                        className="px-6 py-3 bg-fuchsia-500 rounded-full hover:bg-fuchsia-600 transition-all transform hover:scale-105 text-black font-semibold"
                    >
                        Fuchsia Grid
                    </button>
                    <button
                        onClick={() => handleColorChange('#008080', '#ff00ff')}
                        className="px-6 py-3 bg-green-500 rounded-full hover:bg-green-600 transition-all transform hover:scale-105 text-black font-semibold"
                    >
                        Teal Grid
                    </button>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                    <button
                        onClick={() => handleSpeedChange(0.0005)}
                        className="px-6 py-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-all transform hover:scale-105 text-white font-semibold"
                    >
                        Slow Rotation
                    </button>
                    <button
                        onClick={() => handleSpeedChange(0.003)}
                        className="px-6 py-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-all transform hover:scale-105 text-black font-semibold"
                    >
                        Fast Rotation
                    </button>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        onClick={() => handleWaveIntensityChange(0.05)}
                        className="px-6 py-3 bg-indigo-500 rounded-full hover:bg-indigo-600 transition-all transform hover:scale-105 text-white font-semibold"
                    >
                        Gentle Waves
                    </button>
                    <button
                        onClick={() => handleWaveIntensityChange(0.2)}
                        className="px-6 py-3 bg-pink-500 rounded-full hover:bg-pink-600 transition-all transform hover:scale-105 text-white font-semibold"
                    >
                        Intense Waves
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default FuturisticGrid;