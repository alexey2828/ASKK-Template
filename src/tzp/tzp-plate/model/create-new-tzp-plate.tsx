import { Input, Radio, RadioGroup } from '@ui-kitten/components';
import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableHighlight } from 'react-native';
import { ITzpDetail } from '../../tzp-detail/entity/tzp-detail';
import { TITLES_BUILDING } from '../../../buildings/const/titles';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { MainTitles } from '../../../const/titles-main';
import { TArgsNavigate, useNavigate } from '../../../hooks/use-navigate';
import { useHttp } from '../../../hooks/useHttp';
import { TMember } from '../../../infrastructure/api-platform';
import { AsyncAutoComplete } from '../../../infrastructure/async-auto-complete/asyncAutoComplete';
import { ENavigationName } from '../../../infrastructure/const/navigation-name';
import {
  API_ENGINE_CASE_SHORT_URL,
  API_THERMINAL_CHAMBERS_SHORT_URL,
  API_TZP_DETAIL_SHORT_URL,
  API_TZP_PLATE_SHORT_URL,
} from '../../../infrastructure/const/urls';
import { TGetParameter } from '../../../infrastructure/custom-query-string/custom-query-string';
import { EntityFromScanner } from '../../../infrastructure/entity-from-scanner/entity-from-scanner';
import { modalStyles } from '../../../infrastructure/confirm-modal/confirm.styles';
import { ITzpDetailSample } from '../entity/tzp-plate';
import { TITLES_TZP_DETAIL_SAMPLES } from '../const/titles';
import { TITLE_THERMAL_CHAMBERS } from '../../tzp-pressform/entity/thermal-chamber/const/titles';
import { isThermalChamber, IThermalChamber } from '../../tzp-pressform/entity/thermal-chamber/entity/thermal-chamber';
import { TITLES_TZP_DETAIL } from '../../tzp-detail/const/titles';
import { ETitles } from '../../../infrastructure/confirm-modal/const/titles';
import { GoBack } from '../../../infrastructure/confirm-modal/go-back';
import { TITLES_AUTOCOMPLETE } from '../../../infrastructure/async-auto-complete/const/titles';
import { ThermalChamberAutocompleteCard } from '../../tzp-pressform/entity/thermal-chamber/ui/thermal-chamber-autocomplete-card/thermal-chamber-card';
import Modal from 'react-native-modal';
import { TZPDetailAutocompleteCard } from '../../tzp-detail/ui/tzp-detail-items/tzp-detail-autocomplete-card/tzp-detail-card';
import { BuildingContext } from '../../../infrastructure/context/building-context';
import { TITLES_ENGINE_CASE } from 'rocket-engine/engine-case/const/title';
import { EState } from '../const/choose-ua-title-transition-state';
import { EngineCaseAutocompleteCard } from 'rocket-engine/engine-case/ui/stabilizer-block-card';
import { IEngineCase } from 'rocket-engine/engine-case/entity/engine-case';
import { ETitleFields } from 'tzp/tzp-detail/const/fields';

