import { Controller, Get, HttpException, Param, Res } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { Docs } from '@common/decorators';

import { FilesService } from '@modules/files/services';

import { FileDescription } from '@modules/files/docs';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Docs(FileDescription, HttpException)
  @ApiParam({
    name: 'name',
    required: true,
    description: 'File name',
    example: '1.jpg',
  })
  @Get(':name')
  async getFile(
    @Param('name') name: string,
    @Res() res: Response,
  ): Promise<HttpException> {
    return await this.filesService.getFile(name, res);
  }
}
