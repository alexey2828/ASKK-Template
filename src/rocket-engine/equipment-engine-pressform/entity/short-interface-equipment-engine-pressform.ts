import { TMember } from '../../../infrastructure/api-platform';

export interface IShortEquipmentEnginePressform extends TMember {
  name: string;
}

export function isShortEquipmentEnginePressform(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is IShortEquipmentEnginePressform {
  return obj && typeof obj.name === 'string';
}
