import React from 'react';
import { AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

const DecisionPanel = ({ results }) => {
  if (!results) return null;

  const isHighRisk = results.forgeryProbability > 50;
  const isMediumRisk = results.forgeryProbability > 20 && results.forgeryProbability <= 50;
  
  let riskColor = '#10b981'; // Green
  let RiskIcon = CheckCircle2;
  let riskText = 'VERIFIED AUTHENTIC';
  
  if (isHighRisk) {
    riskColor = '#ef4444'; // Red
    RiskIcon = ShieldAlert;
    riskText = 'HIGH RISK FORGERY';
  } else if (isMediumRisk) {
    riskColor = '#f59e0b'; // Yellow
    RiskIcon = AlertCircle;
    riskText = 'MODERATE SUSPICION';
  }

  // Example breakdowns - we map these to pass/fail
  const elaImpact = isHighRisk ? 40 : 5;
  const metaImpact = isHighRisk ? 35 : 5;
  const typoImpact = isHighRisk ? 25 : 2;

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
      
      {/* Prime Result */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', borderRight: '1px solid var(--border-glass)', paddingRight: '2rem', minWidth: '180px' }}>
        <div style={{ 
          width: '64px', height: '64px', borderRadius: '50%', background: `rgba(${isHighRisk ? '239, 68, 68' : isMediumRisk ? '245, 158, 11' : '16, 185, 129'}, 0.1)`, 
          display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${riskColor}` 
        }}>
          <RiskIcon size={32} color={riskColor} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: riskColor, letterSpacing: '0.5px' }}>{riskText}</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Confidence Score: <strong style={{color: '#fff'}}>{results.confidence}%</strong></span>
        </div>
      </div>
      
      {/* Breakdown Metrics */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Tamper Factor Breakdown</h4>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
           <span style={{ minWidth: '160px', fontSize: '0.85rem' }}>Error Level Analysis (ELA)</span>
           <div className="progress-bar-bg" style={{ flex: 1 }}>
             <div className="progress-bar-fill warning" style={{ width: `${elaImpact}%` }}></div>
           </div>
           <span style={{ fontWeight: 600, fontSize: '0.9rem', minWidth: '40px', textAlign: 'right' }}>{elaImpact}%</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
           <span style={{ minWidth: '160px', fontSize: '0.85rem' }}>Metadata Irregularity</span>
           <div className="progress-bar-bg" style={{ flex: 1 }}>
             <div className="progress-bar-fill warning" style={{ width: `${metaImpact}%` }}></div>
           </div>
           <span style={{ fontWeight: 600, fontSize: '0.9rem', minWidth: '40px', textAlign: 'right' }}>{metaImpact}%</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
           <span style={{ minWidth: '160px', fontSize: '0.85rem' }}>Typography & Kerning Anomalies</span>
           <div className="progress-bar-bg" style={{ flex: 1 }}>
             <div className="progress-bar-fill warning" style={{ width: `${typoImpact}%` }}></div>
           </div>
           <span style={{ fontWeight: 600, fontSize: '0.9rem', minWidth: '40px', textAlign: 'right' }}>{typoImpact}%</span>
        </div>
      </div>

    </div>
  );
};

export default DecisionPanel;
