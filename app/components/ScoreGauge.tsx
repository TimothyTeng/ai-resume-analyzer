import { useEffect, useRef, useState } from 'react';

const ScoreGauge = ({ score = 75 }: { score: number }) => {
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  const percentage = score / 100;

  const color = score > 69 ? '#4ade80' : score > 49 ? '#fbbf24' : '#f87171';
  const gradEnd = score > 69 ? '#86efac' : score > 49 ? '#fde68a' : '#fca5a5';

  // Arc: center=(50,50), r=40, from 180° to 0° (left to right)
  // At score percentage, angle = 180° - (180° * percentage)
  const angleDeg = 180 - 180 * percentage;
  const angleRad = (angleDeg * Math.PI) / 180;
  const dotX = 50 + 40 * Math.cos(angleRad);
  const dotY = 50 - 40 * Math.sin(angleRad); // SVG y-axis is flipped

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      <div style={{ position: 'relative', width: 140, height: 75 }}>
        <svg
          viewBox="0 0 100 50"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="sg-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={gradEnd} stopOpacity="1" />
            </linearGradient>
            <filter id="sg-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Track */}
          <path
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Progress arc */}
          <path
            ref={pathRef}
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="url(#sg-grad)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength * (1 - percentage)}
            filter="url(#sg-glow)"
          />

          {/* Tip dot — correctly placed on the arc using arc geometry */}
          {pathLength > 0 && score > 0 && (
            <circle
              cx={dotX}
              cy={dotY}
              r="4.5"
              fill={color}
              filter="url(#sg-glow)"
            />
          )}
        </svg>

        {/* Score label */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: '2px',
          }}
        >
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '1.1rem',
              fontWeight: 600,
              color,
              lineHeight: 1,
            }}
          >
            {score}
          </span>
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6rem',
              color: 'rgba(250,248,245,0.25)',
              letterSpacing: '0.08em',
              marginTop: '2px',
            }}
          >
            /100
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScoreGauge;
