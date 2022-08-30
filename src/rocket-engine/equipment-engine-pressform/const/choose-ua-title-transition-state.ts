import { TTitleEnToUa } from '../../../infrastructure/interface';

export enum ETransitionsEquipmentEnginePressform {
  SEND_TO_INCOMING_CONTROL = 'TRANSITION_SEND_TO_INCOMING_CONTROL',
  ADD_TO_WAREHOUSE = 'TRANSITION_ADD_TO_WAREHOUSE',
  TAKE_TO_WORK = 'TRANSITION_TAKE_TO_WORK',
  RETURN_TO_RMC = 'TRANSITION_RETURN_TO_RMC',
  REGISTER_MATERIAL_DEFECT = 'TRANSITION_REGISTER_MATERIAL_DEFECT',
  APPLY_AAP = 'TRANSITION_APPLY_AAP',
  PUT_INTO_AAP_POLYMERIZATION = 'TRANSITION_PUT_INTO_AAP_POLYMERIZATION',
  SEND_TO_AAP_INSPECTION = 'TRANSITION_SEND_TO_AAP_INSPECTION',
  APPROVE_FOR_USE = 'TRANSITION_APPROVE_FOR_USE',
  REGISTER_AAP_DEFECT = 'TRANSITION_REGISTER_AAP_DEFECT',
  FIX_AAP_APPLY_NEW_AAP = 'TRANSITION_FIX_AAP_APPLY_NEW_AAP',
  FIX_AAP_ROUGHING = 'TRANSITION_FIX_AAP_ROUGHING',
}

export const ETransitionsUK = {
  commandSendToIncomingControl: 'Відправити нa вхідний контроль',
  commandReceiveIncomingContolResult: 'Додати акт вхідного контролю',
  commandCompleteIncomingControl: 'Додати висновок до акту вхідного контролю',
  commandAddToWarehouse: 'Помістити на склад будівлі',
  commandRegisterMaterialDefect: 'Зареєструвати дефект',
  commandTakeToWork: 'Взяти у роботу',
  commandReturnToRmc: 'Повернути до РМЦ',
  commandApplyAap: 'Нанести ААП',
  commandPutIntoAapPolymerization: 'Помістить на полімеризацію ААП',
  commandSendToAapInspection: 'Відправити на огляд ААП',
  commandApproveForUse: 'Допустити у виробництво',
  commandRegisterAapDefect: 'Зареєструвати дефект ААП',
  commandFixAapApplyNewAap: 'Виправити нанесений ААП, за допомоги нового ААП',
  commandFixAapRoughing: 'Виправити нанесений ААП, за допомоги шероховки',
};

export const chooseTransitionsUa: TTitleEnToUa = {
  [ETransitionsEquipmentEnginePressform.SEND_TO_INCOMING_CONTROL]: ETransitionsUK.commandSendToIncomingControl,
};

const EStateUK = {
  stateNew: 'В РМЦ',
  stateAtIncomingControl: 'На вхідному контролі',
  stateIncomingControlLabResultReceived: 'Отримано акт вхідного контролю',
  stateIncomingControlFinished: 'Вхідний контроль проведено',
  stateInWareHouse: 'На складі будівлі',
  stateInWork: 'Допущена до нанесення ААП',
  stateDefectFound: 'Зареєстровано дефект',
  stateReturnedToRmc: 'В РМЦ (брак)',
  stateAapApplied: 'Оснастка формуюча з нанесеним ААП',
  stateInAapPolymerization: 'На полімеризації ААП',
  stateTakenIntoAapInspection: 'Огляд ААП',
  stateAapDefectFound: 'Зареєстровано дефект ААП',
  stateFixedAapRoughingCompleted: 'Шероховка завершена',
  stateReadyForUse: 'Допущено у виробництво',
  stateUsedInProduction: 'Використовується у виробництві',
};

