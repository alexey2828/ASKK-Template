import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { useHttp } from '../../hooks/useHttp';
import { IHydraGet, TMember } from '../../infrastructure/api-platform';
import { API_COMPONENT_BATCH_PLACE_SHORT_URL, API_COMPONENT_BATCH_SHORT_URL } from '../../infrastructure/const/urls';
import { CNstyles } from '../../component-ui/screen/screens-styles/screenStyle.styles';
import { AsyncAutoComplete } from '../../infrastructure/async-auto-complete/asyncAutoComplete';
import { MainTitles } from '../../const/titles-main';
import { TGetParameter } from '../../infrastructure/custom-query-string/custom-query-string';
import { Input } from '@ui-kitten/components/ui';
import { ComponentBatchAutocompleteCard } from '../entity/component-batch/ui/component-batch-card/component-batch-autocomplete-card';
import { EFields } from '../entity/component-batch/const/fields';
import { IComponentBatch, isComponentBatch } from '../entity/component-batch/component-batch';
import { GoBack } from '../../infrastructure/confirm-modal/go-back';
import { TITLES_AUTOCOMPLETE } from '../../infrastructure/async-auto-complete/const/titles';
import { TITLES_COMPONENT_BATCH_PLACE } from '../const/titles';
import { TITLES_COMPONENT_BATCH, TITLES_COMPONENT_TYPE } from '../entity/component-batch/const/titles';
import { ETitles } from '../../infrastructure/confirm-modal/const/titles';
import { TArgsNavigate, useNavigate } from '../../hooks/use-navigate';
import { ENavigationName } from '../../infrastructure/const/navigation-name';
import { TITLES_BUILDING } from '../../buildings/const/titles';
import { EntityFromScanner } from '../../infrastructure/entity-from-scanner/entity-from-scanner';
import Modal from 'react-native-modal';
import { modalStyles } from '../../infrastructure/confirm-modal/confirm.styles';
import { BuildingContext } from '../../infrastructure/context/building-context';

const searchParametersComponentBatch: TGetParameter = {
  items: '50',
  state: 'STATE_READY_FOR_USE',
};

export const CreateComponent: React.FC = () => {
  const { buildingName } = useContext(BuildingContext);
  const { goTo } = useNavigate<TMember>();
  const [showResult, setShowResult] = useState(false);
  const [currentBuilding, setCurrentBuilding] = useState<any>();
  const { error, updateResponse, data } = useHttp<IHydraGet<IComponentBatch>>();
  const [componentBatch, setComponentBatch] = useState<IComponentBatch | null>(null);
  const [batchPlaceNumber, setBatchPlaceNumber] = useState('');

  const onSelectedComponentBatch = (componentBatch: IComponentBatch | null): void => {
    setComponentBatch(componentBatch);
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = (): void => {
    setModalVisible(!isModalVisible);
  };

  // TODO
  useEffect(() => {
    const url = '/api/buildings' + '?page=1&items=1&name=' + buildingName;
    const currentBuildingId = data?.['hydra:member'].map(building => {
      return building.id;
    });
    setCurrentBuilding(currentBuildingId);
    updateResponse({ url });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentBatch]);

  const CreateNewComponentBatchPlace = (): void => {
    if (componentBatch && batchPlaceNumber) {
      const url = API_COMPONENT_BATCH_PLACE_SHORT_URL;
      updateResponse({
        url,
        method: 'POST',
        body: JSON.stringify({
          batchPlaceNumber: batchPlaceNumber,
          componentBatchId: componentBatch?.id,
          locatedAt: currentBuilding?.join(),
          issuerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        }),
      });
    }
  };

  const onScanEntity = (entity: TMember): void => {
    if (isComponentBatch(entity) && entity?.state === 'STATE_READY_FOR_USE') {
      setComponentBatch(entity);
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
      <Text
        style={[
          CNstyles.textWhiteDefault,
          {
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: -30,
            marginBottom: 20,
          },
        ]}
      >
        {TITLES_COMPONENT_BATCH_PLACE.createTitle}
      </Text>
      <EntityFromScanner onScanEntity={onScanEntity} />
      <View style={CNstyles.CNcontainerc}>
        <View style={CNstyles.BtnContainerDetails}>
          <View style={{ margin: 10 }}>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_BUILDING.title}: <Text style={CNstyles.defaultPurple}>{buildingName}</Text>
            </Text>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_COMPONENT_TYPE.componentType}:{' '}
              <Text style={CNstyles.defaultLime}>{componentBatch?.componentType?.name}</Text>
            </Text>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_COMPONENT_BATCH_PLACE.place}: <Text style={CNstyles.defaultLime}>{batchPlaceNumber}</Text>
            </Text>
          </View>
        </View>
        <Input
          placeholderTextColor="#a1a1a1"
          onChangeText={(val): void => setBatchPlaceNumber(val)}
          style={CNstyles.CNtextInputc}
          placeholder={TITLES_COMPONENT_BATCH_PLACE.place}
        />

        <AsyncAutoComplete
          title={TITLES_COMPONENT_BATCH.title}
          pathname={API_COMPONENT_BATCH_SHORT_URL}
          renderCard={ComponentBatchAutocompleteCard}
          searchParameters={searchParametersComponentBatch}
          onSelectedEntities={onSelectedComponentBatch}
          isNoValid={!componentBatch}
          helperText={TITLES_AUTOCOMPLETE.noDataInput}
          fieldName={EFields.COMPONENT_TYPE_NAME}
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
              <Text style={modalStyles.modalText}>{TITLES_COMPONENT_BATCH_PLACE.createConfirmTitle}</Text>
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
                    CreateNewComponentBatchPlace();
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
          {componentBatch && batchPlaceNumber ? (
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
            <TouchableHighlight onPress={(): void => {}}>
              <View
                style={{
                  backgroundColor: '#323232',
                  width: 325,
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
        <View style={{ height: 10 }} />
        <GoBack />
      </View>
    </View>
  );
};
