import React, { useState } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';

const FileUploadForm: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      try {
        // Azurite default connection string
        const url = `https://bookgpt.blob.core.windows.net/bookgpt?st=2023-11-30T21:51:29Z&se=2023-12-02T21:51:29Z&si=test&spr=https&sv=2022-11-02&sr=c&sig=c%2BDtMG5pPd%2F7LSDWbyTtKodThUPBaAUjy5q2WpH5cOo%3D`;
        const blobServiceClient = new BlobServiceClient(url);
        const containerName = 'bookgpt'; // Replace with your container name
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobClient = containerClient.getBlockBlobClient(selectedFile.name);

        await blobClient.uploadData(selectedFile);
        console.log("File uploaded successfully.");
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUploadForm;
