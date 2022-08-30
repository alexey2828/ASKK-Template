import { TMember } from '../../../infrastructure/api-platform';

export interface ISensorCalibration extends TMember {
  serialNumberMidaSensor: string;
  calibrationProtocolNumber: string;
  sensorReading: string;
  result: boolean | null;
  comment: string | null;
  createAt: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSensorCalibration(obj: any): obj is ISensorCalibration {
  return Boolean(
    obj &&
      typeof obj.serialNumberMidaSensor === 'string' &&
      typeof obj.calibrationProtocolNumber === 'string' &&
      typeof obj.sensorReading === 'string' &&
      (!obj.result || typeof obj.result === 'boolean') &&
      (!obj.comment || typeof obj.comment === 'string') &&
      typeof obj.createAt === 'string'
  );
}
