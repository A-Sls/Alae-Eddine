import { motion } from "framer-motion";

export function WavingGrass() {
    return (
        <div className="fixed bottom-0 left-0 right-0 h-24 pointer-events-none z-[5] overflow-hidden">
            <svg
                className="absolute bottom-0 w-full h-full"
                viewBox="0 0 1200 100"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Grass blades */}
                {Array.from({ length: 40 }).map((_, i) => {
                    const x = (i / 40) * 1200;
                    const height = 30 + Math.random() * 40;
                    const delay = Math.random() * 2;

                    return (
                        <motion.path
                            key={i}
                            d={`M ${x} 100 Q ${x + 2} ${100 - height / 2} ${x + 4} ${100 - height} T ${x + 8} 100`}
                            fill="none"
                            stroke="url(#grassGradient)"
                            strokeWidth="1.5"
                            opacity={0.3 + Math.random() * 0.4}
                            animate={{
                                d: [
                                    `M ${x} 100 Q ${x + 2} ${100 - height / 2} ${x + 4} ${100 - height} T ${x + 8} 100`,
                                    `M ${x} 100 Q ${x - 2} ${100 - height / 2} ${x} ${100 - height} T ${x + 4} 100`,
                                    `M ${x} 100 Q ${x + 2} ${100 - height / 2} ${x + 4} ${100 - height} T ${x + 8} 100`
                                ]
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                delay: delay,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    );
                })}

                <defs>
                    <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#6b8e23" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#556b2f" stopOpacity="0.4" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}
