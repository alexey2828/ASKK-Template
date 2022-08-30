import { Input } from '@ui-kitten/components/ui';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { MainTitles } from 'const/titles-main';
import { INavigate } from 'hooks/use-navigate';
import { GoBack } from 'infrastructure/confirm-modal/go-back';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { isPositiveStringNumber } from 'infrastructure/utils/validate/validate-positive-string-number';
import { styles } from 'component-ui/common-block-styles.styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { IUser } from 'users/entity/user';
import { SearchUserMaster } from 'users/model/search-user-master';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { TITLES_ROCKET_ENGINE } from '../const/title';
import { IRocketEngine, isRocketEngine } from '../entity/rocket-engine';
import { endpointTransition } from './const/endpoint-transition';

type TDetermineCenterOfGravityUnloadedEngineDto = {
  weightUnloadedEngine: number;
  centerOfGravityUnloadedEngine: number;
  masterUserId: string;
};

export const RocketEngineDetermineCenterOfGravityUnloadedEngine = ({
  route,
}: INavigate<IRocketEngine, TDetermineCenterOfGravityUnloadedEngineDto>): ReactElement => {
  const { entity } = route.params;
  const [determineCenterOfGravityUnloadedEngineDto, setDetermineCenterOfGravityUnloadedEngineDto] =
    useState<TDetermineCenterOfGravityUnloadedEngineDto | null>(null);
  const [weightUnloadedEngine, setWeightUnloadedEngine] = useState<string>('');
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [validateWeightUnloadedEngine, setValidateWeightUnloadedEngine] = useState(
    isPositiveStringNumber(weightUnloadedEngine),
  );
  const [centerOfGravityUnloadedEngine, setCenterOfGravityUnloadedEngine] = useState<string>('');
  const [validateCenterOfGravityUnloadedEngine, setValidateCenterOfGravityUnloadedEngine] = useState(
    isPositiveStringNumber(centerOfGravityUnloadedEngine),
  );

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  useEffect(() => {
    setValidateWeightUnloadedEngine(isPositiveStringNumber(weightUnloadedEngine));
  }, [weightUnloadedEngine]);

  useEffect(() => {
    setValidateCenterOfGravityUnloadedEngine(isPositiveStringNumber(centerOfGravityUnloadedEngine));
  }, [centerOfGravityUnloadedEngine]);

  useEffect(() => {
    if (masterUser && validateCenterOfGravityUnloadedEngine.valid && validateWeightUnloadedEngine.valid) {
      setDetermineCenterOfGravityUnloadedEngineDto({
        centerOfGravityUnloadedEngine: Number(centerOfGravityUnloadedEngine),
        weightUnloadedEngine: Number(weightUnloadedEngine),
        masterUserId: masterUser?.id,
      });
    } else {
      setDetermineCenterOfGravityUnloadedEngineDto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [masterUser, validateCenterOfGravityUnloadedEngine, validateWeightUnloadedEngine]);

  if (!isRocketEngine(entity)) {
    return (
      <View style={CNstyles.FormContainer}>
        <Text style={CNstyles.textWhiteDefault}>{MainTitles.NO_DATA}</Text>
      </View>
    );
  }

  return (
    <View style={CNstyles.FormContainer}>
      <View style={{ margin: 20 }}>
        <View style={CNstyles.BtnContainerDetails}>
          <View style={{ margin: 10 }}>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_ROCKET_ENGINE.title}:<Text style={CNstyles.defaultPurple}>{entity?.number}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />

        <Input
          maxLength={9}
          keyboardType="numeric"
          placeholderTextColor="#a1a1a1"
          onChangeText={(val): void => {
            setWeightUnloadedEngine(val.replace(',', '.'));
          }}
          style={CNstyles.CNtextInputc}
          placeholder={TITLES_ROCKET_ENGINE.weightUnloadedEngine}
        />
        {!validateCenterOfGravityUnloadedEngine.valid ? (
          <Text style={{ color: 'red' }}>{validateCenterOfGravityUnloadedEngine.message}</Text>
        ) : null}

        <Input
          maxLength={9}
          keyboardType="numeric"
          placeholderTextColor="#a1a1a1"
          onChangeText={(val): void => {
            setCenterOfGravityUnloadedEngine(val.replace(',', '.'));
          }}
          style={CNstyles.CNtextInputc}
          placeholder={TITLES_ROCKET_ENGINE.centerOfGravityUnloadedEngine}
        />
        {!validateWeightUnloadedEngine.valid ? (
          <Text style={{ color: 'red' }}>{validateWeightUnloadedEngine.message}</Text>
        ) : null}
        <SearchUserMaster masterUser={masterUser} onSelected={onSelectedMasterUser} isNoValid={!masterUser} />
        <View style={styles.border} />
        <View style={CNstyles.defaultHeight} />

        <GoNext
          routeName={ENavigationName.CHANGE_STATE_ROCKET_ENGINE}
          dtoTransitions={determineCenterOfGravityUnloadedEngineDto}
          endpoint={endpointTransition.DETERMINE_CENTER_OF_GRAVITY_UPLOADED_ENGINE}
          entity={entity}
          title={ETransitionsUK.commandDetermineCenterOfGravityUnloadedEngine + '?'}
        />
        <View style={CNstyles.defaultHeight} />
        <GoBack />
      </View>
    </View>
  );
};
