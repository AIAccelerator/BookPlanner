import { useState, useCallback } from 'react';

export const useUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  // Function to simulate file upload process
  const uploadFile = useCallback(async (file) => {
    setIsUploading(true);
    // Mock upload progress
    setUploadProgress((prevProgress) => ({
      ...prevProgress,
      [file.name]: { progress: 0, complete: false }
    }));

    // This timeout is to simulate a file upload
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        let newProgress = (prevProgress[file.name].progress || 0) + 10;
        if (newProgress > 100) {
          clearInterval(interval);
          newProgress = 100;
        }
        return {
          ...prevProgress,
          [file.name]: { progress: newProgress, complete: newProgress === 100 }
        };
      });
    }, 500);

    // Add file to the files list
    setFiles((prevFiles) => [...prevFiles, file]);
    // Wait for the mock upload to finish
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setIsUploading(false);
  }, []);

  // Function to remove file from the list
  const removeFile = useCallback((fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    setUploadProgress((prevProgress) => {
      const newProgress = { ...prevProgress };
      delete newProgress[fileName];
      return newProgress;
    });
  }, []);

  return {
    files,
    setFiles,
    uploadProgress,
    isUploading,
    uploadFile,
    removeFile
  };
};
