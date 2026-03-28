import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpotEntity } from './entities/spot.entity';
import { SpotService } from './spot.service';
import { SpotController } from './spot.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SpotEntity])],
  controllers: [SpotController],
  providers: [SpotService],
  exports: [SpotService],
})
export class SpotModule {}
