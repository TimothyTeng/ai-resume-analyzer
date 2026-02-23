import Navbar from '~/components/Navbar';
import type { Route } from './+types/home';
import ResumeCard from '~/components/ResumeCard';
import { usePuterStore } from '~/lib/puter';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import LandingPage from '~/components/LandingPage';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'ResuBench — AI Resume Analysis & ATS Scoring' },
    {
      name: 'description',
      content:
        'Upload your resume and get instant AI-powered feedback, ATS scoring, cover letters and more.',
    },
    { property: 'og:title', content: 'ResuBench — AI Resume Analysis' },
    {
      property: 'og:description',
      content: 'Get instant AI feedback on your resume.',
    },
    { property: 'og:type', content: 'website' },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  const handleDelete = (deletedId: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== deletedId));
  };

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resumes = (await kv.list('resume:*', true)) as KVItem[];
      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume,
      );
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };
    loadResumes();
  }, []);

  return (
    <>
      <div className="lp-home-noise" aria-hidden="true" />

      <div className="lp-home">
        <Navbar />

        {auth.isAuthenticated ? (
          <div className="lp-dashboard">
            <div className="lp-dashboard-header">
              <div>
                <p className="lp-dash-label">Dashboard</p>
                <h1 className="lp-dash-title">
                  {resumes.length === 0 ? (
                    <>
                      Your career journey
                      <br />
                      <span className="lp-dash-title-serif">starts here.</span>
                    </>
                  ) : (
                    <>
                      Your applications &amp;
                      <br />
                      <span className="lp-dash-title-serif">
                        resume ratings.
                      </span>
                    </>
                  )}
                </h1>
              </div>
              <Link to="/upload" className="lp-upload-btn">
                <span className="lp-slide" />
                <span className="lp-label">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path
                      d="M6.5 1v8M3 4.5L6.5 1 10 4.5M1.5 11h10"
                      stroke="#0D0D12"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Upload Resume
                </span>
              </Link>
            </div>

            <hr className="lp-divider" />

            {loadingResumes && (
              <div className="lp-loading">
                <img
                  src="/images/resume-scan-2.gif"
                  alt="Loading"
                  style={{ width: 120, opacity: 0.6 }}
                />
                <span>Retrieving your resumes…</span>
              </div>
            )}

            {!loadingResumes && resumes.length > 0 && (
              <div className="lp-resume-grid">
                {resumes.map((resume) => (
                  <ResumeCard
                    key={resume.id}
                    resume={resume}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}

            {!loadingResumes && resumes.length === 0 && (
              <div className="lp-empty">
                <div className="lp-empty-icon">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path
                      d="M11 5v12M5 11h12"
                      stroke="#C9A84C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      color: 'rgba(250,248,245,0.75)',
                      fontWeight: 500,
                      fontSize: '1.05rem',
                      marginBottom: '0.4rem',
                    }}
                  >
                    No resumes yet
                  </p>
                  <p
                    style={{
                      color: 'rgba(250,248,245,0.3)',
                      fontSize: '0.875rem',
                      fontWeight: 300,
                    }}
                  >
                    Upload your first resume to receive AI-powered feedback.
                  </p>
                </div>
                <Link to="/upload" className="lp-upload-btn">
                  <span className="lp-slide" />
                  <span className="lp-label">Upload Your First Resume</span>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <LandingPage />
        )}
      </div>
    </>
  );
}