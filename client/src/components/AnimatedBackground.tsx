import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
}

export function AnimatedBackground() {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [showSunrise, setShowSunrise] = useState(true);

    useEffect(() => {
        // Generate floating particles
        const newParticles: Particle[] = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 2 + Math.random() * 4,
            duration: 15 + Math.random() * 20,
            delay: Math.random() * 5
        }));
        setParticles(newParticles);

        // Hide sunrise effect after animation
        const timer = setTimeout(() => setShowSunrise(false), 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Sunrise gradient overlay */}
            {showSunrise && (
                <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 4, ease: "easeOut" }}
                    style={{
                        background: "linear-gradient(to top, #ff6b35 0%, #f7931e 30%, #fdc830 60%, transparent 100%)"
                    }}
                />
            )}

            {/* Animated Gradient Layers */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: [
                        "radial-gradient(circle at 20% 50%, rgba(139, 69, 19, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(75, 0, 130, 0.4) 0%, transparent 50%), linear-gradient(135deg, #0f0f1e 0%, #1a0b2e 50%, #16213e 100%)",
                        "radial-gradient(circle at 80% 20%, rgba(139, 69, 19, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(75, 0, 130, 0.4) 0%, transparent 50%), linear-gradient(135deg, #16213e 0%, #0f0f1e 50%, #1a0b2e 100%)",
                        "radial-gradient(circle at 50% 80%, rgba(139, 69, 19, 0.3) 0%, transparent 50%), radial-gradient(circle at 50% 20%, rgba(75, 0, 130, 0.4) 0%, transparent 50%), linear-gradient(135deg, #1a0b2e 0%, #16213e 50%, #0f0f1e 100%)",
                        "radial-gradient(circle at 20% 50%, rgba(139, 69, 19, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(75, 0, 130, 0.4) 0%, transparent 50%), linear-gradient(135deg, #0f0f1e 0%, #1a0b2e 50%, #16213e 100%)"
                    ]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Islamic Geometric Pattern Overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="islamic-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        {/* Star pattern */}
                        <path
                            d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                            className="text-gold"
                        />
                        {/* Interlocking circles */}
                        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-400" />
                        <circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-400" />
                        <circle cx="100" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-400" />
                        <circle cx="0" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-400" />
                        <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-400" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
            </svg>

            {/* Floating Light Particles */}
            <div className="absolute inset-0">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full bg-gold/40 blur-[1px]"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: particle.size,
                            height: particle.size,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.sin(particle.id) * 50, 0],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: particle.duration,
                            delay: particle.delay,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40" />
        </div>
    );
}
