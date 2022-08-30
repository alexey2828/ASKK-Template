import { PropsMenu } from '../../../menu/menu';
import {
  API_COMPONENT_BATCH_PLACE_SHORT_URL,
  API_MIXING_SHORT_URL,
  API_MIXING_TYPE_SHORT_URL,
  API_TZP_DETAIL_SHORT_URL,
  API_TZP_PRESS_FORM_SHORT,
} from '../../../../infrastructure/const/urls';

export const strPropsMenuItem: PropsMenu['itemsList'] = [
  {
    id: 'a',
    sourceImg: 'https://cdn.discordapp.com/attachments/466314747281801228/805188533282144276/unknown.png',
    textValue: 'Компоненти на складі',
    colorBG: '#C38FFF',
    route: API_COMPONENT_BATCH_PLACE_SHORT_URL,
  },
  {
    id: 'b',
    sourceImg: 'https://cdn.discordapp.com/attachments/497433271567908874/815697366270738493/unknown.png',
    textValue: 'Змішування',
    colorBG: '#83D0CC',
    route: API_MIXING_TYPE_SHORT_URL,
  },
  {
    id: 'c',
    sourceImg: 'https://cdn.discordapp.com/attachments/497433271567908874/815697686085763092/unknown.png',
    textValue: 'Пластина ТЗП',
    colorBG: '#F896AF',
    route: API_TZP_DETAIL_SHORT_URL,
  },
  {
    id: 'd',
    sourceImg: 'https://cdn.discordapp.com/attachments/497433271567908874/819928340605304852/unknown.png',
    textValue: 'Прес-форми деталі ТЗП',
    colorBG: '#E2BD19',
    route: API_TZP_PRESS_FORM_SHORT,
  },
  {
    id: 'e',
    sourceImg: 'https://cdn.discordapp.com/attachments/497433271567908874/815698067977535548/unknown.png',
    textValue: 'Деталi ТЗП',
    colorBG: '#6FB1E4',
    route: API_MIXING_SHORT_URL,
  },
  {
    id: 'f',
    sourceImg: 'https://cdn.discordapp.com/attachments/497433271567908874/815698426141474866/unknown.png',
    textValue: 'Информація',
    colorBG: '#FF5C00',
    route: 'TestScreen',
  },
];
