import { TMember } from '../../../infrastructure/api-platform';
import {
  isEnabledTransition,
  TEnabledTransition
} from '../../../infrastructure/change-state';
import { ISensorCalibration, isSensorCalibration } from './sensor-calibration';

export interface IMidaSensor extends TMember {
  factoryNumber: string;
  serialNumber: string;
  state: string;
  createAt: string;
  sensorCalibrations: ISensorCalibration[];
  enabledTransitions: TEnabledTransition[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMidaSensor(obj: any): obj is IMidaSensor {
  return (
    obj &&
    typeof obj.factoryNumber === 'string' &&
    typeof obj.serialNumber === 'string' &&
    typeof obj.state === 'string' &&
    typeof obj.createAt === 'string' &&
    (!obj.sensorCalibrations[0] ||
      isSensorCalibration(obj.sensorCalibrations[0])) &&
    (!obj.enabledTransitions[0] ||
      isEnabledTransition(obj.enabledTransitions[0]))
  );
}
