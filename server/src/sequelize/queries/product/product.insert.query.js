import path from 'path';
import { v4 } from 'uuid';

import Saver from '../Saver';
import getColors from '../color/color.insert.query';
import getGenders from '../gender/gender.insert.query';
import getTypes from '../type/type.insert.query';
import getVolumes from '../volume/volume.insert.query';
import getMotives from '../motive/motive.insert.query';
import getDiscounts from '../discount/discount.insert.query';

const findByTitle = (items, title) => {
  const candidate = items.find((item) => item.title === title);
  return candidate['id'] || null;
};

const findByValue = (items, value) => {
  const candidate = items.find((item) => item.value === value);
  return candidate ? candidate.id : null;
};

const defaultProducts = () => {
  const types = getTypes();
  const colors = getColors();
  const volumes = getVolumes();
  const genders = getGenders();
  const motives = getMotives();
  const discounts = getDiscounts();

  return [
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description:
        'Мужской аромат CHARISME SPORT объединяет в себе смелость, уверенность, спортивный характер, элегантность, чувственность и грацию. Он создан для сильных, храбрых, целеустремленных и живущих полной жизнью мужчин.  В парфюмерной композиции гармонично переплелись морские и цитрусовые ноты, а также ноты перца, ветивера, кедра, нероли, мускуса и амбры. Спортивный аромат CHARISME SPORT отлично подойдет для повседневного образа, подчеркнув самые лучшие качества его обладателя.',
      images: ['1.png', '1.png', '1.png', '1.png'],
      quantity: 40,
      price: 250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ПРЯНЫЕ-ДРЕВЕСНЫЕ'),
      colorId: findByTitle(colors, 'СИНИЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, 5),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description:
        'Мужской аромат CHARISME SPORT объединяет в себе смелость, уверенность, спортивный характер, элегантность, чувственность и грацию. Он создан для сильных, храбрых, целеустремленных и живущих полной жизнью мужчин.  В парфюмерной композиции гармонично переплелись морские и цитрусовые ноты, а также ноты перца, ветивера, кедра, нероли, мускуса и амбры. Спортивный аромат CHARISME SPORT отлично подойдет для повседневного образа, подчеркнув самые лучшие качества его обладателя.',
      images: ['2.png', '2.png', '2.png', '2.png'],
      quantity: 40,
      price: 4000,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '100 ML'),
      typeId: findByTitle(types, 'ПРЯНЫЕ-ДРЕВЕСНЫЕ'),
      colorId: findByTitle(colors, 'СИНИЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, 10),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description:
        'Мужской аромат CHARISME SPORT объединяет в себе смелость, уверенность, спортивный характер, элегантность, чувственность и грацию. Он создан для сильных, храбрых, целеустремленных и живущих полной жизнью мужчин.  В парфюмерной композиции гармонично переплелись морские и цитрусовые ноты, а также ноты перца, ветивера, кедра, нероли, мускуса и амбры. Спортивный аромат CHARISME SPORT отлично подойдет для повседневного образа, подчеркнув самые лучшие качества его обладателя.',
      images: ['3.png', '3.png', '3.png', '3.png'],
      quantity: 40,
      price: 2500,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ПРЯНЫЕ-ДРЕВЕСНЫЕ'),
      colorId: findByTitle(colors, 'СИНИЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TRAVEL SET №2',
      description:
        'ravel Set масляных духов №2 состоит из 5-ти миниатюр масляных духов объемом в 3мл каждая: ',
      images: ['4.png', '4.png', '4.png', '4.png'],
      quantity: 40,
      price: 1250,
      genderId: findByTitle(genders, 'УНИСЕКС'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'масляные духи (5шт/набор)'),
      discountId: findByValue(discounts, 50),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TEMPO BLISS',
      description: 'DESCRIPTION',
      images: ['5.png', '5.png', '5.png', '5.png'],
      quantity: 40,
      price: 2415,
      genderId: findByTitle(genders, 'УНИСЕКС'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TEMPO BLISS',
      description: 'DESCRIPTION',
      images: ['6.png', '6.png', '6.png', '6.png'],
      quantity: 40,
      price: 2415,
      genderId: findByTitle(genders, 'УНИСЕКС'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, 25),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['7.png', '7.png', '7.png', '7.png'],
      quantity: 40,
      price: 250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ВОДЯНОЙ'),
      colorId: findByTitle(colors, 'СИНИЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, 40),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['8.png', '8.png', '8.png', '8.png'],
      quantity: 40,
      price: 4000,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ГУРМАНСКИЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['9.png', '9.png', '9.png', '9.png'],
      quantity: 40,
      price: 2500,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TRAVEL SER №2',
      description: 'DESCRIPTION',
      images: ['10.png', '10.png', '10.png', '10.png'],
      quantity: 40,
      price: 1250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['11.png', '11.png', '11.png', '11.png'],
      quantity: 40,
      price: 250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ВОДЯНОЙ'),
      colorId: findByTitle(colors, 'СИНИЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['12.png', '12.png', '12.png', '12.png'],
      quantity: 40,
      price: 4000,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ГУРМАНСКИЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['13.png', '13.png', '13.png', '13.png'],
      quantity: 40,
      price: 2500,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TRAVEL SER №2',
      description: 'DESCRIPTION',
      images: ['14.png', '14.png', '14.png', '14.png'],
      quantity: 40,
      price: 1250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'масляные духи (5шт/набор)'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TEMPO BLISS',
      description: 'DESCRIPTION',
      images: ['15.png', '15.png', '15.png', '15.png'],
      quantity: 40,
      price: 2415,
      genderId: findByTitle(genders, 'УНИСЕКС'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, 30),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TEMPO BLISS',
      description: 'DESCRIPTION',
      images: ['16.png', '16.png', '16.png', '16.png'],
      quantity: 40,
      price: 2415,
      genderId: findByTitle(genders, 'УНИСЕКС'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['17.png', '17.png', '17.png', '17.png'],
      quantity: 40,
      price: 250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ВОДЯНОЙ'),
      colorId: findByTitle(colors, 'СИНИЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, 15),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['18.png', '18.png', '18.png', '18.png'],
      quantity: 40,
      price: 4000,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ГУРМАНСКИЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['19.png', '19.png', '19.png', '19.png'],
      quantity: 40,
      price: 2500,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TRAVEL SER №2',
      description: 'DESCRIPTION',
      images: ['20.png', '20.png', '20.png', '20.png'],
      quantity: 40,
      price: 1250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'масляные духи (5шт/набор)'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['21.png', '21.png', '21.png', '21.png'],
      quantity: 40,
      price: 250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ВОДЯНОЙ'),
      colorId: findByTitle(colors, 'СИНИЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['22.png', '22.png', '22.png', '22.png'],
      quantity: 40,
      price: 4000,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ГУРМАНСКИЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['23.png', '23.png', '23.png', '23.png'],
      quantity: 40,
      price: 2500,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'масляные духи (5шт/набор)'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TRAVEL SER №2',
      description: 'DESCRIPTION',
      images: ['24.png', '24.png', '24.png', '24.png'],
      quantity: 40,
      price: 1250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TEMPO BLISS',
      description: 'DESCRIPTION',
      images: ['25.png', '25.png', '25.png', '25.png'],
      quantity: 40,
      price: 2415,
      genderId: findByTitle(genders, 'УНИСЕКС'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TEMPO BLISS',
      description: 'DESCRIPTION',
      images: ['26.png', '26.png', '26.png', '26.png'],
      quantity: 40,
      price: 2415,
      genderId: findByTitle(genders, 'УНИСЕКС'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['27.png', '27.png', '27.png', '27.png'],
      quantity: 40,
      price: 250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ВОДЯНОЙ'),
      colorId: findByTitle(colors, 'СИНИЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['28.png', '28.png', '28.png', '28.png'],
      quantity: 40,
      price: 4000,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ГУРМАНСКИЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['29.png', '29.png', '29.png', '29.png'],
      quantity: 40,
      price: 2500,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TRAVEL SER №2',
      description: 'DESCRIPTION',
      images: ['30.png', '30.png', '30.png', '30.png'],
      quantity: 40,
      price: 1250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['31.png', '31.png', '31.png', '31.png'],
      quantity: 40,
      price: 250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ВОДЯНОЙ'),
      colorId: findByTitle(colors, 'СИНИЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['32.png', '32.png', '32.png', '32.png'],
      quantity: 40,
      price: 4000,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ГУРМАНСКИЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['33.png', '33.png', '33.png', '33.png'],
      quantity: 40,
      price: 2500,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TRAVEL SER №2',
      description: 'DESCRIPTION',
      images: ['34.png', '34.png', '34.png', '34.png'],
      quantity: 40,
      price: 1250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'масляные духи (5шт/набор)'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TEMPO BLISS',
      description: 'DESCRIPTION',
      images: ['35.png', '35.png', '35.png', '35.png'],
      quantity: 40,
      price: 2415,
      genderId: findByTitle(genders, 'УНИСЕКС'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TEMPO BLISS',
      description: 'DESCRIPTION',
      images: ['36.png', '36.png', '36.png', '36.png'],
      quantity: 40,
      price: 2415,
      genderId: findByTitle(genders, 'УНИСЕКС'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['37.png', '37.png', '37.png', '37.png'],
      quantity: 40,
      price: 250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ВОДЯНОЙ'),
      colorId: findByTitle(colors, 'СИНИЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['38.png', '38.png', '38.png', '38.png'],
      quantity: 40,
      price: 4000,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ГУРМАНСКИЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['39.png', '39.png', '39.png', '39.png'],
      quantity: 40,
      price: 2500,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TRAVEL SER №2',
      description: 'DESCRIPTION',
      images: ['40.png', '40.png', '40.png', '40.png'],
      quantity: 40,
      price: 1250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'масляные духи (5шт/набор)'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['41.png', '41.png', '41.png', '41.png'],
      quantity: 40,
      price: 250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ВОДЯНОЙ'),
      colorId: findByTitle(colors, 'СИНИЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['42.png', '42.png', '42.png', '42.png'],
      quantity: 40,
      price: 4000,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ГУРМАНСКИЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['43.png', '43.png', '43.png', '43.png'],
      quantity: 40,
      price: 2500,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'масляные духи (5шт/набор)'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TRAVEL SER №2',
      description: 'DESCRIPTION',
      images: ['44.png', '44.png', '44.png', '44.png'],
      quantity: 40,
      price: 1250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TEMPO BLISS',
      description: 'DESCRIPTION',
      images: ['45.png', '45.png', '45.png', '45.png'],
      quantity: 40,
      price: 2415,
      genderId: findByTitle(genders, 'УНИСЕКС'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TEMPO BLISS',
      description: 'DESCRIPTION',
      images: ['46.png', '46.png', '46.png', '46.png'],
      quantity: 40,
      price: 2415,
      genderId: findByTitle(genders, 'УНИСЕКС'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['47.png', '47.png', '47.png', '47.png'],
      quantity: 40,
      price: 250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ВОДЯНОЙ'),
      colorId: findByTitle(colors, 'СИНИЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['48.png', '48.png', '48.png', '48.png'],
      quantity: 40,
      price: 4000,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ГУРМАНСКИЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['49.png', '49.png', '49.png', '49.png'],
      quantity: 40,
      price: 2500,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TRAVEL SER №2',
      description: 'DESCRIPTION',
      images: ['50.png', '50.png', '50.png', '50.png'],
      quantity: 40,
      price: 1250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['51.png', '51.png', '51.png', '51.png'],
      quantity: 40,
      price: 250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ВОДЯНОЙ'),
      colorId: findByTitle(colors, 'СИНИЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['52.png', '52.png', '52.png', '52.png'],
      quantity: 40,
      price: 4000,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ГУРМАНСКИЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['53.png', '53.png', '53.png', '53.png'],
      quantity: 40,
      price: 2500,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TRAVEL SER №2',
      description: 'DESCRIPTION',
      images: ['54.png', '54.png', '54.png', '54.png'],
      quantity: 40,
      price: 1250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'масляные духи (5шт/набор)'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TEMPO BLISS',
      description: 'DESCRIPTION',
      images: ['55.png', '55.png', '55.png', '55.png'],
      quantity: 40,
      price: 2415,
      genderId: findByTitle(genders, 'УНИСЕКС'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TEMPO BLISS',
      description: 'DESCRIPTION',
      images: ['56.png', '56.png', '56.png', '56.png'],
      quantity: 40,
      price: 2415,
      genderId: findByTitle(genders, 'УНИСЕКС'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['57.png', '57.png', '57.png', '57.png'],
      quantity: 40,
      price: 250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ВОДЯНОЙ'),
      colorId: findByTitle(colors, 'СИНИЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['58.png', '58.png', '58.png', '58.png'],
      quantity: 40,
      price: 4000,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ГУРМАНСКИЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'CHARISME SPORT',
      description: 'DESCRIPTION',
      images: ['59.png', '59.png', '59.png', '59.png'],
      quantity: 40,
      price: 2500,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '60 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'По мотивам Chanel Allure Homme Sport'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'TRAVEL SER №2',
      description: 'DESCRIPTION',
      images: ['60.png', '60.png', '60.png', '60.png'],
      quantity: 40,
      price: 1250,
      genderId: findByTitle(genders, 'МУЖЧИНАМ'),
      volumeId: findByTitle(volumes, '3 ML'),
      typeId: findByTitle(types, 'ДРЕВЕСНО-МУСКУСНЫЙ'),
      colorId: findByTitle(colors, 'ГОЛУБОЙ'),
      motiveId: findByTitle(motives, 'масляные духи (5шт/набор)'),
      discountId: findByValue(discounts, null),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
};

const getProducts = () =>
  Saver.processFile(
    path.dirname(__filename),
    path.basename(__filename),
    defaultProducts(),
  );

export default getProducts;
