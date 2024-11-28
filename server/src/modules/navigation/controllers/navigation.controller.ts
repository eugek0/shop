import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Docs } from '@common/decorators';

import { NavigationService } from '@modules/navigation/services';

import {
  NavigationHeader,
  NavigationMain,
  getAllHeader,
  getAllMain,
} from '@modules/navigation/docs';

@Controller('navigation')
@ApiTags('Navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Docs(getAllMain, [NavigationMain])
  @Get('main')
  getAllMain(): Promise<NavigationMain[]> {
    return this.navigationService.getAllMain();
  }
  @Docs(getAllHeader, [NavigationHeader])
  @Get('header')
  getAllHeader(): Promise<NavigationHeader[]> {
    return this.navigationService.getAllHeader();
  }
}
