import { useStyleStatusText } from 'hooks/use-style-status-text';
import { renderStateAndDate } from 'infrastructure/render-state/render-state-and-date';
import { ReactNode } from 'react';
import { choiceColorState, chooseStateUa, EState } from '../const/choose-ua-title-transition-state';
import { isRocketEngine } from '../entity/rocket-engine';

export const RocketEngineStateView = (value: unknown, data?: unknown): ReactNode => {
  if (!(typeof value === 'string' && isRocketEngine(data))) {
    throw new Error('is not RocketEngine');
  }
  const style = useStyleStatusText(value, choiceColorState);
  const textUAState = chooseStateUa[value];

  switch (value) {
    case EState.NEW:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.UNLOADED_ENGINE_ASSEMBLY_FINISHED:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.CENTER_OF_GRAVITY_UNLOADED_ENGINE_IS_DEFINED:
      return renderStateAndDate(textUAState, data.createAt, style);
    case EState.PRESSFORMS_SENT_FOR_FURTHER_OPERATIONS:
      return renderStateAndDate(textUAState, data.createAt, style);
  }
};
