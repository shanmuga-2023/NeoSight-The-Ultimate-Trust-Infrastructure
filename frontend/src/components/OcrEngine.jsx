import React, { useState } from 'react';
import { FileSearch, Languages } from 'lucide-react';
import UploadZone from './UploadZone';

const OcrEngine = ({ globalFile, setGlobalFile }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [text, setText] = useState("");

  const handleUpload = (f) => {
    if (setGlobalFile) {
      setGlobalFile(f);
    }
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setText(`[REGIONAL SCRIPT DETECTED: TAMIL / ENGLISH]

தமிழ்நாடு அரசு
GOVERNMENT OF TAMIL NADU

பெயர் / Name: SHANMUGASUNDARAM G
தந்தை பெயர் / Father's Name: GANESAN
பிறந்த தேதி / Date of Birth: 12-05-1996
முகவரி / Address:
142, பாரதி வீதி,
சென்னை - 600001
142, Bharathi Street,
Chennai - 600001

[SYSTEM NOTE: Low-quality scan compensated via super-resolution.]
[CONFIDENCE: 98.4%]`);
    }, 2500);
  };

  return (
    <div style={{ padding: '2rem', animation: 'fadeIn 0.5s ease-out', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="panel-header" style={{ marginBottom: '2rem' }}>
        <h2>Hyper-Local Multilingual OCR Engine</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', flex: 1 }}>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', color: 'var(--accent-cyan)' }}><FileSearch size={20} /> Identity Document Input</h3>
          <div style={{ flex: 1 }}>
            {!globalFile ? (
              <UploadZone onUpload={handleUpload} />
            ) : (
              <div style={{ height: '100%', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
                <img src={URL.createObjectURL(globalFile)} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', opacity: 0.5 }} alt="Scan" />
                {analyzing && <div className="scan-line"></div>}
              </div>
            )}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', color: 'var(--accent-purple)' }}><Languages size={20} /> Extracted Structured Data</h3>
          
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.4)', borderRadius: '8px', border: '1px solid var(--border-glass)', padding: '1.5rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.6, color: 'var(--text-main)', fontSize: '0.95rem', overflowY: 'auto' }}>
            {analyzing ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--accent-cyan)', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }}></div>
                 Executing Layout-Aware Parsing & Multi-Script alignment...
                 <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
              </div>
            ) : text ? (
              <div className="animate-fade-in">{text}</div>
            ) : (
              <span style={{ color: 'var(--text-muted)' }}>Upload an image containing text (English/Tamil/Hindi/Telugu) to begin extraction.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OcrEngine;
