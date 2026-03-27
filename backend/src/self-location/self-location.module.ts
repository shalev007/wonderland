import { Module } from '@nestjs/common';
import { SelfLocationService } from './self-location.service';
import { SelfLocationController } from './self-location.controller';

@Module({
  controllers: [SelfLocationController],
  providers: [SelfLocationService],
  exports: [SelfLocationService],
})
export class SelfLocationModule {}
