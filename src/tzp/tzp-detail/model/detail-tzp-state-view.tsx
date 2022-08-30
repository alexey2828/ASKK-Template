import { useStyleStatusText } from 'hooks/use-style-status-text';
import { renderState } from 'infrastructure/render-state/render-state';
import { renderStateAndComment } from 'infrastructure/render-state/render-state-and-comment';
import { renderStateAndDate } from 'infrastructure/render-state/render-state-and-date';
import { renderStateAndTimeProcess } from 'infrastructure/render-state/render-state-and-time-process';
import { ReactNode } from 'react';
import { isTzpDetail } from '../entity/tzp-detail';
import { choiceColorState, chooseStateUa, EState } from 'tzp/tzp-detail/const/choose-ua-title-transition-state';

export const DetailTzpStateView = (value: unknown, data?: unknown): ReactNode => {
  if (!(typeof value === 'string' && isTzpDetail(data))) {
    throw new Error('is not Detail tzp');
  }
  const style = useStyleStatusText(value, choiceColorState);
  const textUAState = chooseStateUa[value];

  switch (value) {
    case EState.STATE_NEW:
      return renderStateAndDate(textUAState, data.createdAt, style);
    case EState.STATE_KM1_POLYMERIZATION_FINISHED:
      return renderState(textUAState, style);
    case EState.STATE_DEFECT_FOUND:
      return renderStateAndComment(textUAState, data.defectDescription, style);
    case EState.STATE_ROUGHING_GOES:
      return renderStateAndTimeProcess(textUAState, data, style);
    case EState.STATE_ROUGHING_COMPLETED:
      return renderState(textUAState, style);
    case EState.STATE_QUALITY_CONTROL_REPORT_ADDED:
      return renderStateAndTimeProcess(textUAState, data, style);
    case EState.STATE_READY_FOR_USE:
      return renderStateAndComment(textUAState, data.defectDescription, style);
    case EState.STATE_REJECTED_FOR_USE:
      return renderStateAndComment(textUAState, data.defectDescription, style);
    case EState.STATE_USED_IN_PRODUCTION:
      return renderState(textUAState, style);
    case EState.STATE_SURFACE_IS_DEGREASED:
      return renderState(textUAState, style);
  }
};
