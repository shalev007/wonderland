import * as GeoJSON from 'geojson';

export interface Spot {
  id: number;
  name: string;
  color: string;
  position: GeoJSON.Point;
}

export type CreateSpotData = Omit<Spot, 'id'>;
export type UpdateSpotData = Partial<CreateSpotData>;
