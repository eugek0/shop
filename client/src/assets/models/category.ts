import {StaticImageData} from 'next/image';

export interface Category {
  id: number;
  image: StaticImageData;
  title: string;
  subtitle: string;
}