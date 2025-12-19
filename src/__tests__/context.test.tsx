import React, { ReactNode } from 'react';
import { renderHook } from '@testing-library/react';
import { YalidineProvider, useYalidine } from '../react/context';

describe('YalidineContext', () => {
  const config = { apiKey: 'test-key' };

  it('should provide client through context', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <YalidineProvider config={config}>{children}</YalidineProvider>
    );

    const { result } = renderHook(() => useYalidine(), { wrapper });
    expect(result.current).toBeDefined();
  });

  it('should throw error when useYalidine is used without provider', () => {
    // Suppress console.error for this test
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useYalidine());
    }).toThrow('useYalidine must be used within YalidineProvider');

    spy.mockRestore();
  });
});
