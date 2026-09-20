import React from 'react';
import { Disc3, ShoppingBag, Navigation } from 'lucide-react';

const getIcon = (type, color) => {
  switch (type) {
    case 'music': return <Disc3 size={32} color={color} />;
    case 'purchase': return <ShoppingBag size={32} color={color} />;
    case 'event': return <Navigation size={32} color={color} />;
    default: return <Disc3 size={32} />;
  }
};

const getTypeLabel = (type) => {
  switch (type) {
    case 'music': return 'Audio Signal';
    case 'purchase': return 'Transaction Anomaly';
    case 'event': return 'Spatial Coordinate';
    default: return 'Memory Fragment';
  }
};

const ReceiptCard = ({ receipt, isActive }) => {
  
  if (receipt.isInsight) {
    return (
      <div className={`card-snap-wrapper ${isActive ? 'active' : ''}`} id={receipt.id}>
        <div className="insight-card" style={{ padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          <h2 style={{ fontFamily: 'Space Mono', fontSize: '1.2rem', color: 'var(--accent-teal)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2rem' }}>
            {receipt.title}
          </h2>
          <p style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: '4.5rem', lineHeight: '1.1', color: '#fff', maxWidth: '800px' }}>
            "{receipt.text}"
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`card-snap-wrapper ${isActive ? 'active' : ''}`} id={receipt.id}>
      <div 
        className="receipt-card glass-panel"
        style={{ '--accent-color': receipt.color }}
      >
        <div className="card-header">
          <div className="card-icon-wrapper">
            {getIcon(receipt.type, receipt.color)}
            <span style={{ color: receipt.color }}>{getTypeLabel(receipt.type)}</span>
          </div>
          <span style={{ opacity: 0.5 }}>{receipt.timestamp.split(' ')[0]}</span>
        </div>
        
        <div className="card-body">
          <h3 className="card-title">{receipt.title}</h3>
          <p className="card-subtitle">{receipt.subtitle}</p>
        </div>
        
        <div className="card-footer">
          <span style={{ color: 'var(--text-secondary)' }}>{receipt.metadata}</span>
          {receipt.amount && (
            <div className="card-amount">{receipt.amount}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceiptCard;
