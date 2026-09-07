import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { CITIES } from '../constants';
import { City } from '../types';

export const CitySelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { questionnaire, setCity } = useAppStore();

  const handleSelectCity = (city: City) => {
    setCity(city);
  };

  const handleContinue = () => {
    if (questionnaire.city) {
      navigate('/medical');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="header">
        <button className="header-back" onClick={() => navigate('/')}>
          ←
        </button>
        <div className="header-title">Select City</div>
        <div style={{ width: '48px' }}></div>
      </div>

      {/* Content */}
      <div className="page">
        <h1 className="page-title">Where are you traveling?</h1>
        <p className="page-subtitle">
          Select the city you'll be visiting in China
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {CITIES.map((city) => (
            <div
              key={city.id}
              className={`card ${questionnaire.city === city.id ? 'card-selected' : ''}`}
              onClick={() => handleSelectCity(city.id)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={city.imageUrl}
                alt={city.name}
                style={{
                  width: '100%',
                  height: '120px',
                  objectFit: 'cover',
                }}
              />
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '4px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 600, marginRight: '8px' }}>
                    {city.name}
                  </span>
                  <span style={{ fontSize: '16px', color: 'var(--color-text-secondary)' }}>
                    {city.nameChinese}
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                  {city.description}
                </p>
              </div>
              {questionnaire.city === city.id && (
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                }}>
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="bottom-container">
        <button
          className={`btn btn-large ${questionnaire.city ? 'btn-primary' : ''}`}
          onClick={handleContinue}
          disabled={!questionnaire.city}
          style={!questionnaire.city ? { backgroundColor: 'var(--color-text-light)', color: 'white' } : {}}
        >
          Continue
        </button>
      </div>
    </div>
  );
};
