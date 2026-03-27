import { Controller, Get, Post, Body } from '@nestjs/common';
import { SelfLocationService } from './self-location.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Self Location')
@Controller('self-location')
export class SelfLocationController {
  constructor(private readonly selfLocationService: SelfLocationService) {}

  @Get()
  @ApiOperation({ summary: 'Get current self location' })
  @ApiResponse({ status: 200, description: 'Return current self location' })
  async getLocation() {
    return this.selfLocationService.getLocation();
  }

  @Post()
  @ApiOperation({ summary: 'Update self location' })
  @ApiResponse({ status: 201, description: 'Self location updated' })
  async setLocation(@Body() location: { lat: number; lng: number }) {
    await this.selfLocationService.setLocation(location);
    return { success: true };
  }
}
