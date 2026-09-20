import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import ReceiptCard from './components/ReceiptCard';
import { loadAndProcessData } from './utils/dataProcessor';

function App() {
  const [receipts, setReceipts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);
  
  const containerRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        const processedData = await loadAndProcessData();
        setReceipts(processedData);
        if (processedData.length > 0) {
          setActiveId(processedData[0].id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Intersection Observer to detect the center card
  useEffect(() => {
    if (!containerRef.current || !receipts) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is most intersecting (closest to center)
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.6 // Trigger when 60% of the card is visible
      }
    );

    // Observe all children cards
    const cards = containerRef.current.querySelectorAll('.card-snap-wrapper');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [receipts]);

  // Update global background color based on active card
  useEffect(() => {
    if (activeId && receipts) {
      const activeReceipt = receipts.find(r => r.id === activeId);
      if (activeReceipt) {
        // Set the CSS variable on the document body to morph the background color
        // The color comes from var(--accent-indigo) etc, which is #4db8ff. 
        // We will make a dark tinted version of it for the background.
        
        let bgColor = '#050505';
        if (activeReceipt.type === 'music') bgColor = '#0a1024';
        if (activeReceipt.type === 'purchase') bgColor = '#0a241e';
        if (activeReceipt.type === 'event') bgColor = '#240a10';
        
        document.body.style.setProperty('--bg-color', bgColor);
      }
    }
  }, [activeId, receipts]);

  if (loading || !receipts) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
        <div style={{ animation: 'pulse 2s infinite', fontFamily: 'Space Mono' }}>
          Loading Reel...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hud">
        <span>Echoes Reel</span>
        <span>Scroll Horizontally</span>
      </div>
      
      <div 
        className="horizontal-scroll-container" 
        ref={containerRef}
        onWheel={(e) => {
          if (containerRef.current) {
            // Because of scroll-snap, small deltaY values won't overcome the snap threshold
            // and the browser will snap back, making it feel "stuck".
            // So we amplify the scroll amount to ensure it snaps to the next card.
            // Using sign(deltaY) gives direction, multiplying by a large enough value overcomes the snap.
            const direction = Math.sign(e.deltaY);
            // 800px is usually enough to push it past the 50% threshold of the 60vw cards
            containerRef.current.scrollBy({ left: direction * 800, behavior: 'smooth' });
          }
        }}
      >
        {/* Leading spacer to center the first item */}
        <div className="scroll-spacer" />
        
        {receipts.map((receipt) => (
          <ReceiptCard 
            key={receipt.id} 
            receipt={receipt} 
            isActive={activeId === receipt.id}
          />
        ))}

        {/* Trailing spacer to center the last item */}
        <div className="scroll-spacer" />
      </div>
    </>
  );
}

export default App;
