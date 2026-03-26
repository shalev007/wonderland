import { Injectable, Logger } from '@nestjs/common';
import { DeviceAvailabilityStatusEnum } from '@/enum/enums';

@Injectable()
export class CameraService {
  private readonly logger = new Logger(CameraService.name);

  constructor() {}

  async getAllCameraIds() {
    return [];
  }

  async getAllCamerasWithData() {
    return [];
  }
}
