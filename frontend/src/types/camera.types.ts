import type { Point } from "geojson";

export interface Camera {
  id: string;
  name: string;
  position: Point;
  visualStream: string;
  thermalStream: string;
}