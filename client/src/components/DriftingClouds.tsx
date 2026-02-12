import { motion } from "framer-motion";

export function DriftingClouds() {
    const clouds = [
        { id: 1, y: 10, duration: 40, delay: 0, size: 1 },
        { id: 2, y: 25, duration: 50, delay: 5, size: 0.8 },
        { id: 3, y: 15, duration: 45, delay: 10, size: 1.2 },
        { id: 4, y: 30, duration: 55, delay: 15, size: 0.9 }
    ];

    return (
        <div className="fixed inset-0 pointer-events-none z-[3] overflow-hidden">
            {clouds.map((cloud) => (
                <motion.div
                    key={cloud.id}
                    className="absolute"
                    style={{
                        top: `${cloud.y}%`,
                        left: '-10%',
                    }}
                    animate={{
                        x: ['0vw', '110vw'],
                        y: [0, -20, 0]
                    }}
                    transition={{
                        duration: cloud.duration,
                        delay: cloud.delay,
                        repeat: Infinity,
                        ease: "linear",
                        y: {
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                >
                    <svg
                        width={100 * cloud.size}
                        height={40 * cloud.size}
                        viewBox="0 0 100 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <ellipse cx="25" cy="25" rx="15" ry="12" fill="rgba(255, 255, 255, 0.1)" />
                        <ellipse cx="45" cy="20" rx="20" ry="15" fill="rgba(255, 255, 255, 0.12)" />
                        <ellipse cx="65" cy="25" rx="18" ry="13" fill="rgba(255, 255, 255, 0.1)" />
                        <ellipse cx="50" cy="28" rx="25" ry="10" fill="rgba(255, 255, 255, 0.08)" />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
}
