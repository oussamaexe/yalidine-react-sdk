import React from 'react';
import { usePayment } from './usePayment';
import { PaymentRequest } from '../types';

interface PaymentButtonProps {
  paymentData: PaymentRequest;
  onSuccess?: (paymentUrl: string) => void;
  onError?: (error: Error) => void;
  className?: string;
  children?: React.ReactNode;
}

// Drop-in payment button component - just pass your payment data and you're good to go
export const PaymentButton: React.FC<PaymentButtonProps> = ({
  paymentData,
  onSuccess,
  onError,
  className = '',
  children = 'Pay Now',
}) => {
  const { createPayment, loading, error } = usePayment({
    onSuccess: (payment) => {
      if (payment.paymentUrl) {
        window.location.href = payment.paymentUrl;
        onSuccess?.(payment.paymentUrl);
      }
    },
    onError,
  });

  const handleClick = async () => {
    try {
      await createPayment(paymentData);
    } catch (err) {
      console.error('Payment failed:', err);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading} className={className} type="button">
      {loading ? 'Processing...' : children}
      {error && <span className="error-message">{error.message}</span>}
    </button>
  );
};

export default PaymentButton;
