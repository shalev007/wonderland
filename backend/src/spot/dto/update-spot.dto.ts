import { IsString, IsOptional, IsObject } from 'class-validator';
import * as GeoJSON from 'geojson';

export class UpdateSpotDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsObject()
  @IsOptional()
  position?: GeoJSON.Point;
}