export const CreateTZPPlate: React.FC = () => {
  const { error, updateResponse } = useHttp<ITzpDetailSample>();
  const fieldNameThermalCamber = 'name';
  const fieldNameEngineCases = 'name';
  const [tzpPlateNumber, setTzpPlateNumber] = useState('');
  const [thermalChamber, setThermalChamber] = useState<IThermalChamber | null>(null);
  const [tzpDetail, setTzpDetail] = useState<ITzpDetail | null>(null);
  const [engineCases, setEngineCases] = useState<IEngineCase | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [testResults, setTestResults] = useState(0);

  const { buildingName } = useContext(BuildingContext);

  const searchParametersTzpDetail: TGetParameter = {
    items: '50',
    state: EState.STATE_NEW,
  };

  const searchParametersEngineCases: TGetParameter = {
    items: '50',
  };
  const { goTo } = useNavigate<TMember>();

  const searchParametersThermalChamber: TGetParameter = {
    items: '50',
    'locatedAt.name': buildingName,
  };

  const onSelectedThermalChamber = (thermalChamber: IThermalChamber | null): void => {
    setThermalChamber(thermalChamber);
  };

  const onSelectedTZPdetail = (tzpDetail: ITzpDetail | null): void => {
    setTzpDetail(tzpDetail);
  };

  const onSelectedEngineCases = (engineCases: IEngineCase | null): void => {
    setEngineCases(engineCases);
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = (): void => {
    setModalVisible(!isModalVisible);
  };

  const CreateNewTZPPlate = (): void => {
    const url = API_TZP_PLATE_SHORT_URL;
    updateResponse({
      url,
      method: 'POST',
      body: JSON.stringify({
        number: tzpPlateNumber,
        engineCases: [engineCases?.id],
        tzpEnginePressformId: [thermalChamber?.id],
        tzpDetails: [tzpDetail?.id],
        issuerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      }),
    });
  };

  const onScanEntity = (entity: TMember): void => {
    if (isThermalChamber(entity)) {
      setThermalChamber(entity);
    }
  };

  const useRadioState = (initialCheck = false) => {
    const [checked, setChecked] = React.useState(initialCheck);
    return { checked, onChange: setChecked };
  };

  const successRadioState = useRadioState();
  const dangerRadioState = useRadioState();

  useEffect(() => {
    if (showResult) {
      if (error) {
        const argsNavigateTo: TArgsNavigate<TMember, undefined> = {
          route: ENavigationName.OPERATION_CONFIRM,
          params: { error: MainTitles.SERVER_FAILED },
        };
        goTo(argsNavigateTo);
      }
      const argsNavigateTo2: TArgsNavigate<TMember, undefined> = {
        route: ENavigationName.OPERATION_CONFIRM,
        params: {},
      };
      goTo(argsNavigateTo2);
    }
  }, [error, updateResponse, showResult, goTo]);

  return (
    <View style={CNstyles.mainCNcontainerc}>
      <Text style={[CNstyles.textWhiteDefault, { fontSize: 18, fontWeight: 'bold', marginTop: -30 }]}>
        {TITLES_TZP_DETAIL_SAMPLES.create}
      </Text>
      <View style={{ height: 20 }} />
      <EntityFromScanner onScanEntity={onScanEntity} />
      <View style={CNstyles.CNcontainerc}>
        <View style={CNstyles.BtnContainerDetails}>
          <View style={{ margin: 10 }}>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_BUILDING.title}: <Text style={CNstyles.defaultPurple}>{buildingName}</Text>
            </Text>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_TZP_DETAIL_SAMPLES.number}: <Text style={CNstyles.defaultLime}>{tzpPlateNumber}</Text>
            </Text>
            {testResults === 0 ? (
              <>
                <Text style={CNstyles.textWhiteDefault}>
                  {TITLE_THERMAL_CHAMBERS.title}: <Text style={CNstyles.defaultLime}>{thermalChamber?.name}</Text>
                </Text>
                <Text style={CNstyles.textWhiteDefault}>
                  {TITLES_TZP_DETAIL.title}: <Text style={CNstyles.defaultLime}>{tzpDetail?.detailNumber}</Text>
                </Text>
              </>
            ) : (
              <Text style={CNstyles.textWhiteDefault}>
                {TITLES_ENGINE_CASE.title}: <Text style={CNstyles.defaultLime}>{engineCases?.name}</Text>
              </Text>
            )}
          </View>
        </View>

        <ScrollView>
          <RadioGroup
            style={{ display: 'flex', flexDirection: 'row' }}
            selectedIndex={testResults}
            onChange={index => setTestResults(index)}
          >
            <Radio status="success" {...successRadioState}>
              {TITLES_TZP_DETAIL.title}
            </Radio>
            <Radio status="success" {...dangerRadioState}>
              {TITLES_ENGINE_CASE.title}
            </Radio>
          </RadioGroup>
          <Input
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => setTzpPlateNumber(val)}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_TZP_DETAIL_SAMPLES.number}
          />
          {testResults === 0 ? (
            <>
              <View style={CNstyles.defaultHeight} />
              <Text style={CNstyles.textWhiteDefault}>{TITLES_TZP_DETAIL_SAMPLES.ChooseThermalCamberOrTZPDetail}</Text>
              <AsyncAutoComplete
                title={TITLE_THERMAL_CHAMBERS.choice}
                pathname={API_THERMINAL_CHAMBERS_SHORT_URL}
                renderCard={ThermalChamberAutocompleteCard}
                searchParameters={searchParametersThermalChamber}
                onSelectedEntities={onSelectedThermalChamber}
                isNoValid={!thermalChamber}
                helperText={TITLES_AUTOCOMPLETE.noDataInput}
                fieldName={fieldNameThermalCamber}
              />
              <AsyncAutoComplete
                title={TITLES_TZP_DETAIL.title}
                pathname={API_TZP_DETAIL_SHORT_URL}
                renderCard={TZPDetailAutocompleteCard}
                searchParameters={searchParametersTzpDetail}
                onSelectedEntities={onSelectedTZPdetail}
                isNoValid={!tzpDetail}
                helperText={TITLES_AUTOCOMPLETE.noDataInput}
                fieldName={ETitleFields.detailNumber}
              />
            </>
          ) : (
            <AsyncAutoComplete
              title={TITLES_ENGINE_CASE.title}
              pathname={API_ENGINE_CASE_SHORT_URL}
              renderCard={EngineCaseAutocompleteCard}
              searchParameters={searchParametersEngineCases}
              onSelectedEntities={onSelectedEngineCases}
              isNoValid={!engineCases}
              helperText={TITLES_AUTOCOMPLETE.noDataInput}
              fieldName={fieldNameEngineCases}
            />
          )}
          <Modal
            animationInTiming={200}
            animationOutTiming={200}
            onBackdropPress={toggleModal}
            isVisible={isModalVisible}
          >
            <View style={modalStyles.modalBack}>
              <View style={{ margin: 10 }}>
                <Text style={modalStyles.modalTitle}>{ETitles.CONFIRM_MOVE}</Text>
                <Text style={modalStyles.modalText}>{ETitles.CONFIRM_DETAILS}</Text>
                <View style={[modalStyles.modalContainer, { marginLeft: 140 }]}>
                  <TouchableHighlight
                    onPress={(): void => {
                      setModalVisible(false);
                    }}
                  >
                    <Text style={modalStyles.goBack}>{ETitles.BACK}</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={(): void => {
                      CreateNewTZPPlate();
                      setShowResult(true);
                    }}
                  >
                    <View style={modalStyles.titleWrapperPurple}>
                      <Text style={modalStyles.title}>{MainTitles.SEND}</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
          <Text>
            {(tzpPlateNumber && tzpDetail) || (tzpPlateNumber && engineCases) ? (
              <TouchableHighlight
                onPress={(): void => {
                  setModalVisible(true);
                }}
              >
                <View style={[CNstyles.BtnContainer, { width: 325 }]}>
                  <Text style={CNstyles.BtnTitle}>{MainTitles.SEND}</Text>
                </View>
              </TouchableHighlight>
            ) : (
              <TouchableHighlight style={{ width: 325 }} onPress={(): void => {}}>
                <View
                  style={{
                    backgroundColor: '#323232',
                    width: '100%',
                    borderRadius: 10,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      margin: 15,
                      fontSize: 16,
                    }}
                  >
                    {MainTitles.SEND}
                  </Text>
                </View>
              </TouchableHighlight>
            )}
          </Text>
          <View style={CNstyles.defaultHeight} />
          <GoBack />
        </ScrollView>
      </View>
    </View>
  );
};
