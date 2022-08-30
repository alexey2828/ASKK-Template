import { ECommonTitleValidate } from './const/common-title-validate';
import { IParametersStringValidation, IValidation } from './interface';

const MSG_STRING_COMMON =
  'Значення може містити тільки літери кирилиці, латиниці, числа та символи ",.№?!_-+()*/"±%:<>₀₁₂₃₄₅₆₇₈₉⁰¹²³⁴⁵⁶⁷⁸⁹ω℃';
const MAX_LENGTH = 255;
const MIN_LENGTH = 0;

const REG_EXR_COMMON = /^$|^[\sA-Za-zА-Яа-яЁёЇїІіЄєҐґ0-9' ,.№?!_\-+()*₀₁₂₃₄₅₆₇₈₉⁰¹²³⁴⁵⁶⁷⁸⁹ω℃±%:<>"\\/]+$/u;

export function isStringCommon(
  str: string,
  param?: IParametersStringValidation,
  regExp = REG_EXR_COMMON,
  message = MSG_STRING_COMMON,
): IValidation {
  const maxLength = param?.maxLength || MAX_LENGTH;
  const minLength = param?.minLength || MIN_LENGTH;

  if (typeof str !== 'string') {
    return {
      valid: false,
      message: ECommonTitleValidate.msgValueNotString,
    };
  }
  if (str.length > maxLength) {
    return {
      valid: false,
      message: `${ECommonTitleValidate.msgValueMaxLength} ${maxLength}`,
    };
  }
  if (str.length < minLength) {
    return {
      valid: false,
      message: `${ECommonTitleValidate.msgValueMinLength} ${minLength}`,
    };
  }
  if (minLength > 1) {
    const spaces = str.match(/ /g) || [];
    if (str.length === spaces.length) {
      return {
        valid: false,
        message: `${ECommonTitleValidate.msgValueMinLength} ${minLength}`,
      };
    }
  }
  if (regExp.test(str)) {
    return {
      valid: true,
      message: '',
    };
  }

  return {
    valid: false,
    message,
  };
}
