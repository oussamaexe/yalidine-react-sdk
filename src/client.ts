import axios, { AxiosInstance } from 'axios';
import {
  YalidineConfig,
  PaymentRequest,
  PaymentResponse,
  ParcelRequest,
  ParcelResponse,
  DeliveryFeeResponse,
  ParcelHistoryResponse,
} from './types';

// Main client for talking to Yalidine API
// Works with React, Next.js, or plain TypeScript
export class YalidineClient {
  private apiKey?: string;
  private apiId?: string;
  private apiToken?: string;
  private baseURL: string;
  private client: AxiosInstance;

  constructor(config: YalidineConfig) {
    // You can authenticate with either an API key or ID+Token combo
    if (config.apiKey) {
      this.apiKey = config.apiKey;
    } else if (config.apiId && config.apiToken) {
      this.apiId = config.apiId;
      this.apiToken = config.apiToken;
    } else {
      throw new Error('Either apiKey or both apiId and apiToken are required');
    }

    this.baseURL = config.baseURL || 'https://api.yalidine.io/v1';

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add the right auth headers depending on what you're using
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    } else if (this.apiId && this.apiToken) {
      headers['X-API-ID'] = this.apiId;
      headers['X-API-TOKEN'] = this.apiToken;
    }

    this.client = axios.create({
      baseURL: this.baseURL,
      headers,
    });
  }

  // Create a new payment - returns a payment object with a URL to redirect to
  async createPayment(payment: PaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await this.client.post('/payments', payment);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Fetch details about a specific payment
  async getPayment(paymentId: string): Promise<PaymentResponse> {
    try {
      const response = await this.client.get(`/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Cancel a payment if it hasn't been completed yet
  async cancelPayment(paymentId: string): Promise<{ success: boolean }> {
    try {
      const response = await this.client.post(`/payments/${paymentId}/cancel`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get a list of your payments (paginated)
  async listPayments(
    page: number = 1,
    limit: number = 10
  ): Promise<{ payments: PaymentResponse[]; total: number }> {
    try {
      const response = await this.client.get('/payments', {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Quick way to check if a payment went through successfully
  async verifyPayment(paymentId: string): Promise<boolean> {
    try {
      const payment = await this.getPayment(paymentId);
      return payment.status === 'completed';
    } catch (error) {
      console.error('Error verifying payment:', error);
      return false;
    }
  }

  // ============================================
  // Parcel & Shipping Stuff
  // ============================================

  // Create one or more parcels/shipments
  async createParcels(parcels: ParcelRequest[]): Promise<ParcelResponse[]> {
    try {
      const response = await this.client.post('/parcels', parcels);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get your parcels - either specific ones by tracking number, or all of them
  async retrieveParcels(trackings?: string[]): Promise<ParcelResponse[]> {
    try {
      const params = trackings ? { tracking: trackings.join(',') } : {};
      const response = await this.client.get('/parcels', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Fetch info about a single parcel using its tracking number
  async getParcel(tracking: string): Promise<ParcelResponse> {
    try {
      const response = await this.client.get(`/parcels/${tracking}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Remove parcels from the system (usually before they're shipped)
  async deleteParcels(trackings: string[]): Promise<{ success: boolean }> {
    try {
      const params = { tracking: trackings.join(',') };
      const response = await this.client.delete('/parcels', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get shipping costs for different wilayas (Algerian regions)
  async getDeliveryFees(wilayaIds?: number[]): Promise<DeliveryFeeResponse[]> {
    try {
      const params = wilayaIds ? { wilaya_id: wilayaIds.join(',') } : {};
      const response = await this.client.get('/deliveryfees', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get the shipping cost for just one wilaya
  async getDeliveryFee(wilayaId: number): Promise<DeliveryFeeResponse> {
    try {
      const fees = await this.getDeliveryFees([wilayaId]);
      return fees[0];
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // See what's been happening with your parcels over time
  async getParcelHistory(status?: string): Promise<ParcelHistoryResponse[]> {
    try {
      const params = status ? { status } : {};
      const response = await this.client.get('/histories', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Filter parcels by their delivery status (like 'Livré', 'En cours', etc.)
  async getParcelsByStatus(status: string): Promise<ParcelResponse[]> {
    try {
      const response = await this.client.get('/parcels', {
        params: { status },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      const status = error.response?.status;
      return new Error(`Yalidine API Error (${status}): ${message}`);
    }
    return error instanceof Error ? error : new Error('Unknown error occurred');
  }
}

export default YalidineClient;
