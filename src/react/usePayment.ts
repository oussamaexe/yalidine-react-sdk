import { useCallback, useState } from 'react';
import { useYalidine } from './context';
import { PaymentRequest, PaymentResponse } from '../types';

interface UsePaymentOptions {
  onSuccess?: (payment: PaymentResponse) => void;
  onError?: (error: Error) => void;
}

// React hook for handling payments - keeps track of loading states and errors
export const usePayment = (options?: UsePaymentOptions) => {
  const client = useYalidine();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [payment, setPayment] = useState<PaymentResponse | null>(null);

  const createPayment = useCallback(
    async (paymentData: PaymentRequest) => {
      try {
        setLoading(true);
        setError(null);
        const result = await client.createPayment(paymentData);
        setPayment(result);
        options?.onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        options?.onError?.(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [client, options]
  );

  const getPayment = useCallback(
    async (paymentId: string) => {
      try {
        setLoading(true);
        setError(null);
        const result = await client.getPayment(paymentId);
        setPayment(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [client]
  );

  const verifyPayment = useCallback(
    async (paymentId: string) => {
      try {
        setLoading(true);
        setError(null);
        return await client.verifyPayment(paymentId);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [client]
  );

  return {
    createPayment,
    getPayment,
    verifyPayment,
    payment,
    loading,
    error,
  };
};

export default usePayment;
