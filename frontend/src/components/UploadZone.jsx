import { FileUp } from 'lucide-react';
import React, { useCallback, useState } from 'react';

const UploadZone = ({ onUpload }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsHovered(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsHovered(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsHovered(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files[0]);
    }
  }, [onUpload]);

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div 
      className="upload-zone"
      style={{
        borderColor: isHovered ? 'var(--accent-cyan)' : 'var(--border-glass)',
        boxShadow: isHovered ? 'var(--shadow-glow)' : 'none'
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('fileUpload').click()}
    >
      <FileUp className="upload-icon" />
      <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Upload Document</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Drag & drop or click to browse</p>
      
      <button 
        style={{
          background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '500',
          cursor: 'pointer',
          boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.39)'
        }}
      >
        Select File
      </button>
      
      <input 
        type="file" 
        id="fileUpload" 
        style={{ display: 'none' }} 
        accept="image/*,application/pdf"
        onChange={handleChange}
      />
    </div>
  );
};

export default UploadZone;
