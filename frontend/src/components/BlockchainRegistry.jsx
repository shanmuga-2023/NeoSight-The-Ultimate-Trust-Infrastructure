import React, { useState, useEffect } from 'react';
import { Database, Link2, Activity, XOctagon, CheckCircle2 } from 'lucide-react';

const BlockchainRegistry = ({ isVerificationMode, globalFile }) => {
  const [isHashing, setIsHashing] = useState(isVerificationMode);
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    if (isVerificationMode && globalFile) {
      // Simulate the time required to hash the document and query the ledger
      setIsHashing(true);
      setScanComplete(false);
      
      const timer = setTimeout(() => {
        setIsHashing(false);
        setScanComplete(true);
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [isVerificationMode, globalFile]);

  const templates = [
    { title: "Standard ID Form v2", hash: "0x8f434346648...8f1a", date: "2024-01-12", status: "Verified" },
    { title: "Regional Driving License", hash: "0x9a2b5357...d34b", date: "2024-02-18", status: "Verified" },
    { title: "Enterprise Invoice Temp", hash: "0x1c2d3e4f...5g6h", date: "2025-05-09", status: "Verified" },
    { title: "Tax Declaration C", hash: "0x7z8y9x0w...v1u2", date: "2026-03-21", status: "Network Syncing" }
  ];

  return (
    <div style={{ padding: '2rem', animation: 'fadeIn 0.5s ease-out', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="panel-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Sovereign Template Registry</h2>
        {isVerificationMode && scanComplete && (
           <span style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', fontWeight: 600 }}>
              <XOctagon size={16} /> Ledger Consensus Failed
           </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '2rem', height: '100%' }}>
        
        {/* Verification Status Banner Column */}
        {isVerificationMode && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem', background: scanComplete ? 'rgba(239, 68, 68, 0.05)' : 'var(--bg-glass)', border: scanComplete ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid var(--border-glass)' }}>
               <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                 {isHashing ? <Activity size={20} className="animate-spin" color="var(--accent-cyan)" /> : <Database size={20} />}
                 Active Hash Verification
               </h3>
               
               <div style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                 <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Target Upload</div>
                 <div style={{ fontWeight: 600, wordBreak: 'break-all' }}>{globalFile ? globalFile.name : 'Unknown File'}</div>
               </div>
               
               {isHashing ? (
                 <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--accent-cyan)' }}>
                   Computing SHA-256 Signature...
                 </div>
               ) : scanComplete ? (
                 <>
                   <div style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '8px' }}>
                     <div style={{ fontSize: '0.8rem', color: '#ef4444', marginBottom: '4px' }}>Generated Hash (Orphaned)</div>
                     <div style={{ fontFamily: 'monospace', color: '#ef4444', wordBreak: 'break-all' }}>0x4f92a1b9e8...7d2c00</div>
                   </div>
                   
                   <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                     The cryptographic fingerprint of the uploaded document does not map to any verified templates in the sovereign registry. Pixel-level manipulation has broken the integrity seal.
                   </p>
                 </>
               ) : null}
            </div>
          </div>
        )}

        {/* Ledger Table Column */}
        <div style={{ flex: isVerificationMode ? 1.5 : 2 }}>
          <div className="glass-panel" style={{ padding: '1rem', overflow: 'hidden' }}>
            <div style={{ padding: '0 1rem 1rem', fontSize: '0.9rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-glass)' }}>
              Trusted Anchors
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Template Name</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Signature</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Consensus Status</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((t, idx) => (
                  <tr key={idx} style={{ borderBottom: idx === templates.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)', opacity: scanComplete ? 0.4 : 1, transition: 'opacity 0.5s ease' }}>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{t.title}</td>
                    <td style={{ padding: '1rem', fontFamily: 'monospace', color: 'var(--accent-cyan)' }}>{t.hash}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600,
                        background: t.status === 'Verified' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        color: t.status === 'Verified' ? '#10b981' : '#f59e0b',
                        display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content'
                      }}>
                        {t.status === 'Verified' && <CheckCircle2 size={12} />} {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Non-Verification Mode Logic (Standalone Display) */}
        {!isVerificationMode && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <Database size={48} color="var(--accent-purple)" style={{ marginBottom: '1rem', opacity: 0.8 }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Immutable Anchor</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>Files uploaded to the Document Analysis tool are hashed and checked against this registry in real-time. Any bit-level deviation instantly flags the Layout Insight engine.</p>
            </div>
            
            <button style={{
              background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
              color: 'white', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '1rem',
              fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
              cursor: 'pointer', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
            }}>
              <Link2 size={20} /> Register New Template
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default BlockchainRegistry;
