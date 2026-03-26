/** Great-circle distance between two WGS84 points (haversine), in meters. */
export const haversineDistance = (
  [lng1, lat1]: [number, number],
  [lng2, lat2]: [number, number],
): number => {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

/** Bearing from the first point to the second, in degrees clockwise from north (0–360). */
export const calculateAzimuth = (
  [lng1, lat1]: [number, number],
  [lng2, lat2]: [number, number],
): number => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLng = toRad(lng2 - lng1);
  const y = Math.sin(dLng) * Math.cos(toRad(lat2));
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLng);
  return (Math.atan2(y, x) * (180 / Math.PI) + 360) % 360;
};

/** Simple average of the two [lng, lat] pairs (component-wise midpoint). */
export const midpoint = (
  a: [number, number],
  b: [number, number],
): [number, number] => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
