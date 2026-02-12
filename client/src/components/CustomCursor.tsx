import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    // We use a history of points to draw the trail
    const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
    const pointIdRef = useRef(0);

    // Mouse position for the main dot
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring for the main dot to make it smooth but snappy
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setIsVisible(true);

            // Add point to trail
            setTrail(prev => {
                const newPoint = { x: e.clientX, y: e.clientY, id: pointIdRef.current++ };
                // Keep last 20 points
                return [...prev, newPoint].slice(-20);
            });
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [cursorX, cursorY]);

    // Animation loop to remove old points and create a "fading" trail effect if mouse stops
    useEffect(() => {
        const interval = setInterval(() => {
            setTrail(prev => prev.slice(1));
        }, 50); // Remove a point every 50ms

        return () => clearInterval(interval);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {/* SVG Path Trail */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <linearGradient id="trail-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(212, 168, 71, 0)" />
                        <stop offset="100%" stopColor="rgba(212, 168, 71, 0.6)" />
                    </linearGradient>
                </defs>
                {trail.length > 1 && (
                    <polyline
                        points={trail.map(p => `${p.x},${p.y}`).join(" ")}
                        fill="none"
                        stroke="url(#trail-gradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                )}
            </svg>


        </div>
    );
}
