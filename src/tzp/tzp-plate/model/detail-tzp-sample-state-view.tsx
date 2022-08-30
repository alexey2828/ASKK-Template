import { useStyleStatusText } from 'hooks/use-style-status-text';
import { renderState } from 'infrastructure/render-state/render-state';
import { renderStateAndDate } from 'infrastructure/render-state/render-state-and-date';
import { renderStateAndDateAndTimeProcess } from 'infrastructure/render-state/render-state-and-date-and-time-process';
import { renderStateAndCommentAndTimeProcess } from 'infrastructure/render-state/render-state-and-comment-and-time-process';
import { getAnalysisForSubmitResult } from 'laboratory/analysis/util/get-analysis-for-submit-result';
import { ReactNode } from 'react';
import { choiceColorState, chooseStateUa, EState } from '../const/choose-ua-title-transition-state';
import { isTzpDetailSample } from '../entity/tzp-plate';

export const DetailTzpSampleStateView = (value: unknown, data?: unknown): ReactNode => {
  if (!(typeof value === 'string' && isTzpDetailSample(data))) {
    throw new Error('is not tzp detail sample');
  }
  const style = useStyleStatusText(value, choiceColorState);
  const textUAState = chooseStateUa[value];
  const lastAnalysis = getAnalysisForSubmitResult(data.laboratoryAnalyzes);

  switch (value) {
    case EState.STATE_NEW:
      return renderStateAndDate(textUAState, data.createdAt, style);
    case EState.STATE_KM1_POLYMERIZATION_FINISHED:
      return renderState(textUAState, style);
    case EState.STATE_SENT_TO_LABORATORY:
      return renderStateAndDateAndTimeProcess(textUAState, data.sendToLaboratory, data, style);
    case EState.STATE_ANALYSIS_CREATED:
      return renderStateAndDateAndTimeProcess(textUAState, lastAnalysis?.createdAt, data, style);
    case EState.STATE_ANALYSIS_DONE:
      lastAnalysis?.isPositive ? style.backgroundColor : 'rgb(252, 75, 108)';
      return renderStateAndCommentAndTimeProcess(textUAState, lastAnalysis?.comment, data, {
        ...style,
        backgroundColor: 'rgb(53, 228, 105)',
      });
  }
};
