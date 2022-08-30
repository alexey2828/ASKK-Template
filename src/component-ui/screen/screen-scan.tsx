import React from 'react';
import { styles } from './screens-styles/screenStyle.styles';
import { Image, View } from 'react-native';
import { EntityFromScanner } from '../../infrastructure/entity-from-scanner/entity-from-scanner';
import { TArgsNavigate, useNavigate } from '../../hooks/use-navigate';
import { TMember } from '../../infrastructure/api-platform';
import { ENavigationName } from '../../infrastructure/const/navigation-name';
import { Text } from 'react-native-paper';

export const ScanScreen: React.FC = () => {
  const { goTo } = useNavigate<TMember>();

  const openDetail = (member: TMember): void => {
    if (member) {
      const argsNavigateTo: TArgsNavigate<TMember> = {
        route: ENavigationName.DETAILS_SCREEN,
        params: {
          entity: member,
        },
      };
      goTo(argsNavigateTo);
    }
  };

  return (
    <View style={styles.containerP}>
      <View style={{ position: 'relative', marginRight: 25, marginTop: 0 }}>
        <View style={{ marginLeft: 90, marginTop: -70 }}>
          <Text style={{ fontSize: 18, color: '#ffffff' }}>Відскануйте QR-код</Text>
          <Text style={{ fontSize: 16, color: '#a1a1a1' }}>Затисніть 2 кнопки з боків терміналу</Text>
        </View>
        <View style={{ marginLeft: 80 }}>
          <EntityFromScanner onScanEntity={openDetail} />
        </View>
        <Image source={require('../../../public/images/scan-background.gif')} style={{ marginLeft: 40, width: 450 }} />
      </View>
    </View>
  );
};
