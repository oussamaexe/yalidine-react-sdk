import type { NextApiRequest, NextApiResponse } from 'next';
import { YalidineClient, PaymentRequest, PaymentResponse } from '@yalidine/react-sdk';

// Initialize client with server-side API key
const client = new YalidineClient({
  apiKey: process.env.YALIDINE_API_KEY || '',
});

interface ErrorResponse {
  error: string;
}

/**
 * Example: Next.js API route for creating payments
 * Usage: POST /api/payments with PaymentRequest body
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PaymentResponse | ErrorResponse>
) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const paymentData: PaymentRequest = req.body;

    // Validate required fields
    if (!paymentData.amount || !paymentData.orderId || !paymentData.customerEmail) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Create payment
    const payment = await client.createPayment(paymentData);

    res.status(200).json(payment);
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
}
