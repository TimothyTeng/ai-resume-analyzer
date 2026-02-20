import { usePuterStore } from '~/lib/puter';
import { coverLetterInstructions } from '../../constants';
import { useEffect, useState } from 'react';

const GenCoverLetter = ({
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
  const [cl, setCl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const { kv, ai } = usePuterStore();

  useEffect(() => {
    const getCl = async () => {
      const coverLetter = await kv.get(`CoverLetter:${resumeId}`);
      if (!coverLetter) return;
      setCl(coverLetter);
    }
    getCl()
  }, [cl]);

  const generate = async () => {
    setIsGenerating(true);
    setError('');
    setCl('');

    const feedback = await ai.feedback(
      imageUrl,
      coverLetterInstructions({ companyName, jobTitle, jobDescription }),
    );
    console.log(feedback);
    if (!feedback) {
      setError('Failed to generate cover letter. Please try again.');
      return;
    }

    const feedbackText =
      typeof feedback.message.content === 'string'
        ? feedback.message.content
        : feedback.message.content[0].text;

    console.log(feedbackText);
    //const data = JSON.parse(feedbackText);
    await kv.set(`CoverLetter:${resumeId}`, feedbackText);
    setCl(feedbackText);
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cl);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Generate Button */}
      {!cl && !isGenerating && (
        <button
          onClick={generate}
          className="primary-button flex flex-row items-center justify-center gap-2 py-3 text-base font-semibold transition-opacity hover:opacity-90"
        >
          <img
            src="/icons/check.svg"
            alt=""
            className="size-4 brightness-[10]"
          />
          Generate Cover Letter
        </button>
      )}

      {/* Regenerate button (shown after generation) */}
      {cl && !isGenerating && (
        <button
          onClick={generate}
          className="flex flex-row items-center justify-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-dark-200 hover:bg-gray-50 transition-colors w-fit"
        >
          ↻ Regenerate
        </button>
      )}

      {/* Loading state */}
      {isGenerating && (
        <div className="flex flex-col items-center justify-center gap-3 py-10 gradient-border animate-in fade-in duration-500">
          <img
            src="/images/resume-scan-2.gif"
            alt="Generating..."
            className="w-[140px]"
          />
          <p className="text-dark-200 text-sm font-medium">
            Crafting your cover letter...
          </p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="flex flex-row items-center gap-2 bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 text-sm animate-in fade-in duration-300">
          <img src="/icons/warning.svg" alt="error" className="size-4" />
          {error}
        </div>
      )}

      {/* Cover letter output */}
      {cl && !isGenerating && (
        <div className="flex flex-col gap-3 animate-in fade-in duration-700">
          {/* Header row */}
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-lg font-semibold text-black">Cover Letter</h3>
            <button
              onClick={copyToClipboard}
              className="flex flex-row items-center gap-1.5 text-sm text-dark-200 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors"
            >
              <img
                src="/icons/check.svg"
                alt="copy"
                className="size-3.5 opacity-60"
              />
              Copy
            </button>
          </div>

          {/* Letter box */}
          <div className="gradient-border w-full">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                {cl}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenCoverLetter;
