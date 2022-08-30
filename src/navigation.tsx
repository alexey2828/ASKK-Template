import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { ChooseBuilding } from './buildings/choose-building/choose-building';
import { ETransitionsComponentBatchPlace } from './component-batch-place/const/choose-ua-title-transition-state';
import { ApproveForUse } from './component-batch-place/form-comand/approve-for-use';
import { End } from './component-batch-place/form-comand/end';
import { RejectForUse } from './component-batch-place/form-comand/reject-for-use';
import { SendToLaboratory } from './component-batch-place/form-comand/send-to-laboratory';
import { ChangeBuildingPut } from './component-batch-place/model/change-building-put';
import { ChangeStateComponentBatchPlace } from './component-batch-place/model/change-state-component-batch-place';
import { CreateComponent } from './component-batch-place/model/create-new-component-batch-place';
import { ScreenComponentBatchPlace } from './component-batch-place/model/screen-component-batch-place';
import { Header } from './component-ui/header';
import { HomeScreen } from './component-ui/screen/home-screen/home-screen';
import { OperationConfirm } from './component-ui/screen/operation-confirm';
import { ScanScreen } from './component-ui/screen/screen-scan';
import { NoDataEntity } from './component-ui/screen/tmp-no-data-entity';
import { LoginScreen } from './infrastructure/authentication/login-screen';
import { Authorization } from './infrastructure/authentication/model/authorization';
import { EEntityType } from './infrastructure/const/entity-types';
import { ENavigationName } from './infrastructure/const/navigation-name';
import {
  API_ANALYSIS_SHORT,
  API_CASSETS_ENGINE_PRESSFORM_SHORT_URL,
  API_COMPONENT_BATCH_PLACE_SHORT_URL,
  API_ENGINE_BOTTOM_SHORT_URL,
  API_ENGINE_CASE_SHORT_URL,
  API_ENGINE_PRESSFORM_SHORT_URL,
  API_EQUIPMENT_ENGINE_PRESSFORM_SHORT_URL,
  API_MIXING_TYPE_SHORT_URL,
  API_NORMATIVE_DOCUMENT_SHORT_URL,
  API_NOZZLE_BLOCK_SHORT_URL,
  API_ROCKET_ENGINE_SHORT_URL,
  API_STABILIZER_BLOCK_SHORT_URL,
  API_TZP_DETAIL_SHORT_URL,
  API_TZP_PLATE_SHORT_URL,
  API_TZP_PRESS_FORM_SHORT,
} from './infrastructure/const/urls';
import { AuthContext } from './infrastructure/context/auth-context';
import { DetailsScreen } from './infrastructure/details-screen/details-screen';
import { DevTools } from './infrastructure/dev-tools/dev-tools-screen';
import { DetailAnalysis } from './laboratory/analysis/model/detail-analysis';
import { ScreenAnalysis } from './laboratory/analysis/model/screen-analysis';
import { ScreenCassettesEnginePressform } from './materials/cassets-engine-pressform/model/screen-cassettes-engine-pressform';
import { ETransitionsMaterial } from './materials/const/choose-ua-title-transition-state';
import { ScreenEngineBottom } from './materials/engine-bottom/model/screen-engine-bottom';
import { ScreenEnginePressform } from './materials/engine-pressform/model/screen-engine-pressform';
import { MaterialsAddToWarehouse } from './materials/form-comand/add-to-warehouse';
import { RegisterMaterialDefect } from './materials/form-comand/register-material-defect';
import { MaterialsReturnToRMC } from './materials/form-comand/return-to-rmc';
import { MaterialSendToIncomingControl } from './materials/form-comand/send-to-incoming-control';
import { MaterialsTakeToWork } from './materials/form-comand/take-to-work';
import { ChangeStateMaterials } from './materials/model/change-state-confirm';
import { ScreenNozzleBlock } from './materials/nozzle-block/model/screen-nozzle-block';
import { ScreenStabilizerBlock } from './materials/stabilizer-block/model/screen-stabilizer-block';
import { ETransitionsMixing } from './mixing/const/choose-ua-title-transition-state';
import { MixingAddComponent } from './mixing/form-comand/mixing-add-component';
import { MixingTimer } from './mixing/form-comand/mixing-add-time';
import { MixingApproveForUse } from './mixing/form-comand/mixing-approve-for-use';
import { MixingCreateComponentBatch } from './mixing/form-comand/mixing-create-component-batch';
import { MixingEnd } from './mixing/form-comand/mixing-end';
import { MixingPause } from './mixing/form-comand/mixing-pause';
import { MixingPutIntoMixer } from './mixing/form-comand/mixing-put-into-mixer';
import { MixingRejectForUse } from './mixing/form-comand/mixing-reject-for-use';
import { MixingSendToLaboratory } from './mixing/form-comand/mixing-send-to-laboratory';
import { MixingUnPause } from './mixing/form-comand/mixing-unpause';
import { ChangeStateMixing } from './mixing/model/change-state-confirm';
import { CreateMixing } from './mixing/model/create-new-mixing';
import { ScreenMixing } from './mixing/model/screen-mixing';
import { DetailNormativeDocument } from './normative-document/model/detail-normative-document';
import { ScreenND } from './normative-document/model/screen-nd';
import { ETransitionsTZPDetail } from './tzp/tzp-detail/const/choose-ua-title-transition-state';
import { AddQualityControlReport } from './tzp/tzp-detail/form-comand/add-quality-control-report';
import { TZPDetailApproveForUse } from './tzp/tzp-detail/form-comand/approve-for-use';
import { TTZPDetailDegreaseSurface } from './tzp/tzp-detail/form-comand/degrease-surface';
import { FinishRough } from './tzp/tzp-detail/form-comand/finish-rough';
import { TZPDetailRegisterDefect } from './tzp/tzp-detail/form-comand/register-defect';
import { TZPDetailRejectForUse } from './tzp/tzp-detail/form-comand/reject-for-use';
import { StartRoughing } from './tzp/tzp-detail/form-comand/start-roughing';
import { ChangeStateTZPDetail } from './tzp/tzp-detail/model/change-state-confirm';
import { ScreenTzpDetail } from './tzp/tzp-detail/model/screen-tzp-detail';
import { ETransitionsTZPPlace } from './tzp/tzp-plate/const/choose-ua-title-transition-state';
import { TZPDetailSampleFinishKM1Polymerization } from './tzp/tzp-plate/form-comand/finish-km1-polymerization';
import { TZPDetailSampleSendToLaboratory } from './tzp/tzp-plate/form-comand/send-to-laboratory';
import { ChangeStateTzpDetailSample } from './tzp/tzp-plate/model/change-state-confirm';
import { CreateTZPPlate } from './tzp/tzp-plate/model/create-new-tzp-plate';
import { ScreenTzpPlate } from './tzp/tzp-plate/model/screen-tzp-plate';
import { ETransitionsTzpPressform } from './tzp/tzp-pressform/const/choose-ua-title-transition-state';
import { AddToWarehouse } from './tzp/tzp-pressform/form-comand/add-to-warehouse';
import { ApplyAAP } from './tzp/tzp-pressform/form-comand/apply-aap';
import { ApplyKM } from './tzp/tzp-pressform/form-comand/apply-km1';
import { FinishKM1Polimerization } from './tzp/tzp-pressform/form-comand/finish-km1-polimerization';
import { PutIntoAAPPolymezation } from './tzp/tzp-pressform/form-comand/put-into-aap-polymeization';
import { PutIntoKMPolymerizationWithClosedCap } from './tzp/tzp-pressform/form-comand/put-into-km1-polymerization-with-closed-cap';
import { PutIntoKMPolymerizationWithOpenCap } from './tzp/tzp-pressform/form-comand/put-into-km1-polymerization-with-open-cap';
import { RegisterPressFormDefect } from './tzp/tzp-pressform/form-comand/register-pressform-defect';
import { ReturnToRMC } from './tzp/tzp-pressform/form-comand/return-to-rmc';
import { SendToAAPInspection } from './tzp/tzp-pressform/form-comand/send-to-aap-inspection';
import { SendToIncomingControl } from './tzp/tzp-pressform/form-comand/send-to-incoming-control';
import { TakeToWork } from './tzp/tzp-pressform/form-comand/take-to-work';
import { ChangeStateTzpPressForm } from './tzp/tzp-pressform/model/change-state-confirm';
import { ScreenTzpPressform } from './tzp/tzp-pressform/model/screen-tzp-pressform';
import { Loader } from './component-ui/loader/Loader';
import { ScreenEngineCase } from 'rocket-engine/engine-case/model/screen-engine-case';
import { ETransitionsEngineCase } from 'rocket-engine/engine-case/const/choose-ua-title-transition-state';
import { AssembleTheBodyWitheQuipmentEnginePressform } from 'rocket-engine/engine-case/form-comand/assemble-the-body-withe-quipment-engine-pressform';
import { ETransitionsEquipmentEnginePressform } from 'rocket-engine/equipment-engine-pressform/const/choose-ua-title-transition-state';
import { EquipmentEnginePressformAddToWarehouseApplyAAP } from 'rocket-engine/equipment-engine-pressform/form-comand/apply-aap';
import { EquipmentEnginePressformApproveForUse } from 'rocket-engine/equipment-engine-pressform/form-comand/approve-for-use';
import { EquipmentEnginePressformFixAapRoughing } from 'rocket-engine/equipment-engine-pressform/form-comand/fix-aap-roughing';
import { EquipmentEnginePressformPutIntoAapPolymerization } from 'rocket-engine/equipment-engine-pressform/form-comand/put-into-aap-polymerization';
import { EquipmentEnginePressformRegisterAAPDefect } from 'rocket-engine/equipment-engine-pressform/form-comand/register-aap-defect';
import { RegisterEquipmentEnginePressformDefect } from 'rocket-engine/equipment-engine-pressform/form-comand/register-material-defect';
import { EquipmentEnginePressformReturnToRMC } from 'rocket-engine/equipment-engine-pressform/form-comand/return-to-rmc';
import { EquipmentEnginePressformSendToAAPInspection } from 'rocket-engine/equipment-engine-pressform/form-comand/send-to-aap-inspection';
import { EquipmentEnginePressformSendToIncomingControl } from 'rocket-engine/equipment-engine-pressform/form-comand/send-to-incoming-control';
import { EquipmentEnginePressformTakeToWork } from 'rocket-engine/equipment-engine-pressform/form-comand/take-to-work';
import { ChangeStateEquipmentEnginePressform } from 'rocket-engine/equipment-engine-pressform/model/change-state-confirm';
import { ETransitionsRocketEngine } from 'rocket-engine/rocket-engine/const/choose-ua-title-transition-state';
import { RocketEngineAssembleUnloadedEngine } from 'rocket-engine/rocket-engine/form-comand/assemble-unloaded-engine';
import { ChangeStateRocketEngine } from 'rocket-engine/rocket-engine/model/change-state-confirm';
import { ScreenRocketEngine } from 'rocket-engine/rocket-engine/model/screen-rocket-engine';
import { RegisterAAPDefect } from 'tzp/tzp-pressform/form-comand/register-aap-defect';
import { EquipmentEnginePressformAddToWarehouse } from 'rocket-engine/equipment-engine-pressform/form-comand/add-to-warehouse';
import { ScreenEquipmentEnginePressform } from 'rocket-engine/equipment-engine-pressform/model/screen-equipment-engine-pressform';
import { CleanSurface } from 'rocket-engine/engine-case/form-comand/clean-surface';
import { DegreaseSurfaceOfTzpAndApplyKc } from 'rocket-engine/engine-case/form-comand/degrease-surface-of-tzp-and-apply-kc';
import { DegreaseSurface } from 'rocket-engine/engine-case/form-comand/degrease-surface';
import { FinishApplyKM1 } from 'rocket-engine/engine-case/form-comand/finish-apply-km1';
import { FinishCuringKMK1 } from 'rocket-engine/engine-case/form-comand/finish-curing-kmk1';
import { EngineCaseFinishKM1Polimerization } from 'rocket-engine/engine-case/form-comand/finish-km1-polimerization';
import { FinishMeasuringTheThicknessOfTzp } from 'rocket-engine/engine-case/form-comand/finish-measuring-the-thickness-of-tzp';
import { FinishRoughTzp } from 'rocket-engine/engine-case/form-comand/finish-rough-tzp';
import { FixTzpVisualDefect } from 'rocket-engine/engine-case/form-comand/fix-tzp-visual-defect';
import { GlueTheCuffs } from 'rocket-engine/engine-case/form-comand/glue-the-cuffs';
import { PlaceInCassetteEnginePressform } from 'rocket-engine/engine-case/form-comand/place-in-cassette-engine-pressform';
import { PutIntoCuringKmk1 } from 'rocket-engine/engine-case/form-comand/put-into-curing-kmk1';
import { PutIntoDrying } from 'rocket-engine/engine-case/form-comand/put-into-drying';
import { PutIntoKcPolymerization } from 'rocket-engine/engine-case/form-comand/put-into-kc-polymerization';
import { PutIntoKm1Polymerization } from 'rocket-engine/engine-case/form-comand/put-into-km1-polymerization';
import { RegisterOverestimatedThicknessTzpDefect } from 'rocket-engine/engine-case/form-comand/register-overestimated-thickness-tzp-defect';
import { RegisterTzpVisualDefect } from 'rocket-engine/engine-case/form-comand/register-tzp-visual-defect';
import { RegisterUnderstatedThicknessTzpDefect } from 'rocket-engine/engine-case/form-comand/register-understated-thickness-tzp-defect';
import { SendCassetteWithCaseToTheMoldingOperation } from 'rocket-engine/engine-case/form-comand/send-cassette-with-case-to-the-molding-operation';
import { SendForRetestForTighrness } from 'rocket-engine/engine-case/form-comand/send-for-retest-for-tightness';
import { SendPressformWithTzpToMeasurement } from 'rocket-engine/engine-case/form-comand/send-pressform-with-tzp-to-measurement';
import { StartApplyingKm1 } from 'rocket-engine/engine-case/form-comand/start-applying-km1';
import { StartLeakTesting } from 'rocket-engine/engine-case/form-comand/start-leak-testing';
import { StartMeasuringTheThicknessOfTzp } from 'rocket-engine/engine-case/form-comand/start-measuring-the-thickness-of-tzp';
import { StartRoughingTzp } from 'rocket-engine/engine-case/form-comand/start-roughing-tzp';
import { TakePressformWithTzpFromMeasurement } from 'rocket-engine/engine-case/form-comand/take-pressform-with-from-measurement';
import { WeightPressformWithTzpAndKc } from 'rocket-engine/engine-case/form-comand/weigh-pressform-with-tzp-and-kc';
import { WeightPressformWithTzp } from 'rocket-engine/engine-case/form-comand/weigh-pressform-with-tzp';
import { FinishFixTzpDefect } from 'rocket-engine/engine-case/form-comand/finish-fix-tzp';
import { ChangeStateEngineCase } from 'rocket-engine/engine-case/model/change-state-confirm';
import { FinishDrying } from 'rocket-engine/engine-case/form-comand/finish-drying';

