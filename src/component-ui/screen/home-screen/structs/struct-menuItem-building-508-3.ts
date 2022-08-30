import { PropsMenu } from '../../../menu/menu';
import { API_COMPONENT_BATCH_PLACE_SHORT_URL, API_MIXING_TYPE_SHORT_URL } from '../../../../infrastructure/const/urls';
import { ENavigationName } from '../../../../infrastructure/const/navigation-name';
import { ETitlesTZPPlate } from '../const/titles';

export const strMenuItemBuilding508And3: PropsMenu['itemsList'] = [
  {
    id: '639ed19c-10f7-40de-9666-d6627b775c85',
    sourceImg: 'https://cdn.discordapp.com/attachments/716395232807354421/881789624610074684/unknown.png',
    textValue: ETitlesTZPPlate.PRESSFORMS_BODY,
    colorBG: '#e79355',
    route: ENavigationName.TMP_NO_DATA_ENTITY,
  },
  {
    id: '15f02b33-8066-4bdd-b292-c4a54f07b3b7',
    sourceImg: 'https://cdn.discordapp.com/attachments/716395232807354421/881789800703750144/unknown.png',
    textValue: ETitlesTZPPlate.SAMPLE_WITNESS,
    colorBG: '#3c6e91',
    route: ENavigationName.TMP_NO_DATA_ENTITY,
  },
  {
    id: '89c9b71c-cc90-467b-af27-e7b730c9a5a5',
    sourceImg: 'https://cdn.discordapp.com/attachments/497433271567908874/815697366270738493/unknown.png',
    textValue: ETitlesTZPPlate.MIXING,
    colorBG: '#83D0CC',
    route: API_MIXING_TYPE_SHORT_URL,
  },
  {
    id: '80fcd3f8-988d-4097-891a-2b8d7addb8a9',
    sourceImg: 'https://cdn.discordapp.com/attachments/466314747281801228/805188533282144276/unknown.png',
    textValue: ETitlesTZPPlate.COMPONENT_BATCH_PLACE,
    colorBG: '#C38FFF',
    route: API_COMPONENT_BATCH_PLACE_SHORT_URL,
  },
];
