import { useStyleStatusText } from 'hooks/use-style-status-text';
import { renderStateAndComment } from 'infrastructure/render-state/render-state-and-comment';
import { renderStateAndDate } from 'infrastructure/render-state/render-state-and-date';
import { renderStateAndDateAndTimeProcess } from 'infrastructure/render-state/render-state-and-date-and-time-process';
import { renderStateAndCommentAndTimeProcess } from 'infrastructure/render-state/render-state-and-comment-and-time-process';
import { getAnalysisForSubmitResult } from 'laboratory/analysis/util/get-analysis-for-submit-result';
import { ReactNode } from 'react';
import { isComponentBatchPlace } from 'component-batch-place/entity/component-batch-place';
import { choiceColorState } from 'mixing/const/choose-ua-title-transition-state';
import { chooseStateUa, EState } from 'component-batch-place/const/choose-ua-title-transition-state';

export const ComponentBatchPlaceStateView = (value: unknown, data?: unknown): ReactNode => {
  if (!(typeof value === 'string' && isComponentBatchPlace(data))) {
    throw new Error('is not Component Batch Place');
  }
  const style = useStyleStatusText(value, choiceColorState);
  const textUAState = chooseStateUa[value];
  const lastAnalysis = getAnalysisForSubmitResult(data.laboratoryAnalyzes);

  switch (value) {
    case EState.STATE_NEW:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.STATE_SENT_TO_LABORATORY:
      return renderStateAndDateAndTimeProcess(textUAState, data.timeSendToLaboratory, data, style);
    case EState.STATE_ANALYSIS_CREATED:
      return renderStateAndDateAndTimeProcess(textUAState, lastAnalysis?.createdAt, data, style);
    case EState.STATE_ANALYSIS_DONE:
      const backgroundColor = lastAnalysis?.isPositive ? style.backgroundColor : 'rgb(252, 75, 108)';
      return renderStateAndCommentAndTimeProcess(textUAState, lastAnalysis?.comment, data, {
        ...style,
        backgroundColor,
      });
    case EState.STATE_READY_FOR_USE:
      return renderStateAndComment(textUAState, data.comment, style);
    case EState.STATE_REJECTED_FOR_USE:
      return renderStateAndComment(textUAState, data.comment, style);
    case EState.STATE_ENDED:
      return renderStateAndDate(textUAState, data.endTime, style);
  }
};
