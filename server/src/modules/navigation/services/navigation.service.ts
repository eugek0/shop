import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';

import { ErrorService } from '@common/errors';

import { MNavigation } from '@modules/navigation/models';

import { NavigationHeader, NavigationMain } from '@modules/navigation/docs';

@Injectable()
export class NavigationService extends ErrorService {
  constructor(
    @InjectModel(MNavigation) private navigation: typeof MNavigation,
  ) {
    super();
  }

  public async getAllMain(): Promise<NavigationMain[]> {
    const rows = await this.navigation.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      order: ['createdAt'],
    });

    return rows.map((row) => {
      const { id, title, subTitle, image, buttonText, ...params } =
        row.toJSON<MNavigation>();

      return {
        id,
        title,
        subTitle,
        image,
        buttonText,
        params,
      };
    });
  }

  public async getAllHeader(): Promise<NavigationHeader[]> {
    const rows = await this.navigation.findAll({
      attributes: {
        include: [[sequelize.fn('lower', sequelize.col('title')), 'title']],
        exclude: ['image', 'subTitle', 'buttonText', 'createdAt', 'updatedAt'],
      },
      order: [['createdAt', 'ASC']],
    });

    return rows.map((row) => {
      const { id, title, ...params } = row.toJSON<MNavigation>();

      return {
        id,
        title,
        params,
      };
    });
  }
}
