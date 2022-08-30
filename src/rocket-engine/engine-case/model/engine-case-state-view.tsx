import { useStyleStatusText } from 'hooks/use-style-status-text';
import { renderStateAndDate } from 'infrastructure/render-state/render-state-and-date';
import { ReactNode } from 'react';
import { choiceColorState, chooseStateUa, EState } from '../const/choose-ua-title-transition-state';
import { isEngineCase } from '../entity/engine-case';

export const EngineCaseStateView = (value: unknown, data?: unknown): ReactNode => {
  if (!(typeof value === 'string' && isEngineCase(data))) {
    throw new Error('is not engine case');
  }
  const textUAState = chooseStateUa[value];

  const style = useStyleStatusText(value, choiceColorState);
  switch (value) {
    case EState.NEW:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.AT_INCOMING_CONTROL:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.INCOMING_CONTROL_LAB_RESULT_RECEIVED:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.INCOMING_CONTROL_FINISHED:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.IN_WAREHOUSE:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.IN_WORK:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.DEFECT_FOUND:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.RETURNED_TO_RMC:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.SURFACE_IS_CLEANED:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.SURFACE_IS_DEGREASED:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.PRESSFORM_PUT_TO_DRYING:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.PRESSFORM_DRYING_FINISHED:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.CUFFS_GLUED_IN_PRESSFORM:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.PRESSFORM_PUT_TO_CURING_KMK1:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.CURING_KMK1_FINISHED:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.APPLICATION_OF_KM1:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.KM1_APPLIED:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.KM1_POLYMERIZATION:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.TZP_DETAIL_LAB_ANALYSIS_REPORT_RECEIVED:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.KM1_POLYMERIZATION_FINISHED:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.TZP_ROUGHING_GOES:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.TZP_VISUAL_DEFECT_FOUND:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.MEASURING_THE_THICKNESS_OF_TZP:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.TZP_THICKNESS_MEASURING_FINISHED:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.UNDERSTATED_THICKNESS_TZP_DEFECT_FOUND:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.OVERESTIMATED_THICKNESS_TZP_DEFECT_FOUND:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.PRESSFORM_WITH_TZP_READY_BEFORE_SENDING_FOR_MEASUREMENT:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.PRESSFORM_WITH_TZP_ON_MEASUREMENT:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.PRESSFORM_WITH_TZP_RETURNED_FROM_MEASUREMENTS:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.AWAITING_APPLICATION_OF_KC:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.KC_APPLIED:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.KC_POLYMERIZATION:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.PRESSFORM_SAMPLE_LAB_ANALYSIS_REPORT_FOR_KC_RECEIVED:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.KC_POLYMERIZATION_FINISHED:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.READY_FOR_USE:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.USED_IN_PRODUCTION:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.AWAITING_MEASURING_THE_THICKNESS_OF_TZP:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.READY_TO_ASSEMBLE_WITH_EQUIPMENT_ENGINE_PRESSFORM:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.READY_FOR_TIGHTNESS_TEST:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.ON_TIGHTNESS_TEST:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.TIGHTNESS_TEST_DONE:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.READY_BEFORE_SENDING_FOR_THE_MOLDING_OPERATION:
      return renderStateAndDate(textUAState, data.createAt, style);
  }
};
