// Config options for setting up the Yalidine client
export interface YalidineConfig {
  apiKey?: string; // Use this for simple Bearer token auth
  apiId?: string; // Or use these two for header-based auth
  apiToken?: string;
  baseURL?: string; // Override the API URL if needed
}

// What you need to send when creating a payment
export interface PaymentRequest {
  amount: number;
  currency?: string;
  description: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  redirectUrl?: string;
  metadata?: Record<string, any>;
}

// What you get back from the API after creating a payment
export interface PaymentResponse {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description: string;
  paymentUrl?: string;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, any>;
}

// Info needed to create a shipment/parcel
export interface ParcelRequest {
  order_id: string;
  from_wilaya_name: string;
  firstname: string;
  familyname: string;
  contact_phone: string;
  address: string;
  to_commune_name: string;
  to_wilaya_name: string;
  product_list: string;
  price: number;
  height: number;
  width: number;
  length: number;
  weight: number;
  freeshipping?: boolean;
  is_stopdesk?: boolean;
  stopdesk_id?: number;
  has_exchange?: boolean;
  product_to_collect?: string | null;
}

// What you get back after creating or fetching a parcel
export interface ParcelResponse {
  id: string;
  tracking: string;
  order_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  from_wilaya_name: string;
  to_wilaya_name: string;
  price: number;
  weight: number;
  height: number;
  width: number;
  length: number;
}

// Shipping cost info for a specific wilaya
export interface DeliveryFeeResponse {
  wilaya_id: number;
  wilaya_name: string;
  base_fee: number;
  per_kg_fee: number;
}

// History entries showing where your parcel has been
export interface ParcelHistoryResponse {
  id: string;
  tracking: string;
  status: string;
  timestamp: string;
  location: string;
}

// Events that get sent to your webhook when stuff happens
export interface WebhookEvent {
  eventType:
    | 'payment.completed'
    | 'payment.failed'
    | 'payment.cancelled'
    | 'parcel.created'
    | 'parcel.delivered'
    | 'parcel.failed';
  data: PaymentResponse | ParcelResponse;
  timestamp: string;
}
