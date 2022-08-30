import { PropsMenu } from '../../../menu/menu';
import { API_COMPONENT_BATCH_PLACE_SHORT_URL, API_MIXING_TYPE_SHORT_URL } from '../../../../infrastructure/const/urls';
import { ENavigationName } from '../../../../infrastructure/const/navigation-name';
import { ETitlesTZPPlate } from '../const/titles';

export const strMenuItemBuilding605: PropsMenu['itemsList'] = [
  {
    id: 'e7642727-5cff-4f45-b657-cc33797be936',
    sourceImg: 'https://cdn.discordapp.com/attachments/716395232807354421/881789624610074684/unknown.png',
    textValue: ETitlesTZPPlate.PRESSFORMS_BODY,
    colorBG: '#e79355',
    route: ENavigationName.TMP_NO_DATA_ENTITY,
  },
  {
    id: '5296ab28-dec1-4363-9ced-d941391f076e',
    sourceImg: 'https://cdn.discordapp.com/attachments/716395232807354421/889787588624408586/unknown.png',
    textValue: ETitlesTZPPlate.SAMPLE_WITNESS,
    colorBG: '#3c6e91',
    route: ENavigationName.TMP_NO_DATA_ENTITY,
  },
  {
    id: '4dddd30a-c7e9-4819-9576-13e7f22609fc',
    sourceImg: 'https://cdn.discordapp.com/attachments/497433271567908874/815697366270738493/unknown.png',
    textValue: ETitlesTZPPlate.MIXING,
    colorBG: '#83D0CC',
    route: API_MIXING_TYPE_SHORT_URL,
  },
  {
    id: '7cc2a63d-44c2-4731-874b-e3df6ac86de6',
    sourceImg: 'https://cdn.discordapp.com/attachments/716395232807354421/881791074664865832/unknown.png',
    textValue: ETitlesTZPPlate.ROCKET_ENGINE,
    colorBG: '#b4bc8d',
    route: ENavigationName.TMP_NO_DATA_ENTITY,
  },
  {
    id: '8a556af1-925c-4357-a5b1-b0d02d9a5301',
    sourceImg: 'https://cdn.discordapp.com/attachments/466314747281801228/805188533282144276/unknown.png',
    textValue: ETitlesTZPPlate.COMPONENT_BATCH_PLACE,
    colorBG: '#C38FFF',
    route: API_COMPONENT_BATCH_PLACE_SHORT_URL,
  },
];
