import { TMember } from '../../infrastructure/api-platform';
import {
  API_CASSETS_ENGINE_PRESSFORM_SHORT_URL,
  API_ENGINE_BOTTOM_SHORT_URL,
  API_ENGINE_PRESSFORM_SHORT_URL,
  API_EQUIPMENT_ENGINE_PRESSFORM_SHORT_URL,
  API_NOZZLE_BLOCK_SHORT_URL,
  API_STABILIZER_BLOCK_SHORT_URL,
} from '../../infrastructure/const/urls';

export function ChooseCurrentUrlTransition(entity: TMember): string | null {
  if (entity?.['@type'] === 'EquipmentEnginePressform') {
    return API_EQUIPMENT_ENGINE_PRESSFORM_SHORT_URL;
  }
  if (entity?.['@type'] === 'EnginePressform') {
    return API_ENGINE_PRESSFORM_SHORT_URL;
  }
  if (entity?.['@type'] === 'EngineBottom') {
    return API_ENGINE_BOTTOM_SHORT_URL;
  }
  if (entity?.['@type'] === 'CassettesEnginePressform') {
    return API_CASSETS_ENGINE_PRESSFORM_SHORT_URL;
  }
  if (entity?.['@type'] === 'StabilizerBlock') {
    return API_STABILIZER_BLOCK_SHORT_URL;
  }
  if (entity?.['@type'] === 'NozzleBlock') {
    return API_NOZZLE_BLOCK_SHORT_URL;
  }
  return null;
}
