import { TMember } from 'infrastructure/api-platform';

export interface IShortCassetteEnginePressform extends TMember {
  name: string;
}

export function isShortCassetteEnginePressform(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is IShortCassetteEnginePressform {
  return obj && typeof obj.name === 'string';
}
