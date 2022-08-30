import { useStyleStatusText } from 'hooks/use-style-status-text';
import { renderState } from 'infrastructure/render-state/render-state';
import { renderStateAndComment } from 'infrastructure/render-state/render-state-and-comment';
import { renderStateAndDate } from 'infrastructure/render-state/render-state-and-date';
import { renderStateAndDateAndTimeProcess } from 'infrastructure/render-state/render-state-and-date-and-time-process';
import { renderStateAndTimeProcess } from 'infrastructure/render-state/render-state-and-time-process';
import { renderStateAndCommentAndTimeProcess } from 'infrastructure/render-state/render-state-and-comment-and-time-process';
import { getAnalysisForSubmitResult } from 'laboratory/analysis/util/get-analysis-for-submit-result';
import { ReactNode } from 'react';
import { chooseStateUa, EState, choiceColorState } from 'tzp/tzp-pressform/const/choose-ua-title-transition-state';
import { isTzpPressform } from '../entity/tzp-pressform/tzp-pressform';

export const PressformTzpStateView = (value: unknown, data?: unknown): ReactNode => {
  if (!(typeof value === 'string' && isTzpPressform(data))) {
    throw new Error('is not Pressform Tzp');
  }
  const style = useStyleStatusText(value, choiceColorState);
  const textUAState = chooseStateUa[value];
  const lastAnalysis = getAnalysisForSubmitResult(data.laboratoryAnalyzes);

  switch (value) {
    case EState.STATE_NEW:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.STATE_AT_INCOMING_CONTROL:
      return renderStateAndTimeProcess(textUAState, data, style);
    case EState.STATE_INCOMING_CONTROL_LAB_RESULT_RECEIVED:
      const backgroundColor = lastAnalysis?.isPositive ? style.backgroundColor : 'rgb(252, 75, 108)';
      return renderStateAndCommentAndTimeProcess(textUAState, lastAnalysis?.comment, data, {
        ...style,
        backgroundColor: 'rgb(53, 228, 105)',
      });
    case EState.STATE_INCOMING_CONTROL_FINISHED:
      return renderStateAndCommentAndTimeProcess(textUAState, lastAnalysis?.comment, data, {
        ...style,
        backgroundColor: 'rgb(53, 228, 105)',
      });
    case EState.STATE_IN_WAREHOUSE:
      return renderState(textUAState, style);
    case EState.STATE_IN_WORK:
      return renderState(textUAState, style);
    case EState.STATE_AAP_APPLIED:
      return renderStateAndTimeProcess(textUAState, data, style);
    case EState.STATE_RETURNED_TO_RMC:
      return renderState(textUAState, style);
    case EState.STATE_DEFECT_FOUND:
      return renderStateAndComment(textUAState, data.pressformDefect, style);
    case EState.STATE_IN_AAP_POLYMERIZATION:
      return renderStateAndDateAndTimeProcess(textUAState, data.timeSendToLaboratory, data, style);
    case EState.STATE_TAKEN_INTO_AAP_INSPECTION:
      return renderStateAndDateAndTimeProcess(textUAState, data.timeSendToLaboratory, data, style);
    case EState.STATE_AAP_DEFECT_FOUND:
      return renderStateAndComment(textUAState, data.aapDefect, style);
    case EState.STATE_TZP_DETAIL_ADDED:
      return renderStateAndComment(textUAState, data.aapDefect, style);
    case EState.STATE_KM1_FILED:
      return renderStateAndDateAndTimeProcess(textUAState, data.timeSendToLaboratory, data, style);
    case EState.STATE_KM1_PUT_TO_POLYMERIZATION_WITH_OPEN_CAP:
      return renderStateAndDateAndTimeProcess(textUAState, data.timeSendToLaboratory, data, style);
    case EState.STATE_KM1_PUT_TO_POLYMERIZATION_WITH_CLOSED_CAP:
      return renderStateAndDateAndTimeProcess(textUAState, data.timeSendToLaboratory, data, style);
    case EState.STATE_KM1_POLYMERIZATION_FINISHED:
      return renderStateAndDateAndTimeProcess(textUAState, data.timeSendToLaboratory, data, style);
    case EState.STATE_TZP_DETAIL_LAB_ANALYSIS_REPORT_RECEIVED:
      return renderStateAndCommentAndTimeProcess(textUAState, lastAnalysis?.comment, data, {
        ...style,
        backgroundColor: 'rgb(53, 228, 105)',
      });
  }
};
