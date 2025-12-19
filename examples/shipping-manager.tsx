import React, { useState } from 'react';
import { useParcels, ParcelRequest } from '@yalidine/react-sdk';

/**
 * Example: Shipping/Parcel Management with Yalidine
 * Based on Laravel reference implementation
 */
export function ShippingManager() {
  const {
    createParcels,
    retrieveParcels,
    getDeliveryFees,
    getParcelsByStatus,
    parcels,
    deliveryFees,
    loading,
    error,
  } = useParcels();

  const [selectedStatus, setSelectedStatus] = useState<string>('');

  // Create a sample parcel (based on Laravel API)
  const handleCreateParcel = async () => {
    const sampleParcel: ParcelRequest = {
      order_id: `ORDER-${Date.now()}`,
      from_wilaya_name: 'Batna',
      firstname: 'Brahim',
      familyname: 'Mohamed',
      contact_phone: '+213612345678',
      address: 'Cité Kaidi',
      to_commune_name: 'Bordj El Kiffan',
      to_wilaya_name: 'Alger',
      product_list: 'Electronics Package',
      price: 3000,
      height: 10,
      width: 20,
      length: 30,
      weight: 6,
      freeshipping: true,
      is_stopdesk: true,
      stopdesk_id: 163001,
      has_exchange: false,
      product_to_collect: null,
    };

    try {
      await createParcels([sampleParcel]);
      alert('Parcel created successfully!');
    } catch (err) {
      console.error('Failed to create parcel:', err);
    }
  };

  // Get delivery fees for Algiers
  const handleGetDeliveryFees = async () => {
    try {
      const fees = await getDeliveryFees([16]); // 16 = Alger
      console.log('Delivery fees:', fees);
    } catch (err) {
      console.error('Failed to get delivery fees:', err);
    }
  };

  // Get delivered parcels
  const handleGetDeliveredParcels = async () => {
    try {
      await getParcelsByStatus('Livré');
      setSelectedStatus('Livré');
    } catch (err) {
      console.error('Failed to retrieve parcels:', err);
    }
  };

  // Get all parcels
  const handleGetAllParcels = async () => {
    try {
      await retrieveParcels();
    } catch (err) {
      console.error('Failed to retrieve parcels:', err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Shipping Manager</h1>

      {error && (
        <div style={{ background: '#fee', padding: '10px', color: 'red', borderRadius: '4px' }}>
          Error: {error.message}
        </div>
      )}

      {loading && <div style={{ padding: '10px' }}>Loading...</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
        <button onClick={handleCreateParcel} disabled={loading}>
          Create Parcel
        </button>
        <button onClick={handleGetAllParcels} disabled={loading}>
          Get All Parcels
        </button>
        <button onClick={handleGetDeliveredParcels} disabled={loading}>
          Get Delivered Parcels
        </button>
        <button onClick={handleGetDeliveryFees} disabled={loading}>
          Get Delivery Fees
        </button>
      </div>

      {/* Display delivery fees */}
      {deliveryFees.length > 0 && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '4px' }}>
          <h3>Delivery Fees</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ccc' }}>
                <th style={{ textAlign: 'left', padding: '8px' }}>Wilaya</th>
                <th style={{ textAlign: 'left', padding: '8px' }}>Base Fee (DZD)</th>
                <th style={{ textAlign: 'left', padding: '8px' }}>Per KG (DZD)</th>
              </tr>
            </thead>
            <tbody>
              {deliveryFees.map((fee) => (
                <tr key={fee.wilaya_id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px' }}>{fee.wilaya_name}</td>
                  <td style={{ padding: '8px' }}>{fee.base_fee}</td>
                  <td style={{ padding: '8px' }}>{fee.per_kg_fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Display parcels */}
      {parcels.length > 0 && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '4px' }}>
          <h3>Parcels {selectedStatus && `(Status: ${selectedStatus})`}</h3>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {parcels.map((parcel) => (
              <div
                key={parcel.tracking}
                style={{
                  padding: '10px',
                  marginBottom: '10px',
                  background: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                }}
              >
                <div>
                  <strong>Tracking:</strong> {parcel.tracking}
                </div>
                <div>
                  <strong>Order ID:</strong> {parcel.order_id}
                </div>
                <div>
                  <strong>Status:</strong> {parcel.status}
                </div>
                <div>
                  <strong>From:</strong> {parcel.from_wilaya_name} → <strong>To:</strong> {parcel.to_wilaya_name}
                </div>
                <div>
                  <strong>Weight:</strong> {parcel.weight}kg, <strong>Price:</strong> {parcel.price} DZD
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  Created: {new Date(parcel.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShippingManager;
