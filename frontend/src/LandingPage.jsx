import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ShieldCheck, Cpu, Search, Lock, Database, ArrowRight, ScanFace, Globe, BrainCircuit } from 'lucide-react';

const AnimatedBentoCard = ({ icon, title, desc, delay }) => {
  const [style, setStyle] = useState({ transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)' });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    const rotateX = (y - 0.5) * -20; // Max 10 deg rotation
    const rotateY = (x - 0.5) * 20;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'none' // Remove transition for instant snapping while moving
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
    });
  };

  return (
    <div 
      className="premium-bento-card" 
      style={{ ...style, animation: `fadeInUp 0.8s ease-out ${delay}s both` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="icon-wrapper" style={{ marginBottom: '1.5rem', color: 'var(--accent-cyan)' }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 600 }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>{desc}</p>
    </div>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {/* Noise Texture Overlay */}
      <div className="noise-overlay"></div>

      {/* Top Navbar */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '1.5rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, background: 'rgba(10, 10, 10, 0.6)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ShieldCheck size={28} color="var(--accent-cyan)" />
          <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>NeoSight</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#architecture" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='var(--text-muted)'}>Architecture</a>
          <a href="#features" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='var(--text-muted)'}>Innovations</a>
          <button onClick={() => navigate('/demo')} style={{ padding: '8px 20px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '99px', cursor: 'pointer', fontWeight: 600, transition: 'background 0.2s' }} onMouseOver={e=>e.target.style.background='rgba(255,255,255,0.2)'} onMouseOut={e=>e.target.style.background='rgba(255,255,255,0.1)'}>Live Demo</button>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '10rem 2rem 5rem', position: 'relative', zIndex: 1 }}>
        
        {/* Hero Section */}
        <header style={{ textAlign: 'center', marginBottom: '8rem', position: 'relative' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(0, 240, 255, 0.1)', border: '1px solid rgba(0, 240, 255, 0.2)', borderRadius: '999px', color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '2rem', animation: 'fadeInUp 0.8s ease-out' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Activity size={14} /> Hackathon Prototype v2.0 Live</span>
          </div>
          
          <h1 style={{ fontSize: '5rem', fontWeight: 800, lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-2px', animation: 'fadeInUp 0.8s ease-out 0.1s both' }}>
            The Ultimate <br/>
            <span className="gradient-text">Trust Infrastructure.</span>
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: '1.6', animation: 'fadeInUp 0.8s ease-out 0.2s both' }}>
            Detects forged documents, explains AI decisions in human language, and secures sovereign verification using a scalable Tri-Factor Forensic Engine.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', animation: 'fadeInUp 0.8s ease-out 0.3s both' }}>
            <button className="cta-button" onClick={() => navigate('/demo')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>Launch Dashboard <ArrowRight size={20} /></span>
            </button>
          </div>
        </header>

        {/* Architecture Pipeline Section */}
        <section id="architecture" style={{ marginBottom: '8rem', animation: 'fadeInUp 0.8s ease-out 0.4s both' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
             <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>How it Works</h2>
             <p style={{ color: 'var(--text-muted)' }}>A seamless flow from ingestion to courtroom-ready evidence.</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '3rem', background: 'rgba(16, 24, 39, 0.4)', border: '1px solid var(--border-glass)', borderRadius: '24px', backdropFilter: 'blur(20px)', position: 'relative' }}>
             
             {/* Connecting Line */}
             <div style={{ position: 'absolute', top: '50%', left: '10%', right: '10%', height: '2px', background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple), var(--accent-blue))', opacity: 0.3, zIndex: 0 }}></div>

             <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: 'var(--bg-glass)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-glass)', width: '22%' }}>
               <Cpu size={32} color="var(--accent-cyan)" />
               <h4 style={{ fontWeight: 600 }}>1. Ingestion Engine</h4>
               <p style={{ fontSize: '0.85rem', textAlign: 'center', color: 'var(--text-muted)' }}>Multi-lingual OCR extracts complex structural data.</p>
             </div>

             <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: 'var(--bg-glass)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-glass)', width: '22%', boxShadow: '0 0 40px rgba(139, 92, 246, 0.2)' }}>
               <Search size={32} color="var(--accent-purple)" />
               <h4 style={{ fontWeight: 600 }}>2. Tri-Factor Pass</h4>
               <p style={{ fontSize: '0.85rem', textAlign: 'center', color: 'var(--text-muted)' }}>Visual anomalies & Font mismatch analytics.</p>
             </div>

             <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: 'var(--bg-glass)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-glass)', width: '22%' }}>
               <Database size={32} color="var(--accent-blue)" />
               <h4 style={{ fontWeight: 600 }}>3. Sovereign Registry</h4>
               <p style={{ fontSize: '0.85rem', textAlign: 'center', color: 'var(--text-muted)' }}>Hash checks against immutable blockchain targets.</p>
             </div>

             <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: 'var(--bg-glass)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-glass)', width: '22%' }}>
               <Lock size={32} color="#10b981" />
               <h4 style={{ fontWeight: 600 }}>4. Trusted Output</h4>
               <p style={{ fontSize: '0.85rem', textAlign: 'center', color: 'var(--text-muted)' }}>Courtroom-ready PDF & Explainer AI output.</p>
             </div>
          </div>
        </section>

        {/* Core Innovations Bento Grid */}
        <section id="features">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
             <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Core Innovations</h2>
             <p style={{ color: 'var(--text-muted)' }}>Nine massive breakthroughs packed into one platform.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            
            <AnimatedBentoCard delay={0.1} icon={<BrainCircuit size={40} />} title="Multi-Modal Explainability" desc="Grad-CAM heatmaps combined with Natural Language logic explaining exactly why a document failed, rather than returning a black-box score." />
            <AnimatedBentoCard delay={0.2} icon={<Search size={40} />} title="Tri-Factor Forensics" desc="Cross-referencing Error Level Analysis (ELA), Typography/Kerning anomalies, and missing Metadata signatures to guarantee ground truth." />
            <AnimatedBentoCard delay={0.3} icon={<Globe size={40} />} title="Cross-Verification Target" desc="Checks submitted documents against identical templates in memory to spot pixel-perfect layout shifts." />
            
            <AnimatedBentoCard delay={0.4} icon={<Activity size={40} />} title="Real-Time Verification API" desc="A scalable, low-latency API designed for high-traffic environments like recruitment boards, border control, or banking apps." />
            <AnimatedBentoCard delay={0.5} icon={<Database size={40} />} title="Sovereign Registry" desc="Digital Hash Fingerprinting maps documents to a Blockchain ledger. If a single pixel is altered, the trust chain breaks instantly." />
            <AnimatedBentoCard delay={0.6} icon={<ShieldCheck size={40} />} title="FPI Sublayer" desc="Forged Profile Intelligence aggregates fraud patterns across sectors to flag serial manipulation rings automatically." />
            
            <AnimatedBentoCard delay={0.7} icon={<ScanFace size={40} />} title="Deepfake Liveness Check" desc="Synthesizes skin reflectance logic and optical flow calculations to detect morphing layers in synthetic KYC verification." />
            <AnimatedBentoCard delay={0.8} icon={<Lock size={40} />} title="Court-Ready Proof" desc="One-click generation of comprehensive, fully audited forensic PDFs formatted standardly for legal proceedings and law enforcement." />
            <AnimatedBentoCard delay={0.9} icon={<Cpu size={40} />} title="Hyper-Local OCR Edge" desc="Utilizes super-resolution analytics to correctly extract and format text regardless of damage—fully trained on global regional scripts." />
            
          </div>
        </section>



        {/* Footer */}
        <footer style={{ marginTop: '8rem', padding: '4rem 0', borderTop: '1px solid var(--border-glass)', textAlign: 'center', color: 'var(--text-muted)' }}>
          <ShieldCheck size={32} color="var(--accent-cyan)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <p style={{ fontWeight: 600 }}>NeoSight Prototype © 2026</p>
          <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Forged in code, built for truth. Ready for judging.</p>
        </footer>
      </div>
      
      {/* Global Animation Styles for Landing */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
