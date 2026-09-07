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

  const heroImage = guideContent.heroImage || guideContent.images?.[0];

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
        {/* Hero Image */}
        {heroImage && (
          <div style={{
            width: '100%',
            height: '200px',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '20px',
            position: 'relative',
          }}>
            <img
              src={heroImage}
              alt={guideContent.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '16px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
            }}>
              <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 700, margin: 0 }}>
                {guideContent.title}
              </h1>
              {guideContent.subtitle && (
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', margin: '4px 0 0' }}>
                  {guideContent.subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {!heroImage && (
          <div className="guide-header">
            <h1 className="guide-title">{guideContent.title}</h1>
            {guideContent.subtitle && (
              <p style={{ fontSize: '14px', color: '#6B7280', textAlign: 'center', margin: '4px 0 0' }}>
                {guideContent.subtitle}
              </p>
            )}
          </div>
        )}

        {/* Overview */}
        <div className="section">
          <h2 className="section-title">✨ Overview</h2>
          <p className="overview-text">{guideContent.overview}</p>
        </div>

        {/* Day-by-Day Itinerary */}
        {guideContent.itinerary && guideContent.itinerary.length > 0 && (
          <div className="section">
            <h2 className="section-title">🗓️ Day-by-Day Itinerary</h2>
            {guideContent.itinerary.map((day) => (
              <div key={day.day} style={{
                background: '#F9FAFB',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '12px',
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#2563EB', marginBottom: '8px' }}>
                  Day {day.day}: {day.title}
                </h3>
                {day.imageUrl && (
                  <img
                    src={day.imageUrl}
                    alt={day.title}
                    style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
                  />
                )}
                <div style={{ fontSize: '14px', color: '#374151' }}>
                  {day.activities.map((act, i) => (
                    <div key={i} style={{ marginBottom: '4px' }}>📍 {act}</div>
                  ))}
                </div>
                {day.meals && day.meals.length > 0 && (
                  <div style={{ marginTop: '8px', fontSize: '13px', color: '#6B7280' }}>
                    🍽️ {day.meals.join(' · ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Top Attractions */}
        {guideContent.attractions && guideContent.attractions.length > 0 && (
          <div className="section">
            <h2 className="section-title">🏛️ Must-See Attractions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {guideContent.attractions.map((attr, index) => (
                <div key={index} style={{
                  background: '#fff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #E5E7EB',
                }}>
                  {attr.imageUrl && (
                    <img
                      src={attr.imageUrl}
                      alt={attr.name}
                      style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                    />
                  )}
                  <div style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>{attr.name}</h3>
                      <span style={{ fontSize: '12px', color: '#6B7280' }}>{attr.nameChinese}</span>
                    </div>
                    <div style={{ marginTop: '4px' }}>
                      <span style={{ fontSize: '11px', background: '#EEF2FF', color: '#2563EB', padding: '2px 8px', borderRadius: '10px' }}>
                        {attr.category}
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: '#374151', marginTop: '8px', marginBottom: '4px' }}>
                      {attr.description}
                    </p>
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>⏱ {attr.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Local Food */}
        {guideContent.food && guideContent.food.length > 0 && (
          <div className="section">
            <h2 className="section-title">🍜 Must-Try Food</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {guideContent.food.map((f, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#F9FAFB',
                  borderRadius: '10px',
                  padding: '12px',
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: 600 }}>
                      {f.name} {f.mustTry && <span style={{ fontSize: '11px', color: '#DC2626' }}>★</span>}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>{f.category}</div>
                    <p style={{ fontSize: '13px', color: '#374151', margin: '4px 0 0' }}>{f.description}</p>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#2563EB', marginLeft: '8px', whiteSpace: 'nowrap' }}>
                    {f.priceRange}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
          <h2 className="section-title">3. Medical Process</h2>
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