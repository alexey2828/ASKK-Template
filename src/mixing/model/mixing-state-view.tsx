import { useStyleStatusText } from 'hooks/use-style-status-text';
import { renderState } from 'infrastructure/render-state/render-state';
import { renderStateAndComment } from 'infrastructure/render-state/render-state-and-comment';
import { renderStateAndDate } from 'infrastructure/render-state/render-state-and-date';
import { renderStateAndDateAndTimeProcess } from 'infrastructure/render-state/render-state-and-date-and-time-process';
import { renderStateAndTimeProcess } from 'infrastructure/render-state/render-state-and-time-process';
import { renderStateAndCommentAndTimeProcess } from 'infrastructure/render-state/render-state-and-comment-and-time-process';
import { getAnalysisForSubmitResult } from 'laboratory/analysis/util/get-analysis-for-submit-result';
import { choiceColorState, chooseStateUa, EState } from 'mixing/const/choose-ua-title-transition-state';
import { isMixing } from 'mixing/entity/mixing/mixing';
import { ReactNode } from 'react';

export const MixingStateView = (value: unknown, data?: unknown): ReactNode => {
  if (!(typeof value === 'string' && isMixing(data))) {
    throw new Error('is not Mixing');
  }
  const style = useStyleStatusText(value, choiceColorState);
  const textUAState = chooseStateUa[value];
  const lastAnalysis = getAnalysisForSubmitResult(data.laboratoryAnalyzes);

  switch (value) {
    case EState.NEW:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.COMPONENT_ADDED:
      return renderStateAndTimeProcess(textUAState, data, style);
    case EState.MIXER_ON:
      return renderStateAndTimeProcess(textUAState, data, style);
    case EState.MIXER_PAUSE:
      return renderStateAndTimeProcess(textUAState, data, style);
    case EState.SENT_TO_LABORATORY:
      return renderStateAndDateAndTimeProcess(textUAState, data.timeSendToLaboratory, data, style);
    case EState.ANALYSIS_CREATED:
      return renderStateAndDateAndTimeProcess(textUAState, lastAnalysis?.createdAt, data, style);
    case EState.ANALYSIS_DONE:
      const backgroundColor = lastAnalysis?.isPositive ? style.backgroundColor : 'rgb(252, 75, 108)';
      return renderStateAndCommentAndTimeProcess(textUAState, lastAnalysis?.comment, data, {
        ...style,
        backgroundColor,
      });
    case EState.REJECT_FOR_USE:
      return renderStateAndComment(textUAState, data.comment, style);
    case EState.READY_FOR_USE:
      return renderStateAndComment(textUAState, data.comment, style);
    case EState.ENDED:
      return renderStateAndDate(textUAState, data.endTime, style);
    case EState.CREATED_COMPONENT_BATCH:
      return renderState(textUAState, style);
    default:
      return renderState(textUAState, style);
  }
};
