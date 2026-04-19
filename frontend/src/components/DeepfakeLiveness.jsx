import React, { useEffect, useRef, useState } from 'react';
import { Camera, ShieldAlert, Scan, ShieldCheck, Activity } from 'lucide-react';

const DeepfakeLiveness = ({ onComplete }) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('scanning'); // scanning | success | failed

  useEffect(() => {
    let activeStream = null;
    // Attempt to hijack webcam
    const startWebcam = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        activeStream = mediaStream;
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Camera access denied or unavailable", err);
        // We handle fallback silently via CSS if no stream
      }
    };
    
    startWebcam();

    // Sequence the fake terminal logs
    const sequence = [
      "Initializing Optical Flow matrices...",
      "Extracting Micro-expression anomalies...",
      "Calculating Skin Reflectance ratio: 94.2%",
      "Mapping 3D Depth topology...",
      "[WARN] Minor noise detected in infra-red band.",
      "Cross-referencing Synthetic KYC databases...",
      "Consensus Reached. Deepfake spoofing negative."
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < sequence.length) {
        setLogs(prev => [...prev, { text: sequence[i], time: new Date().toLocaleTimeString() }]);
        i++;
      } else {
        clearInterval(interval);
        setStatus('success');
        if (onComplete) setTimeout(onComplete, 2000);
      }
    }, 800);

    return () => {
      clearInterval(interval);
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="panel-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Biometric Liveness Matrix</h2>
        {status === 'success' && (
           <span style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '8px', fontWeight: 600 }}>
              <ShieldCheck size={16} /> Liveness Confirmed
           </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '2rem', flex: 1 }}>
        <div style={{ flex: 1, position: 'relative', background: '#000', borderRadius: '16px', overflow: 'hidden', border: status === 'success' ? '2px solid #10b981' : '2px solid var(--accent-cyan)' }}>
          {stream ? (
            <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
               <Camera size={48} opacity={0.5} />
               <p>Camera feed disabled. Running simulated optical checks.</p>
            </div>
          )}
          
          {/* Scanning Overlay UI */}
          {status === 'scanning' && (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }}>
               <div style={{ width: '100%', height: '2px', background: 'var(--accent-cyan)', boxShadow: '0 0 15px var(--accent-cyan)', position: 'absolute', top: '50%', animation: 'scanline 2s linear infinite' }} />
               <div style={{ position: 'absolute', inset: '10%', border: '2px solid rgba(0, 240, 255, 0.4)', borderRadius: '20px' }}>
                  <div style={{ position: 'absolute', top: '-2px', left: '-2px', width: '20px', height: '20px', borderTop: '4px solid var(--accent-cyan)', borderLeft: '4px solid var(--accent-cyan)' }} />
                  <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '20px', height: '20px', borderTop: '4px solid var(--accent-cyan)', borderRight: '4px solid var(--accent-cyan)' }} />
                  <div style={{ position: 'absolute', bottom: '-2px', left: '-2px', width: '20px', height: '20px', borderBottom: '4px solid var(--accent-cyan)', borderLeft: '4px solid var(--accent-cyan)' }} />
                  <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '20px', height: '20px', borderBottom: '4px solid var(--accent-cyan)', borderRight: '4px solid var(--accent-cyan)' }} />
               </div>
            </div>
          )}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
            <h3 style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Scan size={20} color="var(--accent-purple)"/> Sub-Layer Output
            </h3>
            <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
              {logs.map((log, i) => (
                <div key={i} style={{ marginBottom: '8px', opacity: 0, animation: 'fadeIn 0.3s forwards', color: (log.text || '').includes('WARN') ? '#f59e0b' : (log.text || '').includes('Consensus') ? '#10b981' : 'inherit' }}>
                  <span style={{ color: 'var(--text-muted)' }}>[{log.time}]</span> {log.text}
                </div>
              ))}
              {status === 'scanning' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '1rem', color: 'var(--text-main)' }}>
                   <Activity size={14} className="animate-spin" /> Processing Neural Filters...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scanline {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default DeepfakeLiveness;
