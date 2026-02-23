import { cn } from '~/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from './Accordian';

type Tip = {
  type: 'good' | 'improve';
  tip: string;
  explanation: string;
  originalSentence?: string;
  suggestedSentence?: string;
  suggestedProject1?: string;
  suggestedProject2?: string;
};

const ScorePill = ({ score }: { score: number }) => {
  const color = score > 69 ? '#4ade80' : score > 39 ? '#fbbf24' : '#f87171';
  const bg =
    score > 69
      ? 'rgba(74,222,128,0.08)'
      : score > 39
        ? 'rgba(251,191,36,0.08)'
        : 'rgba(248,113,113,0.08)';
  const border =
    score > 69
      ? 'rgba(74,222,128,0.2)'
      : score > 39
        ? 'rgba(251,191,36,0.2)'
        : 'rgba(248,113,113,0.2)';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '3px 10px',
        borderRadius: 999,
        background: bg,
        border: `1px solid ${border}`,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.7rem',
        color,
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: color,
          display: 'inline-block',
        }}
      />
      {score}/100
    </span>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 0',
    }}
  >
    <span
      style={{
        fontFamily: 'Outfit, sans-serif',
        fontWeight: 600,
        fontSize: '0.95rem',
        color: '#FAF8F5',
      }}
    >
      {title}
    </span>
    <ScorePill score={categoryScore} />
  </div>
);

const InfoBlock = ({ label, value }: { label: string; value: string }) => (
  <div
    style={{
      marginTop: '0.75rem',
      padding: '0.75rem 1rem',
      background: 'rgba(201,168,76,0.05)',
      border: '1px solid rgba(201,168,76,0.12)',
      borderRadius: '0.75rem',
    }}
  >
    <p
      style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.65rem',
        color: '#C9A84C',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: '0.3rem',
      }}
    >
      {label}
    </p>
    <p
      style={{
        fontSize: '0.82rem',
        color: 'rgba(250,248,245,0.7)',
        fontWeight: 300,
        lineHeight: 1.6,
      }}
    >
      {value}
    </p>
  </div>
);

const CategoryContent = ({ tips }: { tips: Tip[] }) => (
  <>
    <div style={{ paddingBottom: '0.5rem' }}>
      {/* Quick overview grid */}
      <div className="det-summary">
        {tips.map((tip, i) => (
          <div className="det-summary-item" key={i}>
            <span
              className="det-summary-dot"
              style={{
                background: tip.type === 'good' ? '#4ade80' : '#fbbf24',
              }}
            />
            <span>{tip.tip}</span>
          </div>
        ))}
      </div>

      {/* Detailed tip cards */}
      <div className="det-tips">
        {tips.map((tip, i) => {
          const isGood = tip.type === 'good';
          return (
            <div
              key={i + tip.tip}
              className="det-tip"
              style={{
                background: isGood
                  ? 'rgba(74,222,128,0.04)'
                  : 'rgba(251,191,36,0.04)',
                border: `1px solid ${isGood ? 'rgba(74,222,128,0.12)' : 'rgba(251,191,36,0.12)'}`,
              }}
            >
              <div
                className="det-tip-title"
                style={{ color: isGood ? '#4ade80' : '#fbbf24' }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: 'currentColor',
                    flexShrink: 0,
                    display: 'inline-block',
                  }}
                />
                {tip.tip}
              </div>
              <p
                className="det-tip-body"
                style={{
                  color: isGood
                    ? 'rgba(74,222,128,0.75)'
                    : 'rgba(251,191,36,0.75)',
                }}
              >
                {tip.explanation}
              </p>
              {tip.originalSentence && (
                <InfoBlock
                  label="Original Sentence"
                  value={tip.originalSentence}
                />
              )}
              {tip.suggestedSentence && (
                <InfoBlock
                  label="Suggested Sentence"
                  value={tip.suggestedSentence}
                />
              )}
              {tip.suggestedProject1 && (
                <InfoBlock
                  label="Suggested Project 1"
                  value={tip.suggestedProject1}
                />
              )}
              {tip.suggestedProject2 && (
                <InfoBlock
                  label="Suggested Project 2"
                  value={tip.suggestedProject2}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  </>
);

const Details = ({ feedback }: { feedback: Feedback }) => (
  <>
    <style>{`
      .det-root {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;
      }
      .det-root .accordion-item {
        background: rgba(255,255,255,0.02) !important;
        border: 1px solid rgba(201,168,76,0.12) !important;
        border-radius: 1rem !important;
        overflow: hidden;
        margin-bottom: 0 !important;
      }
      .det-root .accordion-header {
        padding: 0 1.25rem !important;
        border-bottom: 1px solid rgba(201,168,76,0.08) !important;
        background: transparent !important;
      }
      .det-root .accordion-content {
        padding: 1rem 1.25rem !important;
        background: transparent !important;
      }
    `}</style>

    <div className="det-root">
      <p
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          color: '#C9A84C',
          fontSize: '0.72rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}
      >
        Detailed Breakdown
      </p>
      <Accordion>
        {[
          {
            id: 'tone-style',
            title: 'Tone & Style',
            data: feedback.toneAndStyle,
          },
          { id: 'content', title: 'Content', data: feedback.content },
          { id: 'structure', title: 'Structure', data: feedback.structure },
          { id: 'skills', title: 'Skills', data: feedback.skills },
        ].map(({ id, title, data }) => (
          <AccordionItem key={id} id={id}>
            <AccordionHeader itemId={id}>
              <CategoryHeader title={title} categoryScore={data.score} />
            </AccordionHeader>
            <AccordionContent itemId={id}>
              <CategoryContent tips={data.tips} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </>
);

export default Details;
