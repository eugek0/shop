import { Module } from '@nestjs/common';

import { CodeService } from '@modules/code/services';

@Module({
  imports: [],
  controllers: [],
  providers: [CodeService],
  exports: [CodeService],
})
export class CodeModule {}
