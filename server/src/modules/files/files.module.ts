import { Module } from '@nestjs/common';

import { FilesController } from '@modules/files/controllers';

import { FilesService } from '@modules/files/services';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [],
  exports: [FilesService],
})
export class FilesModule {}
