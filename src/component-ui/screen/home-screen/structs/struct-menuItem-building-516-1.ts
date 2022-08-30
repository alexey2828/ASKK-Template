import { PropsMenu } from '../../../menu/menu';
import {
  API_COMPONENT_BATCH_PLACE_SHORT_URL,
  API_ENGINE_CASE_SHORT_URL,
  API_ENGINE_PRESSFORM_SHORT_URL,
  API_MIXING_TYPE_SHORT_URL,
  API_ROCKET_ENGINE_SHORT_URL,
  API_TZP_DETAIL_SHORT_URL,
  API_TZP_PLATE_SHORT_URL,
  API_TZP_PRESS_FORM_SHORT,
} from '../../../../infrastructure/const/urls';
import { ENavigationName } from '../../../../infrastructure/const/navigation-name';
import { ETitlesTZPPlate } from '../const/titles';

export const strMenuItemBuilding516And1: PropsMenu['itemsList'] = [
  {
    id: '2c63f01b-d08a-4664-af8d-643e5ed41e1b',
    sourceImg: 'https://cdn.discordapp.com/attachments/716395232807354421/881789624610074684/unknown.png',
    textValue: ETitlesTZPPlate.PRESSFORMS_BODY,
    colorBG: '#e79355',
    route: API_ENGINE_PRESSFORM_SHORT_URL,
  },
  {
    id: '08d40044-2b3f-412a-8720-dd0e70f894bc',
    sourceImg: 'https://cdn.discordapp.com/attachments/716395232807354421/889787588624408586/unknown.png',
    textValue: ETitlesTZPPlate.SAMPLE_WITNESS,
    colorBG: '#3c6e91',
    route: ENavigationName.TMP_NO_DATA_ENTITY,
  },
  {
    id: 'ded5f92b-708b-4713-ab29-878b5201320f',
    sourceImg: 'https://cdn.discordapp.com/attachments/497433271567908874/815697366270738493/unknown.png',
    textValue: ETitlesTZPPlate.MIXING,
    colorBG: '#83D0CC',
    route: API_MIXING_TYPE_SHORT_URL,
  },
  {
    id: 'cad46ffb-0397-4c1c-a85d-911e19e76188',
    sourceImg: 'https://cdn.discordapp.com/attachments/716395232807354421/881791074664865832/unknown.png',
    textValue: ETitlesTZPPlate.ROCKET_ENGINE,
    colorBG: '#b4bc8d',
    route: API_ROCKET_ENGINE_SHORT_URL,
  },
  {
    id: '034bbdf4-d8c4-4c4f-b4b9-97c03fc59fea',
    sourceImg: 'https://cdn.discordapp.com/attachments/497433271567908874/819928340605304852/unknown.png',
    textValue: ETitlesTZPPlate.TZP_PRESSFORMS,
    colorBG: '#E2BD19',
    route: API_TZP_PRESS_FORM_SHORT,
  },
  {
    id: '43f701cd-08f9-4e3d-84f0-9eb9c078fb84',
    sourceImg: 'https://cdn.discordapp.com/attachments/466314747281801228/805188533282144276/unknown.png',
    textValue: ETitlesTZPPlate.COMPONENT_BATCH_PLACE,
    colorBG: '#C38FFF',
    route: API_COMPONENT_BATCH_PLACE_SHORT_URL,
  },
  {
    id: '43830910-5b40-4811-b732-71ba3cb6fef4',
    sourceImg: 'https://cdn.discordapp.com/attachments/497433271567908874/815698067977535548/unknown.png',
    textValue: ETitlesTZPPlate.TZP_DETAILS,
    colorBG: '#6FB1E4',
    route: API_TZP_DETAIL_SHORT_URL,
  },
  {
    id: 'ca71ecd0-1f6f-46e2-81e3-61024536792c',
    sourceImg: 'https://cdn.discordapp.com/attachments/497433271567908874/815697686085763092/unknown.png',
    textValue: ETitlesTZPPlate.TZP_PLATE,
    colorBG: '#F896AF',
    route: API_TZP_PLATE_SHORT_URL,
  },
  {
    id: 'X32gsd0-1213-46e2-33323-61857847590c',
    sourceImg: 'https://cdn.discordapp.com/attachments/716395232807354421/940504624903909376/unknown.png',
    textValue: ETitlesTZPPlate.ENGINE_CASE,
    colorBG: '#90E3A2',
    route: API_ENGINE_CASE_SHORT_URL,
  },
];
