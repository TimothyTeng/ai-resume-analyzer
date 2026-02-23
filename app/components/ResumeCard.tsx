import { Link } from 'react-router';
import ScoreCircle from '~/components/ScoreCircle';
import { useEffect, useState } from 'react';
import { usePuterStore } from '~/lib/puter';

const ResumeCard = ({
  resume: { companyName, id, jobTitle, feedback, imagePath, resumePath },
  onDelete,
}: {
  resume: Resume;
  onDelete?: (id: string) => void;
}) => {
  const { fs, kv } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      setResumeUrl(URL.createObjectURL(blob));
    };
    loadResume();
  }, [imagePath]);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }

    setIsDeleting(true);
    try {
      await fs.delete(resumePath);
      await fs.delete(imagePath);
      await kv.delete(`resume:${id}`);
      if (resumePath) await fs.delete(resumePath).catch(() => {});
      if (imagePath) await fs.delete(imagePath).catch(() => {});
      onDelete?.(id);
    } catch {
      setIsDeleting(false);
      setConfirmDelete(false);
    }

  };

  return (
    <>
      <div className="lp-rc-outer">
        <Link
          to={`/resume/${id}`}
          className={`lp-resume-card ${isDeleting ? 'is-deleting' : ''}`}
        >
          {/* Meta */}
          <div className="lp-card-meta">
            <div className="lp-card-text">
              <span className="lp-card-company">
                {companyName || jobTitle || 'Resume'}
              </span>
              {companyName && jobTitle && (
                <span className="lp-card-role">{jobTitle}</span>
              )}
            </div>
            <div style={{ flexShrink: 0 }}>
              <ScoreCircle score={feedback.overallScore} />
            </div>
          </div>

          <div className="lp-card-divider" />

          {/* Image */}
          <div className="lp-card-image-wrap">
            {resumeUrl ? (
              <img src={resumeUrl} alt="resume preview" />
            ) : (
              <div className="lp-card-image-placeholder">Loading…</div>
            )}
          </div>

          {/* Footer strip */}
          <div className="lp-card-footer" onClick={(e) => e.preventDefault()}>
            <button
              className={`lp-card-del ${confirmDelete ? 'confirm' : ''}`}
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path
                      d="M4.5 1v1.5M4.5 6.5V8M1 4.5h1.5M6.5 4.5H8"
                      stroke="#f87171"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Deleting…
                </>
              ) : confirmDelete ? (
                <>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path
                      d="M1.5 4.5l2 2L7.5 2"
                      stroke="#f87171"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Confirm?
                </>
              ) : (
                <>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path
                      d="M1.5 1.5l6 6M7.5 1.5l-6 6"
                      stroke="#f87171"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Delete
                </>
              )}
            </button>

            <div className="lp-card-arrow">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 10L10 2M10 2H4M10 2V8"
                  stroke="#0D0D12"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ResumeCard;
