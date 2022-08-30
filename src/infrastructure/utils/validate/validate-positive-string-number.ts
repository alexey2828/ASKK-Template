import { IParametersStringValidation, IValidation } from './interface';
import { isStringCommon } from './validate-string-common';

const MSG_STRING_NUMBER = 'Значення може містити тільки цифри, більше нуля, формату (хххххх.хх)';
const REG_EXR_NUMBER = /^[+]?\d{1,8}([.]\d{1,2})?$/u;
const MSG_STRING_INT_NUMBER = 'Значення може містити тільки цілі цифри, більше нуля, формату (хххххххх)';
const REG_EXR_INT_NUMBER = /^[+]?\d{1,8}$/u;

export function isPositiveStringNumber(str: string, param?: IParametersStringValidation): IValidation {
  let regExr = REG_EXR_NUMBER;
  let msgStr = MSG_STRING_NUMBER;
  if (param === typeof String) {
    regExr = REG_EXR_INT_NUMBER;
    msgStr = MSG_STRING_INT_NUMBER;
  }
  if (Number(str) <= 0) {
    return {
      valid: false,
      message: msgStr,
    };
  }
  return isStringCommon(str, param, regExr, msgStr);
}
