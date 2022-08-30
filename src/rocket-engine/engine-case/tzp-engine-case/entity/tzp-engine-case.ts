import { isVisualCoatingPlant, IVisualCoatingPlant } from 'plant/visual-control-plant/entity/visual-control-plant';
import { IAppliedMixing, isAppliedMixing } from 'rocket-engine/engine-case/applied-mixing/entity/applied-mixing';
import { isTzpThickness, ITzpThickness } from 'rocket-engine/engine-case/entity/tzp-thickness';
import { isTzpDefect, ITzpDefect } from 'rocket-engine/engine-case/tzp-deffect/entity/tzp-defect';
import {
  isTzpVisualDefect,
  ITzpVisualDefect,
} from 'rocket-engine/engine-case/tzp-visual-defect.ts/entity/tzp-visual-defect';
import { isUzdPlant, IUzdPlant } from 'rocket-engine/engine-case/uzd-plant/entity/uzd-plant';
import { TMember } from '../../../../infrastructure/api-platform';

export interface ITzpEngineCase extends TMember {
  appliedMixings: IAppliedMixing[];
  createAt: string;
  dateRoughing: string;
  appearanceRoughing: string;
  visualControlPlant: IVisualCoatingPlant | null;
  tzpVisualDefects: ITzpVisualDefect[];
  tzpThicknesses: ITzpThickness[];
  uzdPlant: IUzdPlant | null;
  tzpDefects: ITzpDefect[];
  engineCase: string | null;
  commentOnCorrectedDefects: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTzpEngineCase(obj: any): obj is ITzpEngineCase {
  return (
    obj &&
    (!obj.appliedMixings[0] || isAppliedMixing(obj.appliedMixings[0])) &&
    typeof obj.createAt === 'string' &&
    typeof obj.dateRoughing === 'string' &&
    typeof obj.appearanceRoughing === 'string' &&
    (!obj.visualControlPlant || isVisualCoatingPlant(obj.visualControlPlant)) &&
    (!obj.tzpVisualDefects[0] || isTzpVisualDefect(obj.tzpVisualDefects[0])) &&
    (!obj.tzpThicknesses[0] || isTzpThickness(obj.tzpThicknesses[0])) &&
    (!obj.uzdPlant || isUzdPlant(obj.uzdPlant)) &&
    (!obj.tzpDefects[0] || isTzpDefect(obj.tzpDefects[0])) &&
    (!obj.engineCase || typeof obj.engineCase === 'string') &&
    (!obj.commentOnCorrectedDefects || typeof obj.commentOnCorrectedDefects === 'string')
  );
}
