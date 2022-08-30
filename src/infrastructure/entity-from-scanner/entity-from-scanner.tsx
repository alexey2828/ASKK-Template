import { ScannerContext } from 'infrastructure/context/scanner-context';
import React, { ReactElement, useContext, useEffect } from 'react';
import { View } from 'react-native';
import { Loader } from '../../component-ui/loader/Loader';
import { ServerErr } from '../../component-ui/viewError/server-error';
import { TMember } from '../api-platform';

type TEntityFormScanner<T> = {
  onScanEntity: (entity: T) => void;
  noValidEntity?: string;
  resetNoValidEntity?: () => void;
};

export function EntityFromScanner<T extends TMember>({
    onScanEntity,
    noValidEntity,
    resetNoValidEntity,
  }: TEntityFormScanner<T>): ReactElement {
  const { entity, isLoading, resetError, messageError, cleanScan } = useContext(ScannerContext);

  useEffect(() => {
    if (cleanScan) {
      cleanScan();
    }
  }, [cleanScan]);

  useEffect(() => {
    if (entity) {
      onScanEntity(entity as T);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity]);

  return (
    <View>
      {isLoading && <Loader />}
      {!!messageError && <ServerErr onReset={resetError} message={messageError} />}
      {!!noValidEntity && <ServerErr message={noValidEntity} onReset={resetNoValidEntity} />}
    </View>
  );
}