export enum EState {
  NEW = 'STATE_NEW',
  AT_INCOMING_CONTROL = 'STATE_AT_INCOMING_CONTROL',
  INCOMING_CONTROL_LAB_RESULT_RECEIVED = 'STATE_INCOMING_CONTROL_LAB_RESULT_RECEIVED',
  INCOMING_CONTROL_FINISHED = 'STATE_INCOMING_CONTROL_FINISHED',
  IN_WAREHOUSE = 'STATE_IN_WAREHOUSE',
  IN_WORK = 'STATE_IN_WORK',
  RETURNED_TO_RMC = 'STATE_RETURNED_TO_RMC',
  DEFECT_FOUND = 'STATE_DEFECT_FOUND',
  AAP_APPLIED = 'STATE_AAP_APPLIED',
  IN_AAP_POLYMERIZATION = 'STATE_IN_AAP_POLYMERIZATION',
  TAKEN_INTO_AAP_INSPECTION = 'STATE_TAKEN_INTO_AAP_INSPECTION',
  AAP_DEFECT_FOUND = 'STATE_AAP_DEFECT_FOUND',
  FIXED_AAP_ROUGHING_COMPLETED = 'STATE_FIXED_AAP_ROUGHING_COMPLETED',
  READY_FOR_USE = 'STATE_READY_FOR_USE',
  USED_IN_PRODUCTION = 'STATE_USED_IN_PRODUCTION',
}

export const chooseStateUa: TTitleEnToUa = {
  [EState.NEW]: EStateUK.stateNew,
  [EState.AT_INCOMING_CONTROL]: EStateUK.stateAtIncomingControl,
  [EState.INCOMING_CONTROL_LAB_RESULT_RECEIVED]: EStateUK.stateIncomingControlLabResultReceived,
  [EState.INCOMING_CONTROL_FINISHED]: EStateUK.stateIncomingControlFinished,
  [EState.IN_WAREHOUSE]: EStateUK.stateInWareHouse,
  [EState.IN_WORK]: EStateUK.stateInWork,
  [EState.RETURNED_TO_RMC]: EStateUK.stateReturnedToRmc,
  [EState.DEFECT_FOUND]: EStateUK.stateDefectFound,
  [EState.AAP_APPLIED]: EStateUK.stateAapApplied,
  [EState.IN_AAP_POLYMERIZATION]: EStateUK.stateInAapPolymerization,
  [EState.TAKEN_INTO_AAP_INSPECTION]: EStateUK.stateTakenIntoAapInspection,
  [EState.AAP_DEFECT_FOUND]: EStateUK.stateAapDefectFound,
  [EState.FIXED_AAP_ROUGHING_COMPLETED]: EStateUK.stateFixedAapRoughingCompleted,
  [EState.READY_FOR_USE]: EStateUK.stateReadyForUse,
  [EState.USED_IN_PRODUCTION]: EStateUK.stateUsedInProduction,
};

export const choiceColorState = {
  [EState.NEW]: 'rgb(27, 151, 245)', // (голубой)
  [EState.AT_INCOMING_CONTROL]: 'rgb(156, 39, 176)', // (фиолетовый)
  [EState.INCOMING_CONTROL_LAB_RESULT_RECEIVED]: 'rgb(253, 201, 15)', // (желтый)
  [EState.INCOMING_CONTROL_FINISHED]: 'rgb(57, 203, 127)', // (зеленый)
  [EState.IN_WAREHOUSE]: 'rgb(156, 39, 176)', // (фиолетовый)
  [EState.IN_WORK]: 'rgb(57, 203, 127)', // (зеленый)
  [EState.RETURNED_TO_RMC]: 'rgb(253, 201, 15)', // (желтый)
  [EState.DEFECT_FOUND]: 'rgb(252, 75, 108)', // (розовый)
  [EState.AAP_APPLIED]: 'rgb(156, 39, 176)', // (фиолетовый)
  [EState.IN_AAP_POLYMERIZATION]: 'rgb(156, 39, 176)', // (фиолетовый)
  [EState.TAKEN_INTO_AAP_INSPECTION]: 'rgb(156, 39, 176)', // (фиолетовый)
  [EState.AAP_DEFECT_FOUND]: 'rgb(252, 75, 108)', // (розовый)
  [EState.FIXED_AAP_ROUGHING_COMPLETED]: 'rgb(253, 201, 15)', // (желтый)
  [EState.READY_FOR_USE]: 'rgb(57, 203, 127)', // (зеленый)
  [EState.USED_IN_PRODUCTION]: 'rgb(126, 126, 126)', // (серый)
};
