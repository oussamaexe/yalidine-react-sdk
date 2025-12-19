import { YalidineClient, PaymentRequest, PaymentResponse } from '@yalidine/react-sdk';

/**
 * Example: Basic client usage
 */
const basicExample = async () => {
  const client = new YalidineClient({
    apiKey: 'your-api-key',
  });

  try {
    // Create a payment
    const payment: PaymentResponse = await client.createPayment({
      amount: 5000,
      currency: 'DZD',
      description: 'Product purchase',
      orderId: 'ORDER-123',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      customerPhone: '+213612345678',
    });

    console.log('Payment created:', payment);

    // Verify payment
    const isCompleted = await client.verifyPayment(payment.id);
    console.log('Payment verified:', isCompleted);
  } catch (error) {
    console.error('Error:', error);
  }
};

export { basicExample };
