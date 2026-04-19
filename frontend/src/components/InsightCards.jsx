import React, { useState } from 'react';
import { Type, Image as ImageIcon, FileCode2 } from 'lucide-react';

const InsightCards = ({ results }) => {
  const [activeTab, setActiveTab] = useState('visual'); // visual, typo, meta

  if (!results) return null;

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-glass)', background: 'rgba(0,0,0,0.2)' }}>
        <button 
          className={`tab-btn ${activeTab === 'visual' ? 'active' : ''}`}
          onClick={() => setActiveTab('visual')}
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <ImageIcon size={16} /> Visual
        </button>
        <button 
          className={`tab-btn ${activeTab === 'typo' ? 'active' : ''}`}
          onClick={() => setActiveTab('typo')}
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <Type size={16} /> Typography
        </button>
        <button 
          className={`tab-btn ${activeTab === 'meta' ? 'active' : ''}`}
          onClick={() => setActiveTab('meta')}
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <FileCode2 size={16} /> Metadata
        </button>
      </div>

      <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
        {activeTab === 'visual' && (
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>Error Level Analysis (ELA)</h3>
            <div className="result-item">
              <div className="result-label"><span>Compression Inconsistency</span><span style={{ color: '#ef4444' }}>High</span></div>
              <div className="progress-bar-bg"><div className="progress-bar-fill warning" style={{ width: '85%' }}></div></div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>JPEG resave artifacts detected in the 'TOTAL' block. Pixels here have significantly different compression rates than the background.</p>
            </div>
            <div className="result-item">
              <div className="result-label"><span>Copy-Move Detection</span><span style={{ color: '#10b981' }}>Low</span></div>
              <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: '15%' }}></div></div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>No duplicated texture blocks found globally.</p>
            </div>
          </div>
        )}

        {activeTab === 'typo' && (
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--accent-purple)' }}>OCR & Font Analysis</h3>
            <div className="result-item">
              <div className="result-label"><span>Font Match (Helvetica)</span><span style={{ color: '#f59e0b' }}>Partial (62%)</span></div>
              <div className="progress-bar-bg"><div className="progress-bar-fill warning" style={{ width: '62%' }}></div></div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Text 'TOTAL' uses a slight variant (Helvetica Neue) instead of the document's base Helvetica standard.</p>
            </div>
            <div className="result-item">
              <div className="result-label"><span>Kerning Irregularities</span><span style={{ color: '#ef4444' }}>Detected</span></div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Spacing between the digits '4', '5', '0', '0' falls out of standard algorithmic bounds, highly indicative of manual text placement.</p>
            </div>
          </div>
        )}

        {activeTab === 'meta' && (
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#db2777' }}>Structural Integrity</h3>
            <div className="result-item">
              <div className="result-label"><span>Software Signature</span><span style={{ color: '#ef4444' }}>Adobe Photoshop</span></div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>XMP Data shows the file was exported using Adobe Photoshop CS6, bypassing official generator pipelines.</p>
            </div>
            <div className="result-item">
              <div className="result-label"><span>Template Deviation</span><span style={{ color: '#f59e0b' }}>Moderate</span></div>
              <div className="progress-bar-bg"><div className="progress-bar-fill warning" style={{ width: '45%' }}></div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightCards;
