import { TMember } from '../../../infrastructure/api-platform';
import { ILaboratoryAnalysis, isLaboratoryAnalysis } from '../../../laboratory/analysis/entity/laboratory-analysis';

export interface IQualityReport extends TMember {
  appearance: string;
  weight: number;
  laboratoryAnalysis: ILaboratoryAnalysis | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isQualityReport(obj: any): obj is IQualityReport {
  return (
    obj &&
    typeof obj.appearance === 'string' &&
    typeof obj.weight === 'number' &&
    (!obj.laboratoryAnalysis || isLaboratoryAnalysis(obj.laboratoryAnalysis))
  );
}
