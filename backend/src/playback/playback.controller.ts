import {
  Controller,
  Get,
  Query,
  Param,
  ValidationPipe,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { PlaybackService } from './playback.service';
import { PlaybackRequest, ChannelRecordingsPlaylist } from './types';

@Controller('recordings')
export class StandalonePlaybackController {
  constructor(private readonly playbackService: PlaybackService) {}

  @Get('list')
  async listRecordings(
    @Query('cameraId') cameraId: string,
    @Query('date') date: string,
  ) {
    return this.playbackService.listRecordings(cameraId, date);
  }
}
