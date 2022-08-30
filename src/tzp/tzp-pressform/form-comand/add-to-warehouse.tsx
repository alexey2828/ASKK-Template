import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../../infrastructure/confirm-modal/go-back';
import { MainTitles } from '../../../const/titles-main';
import { endpointTransition } from './const/endpoint-transition';
import { GoNext } from '../../../infrastructure/confirm-modal/go-next';
import { INavigate } from '../../../hooks/use-navigate';
import { styles } from '../../../component-ui/common-block-styles.styles';
import { isTzpPressform, ITzpPressform } from '../entity/tzp-pressform/tzp-pressform';
import { TITLES_TZP_PRESSFORM } from '../const/titiles';
import { IUser } from '../../../users/entity/user';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { SearchUserMaster } from '../../../users/model/search-user-master';
import { ENavigationName } from 'infrastructure/const/navigation-name';

type TAddToWarehouseDto = { masterUserId: string };

export const AddToWarehouse = ({ route }: INavigate<ITzpPressform, TAddToWarehouseDto>): ReactElement => {
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

  if (!isTzpPressform(entity)) {
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
              {TITLES_TZP_PRESSFORM.pressformNumber}:
              <Text style={CNstyles.defaultPurple}>{entity?.pressformNumber}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <SearchUserMaster masterUser={masterUser} onSelected={onSelectedMasterUser} isNoValid={!masterUser} />
        <View style={styles.border} />
        <View style={CNstyles.defaultHeight} />

        <GoNext
          routeName={ENavigationName.CHANGE_STATE_TZP_PRESSFORM}
          dtoTransitions={dtoTZPPressFormAddToWarehouse}
          endpoint={endpointTransition.TRANSITION_ADD_TO_WAREHOUSE}
          entity={entity}
          title={ETransitionsUK.TRANSITION_ADD_TO_WAREHOUSE + '?'}
        />
        <View style={CNstyles.defaultHeight} />
        <GoBack />
      </View>
    </View>
  );
};
