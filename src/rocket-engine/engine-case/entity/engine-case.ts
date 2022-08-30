import { IBuilding, isBuilding } from 'buildings/entity/building';
import { TMember } from 'infrastructure/api-platform';
import { isEnabledTransition, TEnabledTransition } from 'infrastructure/change-state';
import {
  IShortCassetteEnginePressform,
  isShortCassetteEnginePressform,
} from 'materials/cassets-engine-pressform/entity/short-interface-cassette-engine-pressform';
import {
  IShortEnginePressform,
  isShortEnginePressform,
} from 'materials/engine-pressform/entity/short-interface-engine-pressform';
import {
  IPolymerizationProcess,
  isPolymerizationProcess,
} from 'mixing/entity/polymerization-process/polymerization-process';
import { IShortMidaSensor, isShortMidaSensor } from 'plant/mida-sensor/entity/short-interface-mida-sensor';
import {
  IShortEquipmentEnginePressform,
  isShortEquipmentEnginePressform,
} from 'rocket-engine/equipment-engine-pressform/entity/short-interface-equipment-engine-pressform';
import { IShortTzpDetail, isShortTzpDetail } from 'tzp/tzp-detail/entity/short-interface-tzp-detail';
import {
  IShortAppliedMixingForEngineCase,
  isShortAppliedMixingForEngineCase,
} from '../applied-mixing/entity/short-interface-applied-mixing-for-engine-case';
import { IShortAssembly, isShortAssembly } from '../assembly/entity/short-interface-assembly';
import { IGluingCuffsToEngineCase, isGluingCuffsToEngineCase } from '../gluing-cuffs/entity/entity';
import { IShortTzpEngineCase, isShortTzpEngineCase } from '../tzp-engine-case/entity/short-interface-tzp-engine-case';
import { isWeightEngineCase, IWeightEngineCase } from '../weigh-engine-case/entity/weight-engine-case';

export interface IEngineCase extends TMember {
  name: string;
  state: string;
  createAt: string;
  numberUsedPolymerizationKm1: number;
  polymerizationProcess: IPolymerizationProcess | null;
  tzpEngineCase: IShortTzpEngineCase | null;
  weightEngineCases: IWeightEngineCase[] | null;
  locatedAt: IBuilding;
  pressform: IShortEnginePressform | null;
  appliedKc: IShortAppliedMixingForEngineCase | null;
  gluingCuffs: IGluingCuffsToEngineCase | null;
  frontCapCuffs: IShortTzpDetail | null;
  backCapCuffs: IShortTzpDetail | null;
  midaSensor: IShortMidaSensor | null;
  cassettesEnginePressform: IShortCassetteEnginePressform | null;
  equipmentEnginePressform: IShortEquipmentEnginePressform | null;
  assembly: IShortAssembly | null;
  enabledTransitions: TEnabledTransition[];
}

export function isEngineCase(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is IEngineCase {
  return (
    obj &&
    typeof obj.name === 'string' &&
    typeof obj.state === 'string' &&
    typeof obj.createAt === 'string' &&
    typeof obj.numberUsedPolymerizationKm1 === 'number' &&
    (!obj.polymerizationProcess || isPolymerizationProcess(obj.polymerizationProcess)) &&
    (!obj.tzpEngineCase || isShortTzpEngineCase(obj.tzpEngineCase)) &&
    (!obj.weightEngineCases || !obj.weightEngineCases[0] || isWeightEngineCase(obj.weightEngineCases[0])) &&
    isBuilding(obj.locatedAt) &&
    (!obj.pressform || isShortEnginePressform(obj.pressform)) &&
    (!obj.appliedKc || isShortAppliedMixingForEngineCase(obj.appliedKc)) &&
    (!obj.gluingCuffs || isGluingCuffsToEngineCase(obj.gluingCuffs)) &&
    (!obj.frontCapCuffs || isShortTzpDetail(obj.frontCapCuffs)) &&
    (!obj.backCapCuffs || isShortTzpDetail(obj.backCapCuffs)) &&
    (!obj.midaSensor || isShortMidaSensor(obj.midaSensor)) &&
    (!obj.cassettesEnginePressform || isShortCassetteEnginePressform(obj.cassettesEnginePressform)) &&
    (!obj.equipmentEnginePressform || isShortEquipmentEnginePressform(obj.equipmentEnginePressform)) &&
    (!obj.assembly || isShortAssembly(obj.assembly)) &&
    (!obj.enabledTransitions[0] || isEnabledTransition(obj.enabledTransitions[0]))
  );
}
