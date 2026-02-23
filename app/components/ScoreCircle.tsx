const ScoreCircle = ({ score = 75 }: { score: number }) => {
  const radius = 40;
  const stroke = 7;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference * (1 - score / 100);

  const color = score > 69 ? '#4ade80' : score > 49 ? '#fbbf24' : '#f87171';

  const glowColor =
    score > 69
      ? 'rgba(74,222,128,0.4)'
      : score > 49
        ? 'rgba(251,191,36,0.4)'
        : 'rgba(248,113,113,0.4)';

  const gradId = `sc-grad-${score}`;

  return (
    <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
      <svg
        width="72"
        height="72"
        viewBox="0 0 100 100"
        style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={gradId} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.5" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </linearGradient>
          <filter
            id={`sc-glow-${score}`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Track */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
          fill="transparent"
        />

        {/* Progress arc */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke={`url(#${gradId})`}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          filter={`url(#sc-glow-${score})`}
        />
      </svg>

      {/* Score label */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.72rem',
            fontWeight: 500,
            color,
            lineHeight: 1,
          }}
        >
          {score}
        </span>
      </div>
    </div>
  );
};

export default ScoreCircle;
