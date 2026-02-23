import { Link, useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { usePuterStore } from '~/lib/puter';
import Summary from '~/components/Summary';
import Details from '~/components/Details';
import ATS from '~/components/ATS';
import GenCoverLetter from '~/components/GenCoverLetter';
import GenEmail from '~/components/GenEmail';

export const meta = () => [
  { title: 'ResuBench | Review' },
  { name: 'description', content: 'Detailed overview of your resume' },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resumePath, setResumePath] = useState('');

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;
      const data = JSON.parse(resume);
      setCompanyName(data.companyName);
      setJobTitle(data.jobTitle);
      setJobDescription(data.jobDescription);
      setResumePath(data.resumePath);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;
      setResumeUrl(
        URL.createObjectURL(
          new Blob([resumeBlob], { type: 'application/pdf' }),
        ),
      );

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      setImageUrl(URL.createObjectURL(imageBlob));

      setFeedback(data.feedback);
    };
    loadResume();
  }, [id]);

  return (
    <>
      <div className="rv-noise" aria-hidden="true" />

      <div className="rv-root">
        {/* Nav */}
        <nav className="rv-nav">
          <Link to="/" className="rv-back-btn">
            ← Back
          </Link>
          <span className="rv-nav-title">ResuBench</span>
          <div style={{ width: 80 }} /> {/* spacer to center title */}
        </nav>

        <div className="rv-layout">
          {/* Preview panel */}
          <section className="rv-preview-panel">
            {imageUrl && resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rv-resume-frame"
              >
                <img
                  src={imageUrl}
                  alt="resume preview"
                  title="Click to open PDF"
                />
              </a>
            ) : (
              <div className="rv-loading">
                <img
                  src="/images/resume-scan-2.gif"
                  alt="Loading"
                  style={{ width: 100, opacity: 0.5 }}
                />
                <span>Loading resume…</span>
              </div>
            )}
          </section>

          {/* Feedback panel */}
          <section className="rv-feedback-panel">
            <div>
              <p className="rv-feedback-label">AI Analysis</p>
              <h1 className="rv-feedback-title">
                {companyName || 'Resume'}{' '}
                {jobTitle && (
                  <span className="rv-feedback-serif">— {jobTitle}</span>
                )}
              </h1>
            </div>

            <hr className="rv-divider" />

            {feedback ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  animation: 'rv-fade-up 0.7s ease both',
                }}
              >
                <Summary feedback={feedback} />
                <ATS
                  score={feedback.ATS.score || 0}
                  suggestions={feedback.ATS.tips || []}
                />
                <Details feedback={feedback} />
                <GenCoverLetter
                  companyName={companyName}
                  jobTitle={jobTitle}
                  jobDescription={jobDescription}
                  imageUrl={resumePath}
                  resumeId={id!}
                />
                <GenEmail
                  companyName={companyName}
                  jobTitle={jobTitle}
                  jobDescription={jobDescription}
                  imageUrl={resumePath}
                  resumeId={id}
                />
              </div>
            ) : (
              <div className="rv-loading">
                <img
                  src="/images/resume-scan-2.gif"
                  alt="Analysing"
                  style={{ width: 140, opacity: 0.6 }}
                />
                <span>Preparing your feedback…</span>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Resume;
