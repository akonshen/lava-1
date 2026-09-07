import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { MEDICAL_TYPES } from '../constants';
import { MedicalType } from '../types';

export const MedicalTypePage: React.FC = () => {
  const navigate = useNavigate();
  const { questionnaire, setMedicalType, currentStep } = useAppStore();

  const handleSelectType = (type: MedicalType) => {
    setMedicalType(type);
  };

  const handleContinue = () => {
    if (questionnaire.medicalType) {
      navigate('/dates');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="header">
        <button className="header-back" onClick={() => navigate('/city')}>
          ←
        </button>
        <div className="header-title">Medical Need</div>
        <div style={{ width: '48px' }}></div>
      </div>

      {/* Progress */}
      <div className="progress-container">
        <div className="progress-bar">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`progress-dot ${step <= currentStep ? 'active' : ''} ${step === currentStep ? 'current' : ''}`}
            />
          ))}
        </div>
        <div className="progress-text">Step {currentStep} of 4</div>
      </div>

      {/* Content */}
      <div className="page">
        <h1 className="page-title">What type of medical service do you need?</h1>
        <p className="page-subtitle">
          Select the option that best describes your needs
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {MEDICAL_TYPES.map((type) => (
            <div
              key={type.id}
              className={`radio-option ${questionnaire.medicalType === type.id ? 'selected' : ''}`}
              onClick={() => handleSelectType(type.id)}
            >
              <div className="radio-circle">
                <div className="radio-inner" />
              </div>
              <div style={{ fontSize: '32px', marginRight: '16px' }}>
                {type.icon}
              </div>
              <div className="radio-content">
                <div className="radio-label">{type.label}</div>
                <div className="radio-description">{type.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="bottom-container">
        <button
          className={`btn btn-large ${questionnaire.medicalType ? 'btn-primary' : ''}`}
          onClick={handleContinue}
          disabled={!questionnaire.medicalType}
          style={!questionnaire.medicalType ? { backgroundColor: 'var(--color-text-light)', color: 'white' } : {}}
        >
          Continue
        </button>
      </div>
    </div>
  );
};