const Stack = createStackNavigator();

export const Navigation: React.FC = () => {
  const [load, setLoad] = useState(true);

  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 1000);

    return (): void => {
      clearTimeout(timer);
    };
  });

  return (
    <>
      {!load ? (
        <NavigationContainer>
          {isAuth ? (
            <Stack.Navigator initialRouteName={ENavigationName.HOME} screenOptions={{ header: Header }}>
              <Stack.Screen name={ENavigationName.HOME} component={HomeScreen} options={{ title: 'Головна1' }} />
              <Stack.Screen name={ENavigationName.TMP_NO_DATA_ENTITY} component={NoDataEntity} />
              <Stack.Screen name={ENavigationName.SCAN} component={ScanScreen} />
              <Stack.Screen name={API_MIXING_TYPE_SHORT_URL} component={ScreenMixing} />
              <Stack.Screen name={API_COMPONENT_BATCH_PLACE_SHORT_URL} component={ScreenComponentBatchPlace} />
              <Stack.Screen name={API_TZP_PRESS_FORM_SHORT} component={ScreenTzpPressform} />
              <Stack.Screen name={API_TZP_PLATE_SHORT_URL} component={ScreenTzpPlate} />
              <Stack.Screen name={API_TZP_DETAIL_SHORT_URL} component={ScreenTzpDetail} />
              <Stack.Screen name={API_NOZZLE_BLOCK_SHORT_URL} component={ScreenNozzleBlock} />
              <Stack.Screen name={API_ENGINE_BOTTOM_SHORT_URL} component={ScreenEngineBottom} />
              <Stack.Screen name={API_ENGINE_PRESSFORM_SHORT_URL} component={ScreenEnginePressform} />
              <Stack.Screen name={API_STABILIZER_BLOCK_SHORT_URL} component={ScreenStabilizerBlock} />
              <Stack.Screen name={API_ENGINE_CASE_SHORT_URL} component={ScreenEngineCase} />
              <Stack.Screen name={API_ROCKET_ENGINE_SHORT_URL} component={ScreenRocketEngine} />
              <Stack.Screen name={API_CASSETS_ENGINE_PRESSFORM_SHORT_URL} component={ScreenCassettesEnginePressform} />
              <Stack.Screen
                name={API_EQUIPMENT_ENGINE_PRESSFORM_SHORT_URL}
                component={ScreenEquipmentEnginePressform}
              />
              <Stack.Screen name={API_ANALYSIS_SHORT} component={ScreenAnalysis} />
              <Stack.Screen name={API_NORMATIVE_DOCUMENT_SHORT_URL} component={ScreenND} />
              <Stack.Screen name={ENavigationName.ND_DETAILS} component={DetailNormativeDocument} />
              <Stack.Screen name={ENavigationName.LA_DETAILS} component={DetailAnalysis} />
              <Stack.Screen name={ENavigationName.CREATE_COMPONENT} component={CreateComponent} />
              <Stack.Screen name={ENavigationName.CREATE_TZP_DETAIL_SAMPLE} component={CreateTZPPlate} />
              <Stack.Screen name={ENavigationName.CREATE_MIXING} component={CreateMixing} />
              <Stack.Screen name={ENavigationName.OPERATION_CONFIRM} component={OperationConfirm} />
              <Stack.Screen name={ENavigationName.DETAILS_SCREEN} component={DetailsScreen} />
              <Stack.Screen name={ENavigationName.CHANGE_STATE_MIXING} component={ChangeStateMixing} />
              <Stack.Screen name={ENavigationName.CHANGE_STATE_ENGINE_CASES} component={ChangeStateEngineCase} />
              <Stack.Screen
                name={ETransitionsMixing.ADD_COMPONENT + EEntityType.MIXING}
                component={MixingAddComponent}
              />
              <Stack.Screen
                name={ETransitionsMixing.CREATE_COMPONENT_BATCH + EEntityType.MIXING}
                component={MixingCreateComponentBatch}
              />
              <Stack.Screen
                name={ETransitionsMixing.PUT_INTO_MIXER + EEntityType.MIXING}
                component={MixingPutIntoMixer}
              />
              <Stack.Screen
                name={ETransitionsMixing.APPROVE_FOR_USE + EEntityType.MIXING}
                component={MixingApproveForUse}
              />
              <Stack.Screen
                name={ETransitionsMixing.SEND_TO_LABORATORY + EEntityType.MIXING}
                component={MixingSendToLaboratory}
              />
              <Stack.Screen
                name={ETransitionsMixing.REJECT_FOR_USE + EEntityType.MIXING}
                component={MixingRejectForUse}
              />
              <Stack.Screen name={ETransitionsMixing.ADD_MIXER_TIME + EEntityType.MIXING} component={MixingTimer} />
              <Stack.Screen name={ETransitionsMixing.MIXER_UNPAUSE + EEntityType.MIXING} component={MixingUnPause} />
              <Stack.Screen name={ETransitionsMixing.MIXER_PAUSE + EEntityType.MIXING} component={MixingPause} />
              <Stack.Screen name={ETransitionsMixing.END + EEntityType.MIXING} component={MixingEnd} />
              <Stack.Screen name={ENavigationName.CHANGE_STATE_MATERIALS} component={ChangeStateMaterials} />
              <Stack.Screen
                name={ENavigationName.CHANGE_STATE_EQUIPMENT_ENGINE_PRESSFORM}
                component={ChangeStateEquipmentEnginePressform}
              />
              <Stack.Screen name={ENavigationName.CHANGE_STATE_TZP_PRESSFORM} component={ChangeStateTzpPressForm} />
              <Stack.Screen
                name={ETransitionsTzpPressform.TRANSITION_SEND_TO_INCOMING_CONTROL + EEntityType.TZP_PRESSFORM}
                component={SendToIncomingControl}
              />
              <Stack.Screen
                name={ETransitionsTzpPressform.TRANSITION_ADD_TO_WAREHOUSE + EEntityType.TZP_PRESSFORM}
                component={AddToWarehouse}
              />
              <Stack.Screen
                name={ETransitionsTzpPressform.TRANSITION_TAKE_TO_WORK + EEntityType.TZP_PRESSFORM}
                component={TakeToWork}
              />
              <Stack.Screen
                name={ETransitionsTzpPressform.TRANSITION_APPLY_AAP + EEntityType.TZP_PRESSFORM}
                component={ApplyAAP}
              />
              <Stack.Screen
                name={ETransitionsTzpPressform.TRANSITION_REGISTER_MATERIAL_DEFECT + EEntityType.TZP_PRESSFORM}
                component={RegisterPressFormDefect}
              />
              <Stack.Screen
                name={ETransitionsTzpPressform.TRANSITION_RETURN_TO_RMC + EEntityType.TZP_PRESSFORM}
                component={ReturnToRMC}
              />
              <Stack.Screen
                name={ETransitionsTzpPressform.TRANSITION_SEND_TO_AAP_INSPECTION + EEntityType.TZP_PRESSFORM}
                component={SendToAAPInspection}
              />
              <Stack.Screen
                name={ETransitionsTzpPressform.TRANSITION_REGISTER_AAP_DEFECT + EEntityType.TZP_PRESSFORM}
                component={RegisterAAPDefect}
              />
              <Stack.Screen
                name={ETransitionsTzpPressform.TRANSITION_APPLY_KM1 + EEntityType.TZP_PRESSFORM}
                component={ApplyKM}
              />
              <Stack.Screen
                name={
                  ETransitionsTzpPressform.TRANSITION_PUT_INTO_KM1_POLYMERIZATION_WITH_CLOSED_CAP +
                  EEntityType.TZP_PRESSFORM
                }
                component={PutIntoKMPolymerizationWithClosedCap}
              />
              <Stack.Screen
                name={ETransitionsTzpPressform.TRANSITION_PUT_INTO_AAP_POLYMERIZATION + EEntityType.TZP_PRESSFORM}
                component={PutIntoAAPPolymezation}
              />
              <Stack.Screen
                name={
                  ETransitionsTzpPressform.TRANSITION_PUT_INTO_KM1_POLYMERIZATION_WITH_OPEN_CAP +
                  EEntityType.TZP_PRESSFORM
                }
                component={PutIntoKMPolymerizationWithOpenCap}
              />
              <Stack.Screen
                name={ETransitionsTzpPressform.TRANSITION_FINISH_KM1_POLYMERIZATION + EEntityType.TZP_PRESSFORM}
                component={FinishKM1Polimerization}
              />
              <Stack.Screen
                name={ETransitionsComponentBatchPlace.TRANSITION_APPROVE_FOR_USE + EEntityType.COMPONENT_BATCH_PLACE}
                component={ApproveForUse}
              />
              <Stack.Screen
                name={ETransitionsComponentBatchPlace.TRANSITION_END + EEntityType.COMPONENT_BATCH_PLACE}
                component={End}
              />
              <Stack.Screen
                name={ETransitionsComponentBatchPlace.TRANSITION_REJECT_FOR_USE + EEntityType.COMPONENT_BATCH_PLACE}
                component={RejectForUse}
              />
              <Stack.Screen
                name={ETransitionsComponentBatchPlace.TRANSITION_SEND_TO_LABORATORY + EEntityType.COMPONENT_BATCH_PLACE}
                component={SendToLaboratory}
              />
              <Stack.Screen
                name={ENavigationName.CHANGE_STATE_COMPONENT_BATCH_PLACE_SCREEN}
                component={ChangeStateComponentBatchPlace}
              />
              <Stack.Screen name={ENavigationName.CHANGE_STATE_ROCKET_ENGINE} component={ChangeStateRocketEngine} />
              <Stack.Screen name={ENavigationName.CHANGE_BUILDING_BATCH_PLACE_SCREEN} component={ChangeBuildingPut} />
              <Stack.Screen name={ENavigationName.CHOOSE_BUILDING} component={ChooseBuilding} />
              <Stack.Screen name={ENavigationName.CHANGE_STATE_TZP_DETAIL} component={ChangeStateTZPDetail} />
              <Stack.Screen
                name={ETransitionsTZPDetail.TRANSITION_START_ROUGHING + EEntityType.TZP_DETAIL}
                component={StartRoughing}
              />
              <Stack.Screen
                name={ETransitionsTZPDetail.TRANSITION_FINISH_ROUGH + EEntityType.TZP_DETAIL}
                component={FinishRough}
              />
              <Stack.Screen
                name={ETransitionsTZPDetail.TRANSITION_ADD_QUALITY_CONTROL_REPORT + EEntityType.TZP_DETAIL}
                component={AddQualityControlReport}
              />
              <Stack.Screen
                name={ETransitionsTZPDetail.TRANSITION_REJECT_FOR_USE + EEntityType.TZP_DETAIL}
                component={TZPDetailRejectForUse}
              />
              <Stack.Screen
                name={ETransitionsTZPDetail.TRANSITION_APPROVE_FOR_USE + EEntityType.TZP_DETAIL}
                component={TZPDetailApproveForUse}
              />
              <Stack.Screen
                name={ETransitionsTZPDetail.TRANSITION_REGISTER_DEFECT + EEntityType.TZP_DETAIL}
                component={TZPDetailRegisterDefect}
              />
              <Stack.Screen
                name={ETransitionsTZPDetail.TRANSITION_DEGREASE_SURFACE + EEntityType.TZP_DETAIL}
                component={TTZPDetailDegreaseSurface}
              />
              <Stack.Screen
                name={ETransitionsTZPPlace.TRANSITION_FINISH_KM1_POLYMERIZATION + EEntityType.TZP_DETAIL_SAMPLE}
                component={TZPDetailSampleFinishKM1Polymerization}
              />
              <Stack.Screen
                name={ETransitionsTZPPlace.TRANSITION_SEND_TO_LABORATORY + EEntityType.TZP_DETAIL_SAMPLE}
                component={TZPDetailSampleSendToLaboratory}
              />
              <Stack.Screen
                name={ENavigationName.CHANGE_STATE_TZP_DETAIL_SAMPLE}
                component={ChangeStateTzpDetailSample}
              />
              <Stack.Screen
                name={ETransitionsMaterial.SEND_TO_INCOMING_CONTROL + EEntityType.CASSETS_ENGINE}
                component={MaterialSendToIncomingControl}
              />
              <Stack.Screen
                name={ETransitionsMaterial.REGISTER_MATERIAL_DEFECT + EEntityType.CASSETS_ENGINE}
                component={RegisterMaterialDefect}
              />
              <Stack.Screen
                name={ETransitionsMaterial.RETURN_TO_RMC + EEntityType.CASSETS_ENGINE}
                component={MaterialsReturnToRMC}
              />
              <Stack.Screen
                name={ETransitionsMaterial.TAKE_TO_WORK + EEntityType.CASSETS_ENGINE}
                component={MaterialsTakeToWork}
              />
              <Stack.Screen
                name={ETransitionsMaterial.ADD_TO_WAREHOUSE + EEntityType.CASSETS_ENGINE}
                component={MaterialsAddToWarehouse}
              />
              <Stack.Screen
                name={ETransitionsMaterial.SEND_TO_INCOMING_CONTROL + EEntityType.NOZZLE_BLOCK}
                component={MaterialSendToIncomingControl}
              />
              <Stack.Screen
                name={ETransitionsMaterial.REGISTER_MATERIAL_DEFECT + EEntityType.NOZZLE_BLOCK}
                component={RegisterMaterialDefect}
              />
              <Stack.Screen
                name={ETransitionsMaterial.RETURN_TO_RMC + EEntityType.NOZZLE_BLOCK}
                component={MaterialsReturnToRMC}
              />
              <Stack.Screen
                name={ETransitionsMaterial.TAKE_TO_WORK + EEntityType.NOZZLE_BLOCK}
                component={MaterialsTakeToWork}
              />
              <Stack.Screen
                name={ETransitionsMaterial.ADD_TO_WAREHOUSE + EEntityType.NOZZLE_BLOCK}
                component={MaterialsAddToWarehouse}
              />
              <Stack.Screen
                name={ETransitionsMaterial.SEND_TO_INCOMING_CONTROL + EEntityType.ENGINE_PRESSFORM}
                component={MaterialSendToIncomingControl}
              />
              <Stack.Screen
                name={ETransitionsMaterial.REGISTER_MATERIAL_DEFECT + EEntityType.ENGINE_PRESSFORM}
                component={RegisterMaterialDefect}
              />
              <Stack.Screen
                name={ETransitionsMaterial.RETURN_TO_RMC + EEntityType.ENGINE_PRESSFORM}
                component={MaterialsReturnToRMC}
              />
              <Stack.Screen
                name={ETransitionsMaterial.TAKE_TO_WORK + EEntityType.ENGINE_PRESSFORM}
                component={MaterialsTakeToWork}
              />
              <Stack.Screen
                name={ETransitionsMaterial.ADD_TO_WAREHOUSE + EEntityType.ENGINE_PRESSFORM}
                component={MaterialsAddToWarehouse}
              />
              <Stack.Screen
                name={ETransitionsMaterial.SEND_TO_INCOMING_CONTROL + EEntityType.STABILIZER_BLOCK}
                component={MaterialSendToIncomingControl}
              />
              <Stack.Screen
                name={ETransitionsMaterial.REGISTER_MATERIAL_DEFECT + EEntityType.STABILIZER_BLOCK}
                component={RegisterMaterialDefect}
              />
              <Stack.Screen
                name={ETransitionsMaterial.RETURN_TO_RMC + EEntityType.STABILIZER_BLOCK}
                component={MaterialsReturnToRMC}
              />
              <Stack.Screen
                name={ETransitionsMaterial.TAKE_TO_WORK + EEntityType.STABILIZER_BLOCK}
                component={MaterialsTakeToWork}
              />
              <Stack.Screen
                name={ETransitionsMaterial.ADD_TO_WAREHOUSE + EEntityType.STABILIZER_BLOCK}
                component={MaterialsAddToWarehouse}
              />
              <Stack.Screen
                name={ETransitionsMaterial.SEND_TO_INCOMING_CONTROL + EEntityType.ENGINE_BOTTOM}
                component={MaterialSendToIncomingControl}
              />
              <Stack.Screen
                name={ETransitionsMaterial.REGISTER_MATERIAL_DEFECT + EEntityType.ENGINE_BOTTOM}
                component={RegisterMaterialDefect}
              />
              <Stack.Screen
                name={ETransitionsMaterial.RETURN_TO_RMC + EEntityType.ENGINE_BOTTOM}
                component={MaterialsReturnToRMC}
              />
              <Stack.Screen
                name={ETransitionsMaterial.TAKE_TO_WORK + EEntityType.ENGINE_BOTTOM}
                component={MaterialsTakeToWork}
              />
              <Stack.Screen
                name={ETransitionsMaterial.ADD_TO_WAREHOUSE + EEntityType.ENGINE_BOTTOM}
                component={MaterialsAddToWarehouse}
              />
              <Stack.Screen
                name={ETransitionsRocketEngine.ASSEMBLE_UNLOADED_ENGINE + EEntityType.ENGINE_ROCKET_ENGINE}
                component={RocketEngineAssembleUnloadedEngine}
              />
              <Stack.Screen
                name={ETransitionsMaterial.ADD_TO_WAREHOUSE + EEntityType.EQUIPMENT_ENGINE_PRESSFORM}
                component={EquipmentEnginePressformAddToWarehouse}
              />
              <Stack.Screen
                name={ETransitionsMaterial.TAKE_TO_WORK + EEntityType.EQUIPMENT_ENGINE_PRESSFORM}
                component={EquipmentEnginePressformTakeToWork}
              />
              <Stack.Screen
                name={ETransitionsMaterial.RETURN_TO_RMC + EEntityType.EQUIPMENT_ENGINE_PRESSFORM}
                component={EquipmentEnginePressformReturnToRMC}
              />
              <Stack.Screen
                name={ETransitionsMaterial.REGISTER_MATERIAL_DEFECT + EEntityType.EQUIPMENT_ENGINE_PRESSFORM}
                component={RegisterEquipmentEnginePressformDefect}
              />
              <Stack.Screen
                name={ETransitionsEquipmentEnginePressform.APPLY_AAP + EEntityType.EQUIPMENT_ENGINE_PRESSFORM}
                component={EquipmentEnginePressformAddToWarehouseApplyAAP}
              />
              <Stack.Screen
                name={ETransitionsEquipmentEnginePressform.APPROVE_FOR_USE + EEntityType.EQUIPMENT_ENGINE_PRESSFORM}
                component={EquipmentEnginePressformApproveForUse}
              />
              <Stack.Screen
                name={ETransitionsEquipmentEnginePressform.REGISTER_AAP_DEFECT + EEntityType.EQUIPMENT_ENGINE_PRESSFORM}
                component={EquipmentEnginePressformRegisterAAPDefect}
              />
              <Stack.Screen
                name={ETransitionsEquipmentEnginePressform.FIX_AAP_ROUGHING + EEntityType.EQUIPMENT_ENGINE_PRESSFORM}
                component={EquipmentEnginePressformFixAapRoughing}
              />
              <Stack.Screen
                name={
                  ETransitionsEquipmentEnginePressform.SEND_TO_AAP_INSPECTION + EEntityType.EQUIPMENT_ENGINE_PRESSFORM
                }
                component={EquipmentEnginePressformSendToAAPInspection}
              />
              <Stack.Screen
                name={
                  ETransitionsEquipmentEnginePressform.PUT_INTO_AAP_POLYMERIZATION +
                  EEntityType.EQUIPMENT_ENGINE_PRESSFORM
                }
                component={EquipmentEnginePressformPutIntoAapPolymerization}
              />
              <Stack.Screen
                name={
                  ETransitionsEquipmentEnginePressform.SEND_TO_INCOMING_CONTROL + EEntityType.EQUIPMENT_ENGINE_PRESSFORM
                }
                component={EquipmentEnginePressformSendToIncomingControl}
              />
              <Stack.Screen
                name={
                  ETransitionsEngineCase.ASSEMBLE_THE_BODY_WITHE_QUIPMENT_ENGINE_PRESSFORM + EEntityType.ENGINE_CASE
                }
                component={AssembleTheBodyWitheQuipmentEnginePressform}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.CLEAN_SURFACE + EEntityType.ENGINE_CASE}
                component={CleanSurface}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.DEGREASE_SURFACE_OF_TZP_AND_APPLY_KC + EEntityType.ENGINE_CASE}
                component={DegreaseSurfaceOfTzpAndApplyKc}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.DEGREASE_SURFACE + EEntityType.ENGINE_CASE}
                component={DegreaseSurface}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.FINISH_APPLYING_KM1 + EEntityType.ENGINE_CASE}
                component={FinishApplyKM1}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.FINISH_CURING_KMK1 + EEntityType.ENGINE_CASE}
                component={FinishCuringKMK1}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.FINISH_FIX_TZP + EEntityType.ENGINE_CASE}
                component={FinishFixTzpDefect}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.FINISH_KM1_POLYMERIZATION + EEntityType.ENGINE_CASE}
                component={EngineCaseFinishKM1Polimerization}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.FINISH_MEASURING_THE_THICKNESS_OF_TZP + EEntityType.ENGINE_CASE}
                component={FinishMeasuringTheThicknessOfTzp}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.FINISH_ROUGH_TZP + EEntityType.ENGINE_CASE}
                component={FinishRoughTzp}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.FIX_TZP_VISUAL_DEFECT + EEntityType.ENGINE_CASE}
                component={FixTzpVisualDefect}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.PUT_INTO_CURING_KMK1 + EEntityType.ENGINE_CASE}
                component={PutIntoCuringKmk1}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.GLUE_THE_CUFFS + EEntityType.ENGINE_CASE}
                component={GlueTheCuffs}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.PLACE_IN_CASSETTE_ENGINE_PRESSFORMS + EEntityType.ENGINE_CASE}
                component={PlaceInCassetteEnginePressform}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.PUT_INTO_DRYING + EEntityType.ENGINE_CASE}
                component={PutIntoDrying}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.PUT_INTO_KC_POLYMERIZATION + EEntityType.ENGINE_CASE}
                component={PutIntoKcPolymerization}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.PUT_INTO_KM1_POLYMERIZATION + EEntityType.ENGINE_CASE}
                component={PutIntoKm1Polymerization}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.REGISTER_OVERESTIMATED_THICKNESS_TZP_DEFECT + EEntityType.ENGINE_CASE}
                component={RegisterOverestimatedThicknessTzpDefect}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.REGISTER_TZP_VISUAL_DEFECT + EEntityType.ENGINE_CASE}
                component={RegisterTzpVisualDefect}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.REGISTER_UNDERSTATED_THICKNESS_TZP_DEFECT + EEntityType.ENGINE_CASE}
                component={RegisterUnderstatedThicknessTzpDefect}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.SEND_CASSETTE_WITH_CASE_TO_THE_MOLDING_OPERATION + EEntityType.ENGINE_CASE}
                component={SendCassetteWithCaseToTheMoldingOperation}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.SEND_FOR_RETEST_FOR_TIGHTNESS + EEntityType.ENGINE_CASE}
                component={SendForRetestForTighrness}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.SEND_PRESSFORM_WITH_TZP_TO_MEASUREMENT + EEntityType.ENGINE_CASE}
                component={SendPressformWithTzpToMeasurement}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.START_APPLYING_KM1 + EEntityType.ENGINE_CASE}
                component={StartApplyingKm1}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.START_LEAK_TESTING + EEntityType.ENGINE_CASE}
                component={StartLeakTesting}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.START_MEASURING_THE_THICKNESS_OF_TZP + EEntityType.ENGINE_CASE}
                component={StartMeasuringTheThicknessOfTzp}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.START_ROUGHING_TZP + EEntityType.ENGINE_CASE}
                component={StartRoughingTzp}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.TAKE_PRESSFORM_WITH_TZP_FROM_MEASUREMENT + EEntityType.ENGINE_CASE}
                component={TakePressformWithTzpFromMeasurement}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.WEIGH_PRESSFORM_WITH_TZP_AND_KC + EEntityType.ENGINE_CASE}
                component={WeightPressformWithTzpAndKc}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.WEIGH_PRESSFORM_WITH_TZP + EEntityType.ENGINE_CASE}
                component={WeightPressformWithTzp}
              />
              <Stack.Screen
                name={ETransitionsEngineCase.FINISH_DRYING + EEntityType.ENGINE_CASE}
                component={FinishDrying}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator initialRouteName={ENavigationName.LOGIN_SCREEN} screenOptions={{ header: Header }}>
              <Stack.Screen name={ENavigationName.LOGIN_SCREEN} component={LoginScreen} />
              <Stack.Screen name={ENavigationName.AUTHORIZATION} component={Authorization} />
              <Stack.Screen name={ENavigationName.DEV} component={DevTools} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      ) : (
        <Loader />
      )}
    </>
  );
};
