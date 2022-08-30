import { ILaboratoryAnalysis } from '../entity/laboratory-analysis';

export const getAnalysisForSubmitResult = (
  laboratoryAnalyzes?: ILaboratoryAnalysis[],
): ILaboratoryAnalysis | undefined => {
  if (laboratoryAnalyzes && laboratoryAnalyzes.length > 0) {
    return laboratoryAnalyzes.reduce((prev, current) => {
      return new Date(prev.createdAt) > new Date(current.createdAt) ? prev : current;
    });
  }
  return undefined;
};
