import { TMember } from '../../../../infrastructure/api-platform';
import { ITypeTzpDetail } from '../../../type-tzp-detail/entity/type-tzp-detail';

export interface IShortTzpPressform extends TMember {
  pressformNumber: string;
  typeTzpDetail: ITypeTzpDetail;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isShortTzpPressform(obj: any): obj is IShortTzpPressform {
  return obj && typeof obj.pressformNumber === 'string';
}
