import React from 'react';

const ConnectionGraph = ({ connections }) => {
  if (!connections || connections.length === 0) return null;

  return (
    <div className="glass-panel" style={{ padding: '2rem', margin: '4rem auto', maxWidth: '800px', textAlign: 'center' }}>
      <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>Hidden Threads</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {connections.map((conn, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>{conn.source}</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)', position: 'relative' }}>
              <div style={{ 
                position: 'absolute', 
                top: '-10px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                fontSize: '0.8rem',
                color: 'var(--accent-color)',
                backgroundColor: 'var(--bg-color)',
                padding: '0 10px'
              }}>
                {conn.label}
              </div>
            </div>
            <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>{conn.target}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionGraph;
