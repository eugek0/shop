import path from 'path';
import { v4 } from 'uuid';

import Saver from '../Saver';

const defaultTypes = () => [
  {
    id: v4(),
    title: 'ВОДЯНОЙ',
    topNotes: 'Груша, розовый перец, цветок апельсина',
    middleNotes: 'Кофе, жасмин, горький миндаль, лакричник',
    lowNotes: 'Ваниль, пачули, кедр, кашемировое дерево',
    sentiment: 'Спонтанные ночные прогулки',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    title: 'ГУРМАНСКИЙ',
    topNotes: 'Груша, розовый перец, цветок апельсина',
    middleNotes: 'Кофе, жасмин, горький миндаль, лакричник',
    lowNotes: 'Ваниль, пачули, кедр, кашемировое дерево',
    sentiment: 'Спонтанные ночные прогулки',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    title: 'ДРЕВЕСНО-МУСКУСНЫЙ',
    topNotes: 'Груша, розовый перец, цветок апельсина',
    middleNotes: 'Кофе, жасмин, горький миндаль, лакричник',
    lowNotes: 'Ваниль, пачули, кедр, кашемировое дерево',
    sentiment: 'Спонтанные ночные прогулки',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    title: 'ПРЯНЫЕ-ДРЕВЕСНЫЕ',
    topNotes: 'Апельсин, морские ноты, альдегиды, красный мандарин',
    middleNotes: 'Перец, нероли, кедр',
    lowNotes: 'Бобы тонка, ваниль, белый мускус, амбра, ветивер, элеми',
    sentiment: 'Покорять, достигать, свершать',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const getTypes = () =>
  Saver.processFile(
    path.dirname(__filename),
    path.basename(__filename),
    defaultTypes(),
  );

export default getTypes;
