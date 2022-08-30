import { IEngineCase } from 'rocket-engine/engine-case/entity/engine-case';
import { IRocketEngine } from 'rocket-engine/rocket-engine/entity/rocket-engine';
import { IComponentBatchPlace } from '../../component-batch-place/entity/component-batch-place';
import { ICassetsEnginePressform } from '../../materials/cassets-engine-pressform/entity/cassets-engine-pressform';
import { IEngineBottom } from '../../materials/engine-bottom/entity/engine-bottom';
import { IEnginePressform } from '../../materials/engine-pressform/entity/engine-pressform';
import { IEquipmentEnginePressform } from '../../materials/equipment-engine-pressform/entity/equipment-engine-pressform';
import { INozzleBlock } from '../../materials/nozzle-block/entity/nozzle-block';
import { IStabilizerBlock } from '../../materials/stabilizer-block/entity/stabilizer-block';
import { IMixing } from '../../mixing';
import { ITzpDetail } from '../../tzp/tzp-detail/entity/tzp-detail';
import { ITzpDetailSample } from '../../tzp/tzp-plate/entity/tzp-plate';
import { ITzpPressform } from '../../tzp/tzp-pressform';

export type TEnabledTransition = {
  name: string;
};

export type TEntityStateMachine =
  | IMixing
  | IComponentBatchPlace
  | ITzpPressform
  | ITzpDetail
  | ITzpDetailSample
  | ICassetsEnginePressform
  | IEngineBottom
  | IEnginePressform
  | IEquipmentEnginePressform
  | INozzleBlock
  | IEngineCase
  | IRocketEngine
  | IStabilizerBlock;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEnabledTransition(obj: any): obj is TEnabledTransition {
  return obj && typeof obj.name === 'string';
}
