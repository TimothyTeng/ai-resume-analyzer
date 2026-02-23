import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { formatSize } from '~/lib/utils';

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const maxFileSize = 20 * 1024 * 1024;

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFileSelect?.(acceptedFiles[0] || null);
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { 'application/pdf': ['.pdf'] },
      maxSize: maxFileSize,
    });

  const file = acceptedFiles[0] || null;

  return (
    <>
      <div className={`fu-root ${isDragActive ? 'fu-active' : ''}`}>
        {file ? (
          <div className="fu-selected">
            {/* PDF icon */}
            <div className="fu-pdf-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M4 2h7l4 4v10a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z"
                  stroke="#C9A84C"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 2v4h4"
                  stroke="#C9A84C"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 10h6M6 13h4"
                  stroke="#C9A84C"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* File info */}
            <div className="fu-file-info">
              <p className="fu-file-name">{file.name}</p>
              <p className="fu-file-size">{formatSize(file.size)}</p>
            </div>

            {/* Remove button */}
            <button
              className="fu-remove"
              onClick={(e) => {
                e.stopPropagation();
                onFileSelect?.(null);
              }}
              title="Remove file"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 2l8 8M10 2l-8 8"
                  stroke="rgba(250,248,245,0.5)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div {...getRootProps()} className="fu-dropzone">
            <input {...getInputProps()} />

            <div className="fu-icon-ring">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M11 3v11M7 7l4-4 4 4"
                  stroke="#C9A84C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 16v1a2 2 0 002 2h12a2 2 0 002-2v-1"
                  stroke="#C9A84C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <p className="fu-main-text">
              {isDragActive ? (
                <strong>Drop it here…</strong>
              ) : (
                <>
                  <strong>Click to upload</strong> or drag and drop
                </>
              )}
            </p>
            <p className="fu-sub-text">PDF · max {formatSize(maxFileSize)}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FileUploader;
