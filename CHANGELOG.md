## [1.1.0] - 2025-12-19

### New Stuff
- **Parcel Management** - Create, fetch, and delete parcels
- **Delivery Fees** - Check shipping costs by wilaya
- **Tracking** - See where your parcels are
- **Flexible Auth** - Use either Bearer tokens or API ID/Token headers
- **useParcels Hook** - New React hook for managing shipments
- **Full TypeScript Support** - Types for all the parcel stuff
- **Example Code** - Complete shipping manager example
- **Better Errors** - Now includes HTTP status codes
- **More Types** - ParcelRequest, ParcelResponse, DeliveryFeeResponse, etc.

### Changed
- Config is more flexible now (works with apiKey or apiId + apiToken)
- Webhooks now handle parcel events too
- Error messages actually tell you the HTTP status code

### Docs
- Updated README with shipping examples
- Added shipping manager example
- Better documentation overall

## [1.0.0] - 2025-12-19

### First Release!

What's included:
- API client for Yalidine
- React Context setup
- `usePayment` hook
- `useYalidine` hook
- `PaymentButton` component (drop-in ready)
- Full TypeScript support
- Works with ESM, CommonJS, and UMD
- Documentation
- Tests
- Linting setup

Payment features:
- Create payments
- Check payment status
- Verify payments
- Cancel payments
- List all payments
- Works with React and Next.js
