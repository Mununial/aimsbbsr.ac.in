import React from 'react';

const AimsLogo = ({ className = "w-full h-full", shieldColor = "#1e2a3a", borderColor = "white", iconColor = "white" }) => {
    return (
        <svg 
            viewBox="0 0 120 140" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Main Shield Shape */}
            <path 
                d="M60 5L10 25V65C10 95 60 135 60 135C60 135 110 95 110 65V25L60 5Z" 
                fill={shieldColor} 
                stroke={borderColor} 
                strokeWidth="2"
            />
            
            {/* Inner Border */}
            <path 
                d="M60 12L18 28V62C18 88 60 125 60 125C60 125 102 88 102 62V28L60 12Z" 
                stroke={borderColor} 
                strokeWidth="1" 
                opacity="0.3"
            />

            {/* Medical Cross */}
            <g transform="translate(52, 28)">
                <rect x="5" y="0" width="6" height="16" fill={iconColor} />
                <rect x="0" y="5" width="16" height="6" fill={iconColor} />
            </g>

            {/* Lotus Flower (Simplified Premium Style) */}
            <g transform="translate(60, 75)" fill={iconColor}>
                {/* Center Petal */}
                <path d="M0 -15C0 -15 8 -5 0 5C-8 -5 0 -15 0 -15Z" />
                {/* Left Petals */}
                <path d="M-5 -12C-5 -12 -15 -8 -12 2C-10 10 0 5 -5 -12Z" opacity="0.9" />
                <path d="M-12 -5C-12 -5 -22 2 -15 12C-8 20 0 10 -12 -5Z" opacity="0.7" />
                {/* Right Petals */}
                <path d="M5 -12C5 -12 15 -8 12 2C10 10 0 5 5 -12Z" opacity="0.9" />
                <path d="M12 -5C12 -5 22 2 15 12C 8 20 0 10 12 -5Z" opacity="0.7" />
            </g>

            {/* Typography */}
            <text 
                x="60" 
                y="105" 
                textAnchor="middle" 
                fill={iconColor} 
                fontSize="12" 
                fontWeight="900" 
                fontFamily="system-ui, sans-serif"
                style={{ letterSpacing: '0.1em' }}
            >
                AYUSH
            </text>
            <text 
                x="60" 
                y="118" 
                textAnchor="middle" 
                fill={iconColor} 
                fontSize="5" 
                fontWeight="700" 
                fontFamily="system-ui, sans-serif"
                style={{ letterSpacing: '0.05em' }}
            >
                INSTITUTE OF MEDICAL
            </text>
            <text 
                x="60" 
                y="125" 
                textAnchor="middle" 
                fill={iconColor} 
                fontSize="5" 
                fontWeight="700" 
                fontFamily="system-ui, sans-serif"
                style={{ letterSpacing: '0.05em' }}
            >
                SCIENCES
            </text>
        </svg>
    );
};

export default AimsLogo;
