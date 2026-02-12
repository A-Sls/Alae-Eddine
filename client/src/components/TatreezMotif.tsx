import { motion } from "framer-motion";
import { useState } from "react";

interface Stitch {
    id: number;
    x: number;
    y: number;
}

export function TatreezMotif() {
    // A simple 8-point star pattern grid (Palestinian Star/Moon of Bethlehem inspired)
    const pattern = [
        { x: 3, y: 0 }, { x: 4, y: 0 },
        { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 },
        { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 },
        { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 },
        { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }, { x: 7, y: 4 },
        { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 6, y: 5 },
        { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 6 },
        { x: 3, y: 7 }, { x: 4, y: 7 },
    ];

    return (
        <div className="flex justify-center my-12 opacity-40">
            <div
                className="grid gap-1"
                style={{
                    gridTemplateColumns: 'repeat(8, 12px)',
                    gridTemplateRows: 'repeat(8, 12px)'
                }}
            >
                {Array.from({ length: 64 }).map((_, i) => {
                    const x = i % 8;
                    const y = Math.floor(i / 8);
                    const isInPattern = pattern.some(p => p.x === x && p.y === y);

                    if (!isInPattern) return <div key={i} className="w-3 h-3" />;

                    return (
                        <motion.div
                            key={i}
                            className="w-3 h-3 bg-red-800"
                            style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                            whileHover={{
                                scale: 1.5,
                                backgroundColor: '#d4a847',
                                boxShadow: '0 0 15px #d4a847',
                                transition: { duration: 0.2 }
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.01 }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
