import { IParametersStringValidation, IValidation } from './interface';
import { isStringCommon } from './validate-string-common';

const MSG_STRING = 'Значення може містити тільки літери кирилиці';
const REG_EXR = /(?=.*[А-Яа-яЁёЇїІіЄєҐґ])/u;

export function isStringCyrillic(str: string, param?: IParametersStringValidation): IValidation {
  return isStringCommon(str, param, REG_EXR, MSG_STRING);
}
