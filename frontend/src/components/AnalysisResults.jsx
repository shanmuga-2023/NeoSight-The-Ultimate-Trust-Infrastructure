import { Activity, AlertTriangle, CheckCircle, FileText, RefreshCw } from 'lucide-react';
import React from 'react';

const AnalysisResults = ({ hasFile, isScanning, results, onReset }) => {
  
  if (!hasFile) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        <Activity size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
        <p>Awaiting document upload...</p>
      </div>
    );
  }

  if (isScanning) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '1rem' }}>
        <h2 className="panel-header">Processing Engine</h2>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '50%', 
            border: '3px solid var(--border-glass)', 
            borderTopColor: 'var(--accent-cyan)', 
            animation: 'spin 1s linear infinite' 
          }} />
          <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          
          <h3 style={{ marginTop: '2rem', fontSize: '1.25rem', color: 'var(--accent-cyan)' }}>Running Analysis</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'center' }}>
            Extracting text tokens... <br/>
            Validating physical properties... <br/>
            Running anti-forgery heuristics...
          </p>
        </div>
      </div>
    );
  }

  if (!results) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', animation: 'fadeIn 0.5s ease-out' }}>
      <div className="panel-header" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle color="var(--accent-cyan)" />
          <span>Analysis Results</span>
        </div>
        <button 
          onClick={onReset}
          style={{ 
            background: 'transparent', border: '1px solid var(--border-glass)', 
            color: 'var(--text-main)', padding: '6px 12px', borderRadius: '6px',
            display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer'
          }}
        >
          <RefreshCw size={14} /> New Scan
        </button>
      </div>

      <div className="result-item">
        <div className="result-label">
          <span>OCR Confidence Score</span>
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>{results.confidence}%</span>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${results.confidence}%` }}></div>
        </div>
      </div>

      <div className="result-item">
        <div className="result-label">
          <span>Anomaly / Forgery Probability</span>
          <span style={{ color: results.forgeryProbability > 30 ? '#ef4444' : '#f59e0b', fontWeight: 'bold' }}>
            {results.forgeryProbability}%
          </span>
        </div>
        <div className="progress-bar-bg">
          <div 
            className={`progress-bar-fill ${results.forgeryProbability > 30 ? 'warning' : ''}`} 
            style={{ width: `${results.forgeryProbability}%` }}
          ></div>
        </div>
      </div>

      {results.forgeryProbability > 30 && (
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', 
          padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '1.5rem' 
        }}>
          <AlertTriangle color="#ef4444" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: '0.875rem', color: '#fca5a5' }}>
            Warning: The system detected inconsistencies in the font kerning and background noise patterns. This document may be tampered.
          </p>
        </div>
      )}

      <div className="result-item" style={{ flex: 1 }}>
        <div className="result-label">
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FileText size={16} /> Extracted Text</span>
        </div>
        <div className="extracted-text">
          {results.extractedText}
        </div>
      </div>
      
    </div>
  );
};

export default AnalysisResults;
