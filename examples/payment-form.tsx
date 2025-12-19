import React, { useState } from 'react';
import { usePayment, PaymentRequest } from '@yalidine/react-sdk';

/**
 * Example: Advanced payment form in React
 */
export function PaymentForm() {
  const { createPayment, loading, error, payment } = usePayment();

  const [formData, setFormData] = useState({
    amount: 5000,
    description: 'Test payment',
    orderId: `ORDER-${Date.now()}`,
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+213612345678',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const paymentRequest: PaymentRequest = {
        ...formData,
        amount: Number(formData.amount),
        currency: 'DZD',
      };

      await createPayment(paymentRequest);
    } catch (err) {
      console.error('Payment error:', err);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto' }}>
      <h2>Payment Form</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Amount (DZD):</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Order ID:</label>
          <input
            type="text"
            name="orderId"
            value={formData.orderId}
            onChange={handleChange}
            required
            readOnly
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Name:</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Phone:</label>
          <input
            type="tel"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Processing Payment...' : 'Pay Now'}
        </button>
      </form>

      {error && <div style={{ color: 'red', marginTop: '15px' }}>Error: {error.message}</div>}
      {payment && (
        <div style={{ color: 'green', marginTop: '15px' }}>
          <h3>Payment Successful!</h3>
          <p>Payment ID: {payment.id}</p>
          <p>Status: {payment.status}</p>
          <p>Amount: {payment.amount} {payment.currency}</p>
        </div>
      )}
    </div>
  );
}

export default PaymentForm;
