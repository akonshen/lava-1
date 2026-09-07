import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';

export const TravelDatesPage: React.FC = () => {
  const navigate = useNavigate();
  const { questionnaire, setTravelDates, currentStep } = useAppStore();

  const handleArrivalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTravelDates({
      ...questionnaire.travelDates,
      arrival: e.target.value,
    });
  };

  const handleDepartureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTravelDates({
      ...questionnaire.travelDates,
      departure: e.target.value,
    });
  };

  const handleContinue = () => {
    if (questionnaire.travelDates.arrival && questionnaire.travelDates.departure) {
      navigate('/budget');
    }
  };

  const canProceed = questionnaire.travelDates.arrival && questionnaire.travelDates.departure;

  return (
    <div>
      {/* Header */}
      <div className="header">
        <button className="header-back" onClick={() => navigate('/medical')}>
          ←
        </button>
        <div className="header-title">Travel Dates</div>
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
        <h1 className="page-title">When are you traveling?</h1>
        <p className="page-subtitle">
          Enter your travel dates so we can plan your guide accordingly
        </p>

        <div className="input-group">
          <label className="input-label">Arrival Date</label>
          <input
            type="date"
            className="input"
            value={questionnaire.travelDates.arrival}
            onChange={handleArrivalChange}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Departure Date</label>
          <input
            type="date"
            className="input"
            value={questionnaire.travelDates.departure}
            onChange={handleDepartureChange}
          />
        </div>

        <div className="info-box">
          <span className="info-icon">💡</span>
          <span className="info-text">
            Your guide will be customized based on your travel duration. Longer stays may include more comprehensive coverage.
          </span>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="bottom-container">
        <button
          className={`btn btn-large ${canProceed ? 'btn-primary' : ''}`}
          onClick={handleContinue}
          disabled={!canProceed}
          style={!canProceed ? { backgroundColor: 'var(--color-text-light)', color: 'white' } : {}}
        >
          Continue
        </button>
      </div>
    </div>
  );
};
