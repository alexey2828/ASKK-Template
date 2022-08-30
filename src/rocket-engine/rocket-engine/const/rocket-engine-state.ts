import { TITLES_ROCKET_ENGINE_STATE } from './title';

export enum ERocketEngineStates {
  NEW = 'STATE_NEW',
  UNLOADED_ENGINE_ASSEMBLY_FINISHED = 'STATE_UNLOADED_ENGINE_ASSEMBLY_FINISHED',
  CENTER_OF_GRAVITY_UNLOADED_ENGINE_IS_DEFINED = 'STATE_CENTER_OF_GRAVITY_UNLOADED_ENGINE_IS_DEFINED',
  PRESSFORMS_SENT_FOR_FURTHER_OPERATIONS = 'STATE_PRESSFORMS_SENT_FOR_FURTHER_OPERATIONS',
}

export const choiceRocketEngineUAState = {
  [ERocketEngineStates.NEW]: TITLES_ROCKET_ENGINE_STATE.stateNew,
  [ERocketEngineStates.UNLOADED_ENGINE_ASSEMBLY_FINISHED]:
    TITLES_ROCKET_ENGINE_STATE.stateUnloadedEngineAssemblyFinished,
  [ERocketEngineStates.CENTER_OF_GRAVITY_UNLOADED_ENGINE_IS_DEFINED]:
    TITLES_ROCKET_ENGINE_STATE.stateCenterofGravityUnloadedEngineIsDefined,
  [ERocketEngineStates.PRESSFORMS_SENT_FOR_FURTHER_OPERATIONS]:
    TITLES_ROCKET_ENGINE_STATE.statePressformSentForFurtherOperations,
};

export const choiceColorTextStatus = {
  [ERocketEngineStates.NEW]: 'rgb(27, 151, 245)', // (голубой)
  [ERocketEngineStates.UNLOADED_ENGINE_ASSEMBLY_FINISHED]: 'rgb(156, 39, 176)', // (фиолетовый)
  [ERocketEngineStates.CENTER_OF_GRAVITY_UNLOADED_ENGINE_IS_DEFINED]: 'rgb(156, 39, 176)', // (фиолетовый)
  [ERocketEngineStates.PRESSFORMS_SENT_FOR_FURTHER_OPERATIONS]: 'rgb(156, 39, 176)', // (фиолетовый)
};
