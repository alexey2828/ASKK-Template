import React from 'react';
import { View } from 'react-native';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { IpProvider } from './infrastructure/provider/ip-context-provider';
import { BuildingProvider } from './infrastructure/provider/building-context-provider';
import { AuthProvider } from './infrastructure/provider/auth-context-provider';
import { ServerTimeProvider } from './infrastructure/provider/server-time-context-provider';
import { Navigation } from './navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ScannerContextProvider } from './infrastructure/provider/scanner-context-provider';

export const App: React.FC = () => {
  return (
    <>
      <IpProvider>
        <BuildingProvider>
          <AuthProvider>
            <ServerTimeProvider>
              <ScannerContextProvider>
                <ApplicationProvider {...eva} theme={eva.dark}>
                  <GestureHandlerRootView style={{ flex: 1 }}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: '#121212',
                      }}
                    >
                      <Navigation />
                    </View>
                  </GestureHandlerRootView>
                </ApplicationProvider>
              </ScannerContextProvider>
            </ServerTimeProvider>
          </AuthProvider>
        </BuildingProvider>
      </IpProvider>
    </>
  );
};
