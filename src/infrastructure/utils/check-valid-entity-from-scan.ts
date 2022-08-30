import { TGetParameter } from '../custom-query-string/custom-query-string';
import { findStringValueInObj } from './find-string-value-in-obj';

export function checkValidEntityFromScan<T>(getParameters: TGetParameter, entity: T): boolean {
  return !Object.keys(getParameters).find(key => {
    const value = getParameters[key];
    if (Array.isArray(value)) {
      return !value.includes(findStringValueInObj(key.replace('[]', ''), entity));
    }
    return value !== findStringValueInObj(key, entity);
  });
}
