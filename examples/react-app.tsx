import React, { useState } from 'react';
import {
  YalidineProvider,
  usePayment,
  PaymentButton,
  PaymentResponse,
} from '@yalidine/react-sdk';

/**
 * Example: Simple React app with payment button
 */
function CheckoutComponent() {
  const [orderAmount, setOrderAmount] = useState(2500);
  const { createPayment, loading, error, payment } = usePayment({
    onSuccess: (payment) => {
      console.log('Payment successful:', payment);
      alert(`Payment completed! Payment ID: ${payment.id}`);
    },
    onError: (error) => {
      console.error('Payment failed:', error);
      alert(`Payment failed: ${error.message}`);
    },
  });

  const handleCustomPayment = async () => {
    await createPayment({
      amount: orderAmount,
      currency: 'DZD',
      description: 'Custom order',
      orderId: `ORDER-${Date.now()}`,
      customerName: 'Customer',
      customerEmail: 'customer@example.com',
      customerPhone: '+213612345678',
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Checkout Page</h2>

      {/* Custom payment amount */}
      <div>
        <label>
          Order Amount (DZD):
          <input
            type="number"
            value={orderAmount}
            onChange={(e) => setOrderAmount(Number(e.target.value))}
          />
        </label>
        <button onClick={handleCustomPayment} disabled={loading}>
          {loading ? 'Processing...' : 'Custom Payment'}
        </button>
      </div>

      {/* Using PaymentButton component */}
      <hr />
      <h3>Quick Checkout</h3>
      <PaymentButton
        paymentData={{
          amount: 5000,
          currency: 'DZD',
          description: 'Premium Product',
          orderId: `QUICK-${Date.now()}`,
          customerName: 'Customer',
          customerEmail: 'customer@example.com',
          customerPhone: '+213612345678',
        }}
        className="btn-primary"
      >
        Pay 5000 DZD
      </PaymentButton>

      {/* Display results */}
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error.message}</div>}
      {payment && (
        <div style={{ color: 'green', marginTop: '10px' }}>
          <p>Payment ID: {payment.id}</p>
          <p>Status: {payment.status}</p>
        </div>
      )}
    </div>
  );
}

/**
 * App wrapper with provider
 */
export function App() {
  return (
    <YalidineProvider config={{ apiKey: process.env.REACT_APP_YALIDINE_API_KEY! }}>
      <CheckoutComponent />
    </YalidineProvider>
  );
}

export default App;
