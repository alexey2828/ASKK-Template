import React, { ReactElement, useEffect, useState } from 'react';
import { INavigate } from 'hooks/use-navigate';
import { IEngineCase, isEngineCase } from '../entity/engine-case';
import { ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { EntityFromScanner } from 'infrastructure/entity-from-scanner/entity-from-scanner';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { styles } from 'component-ui/common-block-styles.styles';
import { Input } from '@ui-kitten/components/ui';
import { API_PREMISES_SHORT_URL } from 'infrastructure/const/urls';
import { TITLES_AUTOCOMPLETE } from 'infrastructure/async-auto-complete/const/titles';
import { EFields } from 'buildings/const/fields';
import { SearchUserApparatchik } from 'users/model/search-user-apparatchik';
import { SearchUserMaster } from 'users/model/search-user-master';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { GoBack } from 'infrastructure/confirm-modal/go-back';
import { MainTitles } from 'const/titles-main';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { IUser } from 'users/entity/user';
import { isPositiveStringNumber } from 'infrastructure/utils/validate/validate-positive-string-number';
import { TITLES_ENGINE_CASE } from '../const/title';
import { AsyncAutoComplete } from 'infrastructure/async-auto-complete/asyncAutoComplete';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { endpointTransition } from './const/endpoint-transition';
import { IPremises } from 'plant/premises/entity/premises';
import { PremisesAutocompleteCard } from 'plant/premises/premises-card/premises-card';
import { TITLES_PREMISES } from 'plant/premises/const/title';

type TWeightPressformWithTzpDto = {
  premisesOfTheBuildingId: string;
  weight: number;
  masterUserId: string;
  apparatchikUserId: string;
};

const lengthValidParam = {
  maxLength: 9,
  minLength: 1,
};

export const WeightPressformWithTzp = ({ route }: INavigate<IEngineCase, TWeightPressformWithTzpDto>): ReactElement => {
  const { entity } = route.params;
  const [premises, setPremises] = useState<IPremises | null>(null);
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [apparatchikUser, setApparatchikUser] = useState<IUser | null>(null);
  const [weight, setWeight] = useState('');
  const [validWeight, setValidWeight] = useState(isPositiveStringNumber(weight, lengthValidParam));
  const [weightPressformWithTzpDto, setWeightPressformWithTzpDto] = useState<TWeightPressformWithTzpDto | null>(null);
  const [errorScanPremises, setErrorScanPremises] = useState('');

  const onScanPremises = (entity: IPremises): void => {
    setErrorScanPremises('');
    setPremises(entity);
  };

  const resetErrorScanPremises = () => {
    setErrorScanPremises('');
  };

  const onSelectedPremises = (Premises: IPremises | null): void => {
    setPremises(Premises);
  };
  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  const onSelectedApparatchikUser = (apparatchikUser: IUser | null): void => {
    setApparatchikUser(apparatchikUser);
  };

  useEffect(() => {
    setValidWeight(isPositiveStringNumber(weight));
  }, [weight]);

  useEffect(() => {
    if (premises && validWeight.valid && apparatchikUser && masterUser) {
      setWeightPressformWithTzpDto({
        weight: Number(weight),
        premisesOfTheBuildingId: String(premises?.id),
        masterUserId: String(masterUser?.id),
        apparatchikUserId: String(apparatchikUser?.id),
      });
    } else {
      setWeightPressformWithTzpDto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [premises, validWeight, apparatchikUser, masterUser]);

  if (!isEngineCase(entity)) {
    return <></>;
  }

  return (
    <View style={CNstyles.FormContainer}>
      <EntityFromScanner
        onScanEntity={onScanPremises}
        noValidEntity={errorScanPremises}
        resetNoValidEntity={resetErrorScanPremises}
      />
      <View style={{ margin: 20 }}>
        <View style={CNstyles.BtnContainerDetails}>
          <View style={{ margin: 10 }}>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_ENGINE_CASE.title}: <Text style={CNstyles.defaultPurple}>{entity?.name}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />
        <ScrollView>
          <Input
            maxLength={9}
            keyboardType="numeric"
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => {
              setWeight(val.replace(',', '.'));
            }}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_ENGINE_CASE.weight}
          />
          {!validWeight.valid && <Text style={{ color: 'red' }}>{validWeight.message}</Text>}
          <AsyncAutoComplete
            title={TITLES_PREMISES.title}
            pathname={API_PREMISES_SHORT_URL}
            value={premises?.name}
            renderCard={PremisesAutocompleteCard}
            onSelectedEntities={onSelectedPremises}
            isNoValid={!premises}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={EFields.NAME}
          />
          <SearchUserMaster masterUser={masterUser} onSelected={onSelectedMasterUser} isNoValid={!masterUser} />
          <SearchUserApparatchik
            apparatchikUser={apparatchikUser}
            onSelected={onSelectedApparatchikUser}
            isNoValid={!apparatchikUser}
          />
        </ScrollView>
        <View style={CNstyles.defaultHeight} />
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />

        <View style={CNstyles.defaultHeight} />
        {weightPressformWithTzpDto ? (
          <>
            <GoNext
              routeName={ENavigationName.CHANGE_STATE_ENGINE_CASES}
              dtoTransitions={weightPressformWithTzpDto}
              endpoint={endpointTransition.WEIGH_PRESSFORM_WITH_TZP}
              entity={entity}
              title={ETransitionsUK.commandWeighPressformWithTzp + '?'}
              titleBtn={MainTitles.SEND}
            />
          </>
        ) : (
          <TouchableHighlight onPress={(): void => {}}>
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
        <View style={CNstyles.defaultHeight} />
        <GoBack />
        <View style={CNstyles.defaultHeight} />
      </View>
    </View>
  );
};
