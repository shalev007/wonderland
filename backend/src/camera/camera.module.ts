import { Module } from '@nestjs/common';
import { CameraService } from './camera.service';
import { CameraController } from './camera.controller';
import { MediaMTXService } from './mediamtx.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CameraController],
  providers: [CameraService, MediaMTXService],
})
export class CameraModule {}
