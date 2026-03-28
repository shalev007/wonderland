import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpotEntity } from './entities/spot.entity';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';

@Injectable()
export class SpotService {
  constructor(
    @InjectRepository(SpotEntity)
    private readonly spotRepository: Repository<SpotEntity>,
  ) {}

  async findAll(): Promise<SpotEntity[]> {
    return this.spotRepository.find();
  }

  async create(createSpotDto: CreateSpotDto): Promise<SpotEntity> {
    const spot = this.spotRepository.create(createSpotDto);
    return this.spotRepository.save(spot);
  }

  async update(id: number, updateSpotDto: UpdateSpotDto): Promise<SpotEntity | null> {
    await this.spotRepository.update(id, updateSpotDto);
    return this.spotRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.spotRepository.delete(id);
  }
}
