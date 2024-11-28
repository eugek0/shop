import path from 'path';
import { v4 } from 'uuid';

import Saver from '../Saver';
import getGenders from '../gender/gender.insert.query';

const findByTitle = (items, title) => {
  const candidate = items.find((item) => item.title === title);
  return candidate['id'] || null;
};

const defaultNavigations = () => {
  const genders = getGenders();

  return [
    {
      id: v4(),
      title: 'FOR MAN',
      subTitle: 'коллекция мужской парфюмерии',
      image: 'forMan.png',
      isDiscount: false,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: null,
      typeId: null,
      colorId: null,
      motiveId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'FOR WOMAN',
      subTitle: 'коллекция женской парфюмерии',
      image: 'forWoman.png',
      isDiscount: false,
      genderId: findByTitle(genders, 'ЖЕНЩИНАМ'),
      volumeId: null,
      typeId: null,
      colorId: null,
      motiveId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'UNISEX',
      subTitle: 'коллекция мужской и женской парфюмерии',
      image: 'unisex.png',
      isDiscount: false,
      genderId: findByTitle(genders, 'УНИСЕКС'),
      volumeId: null,
      typeId: null,
      colorId: null,
      motiveId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'SALE',
      subTitle: 'акционные предложения',
      image: 'sale.png',
      isDiscount: true,
      genderId: null,
      volumeId: null,
      typeId: null,
      colorId: null,
      motiveId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'BASE',
      subTitle: 'коллекция парфюмерии',
      image: 'base.png',
      isDiscount: false,
      genderId: null,
      volumeId: null,
      typeId: null,
      colorId: null,
      motiveId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
};

const getNavigations = () =>
  Saver.processFile(
    path.dirname(__filename),
    path.basename(__filename),
    defaultNavigations(),
  );

export default getNavigations;
