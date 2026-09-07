import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { BUDGET_RANGES } from '../constants';
import { BudgetRange } from '../types';

export const BudgetPage: React.FC = () => {
  const navigate = useNavigate();
  const { questionnaire, setBudgetRange, setSpecificNeeds, currentStep } = useAppStore();

  const handleSelectBudget = (range: BudgetRange) => {
    setBudgetRange(range);
  };

  const handleContinue = () => {
    if (questionnaire.budgetRange) {
      navigate('/payment');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="header">
        <button className="header-back" onClick={() => navigate('/dates')}>
          ←
        </button>
        <div className="header-title">Budget & Details</div>
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
        <h1 className="page-title">What's your budget?</h1>
        <p className="page-subtitle">
          This helps us recommend the right hospitals for you
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          {BUDGET_RANGES.map((range) => (
            <div
              key={range.id}
              className={`radio-option ${questionnaire.budgetRange === range.id ? 'selected' : ''}`}
              onClick={() => handleSelectBudget(range.id as BudgetRange)}
            >
              <div className="radio-circle">
                <div className="radio-inner" />
              </div>
              <div className="radio-content">
                <div className="radio-label">{range.label}</div>
                <div className="radio-description">{range.description}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
            Additional Information
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
            Help us customize your guide further (optional)
          </p>
        </div>

        <div className="input-group">
          <label className="input-label">Specific Needs</label>
          <textarea
            className="input"
            style={{ height: '100px', padding: '16px', resize: 'none' }}
            placeholder="e.g., Root canal treatment, MRI scan, acupuncture..."
            value={questionnaire.specificNeeds}
            onChange={(e) => setSpecificNeeds(e.target.value)}
          />
        </div>
      </div>

      {/* Bottom Button */}
      <div className="bottom-container">
        <button
          className={`btn btn-large ${questionnaire.budgetRange ? 'btn-primary' : ''}`}
          onClick={handleContinue}
          disabled={!questionnaire.budgetRange}
          style={!questionnaire.budgetRange ? { backgroundColor: 'var(--color-text-light)', color: 'white' } : {}}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};
