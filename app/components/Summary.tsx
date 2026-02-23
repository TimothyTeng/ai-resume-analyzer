import ScoreGauge from '~/components/ScoreGauge';

const scoreColor = (score: number) =>
  score > 69 ? '#4ade80' : score > 49 ? '#fbbf24' : '#f87171';

const Category = ({ title, score }: { title: string; score: number }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.75rem 1.25rem',
      borderBottom: '1px solid rgba(201,168,76,0.08)',
    }}
  >
    <span
      style={{
        fontSize: '0.82rem',
        color: 'rgba(250,248,245,0.55)',
        fontFamily: 'JetBrains Mono, monospace',
        letterSpacing: '0.04em',
      }}
    >
      {title}
    </span>
    <span
      style={{
        fontSize: '0.82rem',
        fontFamily: 'JetBrains Mono, monospace',
        letterSpacing: '0.04em',
      }}
    >
      <span style={{ color: scoreColor(score), fontWeight: 600 }}>{score}</span>
      <span style={{ color: 'rgba(250,248,245,0.25)' }}>/100</span>
    </span>
  </div>
);

const Summary = ({ feedback }: { feedback: Feedback }) => (
  <>
    <div className="sum-card">
      <div className="sum-top">
        <ScoreGauge score={feedback.overallScore} />
        <div>
          <p className="sum-title">Overall Resume Score</p>
          <p className="sum-sub">Calculated across 4 categories below</p>
        </div>
      </div>
      <div className="sum-categories">
        <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
        <Category title="Content" score={feedback.content.score} />
        <Category title="Structure" score={feedback.structure.score} />
        <Category title="Skills" score={feedback.skills.score} />
      </div>
    </div>
  </>
);

export default Summary;
