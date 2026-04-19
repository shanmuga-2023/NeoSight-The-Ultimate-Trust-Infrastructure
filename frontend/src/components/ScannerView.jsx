import React, { useState, useEffect } from 'react';
import { Activity, Layers } from 'lucide-react';
import { generateElaOverlay } from '../utils/elaAnalyzer';

const ScannerView = ({ imageUrl, globalFile, isScanning, regions }) => {
  const [hoveredTooltip, setHoveredTooltip] = useState(null);
  const [elaOverlay, setElaOverlay] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (globalFile && !isScanning) {
      // Once scanning is complete, generate the real Canvas ELA math overlay
      generateElaOverlay(globalFile).then(base64 => {
        setElaOverlay(base64);
        setShowOverlay(true);
      }).catch(err => console.error("ELA Gen Failed:", err));
    }
  }, [globalFile, isScanning]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Document Viewer</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
           {elaOverlay && (
             <button onClick={() => setShowOverlay(!showOverlay)} style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', background: showOverlay ? 'rgba(239, 68, 68, 0.2)' : 'transparent', color: showOverlay ? '#ef4444' : 'var(--text-muted)', border: `1px solid ${showOverlay ? '#ef4444' : 'var(--border-glass)'}`, borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>
               <Layers size={14} /> Toggle ELA Heatmap
             </button>
           )}
           {isScanning && <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '6px' }}><Activity size={14} className="animate-spin" /> Neural Pass Ongoing...</div>}
        </div>
      </div>
      
      <div className="scanner-container" style={{ flex: 1, minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {imageUrl ? (
           <div style={{ position: 'relative', width: '100%', height: '100%', alignContent: 'center', padding: '1rem', boxSizing: 'border-box' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto', background: '#fff', borderRadius: '4px', aspectRatio: '1 / 1.414', boxShadow: '0 0 20px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
              <img src={imageUrl} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="Document" />
              
              {/* Dynamic Error Level Analysis Overlay calculated natively in canvas! */}
              {showOverlay && elaOverlay && (
                <img src={elaOverlay} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'screen', opacity: 0.8 }} alt="Heatmap Offset" />
              )}
              
              {isScanning && <div className="scan-line"></div>}
              
              {!isScanning && regions && regions.map((region, idx) => (
                <div 
                  key={idx}
                  className="heatmap-zone"
                  style={{ top: region.top, left: region.left, width: region.width, height: region.height, display: showOverlay ? 'none' : 'block' }}
                  onMouseEnter={() => setHoveredTooltip(region.tooltip)}
                  onMouseLeave={() => setHoveredTooltip(null)}
                >
                  {hoveredTooltip === region.tooltip && (
                    <div style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.9)', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', whiteSpace: 'nowrap', zIndex: 20, border: '1px solid var(--accent-cyan)' }}>
                      {region.tooltip}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ color: 'var(--text-muted)' }}>No document loaded</div>
        )}
      </div>
      
    </div>
  );
};

export default ScannerView;
