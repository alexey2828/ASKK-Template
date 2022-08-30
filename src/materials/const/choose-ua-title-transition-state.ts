import { TTitleEnToUa } from '../../infrastructure/interface';

enum EStateUK {
  stateNew = 'lorem ipsum',
  stateAtIncomingControl = 'lorem ipsum',
  stateIncomingControlLabResultReceived = 'lorem ipsum',
  stateIncomingControlFinished = 'lorem ipsum',
  stateInWareHouse = 'lorem ipsum',
  stateInWork = 'lorem ipsum',
  stateDefectFound = 'lorem ipsum',
  stateReturnedToRmc = 'lorem ipsum',
  usedInProduction = 'lorem ipsum',
}

export enum EState {
  NEW = 'STATE_NEW',
  AT_INCOMING_CONTROL = 'STATE_AT_INCOMING_CONTROL',
  INCOMING_CONTROL_LAB_RESULT_RECEIVED = 'STATE_INCOMING_CONTROL_LAB_RESULT_RECEIVED',
  INCOMING_CONTROL_FINISHED = 'STATE_INCOMING_CONTROL_FINISHED',
  IN_WAREHOUSE = 'STATE_IN_WAREHOUSE',
  RETURNED_TO_RMC = 'STATE_RETURNED_TO_RMC',
  DEFECT_FOUND = 'STATE_DEFECT_FOUND',
  USED_IN_PRODUCTION = 'STATE_USED_IN_PRODUCTION',
}

export const chooseStateUa: TTitleEnToUa = {
  [EState.NEW]: EStateUK.stateNew,
  [EState.AT_INCOMING_CONTROL]: EStateUK.stateAtIncomingControl,
  [EState.INCOMING_CONTROL_LAB_RESULT_RECEIVED]: EStateUK.stateIncomingControlLabResultReceived,
  [EState.INCOMING_CONTROL_FINISHED]: EStateUK.stateIncomingControlFinished,
  [EState.IN_WAREHOUSE]: EStateUK.stateInWareHouse,
  [EState.DEFECT_FOUND]: EStateUK.stateDefectFound,
  [EState.RETURNED_TO_RMC]: EStateUK.stateReturnedToRmc,
  [EState.USED_IN_PRODUCTION]: EStateUK.usedInProduction,
};

export enum ETransitionsMaterial {
  SEND_TO_INCOMING_CONTROL = 'TRANSITION_SEND_TO_INCOMING_CONTROL',
  ADD_TO_WAREHOUSE = 'TRANSITION_ADD_TO_WAREHOUSE',
  TAKE_TO_WORK = 'TRANSITION_TAKE_TO_WORK',
  RETURN_TO_RMC = 'TRANSITION_RETURN_TO_RMC',
  REGISTER_MATERIAL_DEFECT = 'TRANSITION_REGISTER_MATERIAL_DEFECT',
}

export enum ETransitionsUK {
  commandSendToIncomingControl = 'lorem ipsum',
  commandAddToWarehouse = 'lorem ipsum',
  commandRegisterMaterialDefect = 'lorem ipsum',
  commandTakeToWork = 'lorem ipsum',
  commandReturnToRmc = 'lorem ipsum',
}

export const chooseTransitionsUa: TTitleEnToUa = {
  [ETransitionsMaterial.SEND_TO_INCOMING_CONTROL]: ETransitionsUK.commandSendToIncomingControl,
  [ETransitionsMaterial.ADD_TO_WAREHOUSE]: ETransitionsUK.commandAddToWarehouse,
  [ETransitionsMaterial.TAKE_TO_WORK]: ETransitionsUK.commandTakeToWork,
  [ETransitionsMaterial.RETURN_TO_RMC]: ETransitionsUK.commandReturnToRmc,
  [ETransitionsMaterial.REGISTER_MATERIAL_DEFECT]: ETransitionsUK.commandRegisterMaterialDefect,
};

export const choiceColorState: TTitleEnToUa = {
  [EState.NEW]: 'rgb(27, 151, 245)', // (голубой),
  [EState.AT_INCOMING_CONTROL]: 'rgb(253, 201, 15)', // (желтый),
  [EState.INCOMING_CONTROL_LAB_RESULT_RECEIVED]: 'rgb(126, 126, 126)', // (серый),
  [EState.INCOMING_CONTROL_FINISHED]: 'rgb(57, 203, 127)', // (зеленый),
  [EState.IN_WAREHOUSE]: 'rgb(57, 203, 127)', // (зеленый),
  [EState.RETURNED_TO_RMC]: 'rgb(253, 201, 15)', // (желтый),
  [EState.DEFECT_FOUND]: 'rgb(156, 39, 176)', // (фиолетовый),
  [EState.USED_IN_PRODUCTION]: 'rgb(253, 201, 15)', // (желтый),
};
