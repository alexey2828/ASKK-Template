import { Input } from '@ui-kitten/components';
import { LockButton } from 'component-ui/buttons/lock-button';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { MainTitles } from '../../../const/titles-main';
import { INavigate } from '../../../hooks/use-navigate';
import { GoBack } from '../../../infrastructure/confirm-modal/go-back';
import { GoNext } from '../../../infrastructure/confirm-modal/go-next';
import { isStringCommon } from '../../../infrastructure/utils/validate/validate-string-common';
import { ETransitionsUa } from '../const/choose-ua-title-transition-state';
import { TITLES_TZP_DETAIL } from '../const/titles';
import { isTzpDetail, ITzpDetail } from '../entity/tzp-detail';
import { endpointTransition } from './const/endpoint-transition';

type TTZPDetailRegisterDefectDto = {
  defectDescription: string;
};

const leughtValidParam = {
  maxLength: 255,
  minLength: 0,
};

export const TZPDetailRegisterDefect = ({
  route,
}: INavigate<ITzpDetail, TTZPDetailRegisterDefectDto>): ReactElement => {
  const { entity } = route.params;
  const [defectDescription, setDefectDescription] = useState('');
  const [validDefectDescription, setValidDefectDescription] = useState(
    isStringCommon(defectDescription, leughtValidParam),
  );
  const [tZPDetailRegisterDefectDto, setTZPDetailRegisterDefectDto] = useState<TTZPDetailRegisterDefectDto | null>(
    null,
  );

  useEffect(() => {
    setValidDefectDescription(isStringCommon(defectDescription));
  }, [defectDescription]);

  useEffect(() => {
    if (validDefectDescription.valid) {
      setTZPDetailRegisterDefectDto({
        defectDescription: String(defectDescription),
      });
    } else {
      setTZPDetailRegisterDefectDto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validDefectDescription]);

  if (!isTzpDetail(entity)) {
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
              {TITLES_TZP_DETAIL.detailNumber}:<Text style={CNstyles.defaultPurple}> {entity?.detailNumber}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <ScrollView>
          <Input
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => setDefectDescription(val)}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_TZP_DETAIL.comment}
          />
          {!validDefectDescription.valid && <Text style={{ color: 'red' }}>{validDefectDescription.message}</Text>}
        </ScrollView>
        <View style={CNstyles.defaultHeight} />
        <View style={CNstyles.defaultHeight} />
        {tZPDetailRegisterDefectDto ? (
          <GoNext
            routeName={ENavigationName.CHANGE_STATE_TZP_DETAIL}
            dtoTransitions={tZPDetailRegisterDefectDto}
            endpoint={endpointTransition.REGISTER_DEFECT}
            entity={entity}
            title={ETransitionsUa.TRANSITION_REGISTER_DEFECT + '?'}
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
