import { TMember } from '../../../infrastructure/api-platform';

export type ITzpThickness = TMember;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTzpThickness(obj: any): obj is ITzpThickness {
  return !!obj;
}
