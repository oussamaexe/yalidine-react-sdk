# Yalidine React/Next.js SDK

A TypeScript SDK for the Yalidine DZ API. Makes it easy to handle payments and shipping in your React or Next.js app.

[![npm version](https://badge.fury.io/js/@yalidine%2Freact-sdk.svg)](https://badge.fury.io/js/@yalidine%2Freact-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What's Inside

- 🚀 **Simple Setup** - Get started in minutes
- 📦 **TypeScript** - Full type safety included
- ⚡ **Lightweight** - Small bundle, minimal dependencies
- 🪝 **React Hooks** - `usePayment` and `useParcels` for easy state management
- 🎯 **Ready to Use** - Pre-built `PaymentButton` component
- 💰 **Payments** - Create and track payments
- 📦 **Shipping** - Manage parcels and deliveries
- 🚚 **Delivery Costs** - Get shipping fees by wilaya
- 🔄 **Tracking** - Follow your parcels in real-time
- 🛡️ **Error Handling** - Proper error messages
- 📱 **Mobile Friendly** - Works everywhere

## Installation

```bash
npm install @yalidine/react-sdk
# or
yarn add @yalidine/react-sdk
```

## Getting Started

### Step 1: Wrap Your App

Put the provider around your app:

```tsx
import { YalidineProvider } from '@yalidine/react-sdk';

function App() {
  return (
    <YalidineProvider config={{ apiKey: 'your-api-key' }}>
      <YourApp />
    </YalidineProvider>
  );
}
```

**Auth options:**

```tsx
// With API Key
<YalidineProvider config={{ apiKey: 'your-api-key' }}>

// Or with API ID + Token
<YalidineProvider config={{ 
  apiId: 'your-api-id',
  apiToken: 'your-api-token'
}}>
```

### Step 2: Use the Hooks

```tsx
import { usePayment } from '@yalidine/react-sdk';

export function CheckoutPage() {
  const { createPayment, loading, error } = usePayment({
    onSuccess: (payment) => {
      console.log('Payment created:', payment);
      window.location.href = payment.paymentUrl;
    },
    onError: (err) => console.error('Payment failed:', err),
  });

  const handleCheckout = async () => {
    await createPayment({
      amount: 5000, // Amount in centimes (5000 = 50.00 DZD)
      currency: 'DZD',
      description: 'Product purchase',
      orderId: 'ORDER-123',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      customerPhone: '+213555123456',
    });
  };

  return (
    <div>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
```

### Step 3: Or Use the Button Component

For a quick payment button:

```tsx
import { PaymentButton } from '@yalidine/react-sdk';

export function ProductCard() {
  return (
    <PaymentButton
      paymentData={{
        amount: 2500,
        currency: 'DZD',
        description: 'Premium Subscription',
        orderId: 'SUB-456',
        customerName: 'Jane Doe',
        customerEmail: 'jane@example.com',
        customerPhone: '+213555987654',
      }}
      onSuccess={(paymentUrl) => window.location.href = paymentUrl}
      className="btn btn-primary"
    >
      Subscribe Now - 25.00 DZD
    </PaymentButton>
  );
}
```

## Shipping & Parcels

Manage shipments with the `useParcels` hook:

```tsx
import { useParcels } from '@yalidine/react-sdk';

export function ShippingManager() {
  const { createParcels, retrieveParcels, parcels, loading, error } = useParcels({
    onSuccess: (parcels) => console.log('Parcels created:', parcels),
  });

  const createShipment = async () => {
    await createParcels([
      {
        order_id: 'ORDER-789',
        from_wilaya_name: 'Alger',
        firstname: 'Ahmed',
        familyname: 'Benali',
        contact_phone: '0555123456',
        address: '12 Rue Didouche Mourad',
        commune_name: 'Alger Centre',
        delivery_price: 500, // Shipping cost in centimes
        product_list: 'T-shirt Blue Size M x1',
        price: 2500, // Product price
        freeshipping: false,
        is_stopdesk: false,
        stopdesk_id: null,
        has_exchange: false,
      },
    ]);
  };

  return (
    <div>
      <button onClick={createShipment} disabled={loading}>
        Create Shipment
      </button>
      
      {parcels.map((parcel) => (
        <div key={parcel.tracking}>
          <p>Tracking: {parcel.tracking}</p>
          <p>Status: {parcel.status}</p>
        </div>
      ))}
    </div>
  );
}
```

## Delivery Costs

Check shipping fees by wilaya:

```tsx
import { useParcels } from '@yalidine/react-sdk';

export function ShippingCalculator() {
  const { getDeliveryFees, deliveryFees } = useParcels();

  useEffect(() => {
    getDeliveryFees(); // Gets all wilayas
  }, []);

  return (
    <select>
      {deliveryFees.map((fee) => (
        <option key={fee.id} value={fee.id}>
          {fee.name} - {fee.deliveryPrice / 100} DZD
        </option>
      ))}
    </select>
  );
}
```

## Using the Client Directly

Skip the hooks and use the client if you want:

```tsx
import { YalidineClient } from '@yalidine/react-sdk';

// Initialize client
const client = new YalidineClient({
  apiKey: 'your-api-key',
  // or use apiId + apiToken
  // apiId: 'your-api-id',
  // apiToken: 'your-api-token',
});

// Create payment
const payment = await client.createPayment({
  amount: 5000,
  currency: 'DZD',
  description: 'Order payment',
  orderId: 'ORDER-001',
  customerName: 'Customer Name',
  customerEmail: 'customer@example.com',
  customerPhone: '+213555000000',
});

// Get payment details
const paymentDetails = await client.getPayment('payment-id');

// Create parcels
const parcels = await client.createParcels([{
  order_id: 'ORDER-001',
  from_wilaya_name: 'Alger',
  firstname: 'Ahmed',
  familyname: 'Benali',
  contact_phone: '0555123456',
  address: '12 Rue Example',
  commune_name: 'Alger Centre',
  delivery_price: 500,
  product_list: 'Product description',
  price: 2500,
}]);

// Get delivery fees
const fees = await client.getDeliveryFees();

// Track parcels by status
const delivered = await client.getParcelsByStatus('delivered');
```

## API Docs

### Hooks

#### `usePayment(options?)`

Hook for handling payments.

**Options:**
- `onSuccess` - Called when payment succeeds
- `onError` - Called when something goes wrong

**What you get:**
- `createPayment()` - Make a new payment
- `getPayment()` - Fetch payment details
- `verifyPayment()` - Check if it went through
- `payment` - Current payment state
- `loading` - True when busy
- `error` - Error message if any

#### `useParcels(options?)`

Hook for managing shipments.

**Options:**
- `onSuccess?: (parcels: ParcelResponse[]) => void`
- `onError?: (error: Error) => void`

**What you get:**
- `createParcels()` - Create shipments
- `retrieveParcels()` - Get your parcels
- `getParcel()` - Get one parcel by tracking number
- `deleteParcels()` - Remove parcels
- `getDeliveryFees()` - Get shipping costs
- `getParcelsByStatus()` - Filter by status
- `parcels` - Your parcels array
- `deliveryFees` - Shipping costs array
- `loading` - True when busy
- `error` - Error message if any

### Components

#### `<PaymentButton />`

Drop-in payment button.

**Props:**
- `paymentData` - Payment info
- `onSuccess` - Called on success
- `onError` - Called on error
- `className` - CSS class
- `children` - Button text

## Algerian Wilayas

Works with all 58 wilayas. Common ones:

```
Adrar, Chlef, Laghouat, Oum El Bouaghi, Batna, Béjaïa, Biskra,
Béchar, Blida, Bouira, Tamanrasset, Tébessa, Tlemcen, Tiaret,
Tizi Ouzou, Alger, Djelfa, Jijel, Sétif, Saïda, Skikda,
Sidi Bel Abbès, Annaba, Guelma, Constantine, Médéa, Mostaganem,
M'Sila, Mascara, Ouargla, Oran, and more...
```

## TypeScript

Full type definitions included:

```tsx
import type {
  YalidineConfig,
  PaymentRequest,
  PaymentResponse,
  ParcelRequest,
  ParcelResponse,
  DeliveryFeeResponse,
  ParcelHistoryResponse,
  WebhookEvent,
} from '@yalidine/react-sdk';
```

## Testing

```bash
npm test              # Run tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## Development

```bash
npm install           # Install dependencies

# Build the library
npm run build

npm test              # Run tests
npm run lint          # Check code style
npm run format        # Format code
npm run dev           # Watch mode
```

## Examples

Check out the `examples/` folder for complete working code:

- **payment-page.tsx** - Payment integration
- **shipping-manager.tsx** - Parcel tracking  
- **nextjs-app-router.ts** - Next.js App Router
- **nextjs-pages.tsx** - Next.js Pages

## Contributing

Want to contribute? Check out [CONTRIBUTING.md](./CONTRIBUTING.md) for how to get started.

## License

MIT License - see [LICENSE](./LICENSE)


## Credits

- Reference: [Yalidine-Dz-Laravel-Api](https://github.com/sebbahali/Yalidine-Dz-Laravel-Api)
- API: [Yalidine DZ](https://yalidine.app)
- Built for the Algerian dev community

## Need Help?

- 📧 Email: [me@oussamahomida.com](mailto:me@oussamahomida.com)
- 🐛 Issues: [GitHub](https://github.com/oussamahomida/yalidine-react-sdk/issues)

## Links

- [Yalidine Website](https://yalidine.app)
- [API Docs](https://api.yalidine.app/docs)
- [npm Package](https://www.npmjs.com/package/@yalidine/react-sdk)

---

Made with ❤️ by Oussama Homida
