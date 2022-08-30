/**
 * type obj = {[key: string]: obj | string}
 * key example: 'obj.field', 'obj.obj1.field'
 * typeof value field - string
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function findStringValueInObj(key: string, obj: any): string {
  const keys = key.split('.');
  let outValue = '';
  Object.entries(obj).forEach(([objKey, value]) => {
    if (keys[0] === objKey) {
      if (typeof value === 'string') {
        outValue = value;
      } else {
        const newKey = keys.slice(1).toString().replace(',', '.');
        outValue = findStringValueInObj(newKey, value);
      }
    }
  });
  return outValue;
}
