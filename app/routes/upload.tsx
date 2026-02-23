import Navbar from '~/components/Navbar';
import { type SubmitEvent, useEffect, useState } from 'react';
import FileUploader from '~/components/FileUploader';
import { usePuterStore } from '~/lib/puter';
import { useNavigate } from 'react-router';
import { convertPdfToImage } from '~/lib/pdf2img';
import { generateUUID } from '~/lib/utils';
import { prepareInstructions } from '../../constants';

const steps = [
  'Uploading file…',
  'Converting to image…',
  'Uploading image…',
  'Preparing data…',
  'Analysing resume… (this may take a few minutes)',
  'Analysis complete, redirecting…',
];

const Upload = () => {
  const { auth, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [statusIndex, setStatusIndex] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/upload');
  }, [auth.isAuthenticated]);

  const setStatus = (text: string, index?: number) => {
    setStatusText(text);
    if (index !== undefined) setStatusIndex(index);
  };

  const handleFileSelect = (file: File | null) => setFile(file);

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);

    setStatus('Uploading file…', 0);
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatus('Error: Failed to upload file');

    setStatus('Converting to image…', 1);
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file)
      return setStatus('Error: Failed to convert PDF to image');

    setStatus('Uploading image…', 2);
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatus('Error: Failed to upload image');

    setStatus('Preparing data…', 3);
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: '',
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatus('Analysing resume… (this may take a few minutes)', 4);
    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription }),
    );
    if (!feedback) return setStatus('Error: Failed to analyze resume');

    const feedbackText =
      typeof feedback.message.content === 'string'
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatus('Analysis complete, redirecting…', 5);
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest('form');
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get('company-name') as string;
    const jobTitle = formData.get('job-title') as string;
    const jobDescription = formData.get('job-description') as string;
    if (!file) return;
    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  const isError = statusText.startsWith('Error');

  return (
    <>
      <div className="up-noise" aria-hidden="true" />

      {/* Ambient blobs */}
      <div
        className="up-blob"
        style={{
          width: 500,
          height: 500,
          top: -150,
          right: -100,
          background: 'rgba(201,168,76,0.06)',
        }}
      />
      <div
        className="up-blob"
        style={{
          width: 400,
          height: 400,
          bottom: 0,
          left: -100,
          background: 'rgba(42,42,53,0.5)',
        }}
      />

      <div className="up-root">
        <Navbar />

        <section className="up-section">
          <p className="up-label">Resume Upload</p>
          <h1 className="up-title">
            Target the role.
            <br />
            <span className="up-serif">Own the interview.</span>
          </h1>
          <p className="up-sub">
            Drop your resume, enter the job details, and receive a full
            AI-scored analysis with ATS feedback and improvement tips.
          </p>

          <hr className="up-divider" />

          {isProcessing ? (
            <div className="up-processing">
              {isError ? (
                <div className="up-error">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle
                      cx="8"
                      cy="8"
                      r="7"
                      stroke="#f87171"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M8 5v3.5M8 10.5v.5"
                      stroke="#f87171"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  {statusText.replace('Error: ', '')}
                </div>
              ) : (
                <>
                  <div className="up-gif">
                    <img
                      src="/images/resume-scan.gif"
                      alt="Scanning resume"
                      style={{ width: '100%', display: 'block' }}
                    />
                  </div>

                  <div className="up-progress-steps">
                    {steps.map((step, i) => {
                      const state =
                        i < statusIndex
                          ? 'done'
                          : i === statusIndex
                            ? 'active'
                            : 'pending';
                      return (
                        <div key={step} className={`up-progress-step ${state}`}>
                          <div className="up-step-dot" />
                          <span>
                            {i < statusIndex ? '✓ ' : ''}
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          ) : (
            <form id="upload-form" onSubmit={handleSubmit} className="up-form">
              <div className="up-field">
                <label htmlFor="company-name" className="up-field-label">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company-name"
                  id="company-name"
                  placeholder="e.g. Google"
                  className="up-input"
                />
              </div>

              <div className="up-field">
                <label htmlFor="job-title" className="up-field-label">
                  Job Title
                </label>
                <input
                  type="text"
                  name="job-title"
                  id="job-title"
                  placeholder="e.g. Software Engineer"
                  className="up-input"
                />
              </div>

              <div className="up-field">
                <label htmlFor="job-description" className="up-field-label">
                  Job Description
                </label>
                <textarea
                  name="job-description"
                  id="job-description"
                  placeholder="Paste the full job description here…"
                  className="up-input"
                  rows={6}
                />
              </div>

              <div className="up-field">
                <label className="up-field-label">Resume (PDF)</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              <button type="submit" className="up-submit">
                <span className="up-slide" />
                <span className="up-label-btn">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path
                      d="M7.5 1v9M3.5 6L7.5 1 11.5 6M2 13h11"
                      stroke="#0D0D12"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Analyse Resume
                </span>
              </button>
            </form>
          )}
        </section>
      </div>
    </>
  );
};

export default Upload;
