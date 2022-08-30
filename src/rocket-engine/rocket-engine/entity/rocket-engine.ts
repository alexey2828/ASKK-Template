import { TMember } from 'infrastructure/api-platform';
import { isEnabledTransition, TEnabledTransition } from 'infrastructure/change-state';
import { IShortEngineBottom, isShortEngineBottom } from 'materials/engine-bottom/entity/short-interface-engine-bottom';
import { IShortNozzleBlock, isShortNozzleBlock } from 'materials/nozzle-block/entity/short-interface-nozzle-block';
import {
  IShortStabilizerBlock,
  isShortStabilizerBlock,
} from 'materials/stabilizer-block/entity/short-interface-stabilizer-block';
import { IShortEngineCase, isShortEngineCase } from 'rocket-engine/engine-case/entity/short-interface-engine-case';
import { IShortTzpDetail, isShortTzpDetail } from 'tzp/tzp-detail/entity/short-interface-tzp-detail';

export interface IRocketEngine extends TMember {
  createAt: string;
  number: string;
  state: string;
  frontEngineCase: IShortEngineCase | null;
  backEngineCase: IShortEngineCase | null;
  nozzleBlock: IShortNozzleBlock | null;
  engineBottom: IShortEngineBottom | null;
  stabilizerBlock: IShortStabilizerBlock | null;
  tzpDetail: IShortTzpDetail | null;
  weightUnloadedEngine: number | null;
  centerOfGravityUnloadedEngine: number | null;
  enabledTransitions: TEnabledTransition[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isRocketEngine(obj: any): obj is IRocketEngine {
  return (
    obj &&
    typeof obj.createAt === 'string' &&
    typeof obj.number === 'string' &&
    typeof obj.state === 'string' &&
    (!obj.frontEngineCase || isShortEngineCase(obj.frontEngineCase)) &&
    (!obj.backEngineCase || isShortEngineCase(obj.backEngineCase)) &&
    //
    (!obj.nozzleBlock || isShortNozzleBlock(obj.nozzleBlock)) &&
    (!obj.engineBottom || isShortEngineBottom(obj.engineBottom)) &&
    (!obj.stabilizerBlock || isShortStabilizerBlock(obj.stabilizerBlock)) &&
    (!obj.tzpDetail || isShortTzpDetail(obj.tzpDetail)) &&
    (!obj.weightUnloadedEngine || typeof obj.weightUnloadedEngine === 'number') &&
    (!obj.centerOfGravityUnloadedEngine || typeof obj.centerOfGravityUnloadedEngine === 'number') &&
    (!obj.enabledTransitions[0] || isEnabledTransition(obj.enabledTransitions[0]))
  );
}
