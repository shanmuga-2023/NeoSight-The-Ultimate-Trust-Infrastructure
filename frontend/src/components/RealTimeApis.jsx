import React from 'react';

const RealTimeApis = () => {
  return (
    <div style={{ padding: '2rem', animation: 'fadeIn 0.5s ease-out', display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%' }}>
      <div className="panel-header">
        <h2>Developer API Management</h2>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Status</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#10b981', marginTop: '0.5rem' }}>All Systems Operational</p>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total Requests (24h)</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--accent-cyan)', marginTop: '0.5rem' }}>14,293</p>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Avg Latency</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#8b5cf6', marginTop: '0.5rem' }}>42ms</p>
        </div>
      </div>

      <div className="Officer-Layout">
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--accent-cyan)' }}>Active API Keys</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 600 }}>Production Service Key</p>
                <p style={{ fontFamily: 'monospace', color: 'var(--text-muted)', marginTop: '0.5rem' }}>sk_live_v2_9f8a...e341</p>
              </div>
              <button style={{ padding: '6px 12px', background: 'transparent', border: '1px solid var(--accent-blue)', color: 'var(--accent-blue)', borderRadius: '4px', cursor: 'pointer' }}>Revoke</button>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 600 }}>Test / Staging Key</p>
                <p style={{ fontFamily: 'monospace', color: 'var(--text-muted)', marginTop: '0.5rem' }}>sk_test_v2_1a2b...c987</p>
              </div>
              <button style={{ padding: '6px 12px', background: 'transparent', border: '1px solid var(--accent-blue)', color: 'var(--accent-blue)', borderRadius: '4px', cursor: 'pointer' }}>Revoke</button>
            </div>
            <button style={{ alignSelf: 'flex-start', padding: '10px 20px', background: 'var(--accent-blue)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '1rem' }}>+ Generate New Key</button>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--accent-purple)' }}>Live Traffic Feed</h3>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'flex-end', padding: '1rem', gap: '4px', height: '250px' }}>
             {/* Mock chart bars */}
             {[40, 60, 30, 80, 50, 90, 70, 45, 65, 85, 30, 55, 75, 40, 60, 80, 95, 50, 30, 60].map((h, i) => (
                <div key={i} style={{ flex: 1, background: `linear-gradient(to top, var(--accent-cyan), var(--accent-blue))`, height: `${h}%`, borderRadius: '2px 2px 0 0', opacity: i > 15 ? 1 : 0.4 }}></div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeApis;
