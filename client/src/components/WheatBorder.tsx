import { ReactNode } from "react";

interface WheatBorderProps {
    children: ReactNode;
}

export function WheatBorder({ children }: WheatBorderProps) {
    return (
        <div className="relative">
            {/* Top wheat decoration */}
            <div className="absolute -top-6 left-0 right-0 flex justify-center gap-4 opacity-20">
                {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={`top-${i}`} width="20" height="30" viewBox="0 0 20 30" fill="none">
                        <path d="M10 30 L10 10" stroke="hsl(45 80% 55%)" strokeWidth="1.5" />
                        <ellipse cx="10" cy="8" rx="4" ry="3" fill="hsl(45 80% 55%)" />
                        <ellipse cx="7" cy="12" rx="3" ry="2" fill="hsl(45 80% 55%)" />
                        <ellipse cx="13" cy="12" rx="3" ry="2" fill="hsl(45 80% 55%)" />
                        <ellipse cx="6" cy="16" rx="2.5" ry="2" fill="hsl(45 80% 55%)" />
                        <ellipse cx="14" cy="16" rx="2.5" ry="2" fill="hsl(45 80% 55%)" />
                    </svg>
                ))}
            </div>

            {/* Content */}
            {children}

            {/* Bottom wheat decoration */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-4 opacity-20">
                {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={`bottom-${i}`} width="20" height="30" viewBox="0 0 20 30" fill="none">
                        <path d="M10 0 L10 20" stroke="hsl(45 80% 55%)" strokeWidth="1.5" />
                        <ellipse cx="10" cy="22" rx="4" ry="3" fill="hsl(45 80% 55%)" />
                        <ellipse cx="7" cy="18" rx="3" ry="2" fill="hsl(45 80% 55%)" />
                        <ellipse cx="13" cy="18" rx="3" ry="2" fill="hsl(45 80% 55%)" />
                        <ellipse cx="6" cy="14" rx="2.5" ry="2" fill="hsl(45 80% 55%)" />
                        <ellipse cx="14" cy="14" rx="2.5" ry="2" fill="hsl(45 80% 55%)" />
                    </svg>
                ))}
            </div>
        </div>
    );
}
