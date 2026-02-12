export function OliveBranch() {
    return (
        <div className="flex justify-center my-8">
            <svg
                width="200"
                height="40"
                viewBox="0 0 200 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-40"
            >
                {/* Main branch */}
                <path
                    d="M 20 20 Q 60 18 100 20 T 180 20"
                    stroke="hsl(80 40% 35%)"
                    strokeWidth="2"
                    fill="none"
                />

                {/* Left leaves */}
                <ellipse cx="40" cy="12" rx="8" ry="4" fill="hsl(80 40% 40%)" opacity="0.8" transform="rotate(-30 40 12)" />
                <ellipse cx="45" cy="25" rx="8" ry="4" fill="hsl(80 40% 40%)" opacity="0.8" transform="rotate(30 45 25)" />
                <ellipse cx="60" cy="10" rx="8" ry="4" fill="hsl(80 40% 40%)" opacity="0.8" transform="rotate(-25 60 10)" />
                <ellipse cx="65" cy="28" rx="8" ry="4" fill="hsl(80 40% 40%)" opacity="0.8" transform="rotate(25 65 28)" />

                {/* Center leaves */}
                <ellipse cx="85" cy="12" rx="8" ry="4" fill="hsl(80 40% 40%)" opacity="0.8" transform="rotate(-30 85 12)" />
                <ellipse cx="90" cy="26" rx="8" ry="4" fill="hsl(80 40% 40%)" opacity="0.8" transform="rotate(30 90 26)" />
                <ellipse cx="105" cy="10" rx="8" ry="4" fill="hsl(80 40% 40%)" opacity="0.8" transform="rotate(-25 105 10)" />
                <ellipse cx="110" cy="28" rx="8" ry="4" fill="hsl(80 40% 40%)" opacity="0.8" transform="rotate(25 110 28)" />

                {/* Right leaves */}
                <ellipse cx="130" cy="12" rx="8" ry="4" fill="hsl(80 40% 40%)" opacity="0.8" transform="rotate(-30 130 12)" />
                <ellipse cx="135" cy="25" rx="8" ry="4" fill="hsl(80 40% 40%)" opacity="0.8" transform="rotate(30 135 25)" />
                <ellipse cx="155" cy="10" rx="8" ry="4" fill="hsl(80 40% 40%)" opacity="0.8" transform="rotate(-25 155 10)" />
                <ellipse cx="160" cy="27" rx="8" ry="4" fill="hsl(80 40% 40%)" opacity="0.8" transform="rotate(25 160 27)" />
            </svg>
        </div>
    );
}
