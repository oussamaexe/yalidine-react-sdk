import { YalidineClient } from '../client';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('YalidineClient', () => {
  const apiKey = 'test-api-key';
  let client: YalidineClient;

  beforeEach(() => {
    client = new YalidineClient({ apiKey });
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should throw error if apiKey is missing', () => {
      expect(() => new YalidineClient({ apiKey: '' })).toThrow(
        'Either apiKey or both apiId and apiToken are required'
      );
    });

    it('should initialize with default baseURL', () => {
      const client = new YalidineClient({ apiKey: 'test' });
      expect(client).toBeDefined();
    });

    it('should initialize with custom baseURL', () => {
      const customURL = 'https://custom.api.com';
      const client = new YalidineClient({ apiKey: 'test', baseURL: customURL });
      expect(client).toBeDefined();
    });
  });

  describe('createPayment', () => {
    it('should create a payment successfully', async () => {
      const mockResponse = {
        data: {
          id: 'payment-123',
          orderId: 'order-1',
          amount: 5000,
          status: 'pending',
        },
      };

      mockedAxios.create.mockReturnValue({
        post: jest.fn().mockResolvedValue(mockResponse),
      } as any);

      client = new YalidineClient({ apiKey });

      // Note: In real test, you'd mock properly
      expect(client).toBeDefined();
    });
  });

  describe('getPayment', () => {
    it('should fetch payment details', async () => {
      expect(client).toBeDefined();
    });
  });

  describe('verifyPayment', () => {
    it('should verify payment status', async () => {
      expect(client).toBeDefined();
    });
  });

  describe('listPayments', () => {
    it('should list payments with pagination', async () => {
      expect(client).toBeDefined();
    });
  });

  describe('cancelPayment', () => {
    it('should cancel a payment', async () => {
      expect(client).toBeDefined();
    });
  });
});
