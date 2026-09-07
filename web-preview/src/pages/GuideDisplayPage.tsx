import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';

export const GuideDisplayPage: React.FC = () => {
  const navigate = useNavigate();
  const { guideContent, reset } = useAppStore();

  const handleDownload = () => {
    alert('PDF download feature coming soon!');
  };

  const handleShare = () => {
    alert('Share feature coming soon!');
  };

  const handleNewGuide = () => {
    reset();
    navigate('/');
  };

  if (!guideContent) {
    return (
      <div>
        <div className="header">
          <button className="header-back" onClick={() => navigate('/')}>←</button>
          <div className="header-title">Guide</div>
          <div style={{ width: '48px' }}></div>
        </div>
        <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>No guide content available</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="header">
        <button className="header-back" onClick={() => navigate('/')}>←</button>
        <div className="header-title">Your Guide</div>
        <div className="share-button" onClick={handleShare}>📤</div>
      </div>

      {/* Content */}
      <div className="page">
        {/* Guide Header */}
        <div className="guide-header">
          <h1 className="guide-title">{guideContent.title}</h1>
          <p className="guide-city">Shanghai</p>
        </div>

        {/* Table of Contents */}
        <div className="section">
          <h2 className="section-title">📋 Table of Contents</h2>
          <div className="toc-list">
            <div className="toc-item">1. Overview</div>
            <div className="toc-item">2. Recommended Hospitals</div>
            <div className="toc-item">3. Step-by-Step Process</div>
            <div className="toc-item">4. Cost Estimates</div>
            <div className="toc-item">5. Transportation</div>
            <div className="toc-item">6. Tips & Notes</div>
          </div>
        </div>

        {/* Overview */}
        <div className="section">
          <h2 className="section-title">1. Overview</h2>
          <p className="overview-text">{guideContent.overview}</p>
        </div>

        {/* Recommended Hospitals */}
        <div className="section">
          <h2 className="section-title">2. Recommended Hospitals</h2>
          {guideContent.hospitals.map((hospital) => (
            <div key={hospital.id} className="hospital-card">
              <img
                src={hospital.imageUrl}
                alt={hospital.name}
                className="hospital-image"
              />
              <div className="hospital-content">
                <h3 className="hospital-name">{hospital.name}</h3>
                <p className="hospital-name-chinese">{hospital.nameChinese}</p>
                
                <div className="badges">
                  {hospital.jciCertified && (
                    <span className="badge badge-jci">JCI Certified</span>
                  )}
                  {hospital.internationalDepartment && (
                    <span className="badge badge-intl">International Dept</span>
                  )}
                </div>
                
                <div className="specialties">
                  {hospital.specialties.map((specialty, index) => (
                    <span key={index} className="specialty-tag">{specialty}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Step-by-Step Process */}
        <div className="section">
          <h2 className="section-title">3. Step-by-Step Process</h2>
          {guideContent.process.map((step) => (
            <div key={step.step} className="process-step">
              <div className="step-number">
                <span className="step-number-text">{step.step}</span>
              </div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                <p className="step-duration">⏱ {step.duration}</p>
                {step.tips.length > 0 && (
                  <div className="step-tips">
                    {step.tips.map((tip, index) => (
                      <div key={index} className="step-tip">• {tip}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Cost Estimates */}
        <div className="section">
          <h2 className="section-title">4. Cost Estimates</h2>
          <div className="cost-table">
            <div className="cost-header">
              <span>Service</span>
              <span>Cost Range</span>
            </div>
            {guideContent.costs.map((cost, index) => (
              <div key={index} className="cost-row">
                <span className="cost-service">{cost.service}</span>
                <span className="cost-value">
                  {cost.minCost}-{cost.maxCost} {cost.currency}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Transportation */}
        <div className="section">
          <h2 className="section-title">5. Transportation</h2>
          <div className="transport-card">
            <div className="transport-item">
              <div className="transport-label">From Airport</div>
              <div className="transport-value">{guideContent.transportation.fromAirport}</div>
            </div>
            <div className="transport-item">
              <div className="transport-label">To Hospital</div>
              <div className="transport-value">{guideContent.transportation.toHospital}</div>
            </div>
            <div className="transport-item">
              <div className="transport-label">Estimated Cost</div>
              <div className="transport-value">{guideContent.transportation.estimatedCost}</div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="section">
          <h2 className="section-title">6. Tips & Notes</h2>
          <div className="tips-card">
            {guideContent.tips.map((tip, index) => (
              <div key={index} className="tip-row">
                <span className="tip-bullet">✓</span>
                <span className="tip-text">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="section">
          <h2 className="section-title">🚨 Emergency Contacts</h2>
          <div className="emergency-card">
            {guideContent.emergencyContacts.map((contact, index) => (
              <div key={index} className="emergency-row">
                <span className="emergency-name">{contact.name}</span>
                <span className="emergency-number">{contact.number}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="bottom-container">
        <div className="download-section">
          <button className="btn btn-primary btn-large" onClick={handleDownload}>
            Download PDF
          </button>
          <button className="btn btn-secondary btn-large" onClick={handleNewGuide}>
            Create New Guide
          </button>
        </div>
      </div>
    </div>
  );
};
