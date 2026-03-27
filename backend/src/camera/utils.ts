export function calculateFOV(
  normalizedZoom: number,
  sensorWidth: number = 4.8,
  minFocal: number = 4.7,
  maxOpticalFocal: number = 94.0,
  maxZoom: number = 30,
): number {
  // 1. Clamp input to ensure it stays within -1 and 1
  const z = Math.max(-1, Math.min(1, normalizedZoom));

  // 2. Map -1...1 range to a Total Magnification Factor of 1x...30x
  // Formula: target = min + (input - start) * (max - min) / (end - start)
  const totalMagnification = 1 + ((z + 1) * (maxZoom - 1)) / 2;

  const opticalLimit = maxOpticalFocal / minFocal; // 20x

  let currentFocal: number;
  let digitalFactor = 1.0;

  if (totalMagnification <= opticalLimit) {
    // Phase 1: Optical Zoom (1x to 20x)
    currentFocal = minFocal * totalMagnification;
  } else {
    // Phase 2: Digital Zoom (20x to 30x)
    currentFocal = maxOpticalFocal;
    digitalFactor = totalMagnification / opticalLimit;
  }

  // 3. FOV Formula: 2 * arctan( (sensorWidth / digitalFactor) / (2 * focalLength) )
  const hfovRad =
    2 * Math.atan(sensorWidth / digitalFactor / (2 * currentFocal));

  return (hfovRad * 180) / Math.PI;
}
