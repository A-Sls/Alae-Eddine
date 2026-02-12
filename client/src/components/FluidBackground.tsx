import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple {
    x: number;
    y: number;
    id: number;
}

export function FluidBackground() {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const rippleIdRef = useRef(0);
    const lastSpawnTime = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            // Throttle: only spawn every 40ms to avoid performance issues
            if (now - lastSpawnTime.current < 40) return;

            lastSpawnTime.current = now;

            const newRipple = {
                x: e.clientX,
                y: e.clientY,
                id: rippleIdRef.current++,
            };

            setRipples((prev) => [...prev, newRipple]);

            // Remove ripple faster for a "trail" effect
            setTimeout(() => {
                setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
            }, 1500);
        };

        const handleClick = (e: MouseEvent) => {
            // Larger, longer-lasting ripple on click
            const clickRipple = {
                x: e.clientX,
                y: e.clientY,
                id: rippleIdRef.current++,
                isClick: true
            };
            setRipples((prev) => [...prev, clickRipple]);
            setTimeout(() => {
                setRipples((prev) => prev.filter((r) => r.id !== clickRipple.id));
            }, 2500);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
            <AnimatePresence>
                {ripples.map((ripple: any) => (
                    <motion.div
                        key={ripple.id}
                        initial={{
                            width: 0,
                            height: 0,
                            opacity: ripple.isClick ? 0.8 : 0.6, // Increased base opacity
                            scale: 0,
                            x: ripple.x,
                            y: ripple.y,
                        }}
                        animate={{
                            width: ripple.isClick ? 600 : 300, // Increased size
                            height: ripple.isClick ? 600 : 300,
                            opacity: 0,
                            scale: ripple.isClick ? 2.5 : 2, // Increased scale
                            x: ripple.x - (ripple.isClick ? 300 : 150),
                            y: ripple.y - (ripple.isClick ? 300 : 150),
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: ripple.isClick ? 2 : 1.5, ease: "easeOut" }}
                        className={`absolute rounded-full border ${ripple.isClick ? 'border-2 border-gold/30 bg-gold/10 blur-[2px]' : 'border-gold/30 bg-gold/10 blur-[1px]'}`}
                        style={{
                            pointerEvents: 'none',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }}
                    />
                ))}
            </AnimatePresence>
            {/* Liquid distortion overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent mix-blend-screen opacity-20 animate-pulse-slow pointer-events-none" />
        </div>
    );
}
