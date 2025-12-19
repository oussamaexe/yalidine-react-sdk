import { NextRequest, NextResponse } from 'next/server';
import { YalidineClient, PaymentRequest, PaymentResponse } from '@yalidine/react-sdk';

// Initialize client with server-side API key
const client = new YalidineClient({
  apiKey: process.env.YALIDINE_API_KEY || '',
});

interface ErrorResponse {
  error: string;
}

/**
 * Example: Next.js 13+ App Router API route for creating payments
 * File: app/api/payments/route.ts
 * Usage: POST /api/payments with PaymentRequest body
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<PaymentResponse | ErrorResponse>> {
  try {
    const paymentData: PaymentRequest = await request.json();

    // Validate required fields
    if (!paymentData.amount || !paymentData.orderId || !paymentData.customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create payment
    const payment = await client.createPayment(paymentData);

    return NextResponse.json(payment);
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}

/**
 * Example: GET endpoint to fetch payment details
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const paymentId = request.nextUrl.searchParams.get('id');

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID required' },
        { status: 400 }
      );
    }

    const payment = await client.getPayment(paymentId);
    return NextResponse.json(payment);
  } catch (error) {
    console.error('Get payment error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment' },
      { status: 500 }
    );
  }
}
