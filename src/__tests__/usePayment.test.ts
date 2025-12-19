import { renderHook } from '@testing-library/react';
import { usePayment } from '../react/usePayment';
import { useYalidine } from '../react/context';

jest.mock('../react/context', () => ({
  ...jest.requireActual('../react/context'),
  useYalidine: jest.fn(),
}));

const mockedUseYalidine = useYalidine as jest.MockedFunction<typeof useYalidine>;

describe('usePayment hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    const mockClient = {
      createPayment: jest.fn(),
      getPayment: jest.fn(),
      verifyPayment: jest.fn(),
    };

    mockedUseYalidine.mockReturnValue(mockClient as any);

    const { result } = renderHook(() => usePayment());
    expect(result.current).toBeDefined();
    expect(result.current.createPayment).toBeDefined();
    expect(result.current.getPayment).toBeDefined();
    expect(result.current.verifyPayment).toBeDefined();
  });

  it('should initialize with default state', () => {
    const mockClient = {
      createPayment: jest.fn(),
      getPayment: jest.fn(),
      verifyPayment: jest.fn(),
    };

    mockedUseYalidine.mockReturnValue(mockClient as any);

    const { result } = renderHook(() => usePayment());
    expect(result.current.payment).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
