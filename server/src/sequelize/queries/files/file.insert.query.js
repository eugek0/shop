import * as fs from 'fs';
import Saver from '../Saver';
import { v4 } from 'uuid';
import path from 'path';

const defaultFiles = () => {
  const uploadPath = `${__dirname}/../../../../uploads`;
  const date = new Date().toISOString();
  const comment = 'Изображение товара';
  const mime = 'image/png';

  const files = fs.readdirSync(uploadPath);

  return files.map((file) => {
    const { size = 0 } = fs.statSync(`${uploadPath}/${file}`);

    return {
      id: v4(),
      title: file,
      size,
      comment,
      mime,
      createdAt: date,
      updatedAt: date,
    };
  });
};

const getFiles = () =>
  Saver.processFile(
    path.dirname(__filename),
    path.basename(__filename),
    defaultFiles(),
  );

export default getFiles;
