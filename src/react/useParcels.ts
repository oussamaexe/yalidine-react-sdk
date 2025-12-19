import { useCallback, useState } from 'react';
import { useYalidine } from './context';
import { ParcelRequest, ParcelResponse, DeliveryFeeResponse } from '../types';

interface useUseProps {
  onSuccess?: (parcels: ParcelResponse[]) => void;
  onError?: (error: Error) => void;
}

// React hook for creating and tracking parcels/shipments
export const useParcels = (options?: useUseProps) => {
  const client = useYalidine();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [parcels, setParcels] = useState<ParcelResponse[]>([]);
  const [deliveryFees, setDeliveryFees] = useState<DeliveryFeeResponse[]>([]);

  const createParcels = useCallback(
    async (parcelData: ParcelRequest[]) => {
      try {
        setLoading(true);
        setError(null);
        const result = await client.createParcels(parcelData);
        setParcels(result);
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

  const retrieveParcels = useCallback(
    async (trackings?: string[]) => {
      try {
        setLoading(true);
        setError(null);
        const result = await client.retrieveParcels(trackings);
        setParcels(result);
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

  const getParcel = useCallback(
    async (tracking: string) => {
      try {
        setLoading(true);
        setError(null);
        const result = await client.getParcel(tracking);
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

  const deleteParcels = useCallback(
    async (trackings: string[]) => {
      try {
        setLoading(true);
        setError(null);
        return await client.deleteParcels(trackings);
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

  const getDeliveryFees = useCallback(
    async (wilayaIds?: number[]) => {
      try {
        setLoading(true);
        setError(null);
        const result = await client.getDeliveryFees(wilayaIds);
        setDeliveryFees(result);
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

  const getParcelsByStatus = useCallback(
    async (status: string) => {
      try {
        setLoading(true);
        setError(null);
        const result = await client.getParcelsByStatus(status);
        setParcels(result);
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

  return {
    createParcels,
    retrieveParcels,
    getParcel,
    deleteParcels,
    getDeliveryFees,
    getParcelsByStatus,
    parcels,
    deliveryFees,
    loading,
    error,
  };
};

export default useParcels;
