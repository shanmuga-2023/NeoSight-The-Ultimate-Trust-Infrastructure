import React, { useEffect, useState } from 'react';
import { Globe2, ShieldAlert, Wifi, Zap } from 'lucide-react';

const FPISublayer = ({ globalFile }) => {
  const [intelStream, setIntelStream] = useState([]);
  const [threatLevel, setThreatLevel] = useState('analyzing');

  useEffect(() => {
    const alerts = [
      "Querying Forged Profile Intelligence (FPI) Network...",
      "Mapping local visual anomalies to global hash ledger...",
      "MATCH FOUND: Typographical kerning vector identical to Syndicate Alpha.",
      "Tracing hash origin. Suspected exit node: Frankfurt, Germany.",
      "Cross-referencing global immigration databases...",
      "[CRITICAL] 14 identical template manipulations blocked in the last 72 hours.",
      "Verdict: Organized Fraud Ring Detected."
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < alerts.length) {
        setIntelStream(prev => [...prev, alerts[i]]);
        i++;
      } else {
        clearInterval(interval);
        setThreatLevel('critical');
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="panel-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>FPI Threat Intelligence Sublayer</h2>
        {threatLevel === 'critical' && (
           <span style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', fontWeight: 600, animation: 'pulse 2s infinite' }}>
              <ShieldAlert size={16} /> organized Syndicate MATCH
           </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '2rem', flex: 1 }}>
        {/* Global Map Simulation */}
        <div style={{ flex: 1.5, position: 'relative', background: 'radial-gradient(circle at center, rgba(16,24,39,1) 0%, rgba(0,0,0,1) 100%)', borderRadius: '16px', border: '1px solid var(--border-glass)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Abstract Vector Map Nodes */}
          <div style={{ position: 'relative', width: '80%', height: '80%', opacity: 0.6 }}>
            {/* The Globe Background Grid */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* Map Center Icon */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
               <Globe2 size={120} color="var(--accent-blue)" strokeWidth={1} />
            </div>

            {/* Pinging Nodes */}
            <div className="ping-node" style={{ top: '30%', left: '20%' }}></div>
            <div className="ping-node" style={{ top: '60%', left: '70%' }}></div>
            <div className="ping-node active-threat" style={{ top: '40%', left: '55%' }}></div>
            
            {/* Connection Line */}
            {threatLevel === 'critical' && (
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <line x1="50%" y1="50%" x2="55%" y2="40%" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" className="draw-line" />
                <circle cx="55%" cy="40%" r="20" fill="none" stroke="#ef4444" className="radar-pulse" />
              </svg>
            )}
          </div>
          
          {/* Map Overlay Text */}
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', display: 'flex', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', fontSize: '0.85rem' }}>
              <Wifi size={14} /> Global Node Sync Active
            </div>
          </div>
        </div>

        {/* Intelligence Side Panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', flex: 1, border: threatLevel === 'critical' ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border-glass)' }}>
             <h3 style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={20} color="var(--accent-purple)"/> Live Intel Stream
             </h3>
             
             <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               {intelStream.map((msg, i) => (
                 <div key={i} style={{ 
                   padding: '12px', 
                   background: (msg || '').includes('MATCH') || (msg || '').includes('CRITICAL') || (msg || '').includes('Verdict') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.05)', 
                   borderLeft: (msg || '').includes('MATCH') || (msg || '').includes('CRITICAL') || (msg || '').includes('Verdict') ? '3px solid #ef4444' : '3px solid var(--accent-cyan)',
                   color: (msg || '').includes('MATCH') || (msg || '').includes('CRITICAL') || (msg || '').includes('Verdict') ? '#fca5a5' : 'var(--text-main)',
                   animation: 'fadeInLeft 0.4s ease-out'
                 }}>
                   {msg}
                 </div>
               ))}
               
               {threatLevel === 'analyzing' && (
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <span className="blink-dot" /> connecting to FPI Interpol database...
                  </div>
               )}
             </div>
          </div>
        </div>
      </div>

      <style>{`
        .ping-node {
          position: absolute; width: 8px; height: 8px; background: var(--accent-cyan); border-radius: 50%;
          box-shadow: 0 0 10px var(--accent-cyan);
        }
        .ping-node::after {
          content: ''; position: absolute; inset: -10px; border-radius: 50%; border: 1px solid var(--accent-cyan);
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .active-threat {
          background: #ef4444; box-shadow: 0 0 10px #ef4444; z-index: 10;
        }
        .active-threat::after {
          border-color: #ef4444; animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .radar-pulse {
          animation: pulse-ring 2s infinite;
        }
        .draw-line {
          stroke-dashoffset: 100; animation: drawLine 1.5s forwards ease-out;
        }
        @keyframes ping {
          75%, 100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes pulse-ring {
          0% { r: 5; opacity: 1; stroke-width: 2; }
          100% { r: 40; opacity: 0; stroke-width: 0; }
        }
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .blink-dot {
          width: 8px; height: 8px; background: var(--accent-cyan); border-radius: 50%; display: inline-block;
          animation: blink 1s infinite alternate;
        }
        @keyframes blink {
          to { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default FPISublayer;
