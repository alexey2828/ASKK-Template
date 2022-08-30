import React, { ReactElement, useEffect, useState } from 'react';
import { INavigate } from 'hooks/use-navigate';
import { IEquipmentEnginePressform, isEquipmentEnginePressform } from '../entity/equipment-engine-pressform';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { endpointTransition } from './const/endpoint-transition';
import { IUser } from 'users/entity/user';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { MainTitles } from 'const/titles-main';
import { Text, View } from 'react-native';
import { TITLES_EQUIPMENT_ENGINE_PRESSFORM } from '../const/titles';
import { SearchUserMaster } from 'users/model/search-user-master';
import { styles } from 'infrastructure/entity-list/entity-list.styles';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { GoBack } from 'infrastructure/confirm-modal/go-back';

type TAddToWarehouseDto = {
  masterUserId: string;
};

export const EquipmentEnginePressformAddToWarehouse = ({
  route,
}: INavigate<IEquipmentEnginePressform, TAddToWarehouseDto>): ReactElement => {
  const { entity } = route.params;
  const [dtoTZPPressFormAddToWarehouse, setDtoTZPPressFormAddToWarehouse] = useState<TAddToWarehouseDto | null>(null);
  const [masterUser, setMasterUser] = useState<IUser | null>(null);

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  useEffect(() => {
    if (masterUser) {
      setDtoTZPPressFormAddToWarehouse({
        masterUserId: masterUser?.id,
      });
    } else {
      setDtoTZPPressFormAddToWarehouse(null);
    }
  }, [masterUser]);

  if (!isEquipmentEnginePressform(entity)) {
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
              {TITLES_EQUIPMENT_ENGINE_PRESSFORM.title}: <Text style={CNstyles.defaultPurple}>{entity?.name}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <SearchUserMaster masterUser={masterUser} onSelected={onSelectedMasterUser} isNoValid={!masterUser} />
        <View style={styles.border} />
        <View style={CNstyles.defaultHeight} />

        <GoNext
          routeName={ENavigationName.CHANGE_STATE_EQUIPMENT_ENGINE_PRESSFORM}
          dtoTransitions={dtoTZPPressFormAddToWarehouse}
          endpoint={endpointTransition.TRANSITION_ADD_TO_WAREHOUSE}
          entity={entity}
          title={ETransitionsUK.commandAddToWarehouse + '?'}
        />
        <View style={CNstyles.defaultHeight} />
        <GoBack />
      </View>
    </View>
  );
};
