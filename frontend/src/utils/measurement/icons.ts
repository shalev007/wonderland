import type { Map } from 'maplibre-gl';

const makeSquareImage = (
  size: number,
  fill: [number, number, number],
  stroke: [number, number, number],
  borderWidth: number,
): { width: number; height: number; data: Uint8Array } => {
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const isBorder =
        x < borderWidth ||
        x >= size - borderWidth ||
        y < borderWidth ||
        y >= size - borderWidth;
      const [r, g, b] = isBorder ? stroke : fill;
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }
  return { width: size, height: size, data };
};

const SQUARE_IMAGES: Record<
  string,
  {
    fill: [number, number, number];
    stroke: [number, number, number];
    borderWidth: number;
  }
> = {
  'edge-dot': {
    fill: [43, 127, 255],
    stroke: [255, 255, 255],
    borderWidth: 2,
  },
  'middle-dot': {
    fill: [255, 255, 255],
    stroke: [28, 32, 36],
    borderWidth: 4,
  },
  'new-dot': {
    fill: [255, 255, 255],
    stroke: [203, 213, 225],
    borderWidth: 4,
  },
};

export const ensureSquareImages = (map: Map) => {
  for (const [name, { fill, stroke, borderWidth }] of Object.entries(
    SQUARE_IMAGES,
  )) {
    if (!map.hasImage(name)) {
      map.addImage(name, makeSquareImage(14, fill, stroke, borderWidth));
    }
  }
};
