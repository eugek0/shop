import { AdminModule as AdminModuleJS } from '@adminjs/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as AdminJSSequelize from '@adminjs/sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import AdminJS, { CurrentAdmin } from 'adminjs';
import { Module } from '@nestjs/common';

import { resources } from '@modules/admin/resources';
import { branding } from '@modules/admin/branding/branding';

import { MPosition, MEmployee, MLog, MFile } from '@modules/admin/models';

import { componentLoader, Components } from '@modules/admin/components';
import { translateResources } from '@modules/admin/utils/translate.utils';
import { Hasher } from '@common/utils';

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

@Module({
  imports: [
    SequelizeModule.forFeature([MEmployee, MPosition, MLog, MFile]),

    AdminModuleJS.createAdminAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService) => ({
        adminJsOptions: {
          rootPath: '/admin',
          branding,
          resources,
          componentLoader,
          dashboard: {
            component: Components.Dashboard,
          },
          locale: {
            language: 'ru',
            translations: {
              resources: translateResources(resources),
              labels: {
                loginWelcome: 'Панель управления',
              },
              messages: {
                loginWelcome: 'Панель управления компании U-PROJECT-STUDIO',
              },
            },
          },
          assets: {
            styles: ['/modules/admin/styles/some.css'],
          },
        },
        shouldBeInitialized:
          configService.get('IS_ACTIVE_ADMIN_PANEL') === true,
        auth: {
          authenticate: async (
            email: string,
            password: string,
          ): Promise<CurrentAdmin | null> => {
            const candidate = await MEmployee.findOne({
              where: { email },
              include: MPosition,
            });

            if (!candidate) return null;

            const isValidPassword = await Hasher.comparer(
              password,
              candidate.password,
            );

            if (!isValidPassword) return null;

            const avatarUrl = candidate.avatar;
            const title = candidate.position.title;
            const role = candidate.position.value;
            const id = candidate.id;

            return { email, avatarUrl, title, id, role };
          },
          cookieName: 'adminjs',
          cookiePassword: 'secret',
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret',
        },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AdminModule {}
