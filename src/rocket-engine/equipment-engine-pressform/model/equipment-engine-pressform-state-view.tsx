import { useStyleStatusText } from 'hooks/use-style-status-text';
import { renderState } from 'infrastructure/render-state/render-state';
import { renderStateAndComment } from 'infrastructure/render-state/render-state-and-comment';
import { renderStateAndDate } from 'infrastructure/render-state/render-state-and-date';
import { getAnalysisForSubmitResult } from 'laboratory/analysis/util/get-analysis-for-submit-result';
import { ReactNode } from 'react';
import { isEquipmentEnginePressform } from '../entity/equipment-engine-pressform';
import { choiceColorState, chooseStateUa, EState } from '../const/choose-ua-title-transition-state';
import { TITLES_MIXING } from 'mixing/const/titles';

export const EquipmentEnginePressformStateView = (value: unknown, data?: unknown): ReactNode => {
  if (!(typeof value === 'string' && isEquipmentEnginePressform(data))) {
    throw new Error('is not EquipmentEnginePressform');
  }
  const style = useStyleStatusText(value, choiceColorState);
  const textUAState = chooseStateUa[value];
  const lastAnalysis = getAnalysisForSubmitResult(data.laboratoryAnalyzes);

  switch (value) {
    case EState.NEW:
      return renderStateAndDate(textUAState, data.createdAt, style);
    case EState.AT_INCOMING_CONTROL:
      return renderStateAndDate(textUAState, data.timeSendToLaboratory, style);
    case EState.INCOMING_CONTROL_LAB_RESULT_RECEIVED:
      return renderStateAndDate(textUAState, lastAnalysis?.createdAt, style);
    case EState.INCOMING_CONTROL_FINISHED:
      const backgroundColor = lastAnalysis?.isPositive ? style.backgroundColor : 'rgb(252, 75, 108)';
      return renderStateAndComment(textUAState, lastAnalysis?.comment, {
        ...style,
        backgroundColor,
      });
    case EState.IN_WAREHOUSE:
      return renderState(textUAState, style);
    case EState.IN_WORK:
      return renderState(textUAState, style);
    case EState.RETURNED_TO_RMC:
      return renderStateAndDate(textUAState, data.timeReturnToRmc, style);
    case EState.DEFECT_FOUND:
      return renderStateAndComment(textUAState, data.defect, style);
    case EState.AAP_APPLIED:
      return renderStateAndComment(textUAState, `${TITLES_MIXING.title} ААП: ${data.currentAap?.name}`, style);
    case EState.IN_AAP_POLYMERIZATION:
      return renderState(textUAState, style);
    case EState.TAKEN_INTO_AAP_INSPECTION:
      return renderState(textUAState, style);
    case EState.AAP_DEFECT_FOUND:
      return renderState(textUAState, style);
    case EState.FIXED_AAP_ROUGHING_COMPLETED:
      return renderState(textUAState, style);
    case EState.READY_FOR_USE:
      return renderState(textUAState, style);
    case EState.USED_IN_PRODUCTION:
      return renderState(textUAState, style);
    default:
      return renderState(textUAState, style);
  }
};
