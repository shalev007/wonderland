import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as GeoJSON from 'geojson';

@Entity('spots')
export class SpotEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  position: GeoJSON.Point;
}
