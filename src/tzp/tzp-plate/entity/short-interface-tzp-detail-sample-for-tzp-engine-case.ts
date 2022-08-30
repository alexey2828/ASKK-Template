import { TMember } from '../../../infrastructure/api-platform';

export interface IShortTzpDetailSampleForTzpEngineCase extends TMember {
  number: string;
}

export function isShortTzpDetailSampleForTzpEngineCase(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is IShortTzpDetailSampleForTzpEngineCase {
  return obj && typeof obj.number === 'string';
}
