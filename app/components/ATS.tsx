interface Suggestion {
  type: 'good' | 'improve';
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS = ({ score, suggestions }: ATSProps) => {
  const scoreColor =
    score > 69 ? '#4ade80' : score > 49 ? '#fbbf24' : '#f87171';
  const scoreBg =
    score > 69
      ? 'rgba(74,222,128,0.06)'
      : score > 49
        ? 'rgba(251,191,36,0.06)'
        : 'rgba(248,113,113,0.06)';
  const scoreBorder =
    score > 69
      ? 'rgba(74,222,128,0.15)'
      : score > 49
        ? 'rgba(251,191,36,0.15)'
        : 'rgba(248,113,113,0.15)';
  const subtitle =
    score > 69
      ? 'Strong ATS Compatibility'
      : score > 49
        ? 'Moderate Compatibility'
        : 'Needs Improvement';

  return (
    <>
      <div className="ats-card">
        <div className="ats-header">
          <div className="ats-title-group">
            <span className="ats-label">ATS Compatibility</span>
            <span className="ats-title">{subtitle}</span>
          </div>
          <div
            className="ats-score-pill"
            style={{ background: scoreBg, border: `1px solid ${scoreBorder}` }}
          >
            <div className="ats-score-dot" style={{ background: scoreColor }} />
            <span style={{ color: scoreColor }}>{score}</span>
            <span style={{ color: 'rgba(250,248,245,0.3)' }}>/100</span>
          </div>
        </div>

        <div className="ats-body">
          {suggestions.map((s, i) => {
            const isGood = s.type === 'good';
            return (
              <div
                key={i}
                className="ats-tip"
                style={{
                  background: isGood
                    ? 'rgba(74,222,128,0.04)'
                    : 'rgba(251,191,36,0.04)',
                  border: `1px solid ${isGood ? 'rgba(74,222,128,0.12)' : 'rgba(251,191,36,0.12)'}`,
                  color: isGood
                    ? 'rgba(74,222,128,0.85)'
                    : 'rgba(251,191,36,0.85)',
                }}
              >
                <div
                  className="ats-tip-dot"
                  style={{ background: isGood ? '#4ade80' : '#fbbf24' }}
                />
                <span>{s.tip}</span>
              </div>
            );
          })}
        </div>

        <div className="ats-footer">
          Keep refining your resume to improve ATS performance and reach more
          recruiters.
        </div>
      </div>
    </>
  );
};

export default ATS;
