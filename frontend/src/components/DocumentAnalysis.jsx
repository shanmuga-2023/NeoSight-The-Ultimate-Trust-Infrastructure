import React, { useState, useEffect } from 'react';
import ScannerView from './ScannerView';
import DecisionPanel from './DecisionPanel';
import InsightCards from './InsightCards';
import ChatAssistant from './ChatAssistant';

export default function DocumentAnalysis({ globalFile }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (globalFile) {
      const runAnalysis = async () => {
        setAnalyzing(true);
        try {
          const formData = new FormData();
          formData.append('document', globalFile);

          const response = await fetch('http://localhost:5001/api/analyze', {
            method: 'POST',
            body: formData
          });

          if (!response.ok) throw new Error(`API error: ${response.status}`);

          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error("Backend Error:", error);
          setResults({
            confidence: 91,
            forgeryProbability: 85, 
            regions: [
              { top: '40%', left: '20%', width: '30%', height: '8%', tooltip: 'API Setup Failed: Showing Mock Data' }
            ]
          });
        } finally {
          setAnalyzing(false);
        }
      };
      
      runAnalysis();
    }
  }, [globalFile]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%', padding: '2rem', animation: 'fadeIn 0.5s ease-out' }}>
      
      <div className="panel-header">
        <h2>Forensic Visual Analysis Engine</h2>
      </div>

      {results && <DecisionPanel results={results} />}

      <div className="Officer-Layout">
        <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <ScannerView 
            imageUrl={globalFile ? URL.createObjectURL(globalFile) : null} 
            globalFile={globalFile}
            isScanning={analyzing} 
            regions={results?.regions} 
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ flex: 1 }}>
            <InsightCards results={results} />
          </div>
        </div>
      </div>
    </div>
  );
}
