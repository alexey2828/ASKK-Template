import { PropsMenu } from '../../../menu/menu';
import { ETitlesTZPPlate } from '../const/titles';
import {
  API_CASSETS_ENGINE_PRESSFORM_SHORT_URL,
  API_EQUIPMENT_ENGINE_PRESSFORM_SHORT_URL,
  API_NOZZLE_BLOCK_SHORT_URL,
  API_STABILIZER_BLOCK_SHORT_URL,
  API_ENGINE_BOTTOM_SHORT_URL,
  API_ENGINE_PRESSFORM_SHORT_URL,
  API_TZP_PRESS_FORM_SHORT,
} from '../../../../infrastructure/const/urls';

export const strMenuItemBuilding153Rmc: PropsMenu['itemsList'] = [
  {
    id: 'd9676099-f890-4704-ae7b-d717b3e78d14',
    sourceImg: 'https://cdn.discordapp.com/attachments/716395232807354421/881789624610074684/unknown.png',
    textValue: ETitlesTZPPlate.PRESSFORMS_BODY,
    colorBG: '#e79355',
    route: API_ENGINE_PRESSFORM_SHORT_URL,
  },
  {
    id: 'ff22a6a7-8be5-4353-8005-e3757786bbd6',
    sourceImg: 'https://cdn.discordapp.com/attachments/497433271567908874/819928340605304852/unknown.png',
    textValue: ETitlesTZPPlate.TZP_PRESSFORMS,
    colorBG: '#E2BD19',
    route: API_TZP_PRESS_FORM_SHORT,
  },
  {
    id: 'e587ac29-2f3b-433e-93ea-3905341d32f5',
    sourceImg: 'https://cdn.discordapp.com/attachments/716395232807354421/897773841609261096/unknown.png',
    textValue: ETitlesTZPPlate.CASSETTES,
    colorBG: '#16c47b',
    route: API_CASSETS_ENGINE_PRESSFORM_SHORT_URL,
  },
  {
    id: 'e0272895-012c-4a7e-ad4e-fa3c22c8ccdb',
    sourceImg: 'https://cdn.discordapp.com/attachments/716395232807354421/897774552061460521/unknown.png',
    textValue: ETitlesTZPPlate.EQUIPMENT_ENGINE_PRESSFORM,
    colorBG: '#ed413d',
    route: API_EQUIPMENT_ENGINE_PRESSFORM_SHORT_URL,
  },
  {
    id: 'ba9b6e64-0f84-4739-a98c-794df3fa1955',
    sourceImg: 'https://cdn.discordapp.com/attachments/716395232807354421/897776109771440128/unknown.png',
    textValue: ETitlesTZPPlate.NOZZLE_BLOCK,
    colorBG: '#c081b8',
    route: API_NOZZLE_BLOCK_SHORT_URL,
  },
  {
    id: '202b45d6-e3da-491e-882c-4985bd72e7e8',
    sourceImg: 'https://cdn.discordapp.com/attachments/716395232807354421/897776509476040704/unknown.png',
    textValue: ETitlesTZPPlate.STABILIZER_BLOCK,
    colorBG: '#9e6b02',
    route: API_STABILIZER_BLOCK_SHORT_URL,
  },
  {
    id: 'cf6c7ff9-b972-45e2-bc0d-7df288f3070a',
    sourceImg: 'https://cdn.discordapp.com/attachments/716395232807354421/897777112549822484/unknown.png',
    textValue: ETitlesTZPPlate.BOTTOM,
    colorBG: '#8dc75c',
    route: API_ENGINE_BOTTOM_SHORT_URL,
  },
];
