import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useUpload } from '../../hooks/useUpload';

const FileUpload = () => {
  const {
    files,
    uploadFile,
    removeFile,
    uploadProgress,
    isUploading
  } = useUpload();

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Assuming only one file is uploaded at a time for simplicity
      const file = acceptedFiles[0];
      if (file) {
        uploadFile(file);
      }
    },
    [uploadFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div className="container mx-auto">
      <div {...getRootProps()} className="dropzone border-dashed border-4 border-primary p-10 cursor-pointer">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-primary">Drop the files here...</p>
        ) : (
          <p className="text-secondary">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
      {isUploading && (
        <div className="my-2">
          <div className="progress-bar bg-primary" style={{ width: `${uploadProgress}%` }}></div>
        </div>
      )}
      <ul className="list-none mt-2">
        {files.map((file) => (
          <li key={file.name} className="flex justify-between items-center p-2">
            <span className="file-name text-secondary">{file.name}</span>
            <span className="file-size text-secondary">{file.size} bytes</span>
            <span className="file-progress text-secondary">{uploadProgress[file.name]?.progress || 0}%</span>
            <button
              className="delete-button bg-accent text-white p-1 rounded"
              onClick={() => removeFile(file.name)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;
