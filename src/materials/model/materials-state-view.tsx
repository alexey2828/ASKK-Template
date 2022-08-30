import { useStyleStatusText } from 'hooks/use-style-status-text';
import { renderStateAndComment } from 'infrastructure/render-state/render-state-and-comment';
import { renderStateAndDate } from 'infrastructure/render-state/render-state-and-date';
import { renderStateAndDateAndTimeProcess } from 'infrastructure/render-state/render-state-and-date-and-time-process';
import { renderStateAndTimeProcess } from 'infrastructure/render-state/render-state-and-time-process';
import { renderStateAndCommentAndTimeProcess } from 'infrastructure/render-state/render-state-and-comment-and-time-process';
import { getAnalysisForSubmitResult } from 'laboratory/analysis/util/get-analysis-for-submit-result';
import { ReactNode } from 'react';
import { choiceColorState, chooseStateUa, EState } from 'materials/const/choose-ua-title-transition-state';
import { renderState } from 'infrastructure/render-state/render-state';
import { isMaterialState } from 'materials/entity/material-state';

export const MaterialStateView = (value: unknown, data?: unknown): ReactNode => {
  if (!(typeof value === 'string' && isMaterialState(data))) {
    throw new Error('is not CassetsEnginePressform');
  }
  const style = useStyleStatusText(value, choiceColorState);
  const textUAState = chooseStateUa[value];
  const lastAnalysis = getAnalysisForSubmitResult(data.laboratoryAnalyzes);

  switch (value) {
    case EState.NEW:
      return renderStateAndDate(textUAState, data.createdAt, style);
    case EState.AT_INCOMING_CONTROL:
      return renderStateAndTimeProcess(textUAState, data, style);
    case EState.INCOMING_CONTROL_LAB_RESULT_RECEIVED:
      return renderStateAndTimeProcess(textUAState, data, style);
    case EState.INCOMING_CONTROL_FINISHED:
      return renderStateAndTimeProcess(textUAState, data, style);
    case EState.IN_WAREHOUSE:
      return renderStateAndDateAndTimeProcess(textUAState, data.timeSendToLaboratory, data, style);
    case EState.RETURNED_TO_RMC:
      const backgroundColor = lastAnalysis?.isPositive ? style.backgroundColor : 'rgb(252, 75, 108)';
      return renderStateAndCommentAndTimeProcess(textUAState, lastAnalysis?.comment, data, {
        ...style,
        backgroundColor,
      });
    case EState.DEFECT_FOUND:
      return renderStateAndComment(textUAState, data.defect, style);
    case EState.USED_IN_PRODUCTION:
      return renderState(textUAState, style);
  }
};
