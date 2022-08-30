export interface IValidation {
  valid: boolean;
  message: string;
}

export interface IParametersStringValidation {
  maxLength?: number;
  minLength?: number;
}
