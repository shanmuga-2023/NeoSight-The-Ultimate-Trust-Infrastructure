import React, { useState } from 'react';
import { Camera, ScanFace } from 'lucide-react';

const DeepfakeDetection = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [complete, setComplete] = useState(false);

  const startAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setComplete(true);
    }, 4000);
  };

  return (
    <div style={{ padding: '2rem', animation: 'fadeIn 0.5s ease-out', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="panel-header" style={{ marginBottom: '2rem' }}>
        <h2>Identity Liveness & Deepfake Detection</h2>
      </div>

      <div className="Officer-Layout">
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', minHeight: '400px', position: 'relative', overflow: 'hidden' }}>
          
          {!analyzing && !complete && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0, 240, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Camera size={36} color="var(--accent-cyan)" />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Upload Video KYC or Biometric Selfie</h3>
              <button 
                onClick={startAnalysis}
                style={{ padding: '12px 24px', background: 'var(--accent-cyan)', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
              >
                Simulate Video Upload
              </button>
            </div>
          )}

          {(analyzing || complete) && (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {/* Mock Video Frame */}
              <div style={{ width: '80%', aspectRatio: '3/4', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden', position: 'relative', border: complete ? '2px solid #ef4444' : '2px solid var(--accent-cyan)' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ScanFace size={120} color={complete ? '#ef4444' : 'var(--text-muted)'} style={{ opacity: 0.5 }} />
                </div>
                
                {analyzing && (
                  <>
                    <div className="scan-line" style={{ height: '2px', background: 'var(--accent-cyan)', boxShadow: '0 0 10px var(--accent-cyan)' }}></div>
                    <div style={{ position: 'absolute', bottom: '20px', width: '100%', textAlign: 'center', color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 600, animation: 'pulseGlow 2s infinite' }}>Detecting pulse routing & micro-expressions...</div>
                  </>
                )}

                {complete && (
                  <div style={{ position: 'absolute', top: '30%', left: '20%', width: '60%', height: '20%', border: '2px dashed #ef4444', background: 'rgba(239, 68, 68, 0.2)' }}>
                    <div style={{ position: 'absolute', top: '-30px', left: 0, background: '#ef4444', color: '#fff', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px' }}>Morphing Seam Detected (94%)</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           <div className="glass-panel" style={{ padding: '1.5rem', flex: 1 }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Liveness Results</h3>
              
              {!complete ? (
                <div style={{ color: 'var(--text-muted)', display: 'flex', height: '50%', alignItems: 'center', justifyContent: 'center' }}>Awaiting media input...</div>
              ) : (
                <div className="animate-fade-in">
                  <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', marginBottom: '1.5rem' }}>
                    <h4 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>FAIL: Synthetic Media Identity</h4>
                    <p style={{ fontSize: '0.9rem', color: '#fca5a5' }}>Facial morphing detected alongside unnatural blink rates. Audio-visual sync drifts by 12ms indicating post-generation splicing.</p>
                  </div>

                  <div className="result-item">
                    <div className="result-label"><span>Spatial Artifacts (GAN Trace)</span><span style={{ color: '#ef4444' }}>98%</span></div>
                    <div className="progress-bar-bg"><div className="progress-bar-fill warning" style={{ width: '98%' }}></div></div>
                  </div>
                  
                  <div className="result-item">
                    <div className="result-label"><span>Optical Flow & Micro-expressions</span><span style={{ color: '#f59e0b' }}>Anomalous</span></div>
                    <div className="progress-bar-bg"><div className="progress-bar-fill warning" style={{ width: '70%' }}></div></div>
                  </div>

                  <div className="result-item">
                    <div className="result-label"><span>Pulse & Skin Reflectance</span><span style={{ color: '#ef4444' }}>Absent</span></div>
                    <div className="progress-bar-bg"><div className="progress-bar-fill warning" style={{ width: '10%' }}></div></div>
                  </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default DeepfakeDetection;
