import { TMember } from '../../../../infrastructure/api-platform';

export type IShortTzpDefect = TMember;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isShortTzpDefect(obj: any): obj is IShortTzpDefect {
  return !!obj;
}
