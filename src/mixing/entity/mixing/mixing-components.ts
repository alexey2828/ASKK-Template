import { TMember } from '../../../infrastructure/api-platform';

interface IComponentBatchPlaceShort extends TMember {
  componentBatch: {
    componentType: {
      name: string;
    };
  };
}
export interface IMixingComponents extends TMember {
  componentBatchPlace: IComponentBatchPlaceShort;
  weight: number;
  addTime: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMixingComponents(obj: any): obj is IMixingComponents {
  return (
    obj &&
    typeof obj?.weight === 'number' &&
    typeof obj?.addTime === 'string' &&
    typeof obj?.componentBatchPlace.componentBatch.componentType.name === 'string'
  );
}
