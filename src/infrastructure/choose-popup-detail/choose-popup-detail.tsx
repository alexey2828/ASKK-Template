import React from 'react';
import { DetailEngineCase } from 'rocket-engine/engine-case/model/detail-engine-case';
import { DetailEquipmentEnginePressform } from 'rocket-engine/equipment-engine-pressform/model/detail-equipment-engine-pressform';
import { DetailRocketEngine } from 'rocket-engine/rocket-engine/model/detail-rocket-engine';
import { DetaiComponentBatchPlace } from '../../component-batch-place/model/detail-component-batch-place';
import { DetailCassetsEnginePressform } from '../../materials/cassets-engine-pressform/model/detail-cassets-engine-pressform';
import { DetailEngineBottom } from '../../materials/engine-bottom/model/detail-engine-bottom';
import { DetailEnginePressform } from '../../materials/engine-pressform/model/detail-engine-pressform';
import { DetailNozzleBlock } from '../../materials/nozzle-block/model/detail-nozzle-block';
import { DetailStabilizerBlock } from '../../materials/stabilizer-block/model/detail-stabilizer-block';
import { DetailMixing } from '../../mixing/model/detail-mixing';
import { DetailTZPDetail } from '../../tzp/tzp-detail/model/detail-tzp-detail';
import { DetailTzpPlate } from '../../tzp/tzp-plate/model/detail-tzp-sample-details';
import { DetailTzpPressform } from '../../tzp/tzp-pressform/model/detail-tzp-pressform';
import { TMember } from '../api-platform';

export interface IModalDetail {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entity: any;
}

type TChoicePopupDetail = {
  [key: string]: React.FC<IModalDetail>;
};

const choicePopupDetailType: TChoicePopupDetail = {
  TzpPressform: DetailTzpPressform,
  Mixing: DetailMixing,
  ComponentBatchPlace: DetaiComponentBatchPlace,
  TzpDetail: DetailTZPDetail,
  TzpDetailSample: DetailTzpPlate,
  EngineBottom: DetailEngineBottom,
  CassettesEnginePressform: DetailCassetsEnginePressform,
  StabilizerBlock: DetailStabilizerBlock,
  NozzleBlock: DetailNozzleBlock,
  RocketEngine: DetailRocketEngine,
  EquipmentEnginePressform: DetailEquipmentEnginePressform,
  EnginePressform: DetailEnginePressform,
  EngineCase: DetailEngineCase,
};

export function choicePopupDetail<T>(dataEntity: T & TMember): JSX.Element | null {
  const type = dataEntity?.['@type'];
  if (dataEntity) {
    if (typeof type !== 'string') {
      return null;
    }
    const PopupDetail = choicePopupDetailType[type];
    if (PopupDetail) {
      return <PopupDetail entity={dataEntity} />;
    }
  }
  return null;
}
