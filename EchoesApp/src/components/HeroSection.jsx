import React from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="hero-section fade-in-up">
      <h1 className="hero-title">Echoes</h1>
      <p className="hero-subtitle">
        Your digital footprint isn't just data.<br />
        It's a constellation of moments.
      </p>
      
      <div className="scroll-prompt">
        <span>Begin Journey</span>
        <ArrowDown size={20} />
      </div>
    </section>
  );
};

export default HeroSection;
