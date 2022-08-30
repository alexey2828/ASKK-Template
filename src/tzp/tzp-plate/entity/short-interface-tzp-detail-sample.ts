import { ILaboratoryAnalysis, isLaboratoryAnalysis } from 'laboratory/analysis/entity/laboratory-analysis';
import { TMember } from '../../../infrastructure/api-platform';

export interface IShortTzpDetailSample extends TMember {
  number: string;
  laboratoryAnalyzes: ILaboratoryAnalysis[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isShortTzpDetailSample(obj: any): obj is IShortTzpDetailSample {
  return (
    obj &&
    typeof obj.number === 'string' &&
    (!obj.laboratoryAnalyzes[0] || isLaboratoryAnalysis(obj.laboratoryAnalyzes[0]))
  );
}
