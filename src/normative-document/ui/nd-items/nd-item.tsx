import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { TArgsNavigate, useNavigate } from '../../../hooks/use-navigate';
import { TMember } from '../../../infrastructure/api-platform';
import { ENavigationName } from '../../../infrastructure/const/navigation-name';
import { INormativeDocument } from '../../entity/normative-document';
import { IShortNormativeDocument } from '../../entity/short-normative-document';
import { styles } from './nd-item.styles';

type TNDItem = {
  normativeDocument: INormativeDocument | IShortNormativeDocument;
};

export const NDItem: React.FC<TNDItem> = ({ normativeDocument }) => {
  const { goTo } = useNavigate<TMember>();
  return (
    <View style={styles.BtnContainerDetails} key={normativeDocument.id}>
      <View key={normativeDocument.id} style={{ margin: 20, marginTop: -15, width: 340 }}>
        <Pressable
          onPress={(): void => {
            const argsNavigateTo: TArgsNavigate<TMember> = {
              route: ENavigationName.ND_DETAILS,
              params: { entity: normativeDocument },
            };
            goTo(argsNavigateTo);
          }}
        >
          <Image source={require('../../../../public/images/ND.png')} style={styles.Ico} />
          <View>
            <Text style={styles.listTitle}>{normativeDocument.name}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
