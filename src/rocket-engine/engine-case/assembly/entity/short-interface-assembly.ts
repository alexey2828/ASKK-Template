import { TMember } from '../../../../infrastructure/api-platform';

export type IShortAssembly = TMember;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isShortAssembly(obj: any): obj is IShortAssembly {
  return !!obj;
}
