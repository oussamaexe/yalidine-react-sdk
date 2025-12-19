import React, { createContext, useContext, ReactNode } from 'react';
import { YalidineClient } from '../client';
import { YalidineConfig } from '../types';

interface YalidineContextType {
  client: YalidineClient | null;
}

const YalidineContext = createContext<YalidineContextType>({ client: null });

interface YalidineProviderProps {
  config: YalidineConfig;
  children: ReactNode;
}

// Wrap your app with this so all components can access the Yalidine client
export const YalidineProvider: React.FC<YalidineProviderProps> = ({ config, children }) => {
  const client = new YalidineClient(config);

  return <YalidineContext.Provider value={{ client }}>{children}</YalidineContext.Provider>;
};

// Use this hook to get the Yalidine client in your components
export const useYalidine = (): YalidineClient => {
  const context = useContext(YalidineContext);

  if (!context.client) {
    throw new Error('useYalidine must be used within YalidineProvider');
  }

  return context.client;
};

export default YalidineContext;
