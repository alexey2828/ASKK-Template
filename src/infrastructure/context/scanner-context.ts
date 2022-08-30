import { TMember } from 'infrastructure/api-platform';
import React from 'react';

export type TScannerContext = {
  entity: (Record<string, unknown> & TMember) | null;
  isLoading: boolean;
  messageError: string;
  resetError: () => void;
  cleanScan: () => void;
};

export const initScannerContext: TScannerContext = {
  entity: null,
  isLoading: false,
  messageError: '',
  resetError: () => {},
  cleanScan: () => {},
};

export const ScannerContext = React.createContext<TScannerContext>(initScannerContext);
