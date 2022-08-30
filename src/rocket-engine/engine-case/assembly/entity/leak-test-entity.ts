import { TMember } from '../../../../infrastructure/api-platform';

export interface ILeakTest extends TMember {
  createAt: string;
  testResult: boolean;
  nitrogenPressure: number;
  dewPointNitrogen: number;
  clearanceBetweenTheNut: number;
  estimatedNumberOfRevolutions: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isLeakTest(obj: any): obj is ILeakTest {
  return (
    obj &&
    typeof obj.createAt === 'string' &&
    typeof obj.testResult === 'boolean' &&
    typeof obj.nitrogenPressure === 'number' &&
    typeof obj.dewPointNitrogen === 'number' &&
    typeof obj.clearanceBetweenTheNut === 'number' &&
    typeof obj.estimatedNumberOfRevolutions === 'number'
  );
}
