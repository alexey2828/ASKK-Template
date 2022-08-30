import React, { ReactNode } from 'react';
import { View } from 'react-native';

type TViewStateWrap = {
  children: ReactNode;
};

export const ViewStateWrap: React.FC<TViewStateWrap> = ({ children }) => {
  return <View style={{ margin: 10, marginTop: 0, borderColor: 'transparent' }}>{children}</View>;
};
