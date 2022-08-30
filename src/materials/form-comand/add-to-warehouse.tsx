import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { CNstyles } from '../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../infrastructure/confirm-modal/go-back';
import { MainTitles } from '../../const/titles-main';
import { GoNext } from '../../infrastructure/confirm-modal/go-next';
import { INavigate } from '../../hooks/use-navigate';
import { IEnginePressform, isEnginePressform } from '../engine-pressform/entity/engine-pressform';
import { endpointTransition } from './const/endpoint-transition';
import { IUser } from '../../users/entity/user';
import { ChooseCurrentUrlTransition } from '../model/choose-current-url-transition';
import { SearchUserMaster } from '../../users/model/search-user-master';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { LockButton } from 'component-ui/buttons/lock-button';

type TMaterialsAddToWarehouseDto = { masterUserId: string };

export const MaterialsAddToWarehouse = ({
  route,
}: INavigate<IEnginePressform, TMaterialsAddToWarehouseDto>): ReactElement => {
  const { entity } = route.params;

  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [materialsAddToWarehouseDto, setMaterialsAddToWarehouseDto] = useState<TMaterialsAddToWarehouseDto | null>(
    null,
  );

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  useEffect(() => {
    if (masterUser) {
      setMaterialsAddToWarehouseDto({
        masterUserId: masterUser?.id,
      });
    } else {
      setMaterialsAddToWarehouseDto(null);
    }
  }, [masterUser]);

  if (!isEnginePressform(entity)) {
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
              Матеріал:
              <Text style={CNstyles.defaultPurple}> {entity?.name}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <SearchUserMaster masterUser={masterUser} onSelected={onSelectedMasterUser} isNoValid={!masterUser} />
        <View style={CNstyles.defaultHeight} />
        {materialsAddToWarehouseDto ? (
          <GoNext
            routeName={ENavigationName.CHANGE_STATE_MATERIALS}
            dtoTransitions={materialsAddToWarehouseDto}
            endpoint={endpointTransition.ADD_TO_WAREHOUSE}
            entity={entity}
            currentUrl={ChooseCurrentUrlTransition(entity)?.toString()}
            title={ETransitionsUK.commandAddToWarehouse + '?'}
          />
        ) : (
          <LockButton />
        )}
        <View style={CNstyles.defaultHeight} />
        <GoBack />
      </View>
    </View>
  );
};
