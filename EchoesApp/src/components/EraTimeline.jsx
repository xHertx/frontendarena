import React from 'react';
import ReceiptCard from './ReceiptCard';

const EraTimeline = ({ era }) => {
  return (
    <div className="era-section">
      <div className="era-header fade-in">
        <div className="era-year">{era.year}</div>
        <h2 className="era-title">{era.title}</h2>
        <p className="era-desc">{era.description}</p>
      </div>

      <div className="receipts-grid">
        {era.receipts.map((receipt, index) => (
          <div key={receipt.id} className="receipt-card-wrapper" style={{ animationDelay: `${index * 0.15}s` }}>
            <ReceiptCard receipt={receipt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EraTimeline;
