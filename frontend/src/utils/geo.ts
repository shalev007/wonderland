import type { Position, Polygon } from 'geojson';

export function createSector(
  center: Position,
  radiusInMeters: number,
  azimuthInDegrees: number,
  fovInDegrees: number,
  numberOfPoints: number = 32,
): Polygon {
  const [lng, lat] = center;
  const azimuthRad = (azimuthInDegrees * Math.PI) / 180;
  const fovRad = (fovInDegrees * Math.PI) / 180;

  const startAngle = azimuthRad - fovRad / 2;

  // Approx conversion for offsets in meters to degrees
  const latOffset = radiusInMeters / 111320;
  const lngOffset = radiusInMeters / (111320 * Math.cos((lat * Math.PI) / 180));

  const points: Position[] = [];
  points.push([lng, lat]); // Start at center

  for (let i = 0; i <= numberOfPoints; i++) {
    const currentAngle = startAngle + (fovRad * i) / numberOfPoints;
    // Map bearing (0=North, 90=East) to standard math angle (0=East, 90=North)
    // MapLibre/Leaflet/Turf often use bearing. 
    // Bearing 0 is positive Y. Angle 0 is positive X.
    // To match Bearing: x = sin(angle), y = cos(angle)
    const pLng = lng + lngOffset * Math.sin(currentAngle);
    const pLat = lat + latOffset * Math.cos(currentAngle);
    points.push([pLng, pLat]);
  }

  points.push([lng, lat]); // Close the polygon

  return {
    type: 'Polygon',
    coordinates: [points],
  };
}
