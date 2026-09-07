import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { CITIES, MEDICAL_TYPES } from '../constants';

export const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { questionnaire } = useAppStore();
  const [paymentMethod, setPaymentMethod] = useState<'apple' | 'google' | 'card'>('apple');
  const [isProcessing, setIsProcessing] = useState(false);

  const city = CITIES.find(c => c.id === questionnaire.city);
  const medicalType = MEDICAL_TYPES.find(t => t.id === questionnaire.medicalType);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    navigate('/generating');
  };

  return (
    <div>
      {/* Header */}
      <div className="header">
        <button className="header-back" onClick={() => navigate('/budget')}>
          ←
        </button>
        <div className="header-title">Payment</div>
        <div style={{ width: '48px' }}></div>
      </div>

      {/* Content */}
      <div className="page">
        {/* Order Summary */}
        <div className="order-summary">
          <h2 className="order-title">Order Summary</h2>
          
          <div className="order-item">
            <span className="order-item-label">Guide for</span>
            <span className="order-item-value">{city?.name} {city?.nameChinese}</span>
          </div>
          
          <div className="order-item">
            <span className="order-item-label">Medical Type</span>
            <span className="order-item-value">{medicalType?.label}</span>
          </div>
          
          <div className="order-item">
            <span className="order-item-label">Travel Dates</span>
            <span className="order-item-value">
              {questionnaire.travelDates.arrival} - {questionnaire.travelDates.departure}
            </span>
          </div>
          
          <div className="order-divider" />
          
          <div className="order-item">
            <span className="order-item-label">Personalized Guide</span>
            <span className="order-item-value">✓</span>
          </div>
          <div className="order-item">
            <span className="order-item-label">Hospital Recommendations</span>
            <span className="order-item-value">✓</span>
          </div>
          <div className="order-item">
            <span className="order-item-label">Cost Estimates</span>
            <span className="order-item-value">✓</span>
          </div>
          <div className="order-item">
            <span className="order-item-label">Step-by-Step Process</span>
            <span className="order-item-value">✓</span>
          </div>
          
          <div className="order-divider" />
          
          <div className="order-total">
            <span className="total-label">Total</span>
            <span className="total-value">$6.99</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="payment-methods">
          <h3 className="section-title">Payment Method</h3>
          
          <div
            className={`payment-option ${paymentMethod === 'apple' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('apple')}
          >
            <span className="payment-icon">🍎</span>
            <span className="payment-label">Apple Pay</span>
            {paymentMethod === 'apple' && <span className="payment-check">✓</span>}
          </div>
          
          <div
            className={`payment-option ${paymentMethod === 'google' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('google')}
          >
            <span className="payment-icon">🔵</span>
            <span className="payment-label">Google Pay</span>
            {paymentMethod === 'google' && <span className="payment-check">✓</span>}
          </div>
          
          <div
            className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('card')}
          >
            <span className="payment-icon">💳</span>
            <span className="payment-label">Credit or Debit Card</span>
            {paymentMethod === 'card' && <span className="payment-check">✓</span>}
          </div>
        </div>

        {/* Security Badge */}
        <div className="security-badge">
          <span className="security-icon">🔒</span>
          <span className="security-text">Secure payment powered by Stripe</span>
        </div>
      </div>

      {/* Pay Button */}
      <div className="bottom-container">
        <button
          className="btn btn-primary btn-large"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Pay $6.99'}
        </button>
      </div>
    </div>
  );
};
