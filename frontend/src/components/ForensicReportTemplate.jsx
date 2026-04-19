import React from 'react';
import { ShieldCheck, CalendarClock, Fingerprint, MapPin, Database } from 'lucide-react';

// This component acts as an official A4 document designed purely for PDF Export.
// It uses strict white backgrounds and black/dark-serif typography standard for court templates.
export const ForensicReportTemplate = React.forwardRef(({ globalFile, date }, ref) => {
  return (
    <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
      {/* 210mm x 297mm exactly (A4 Size at 96 DPI approximations) */}
      <div 
        ref={ref}
        style={{ 
          width: '794px', 
          minHeight: '1123px', 
          background: '#FFFFFF', 
          color: '#000000', 
          padding: '40px 50px',
          fontFamily: "'Times New Roman', Times, serif"
        }}
      >
        
        {/* Official Header */}
        <div style={{ borderBottom: '3px solid #000', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={36} color="#000" />
              <div>
                <h1 style={{ margin: 0, fontSize: '24px', letterSpacing: '1px', textTransform: 'uppercase' }}>NeoSight Digital Forensics</h1>
                <p style={{ margin: 0, fontSize: '12px', fontStyle: 'italic', fontWeight: 'bold' }}>Department of Digital Evidence | Sovereignty Validated</p>
              </div>
           </div>
           
           <div style={{ textAlign: 'right', fontSize: '11px', lineHeight: '1.4' }}>
              <strong>CASE REF:</strong> FX-8922A-44 <br/>
              <strong>GENERATED:</strong> {date || new Date().toLocaleString()} <br/>
              <strong>OPERATOR:</strong> HACKATHON_DEMO_01
           </div>
        </div>

        <h2 style={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginTop: '30px' }}>
          Final Forensic Conclusion: <span style={{ color: '#D32F2F' }}>FORGED DOCUMENT DETECTED</span>
        </h2>

        {/* Core Evidence Image */}
        <div style={{ margin: '20px 0', border: '1px solid #ccc', padding: '10px', background: '#fafafa', display: 'flex', justifyContent: 'center' }}>
          {globalFile ? (
            <img 
               src={URL.createObjectURL(globalFile)} 
               alt="Scanned Evidence" 
               style={{ maxHeight: '350px', maxWidth: '100%', objectFit: 'contain' }}
               crossOrigin="anonymous" 
            />
          ) : (
            <div style={{ padding: '50px', color: '#666' }}>[NO EViDENCE LOADED]</div>
          )}
        </div>

        {/* Data Architecture Table */}
        <div style={{ width: '100%', marginTop: '30px' }}>
           <h3 style={{ textTransform: 'uppercase', fontSize: '14px', marginBottom: '10px', borderBottom: '1px dashed #000' }}>Tri-Factor Analytics Breakdown</h3>
           <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', fontFamily: 'Arial, sans-serif' }}>
             <thead>
               <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #000' }}>
                 <th style={{ padding: '8px', textAlign: 'left' }}>Sub-Routine Module</th>
                 <th style={{ padding: '8px', textAlign: 'left' }}>Findings</th>
                 <th style={{ padding: '8px', textAlign: 'center' }}>Tamper Probability</th>
               </tr>
             </thead>
             <tbody>
               <tr style={{ borderBottom: '1px solid #ddd' }}>
                 <td style={{ padding: '8px', fontWeight: 'bold' }}><Fingerprint size={12}/> Error Level Analysis (ELA)</td>
                 <td style={{ padding: '8px' }}>High-frequency JPEG compression artifacts detected in localized region (Right Quadrant).</td>
                 <td style={{ padding: '8px', textAlign: 'center', color: '#D32F2F', fontWeight: 'bold' }}>94%</td>
               </tr>
               <tr style={{ borderBottom: '1px solid #ddd' }}>
                 <td style={{ padding: '8px', fontWeight: 'bold' }}>Typography & Kerning</td>
                 <td style={{ padding: '8px' }}>Detected 'Helvetica Neue'. Target baseline template utilizes 'Helvetica'. Kerning offset by +2px.</td>
                 <td style={{ padding: '8px', textAlign: 'center', color: '#D32F2F', fontWeight: 'bold' }}>88%</td>
               </tr>
               <tr style={{ borderBottom: '1px solid #ddd' }}>
                 <td style={{ padding: '8px', fontWeight: 'bold' }}><Database size={12}/> Sovereign Blockchain Hash</td>
                 <td style={{ padding: '8px' }}>SHA-256 fingerprint failed to map to recognized ledger templates. Orphaned hash generated.</td>
                 <td style={{ padding: '8px', textAlign: 'center', color: '#D32F2F', fontWeight: 'bold' }}>100%</td>
               </tr>
             </tbody>
           </table>
        </div>

        {/* AI Forensic Reasoning */}
        <div style={{ marginTop: '30px', padding: '15px', border: '2px solid #000', background: '#fcfcfc', fontFamily: 'Arial, sans-serif' }}>
          <h3 style={{ textTransform: 'uppercase', fontSize: '14px', marginTop: 0 }}>Automated Network Summary:</h3>
          <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.6' }}>
             The analyzed document exhibits highly suspicious manipulation masking the original structural framework. Pixel-level manipulation was confirmed via Error Level Analysis (ELA) indicating manual repainting or overlaying. The hash consensus network unequivocally rejected the digital fingerprint, declaring the file cryptographically orphaned. 
             <br/><br/><strong>Verdict: Formally reject requested entity processing.</strong>
          </p>
        </div>

        {/* Footer Audit Traces */}
        <div style={{ marginTop: '40px', fontSize: '9px', color: '#666', borderTop: '1px dashed #ccc', paddingTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
           <div>
              <p style={{ margin: '2px 0' }}><strong>Blockchain Hash Node:</strong> 0x7f83b2...a94c92ef001</p>
              <p style={{ margin: '2px 0' }}><strong>Processing Server Location:</strong> Local-Node-001</p>
           </div>
           <div style={{ textAlign: 'right' }}>
              <strong style={{ fontSize: '12px', color: '#000' }}>[ DIGITAL SEAL: VERIFIED ]</strong>
           </div>
        </div>

      </div>
    </div>
  );
});
