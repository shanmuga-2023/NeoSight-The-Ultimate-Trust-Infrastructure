import React, { useState } from 'react';
import { Bot, Send } from 'lucide-react';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'I am the Explainability Engine. Ask me anything about this document.' }
  ]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('simple');

  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    const newMsg = { sender: 'user', text: userMessage };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Setup payload context - mocking ELA results context for demo
      const payload = {
        message: userMessage,
        context: {
          ela_anomalies: [
            {"region": "TOTAL block", "severity": "High", "description": "Compression inconsistency, typical of JPEG resave."}
          ],
          typography_anomalies: [
            {"type": "Kerning", "severity": "High", "description": "Font mismatch. Helvetica Neue detected instead of document standard Helvetica."}
          ],
          mode: mode
        }
      };

      const res = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("API Connection Failed");

      const data = await res.json();
      setMessages(prev => [...prev, { sender: 'ai', text: data.response }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { sender: 'ai', text: "Error communicating with forensic engine. Please check backend connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ height: '350px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bot size={20} color="var(--accent-cyan)" />
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Forensic Assistant</h3>
        </div>
        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', borderRadius: '20px', padding: '2px' }}>
          <button 
            style={{ border: 'none', background: mode === 'simple' ? 'var(--accent-cyan)' : 'transparent', color: mode === 'simple' ? '#000' : 'var(--text-muted)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: mode === 'simple' ? 600 : 400 }}
            onClick={() => setMode('simple')}
          >
            Simple
          </button>
          <button 
            style={{ border: 'none', background: mode === 'technical' ? 'var(--accent-purple)' : 'transparent', color: mode === 'technical' ? '#fff' : 'var(--text-muted)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: mode === 'technical' ? 600 : 400 }}
            onClick={() => setMode('technical')}
          >
            Technical
          </button>
        </div>
      </div>
      
      <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ 
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            background: msg.sender === 'user' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${msg.sender === 'user' ? 'rgba(59, 130, 246, 0.4)' : 'var(--border-glass)'}`,
            padding: '8px 12px', borderRadius: '8px', maxWidth: '85%', fontSize: '0.9rem', lineHeight: '1.4', whiteSpace: 'pre-wrap'
          }}>
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div style={{ alignSelf: 'flex-start', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-glass)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.9rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Bot size={14} className="animate-spin" /> Engine analyzing...</span>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1px solid var(--border-glass)' }}>
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask: 'Why is this fake?'" 
          style={{ flex: 1, padding: '12px', background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none' }}
        />
        <button type="submit" style={{ padding: '12px', background: 'transparent', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer' }}>
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatAssistant;
