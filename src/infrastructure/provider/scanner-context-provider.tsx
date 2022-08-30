import React, { useEffect, useState } from 'react';
import { initScannerContext, ScannerContext, TScannerContext } from '../context/scanner-context';
import { useHttp } from '../../hooks/useHttp';
import { ETitles } from '../entity-from-scanner/const/titles';
import HoneywellScanner from 'react-native-honeywell-scanner';
import { Vibration } from 'react-native';
import { isMember } from '../api-platform';

type TDataCode = {
  data: string;
};

const MESSAGE = ETitles.FAILED_TO_COMPLETE_SCANNING;

/* eslint-disable @typescript-eslint/no-explicit-any */
export const ScannerContextProvider = (props: any) => {
  const [entity, setEntity] = useState(initScannerContext.entity);
  const [dataCode, setDataCode] = useState<TDataCode | string>('');
  const [messageError, setMessageError] = useState('');
  const [scanEntity, setScanEntity] = useState<TScannerContext['entity']>(null);
  const [claimed, setClaimed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadRec = useHttp<TScannerContext['entity']>();

  const resetError = (): void => {
    setMessageError('');
    loadRec.resetError();
  };

  const cleanScan = () => {
    setEntity(null);
  };

  useEffect(() => {
    HoneywellScanner.startReader().then(claimed => {
      console.log(claimed ? 'Barcode reader is claimed' : 'Barcode reader is busy');
      setClaimed(claimed);
    });

    return () => {
      HoneywellScanner.stopReader().then(() => {
        console.log('Barcode reader - Freedom!');
        setClaimed(false);
      });
    };
  }, []);

  useEffect(() => {
    if (claimed) {
      HoneywellScanner.on('barcodeReadFail', () => {
        setMessageError(MESSAGE);
        setDataCode('');
        Vibration.vibrate();
      });

      HoneywellScanner.on('barcodeReadSuccess', event => {
        setMessageError('');
        if (event) {
          setDataCode(event);
        }
      });

      return function cleanup(): void {
        HoneywellScanner.off('barcodeReadSuccess', () => {});
        HoneywellScanner.off('barcodeReadFail', () => {});
      };
    }
  }, [claimed]);

  useEffect(() => {
    setScanEntity(null);
    if (typeof dataCode !== 'string' && dataCode.data) {
      try {
        const url = JSON.parse(dataCode.data)['@id'];
        loadRec.updateResponse({ url });
      } catch (error) {
        setMessageError(MESSAGE);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCode]);

  useEffect(() => {
    if (isMember(loadRec.data) && claimed) {
      setScanEntity(loadRec.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadRec.data]);

  useEffect(() => {
    if (loadRec.error) {
      setMessageError(loadRec.error.message);
    }
  }, [loadRec.error]);

  useEffect(() => {
    setIsLoading(loadRec.isLoading);
  }, [loadRec.isLoading]);

  useEffect(() => {
    if (scanEntity && claimed) {
      setEntity(scanEntity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanEntity]);

  return (
    <ScannerContext.Provider value={{ entity, isLoading, messageError, resetError, cleanScan }}>
      {props.children}
    </ScannerContext.Provider>
  );
};
