import { Input } from '@ui-kitten/components/ui';
import { LockButton } from 'component-ui/buttons/lock-button';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { MainTitles } from '../../../const/titles-main';
import { INavigate } from '../../../hooks/use-navigate';
import { GoBack } from '../../../infrastructure/confirm-modal/go-back';
import { GoNext } from '../../../infrastructure/confirm-modal/go-next';
import { isPositiveStringNumber } from '../../../infrastructure/utils/validate/validate-positive-string-number';
import { isStringCommon } from '../../../infrastructure/utils/validate/validate-string-common';
import { TITLES_MIXING_COMPONENTS } from '../../../mixing/const/titles';
import { TITLES_QUALITY_REPORT } from '../../quality-report/const/titles';
import { ETransitionsUa } from '../const/choose-ua-title-transition-state';
import { TITLES_TZP_DETAIL } from '../const/titles';
import { isTzpDetail, ITzpDetail } from '../entity/tzp-detail';
import { endpointTransition } from './const/endpoint-transition';

type TAddQualityControlReportDto = {
  appearance: string;
  weight: number;
};

const leughtValidParam = {
  maxLength: 255,
  minLength: 0,
};

export const AddQualityControlReport = ({
  route,
}: INavigate<ITzpDetail, TAddQualityControlReportDto>): ReactElement => {
  const { entity: detailTZP } = route.params;
  const [appearance, setAppearance] = useState('');
  const [weight, setWeight] = useState('');
  const [validWeight, setValidWeight] = useState(isPositiveStringNumber(weight));
  const [validAppearance, setValidAppearance] = useState(isStringCommon(appearance, leughtValidParam));
  const [dtoAddQualityControlReport, setDtoAddQualityControlReport] = useState<TAddQualityControlReportDto | null>(
    null,
  );

  useEffect(() => {
    setValidWeight(isPositiveStringNumber(weight));
  }, [weight]);

  useEffect(() => {
    setValidAppearance(isStringCommon(appearance, leughtValidParam));
  }, [appearance]);

  useEffect(() => {
    if (validWeight.valid) {
      setDtoAddQualityControlReport({
        weight: Number(weight),
        appearance: appearance,
      });
    } else {
      setDtoAddQualityControlReport(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validWeight]);

  if (!isTzpDetail(detailTZP)) {
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
              {TITLES_TZP_DETAIL.title}:<Text style={CNstyles.defaultPurple}> {detailTZP?.detailNumber}</Text>
            </Text>
          </View>
        </View>
        <ScrollView>
          <Input
            maxLength={9}
            keyboardType="numeric"
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => {
              setWeight(val.replace(',', '.'));
            }}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_MIXING_COMPONENTS.weight}
          />
          {!validWeight.valid && <Text style={{ color: 'red' }}>{validWeight.message}</Text>}

          <Input
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => setAppearance(val)}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_QUALITY_REPORT.appearance}
          />
          {!validAppearance.valid && <Text style={{ color: 'red' }}>{validAppearance.message}</Text>}
        </ScrollView>
        <View style={CNstyles.defaultHeight} />
        {dtoAddQualityControlReport ? (
          <GoNext
            routeName={ENavigationName.CHANGE_STATE_TZP_DETAIL}
            dtoTransitions={dtoAddQualityControlReport}
            endpoint={endpointTransition.ADD_QUALITY_CONTROL_REPORT}
            entity={detailTZP}
            title={ETransitionsUa.TRANSITION_ADD_QUALITY_CONTROL_REPORT + '?'}
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
