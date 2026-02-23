import { usePuterStore } from '~/lib/puter';
import { emailInstructions } from '../../constants';
import { useEffect, useState } from 'react';

const GenEmail = ({
  companyName,
  jobTitle,
  jobDescription,
  imageUrl,
  resumeId,
}: {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  imageUrl: string;
  resumeId: string | undefined;
}) => {
  const [email, setEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const { kv, ai } = usePuterStore();

  useEffect(() => {
    const getEmail = async () => {
      const saved = await kv.get(`Email:${resumeId}`);
      if (!saved) return;
      setEmail(saved);
    };
    getEmail();
  }, [resumeId]);

  const generate = async () => {
    setIsGenerating(true);
    setError('');
    setEmail('');

    try {
      const feedback = await ai.feedback(
        imageUrl,
        emailInstructions({ companyName, jobTitle, jobDescription }),
      );
      if (!feedback) {
        setError('Failed to generate email. Please try again.');
        return;
      }

      const feedbackText =
        typeof feedback.message.content === 'string'
          ? feedback.message.content
          : feedback.message.content[0].text;

      await kv.set(`Email:${resumeId}`, feedbackText);
      setEmail(feedbackText);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="ge-root">
        <p className="ge-section-label">Outreach Email</p>

        {!email && !isGenerating && (
          <button className="ge-generate-btn" onClick={generate}>
            <span className="ge-slide" />
            <span className="ge-label">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 3h12v9a1 1 0 01-1 1H2a1 1 0 01-1-1V3z"
                  stroke="#0D0D12"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 3l6 5 6-5"
                  stroke="#0D0D12"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Generate Outreach Email
            </span>
          </button>
        )}

        {email && !isGenerating && (
          <button className="ge-regen-btn" onClick={generate}>
            ↻ Regenerate
          </button>
        )}

        {isGenerating && (
          <div className="ge-loading">
            <img
              src="/images/resume-scan-2.gif"
              alt="Generating"
              style={{ width: 120, opacity: 0.7 }}
            />
            <span className="ge-loading-text">Drafting your email…</span>
          </div>
        )}

        {error && (
          <div className="ge-error">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="#f87171" strokeWidth="1.2" />
              <path
                d="M7 4.5v3M7 9.5v.5"
                stroke="#f87171"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            {error}
          </div>
        )}

        {email && !isGenerating && (
          <div className="ge-output-card">
            <div className="ge-output-header">
              <span className="ge-output-title">Generated Outreach Email</span>
              <button
                className={`ge-copy-btn ${copied ? 'copied' : ''}`}
                onClick={copyToClipboard}
              >
                {copied ? (
                  <>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path
                        d="M2 5.5l2.5 2.5 4.5-5"
                        stroke="#4ade80"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <rect
                        x="1"
                        y="3"
                        width="7"
                        height="7"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="1.1"
                      />
                      <path
                        d="M3 3V2a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1H8"
                        stroke="currentColor"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                      />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="ge-output-body">{email}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default GenEmail;
