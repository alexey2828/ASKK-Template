import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableHighlight } from 'react-native';
import { TMember } from '../../infrastructure/api-platform';
import { API_MIXER_SHORT_URL, API_MIXING_SHORT_URL, API_MIXING_TYPE_SHORT_URL } from '../../infrastructure/const/urls';
import { CNstyles } from '../../component-ui/screen/screens-styles/screenStyle.styles';
import { MainTitles } from '../../const/titles-main';
import { GoBack } from '../../infrastructure/confirm-modal/go-back';
import { ENavigationName } from '../../infrastructure/const/navigation-name';
import { TArgsNavigate, useNavigate } from '../../hooks/use-navigate';
import { AsyncAutoComplete } from '../../infrastructure/async-auto-complete/asyncAutoComplete';
import { MixingTypeAutocompleteCard } from '../ui/mixing-card/mixing-type-card';
import { TGetParameter } from '../../infrastructure/custom-query-string/custom-query-string';
import { MixerAutocompleteCard } from '../ui/mixing-card/mixing-mixer-card';
import { Input } from '@ui-kitten/components/ui';
import { IMixer, isMixer } from '../entity/mixer/mixer';
import { IMixingType } from '../entity/mixing-type/mixing-type';
import { EFields } from '../const/fields';
import { TITLES_MIXER } from '../entity/mixer/const/titles';
import { TITLES_AUTOCOMPLETE } from '../../infrastructure/async-auto-complete/const/titles';
import { TITLES_MIXING_TYPE } from '../entity/mixing-type/const/titles';
import { TITLES_MIXING } from '../const/titles';
import { useHttp } from '../../hooks/useHttp';
import { IMixing } from '../entity/mixing/mixing';
import { ETitles } from '../../infrastructure/confirm-modal/const/titles';
import { TITLES_BUILDING } from '../../buildings/const/titles';
import Modal from 'react-native-modal';
import { modalStyles } from '../../infrastructure/confirm-modal/confirm.styles';
import { EntityFromScanner } from '../../infrastructure/entity-from-scanner/entity-from-scanner';
import { BuildingContext } from '../../infrastructure/context/building-context';

export const CreateMixing: React.FC = () => {
  const [mixingNumber, setMixingNumber] = useState('');
  const [mixingType, setMixingType] = useState<IMixingType | null>(null);
  const [mixer, setMixer] = useState<IMixer | null>(null);
  const [showResult, setShowResult] = useState(false);
  const { error, updateResponse } = useHttp<IMixing>();
  const { buildingName } = useContext(BuildingContext);

  const searchParametersMixingType: TGetParameter = {
    items: '50',
    'mixingType.mixingTypeAbstract.name': 'mixingType.mixingTypeAbstract.name',
  };
  const { goTo } = useNavigate<TMember>();

  const searchParametersMixer: TGetParameter = {
    items: '50',
    available: 'true',
    'locatedAt.name': buildingName,
    'mixingProcess.mixer.name': String(mixer),
  };

  const onSelectedMixingType = (mixingType: IMixingType | null): void => {
    setMixingType(mixingType);
  };
  const onSelectedMixer = (mixer: IMixer | null): void => {
    setMixer(mixer);
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = (): void => {
    setModalVisible(!isModalVisible);
  };

  const CreateNewMixing = (): void => {
    const url = API_MIXING_TYPE_SHORT_URL;
    updateResponse({
      url,
      method: 'POST',
      body: JSON.stringify({
        name: mixingNumber,
        mixingTypeId: mixingType?.id,
        mixerId: mixer?.id,
        issuerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      }),
    });
  };

  const onScanEntity = (entity: TMember): void => {
    if (isMixer(entity) && entity.available && entity.locatedAt.name === buildingName) {
      setMixer(entity);
    }
  };

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
        {TITLES_MIXING.createTitle}
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
              {TITLES_MIXING.name}: <Text style={CNstyles.defaultLime}>{mixingNumber}</Text>
            </Text>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_MIXING_TYPE.title}:{' '}
              <Text style={CNstyles.defaultLime}>{mixingType?.mixingTypeAbstract?.name}</Text>
            </Text>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_MIXER.title}: <Text style={CNstyles.defaultLime}>{mixer?.name}</Text>
            </Text>
          </View>
        </View>

        <ScrollView>
          <Input
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => setMixingNumber(val)}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_MIXING.name}
          />
          <AsyncAutoComplete
            title={TITLES_MIXING_TYPE.title}
            pathname={API_MIXING_SHORT_URL}
            renderCard={MixingTypeAutocompleteCard}
            searchParameters={searchParametersMixingType}
            onSelectedEntities={onSelectedMixingType}
            isNoValid={!mixingType}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={EFields.MIXING_TYPE_ABSTRACT_NAME}
          />
          <AsyncAutoComplete
            title={TITLES_MIXER.title}
            pathname={API_MIXER_SHORT_URL}
            renderCard={MixerAutocompleteCard}
            searchParameters={searchParametersMixer}
            onSelectedEntities={onSelectedMixer}
            isNoValid={!mixer}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={EFields.NAME}
            isEmptyData={TITLES_MIXER.mixersUse}
          />
          <Modal
            animationInTiming={200}
            animationOutTiming={200}
            onBackdropPress={toggleModal}
            isVisible={isModalVisible}
          >
            <View style={modalStyles.modalBack}>
              <View style={{ margin: 10 }}>
                <Text style={modalStyles.modalTitle}>{ETitles.CONFIRM_MOVE}</Text>
                <Text style={modalStyles.modalText}>{TITLES_MIXING.createConfirmTitle}</Text>
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
                      CreateNewMixing();
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
            {mixingNumber && mixer && mixingType ? (
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
