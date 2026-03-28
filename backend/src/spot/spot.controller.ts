import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpotService } from './spot.service';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';

@Controller('spots')
export class SpotController {
  constructor(private readonly spotService: SpotService) {}

  @Get()
  findAll() {
    return this.spotService.findAll();
  }

  @Post()
  create(@Body() createSpotDto: CreateSpotDto) {
    return this.spotService.create(createSpotDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpotDto: UpdateSpotDto,
  ) {
    return this.spotService.update(+id, updateSpotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spotService.remove(+id);
  }
}
