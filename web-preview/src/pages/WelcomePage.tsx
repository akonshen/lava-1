import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CITIES } from '../constants';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div style={{ textAlign: 'center', paddingTop: '48px', paddingBottom: '24px' }}>
        <div className="logo">LAVA</div>
      </div>

      {/* Tagline */}
      <div style={{ textAlign: 'center', padding: '0 32px', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>
          Your Medical Travel
        </h1>
        <h1 style={{ fontSize: '24px', fontWeight: 600 }}>
          Companion in China
        </h1>
      </div>

      {/* City Preview Carousel */}
      <div style={{ marginBottom: '32px', overflow: 'hidden' }}>
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          padding: '0 16px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}>
          {CITIES.map((city) => (
            <div
              key={city.id}
              style={{
                minWidth: '280px',
                height: '180px',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <img
                src={city.imageUrl}
                alt={city.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '16px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              }}>
                <div style={{ color: 'white', fontSize: '20px', fontWeight: 700 }}>
                  {city.name}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                  {city.nameChinese}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="features-container">
        <div className="feature-item fade-in">
          <div className="feature-icon">🏥</div>
          <div className="feature-title">Hospital Finder</div>
          <div className="feature-description">
            Discover top hospitals with international departments
          </div>
        </div>
        <div className="feature-item fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="feature-icon">📋</div>
          <div className="feature-title">Step-by-Step Guide</div>
          <div className="feature-description">
            Navigate China's healthcare system with ease
          </div>
        </div>
        <div className="feature-item fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="feature-icon">💰</div>
          <div className="feature-title">Cost Estimates</div>
          <div className="feature-description">
            Know what to expect before you go
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bottom-container">
        <button
          className="btn btn-primary btn-large"
          onClick={() => navigate('/city')}
        >
          Get Started
        </button>
        <p className="sign-in-text" style={{ marginTop: '16px' }}>
          Already have an account? <span className="sign-in-link">Sign In</span>
        </p>
      </div>
    </div>
  );
};
