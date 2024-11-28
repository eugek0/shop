import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CacheModule } from '@nestjs/common';
import path = require('path');

import { validationSchema } from '@common/configs';

import { NavigationModule } from '@modules/navigation/navigation.module';
import { FavoriteModule } from '@modules/favorite/favorite.module';
import { ProductModule } from '@modules/product/product.module';
import { ReportModule } from '@modules/report/report.module';
import { SeanceModule } from '@modules/seance/seance.module';
import { FilterModule } from '@modules/filter/filter.module';
import { TokenModule } from '@modules/tokens/token.module';
import { FilesModule } from '@modules/files/files.module';
import { OrderModule } from '@modules/order/order.module';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { MailModule } from '@modules/mail/mail.module';
import { CartModule } from '@modules/cart/cart.module';
import { AdminModule } from '@modules/admin/modules';

import { models } from '@modules/models';

export const modules = [
  ConfigModule.forRoot({
    isGlobal: true,
    validationSchema,
  }),
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return {
        dialect: configService.get('DATABASE_DIALECT'),
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        autoLoadModels: true,
        synchronize: true,
        retryAttempts: 5,
        logging: false,
        models,
      };
    },
  }),
  CacheModule.register({
    isGlobal: true,
  }),
  I18nModule.forRoot({
    fallbackLanguage: 'ru',
    loaderOptions: {
      path: path.join(__dirname, '../common/i18n/'),
      watch: true,
    },
    resolvers: [
      { use: QueryResolver, options: ['lang'] },
      AcceptLanguageResolver,
    ],
    typesOutputPath: path.join(
      __dirname,
      '../../src/common/i18n/generated/i18n.generated.ts',
    ),
  }),
  NavigationModule,
  ProductModule,
  FavoriteModule,
  SeanceModule,
  ReportModule,
  FilterModule,
  TokenModule,
  AdminModule,
  FilesModule,
  OrderModule,
  MailModule,
  AuthModule,
  UserModule,
  CartModule,
];
