import { IsString, IsNotEmpty, IsObject } from 'class-validator';
import * as GeoJSON from 'geojson';

export class CreateSpotDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsObject()
  @IsNotEmpty()
  position: GeoJSON.Point;
}
