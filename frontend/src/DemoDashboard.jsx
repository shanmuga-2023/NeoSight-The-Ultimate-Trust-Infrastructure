import React, { useState, useRef } from 'react';
import { LayoutDashboard, CheckCircle2, ChevronRight, XCircle, FileDown } from 'lucide-react';
import OcrEngine from './components/OcrEngine';
import DeepfakeLiveness from './components/DeepfakeLiveness';
import DocumentAnalysis from './components/DocumentAnalysis';
import BlockchainRegistry from './components/BlockchainRegistry';
import FPISublayer from './components/FPISublayer';
import ChatAssistant from './components/ChatAssistant';
import { ForensicReportTemplate } from './components/ForensicReportTemplate';
import { generateForensicPDF } from './utils/pdfGenerator';
import { useNavigate } from 'react-router-dom';

export default function DemoDashboard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [file, setFile] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const reportRef = useRef();
  const navigate = useNavigate();

  const steps = [
    { id: 1, label: 'Ingestion' },
    { id: 2, label: 'Liveness Check' },
    { id: 3, label: 'Tri-Factor' },
    { id: 4, label: 'Blockchain' },
    { id: 5, label: 'FPI Intel' },
    { id: 6, label: 'Court Evidence' },
  ];

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };
  
  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
             <OcrEngine globalFile={file} setGlobalFile={setFile} autoStart={!!file} />
          </div>
        );
      case 2:
        return (
          <div className="animate-fade-in" style={{ height: '100%' }}>
             <DeepfakeLiveness onComplete={handleNext} />
          </div>
        );
      case 3:
        return (
          <div className="animate-fade-in" style={{ height: '100%' }}>
            {!file ? (
              <div style={{ textAlign: 'center', marginTop: '10rem', color: 'var(--text-muted)' }}>
                Please upload a document in Step 1 first.
              </div>
            ) : (
              <DocumentAnalysis globalFile={file} autoStart={true} />
            )}
          </div>
        );
      case 4:
        return (
          <div className="animate-fade-in" style={{ height: '100%' }}>
            {!file ? (
              <div style={{ textAlign: 'center', marginTop: '10rem', color: 'var(--text-muted)' }}>
                Please complete Step 1 first.
              </div>
            ) : (
              <BlockchainRegistry isVerificationMode={true} globalFile={file} />
            )}
          </div>
        );
      case 5:
        return (
          <div className="animate-fade-in" style={{ height: '100%' }}>
             <FPISublayer globalFile={file} />
          </div>
        );
      case 6:
        return (
           <div className="animate-fade-in" style={{ height: '100%', padding: '2rem' }}>
             <div className="panel-header"><h2>Final Conclusion & Proof</h2></div>
             <div className="Officer-Layout">
                <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <XCircle size={64} color="#ef4444" style={{ marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ef4444' }}>DOCUMENT FORGED</h2>
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>Analysis complete. Anomalies flag highly probable manipulation masking the original invoice amounts. Hash failed consensus network.</p>
                    <button 
                      onClick={async () => {
                        setIsGeneratingPDF(true);
                        await generateForensicPDF(reportRef);
                        setIsGeneratingPDF(false);
                      }}
                      disabled={isGeneratingPDF}
                      style={{ padding: '12px 24px', background: 'var(--accent-purple)', color: '#fff', border: 'none', borderRadius: '6px', cursor: isGeneratingPDF ? 'wait' : 'pointer', fontWeight: 600, transition: 'transform 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
                      onMouseOver={e => !isGeneratingPDF && (e.target.style.transform = 'scale(1.05)')}
                      onMouseOut={e => e.target.style.transform = 'scale(1)'}
                    >
                      {isGeneratingPDF ? 'Compiling Official Document...' : <><FileDown size={18} /> Export Court-Ready PDF</>}
                    </button>
                </div>
                <div>
                   <ChatAssistant />
                </div>
             </div>
             
             {/* Hidden Formal React component strictly for PDF conversion */}
             <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', opacity: 0, zIndex: -100 }}>
                <ForensicReportTemplate ref={reportRef} globalFile={file} date={new Date().toLocaleString()} />
             </div>
           </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', background: 'var(--bg-dark)' }}>
      {/* Top Header */}
      <header style={{ padding: '1.5rem 2rem', background: 'rgba(16, 24, 39, 0.9)', borderBottom: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <LayoutDashboard className="title-icon" size={24} color="var(--accent-cyan)" />
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>NeoSight <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>Trust Pipeline</span></h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {currentStep > 1 && (
            <button onClick={handleBack} style={{ padding: '8px 16px', background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border-glass)', borderRadius: '6px', cursor: 'pointer' }}>
              Previous Step
            </button>
          )}
          <button 
             onClick={handleNext}
             disabled={currentStep === 6 || (!file && currentStep === 1)}
             style={{ 
               padding: '8px 24px', background: (!file && currentStep === 1) || currentStep === 6 ? 'rgba(255,255,255,0.1)' : 'var(--accent-cyan)', 
               color: (!file && currentStep === 1) || currentStep === 6 ? 'var(--text-muted)' : '#000', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' 
             }}>
            Proceed to Step {currentStep < 6 ? currentStep + 1 : 6} <ChevronRight size={16} />
          </button>
        </div>
      </header>

      {/* Stepper Progress Bar */}
      <div style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', width: '90%', maxWidth: '1000px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '15px', left: 0, width: '100%', height: '2px', background: 'var(--border-glass)', zIndex: 0 }}></div>
          <div style={{ position: 'absolute', top: '15px', left: 0, width: `${((currentStep - 1) / 5) * 100}%`, height: '2px', background: 'var(--accent-cyan)', zIndex: 1, transition: 'width 0.4s ease' }}></div>
          
          {steps.map(step => (
            <div key={step.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
              <div style={{ 
                width: '32px', height: '32px', borderRadius: '50%', 
                background: currentStep >= step.id ? 'var(--accent-cyan)' : 'var(--bg-dark)', 
                border: `2px solid ${currentStep >= step.id ? 'var(--accent-cyan)' : 'var(--border-glass)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem',
                color: currentStep >= step.id ? '#000' : 'var(--text-muted)', transition: 'all 0.3s ease'
              }}>
                {currentStep > step.id ? <CheckCircle2 size={18} /> : <span>{step.id}</span>}
              </div>
              <span style={{ fontSize: '0.8rem', color: currentStep >= step.id ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: currentStep >= step.id ? 600 : 400, whiteSpace: 'nowrap' }}>{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Execution Area */}
      <main style={{ flex: 1, padding: '0 2rem 2rem 2rem', overflowY: 'auto' }}>
        <div style={{ height: '100%', border: '1px solid var(--border-glass)', borderRadius: '16px', background: 'rgba(16, 24, 39, 0.4)', overflow: 'hidden' }}>
          {renderStepContent()}
        </div>
      </main>
    </div>
  );
}
