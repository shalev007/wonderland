import type { GeoJSONSource, Map } from 'maplibre-gl';
import { ensureSquareImages } from './icons';
import { colors } from '@theme/tokens.css';

export const POINT_SOURCE = 'measurement-point-source';
export const LINE_SOURCE = 'measurement-line-source';
export const SOLID_LINE_SOURCE = 'measurement-solid-line-source';

const POINT_LAYER = 'measurement-point-layer';
const LINE_BORDER_LAYER = 'measurement-line-border-layer';
const LINE_FILL_LAYER = 'measurement-line-fill-layer';
const SOLID_LINE_BORDER_LAYER = 'measurement-solid-line-border-layer';
const SOLID_LINE_FILL_LAYER = 'measurement-solid-line-fill-layer';

const MEASUREMENT_LINE_LAYOUT = {
  'line-cap': 'butt' as const,
  'line-join': 'miter' as const,
};

const EMPTY_FC: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [],
};

export const updatePointSource = (
  map: Map,
  points: [number, number][],
  cursorPos?: [number, number] | null,
) => {
  const source = map.getSource(POINT_SOURCE) as GeoJSONSource | undefined;
  if (!source) return;
  const features: GeoJSON.Feature[] = points.map((coord, i) => ({
    type: 'Feature' as const,
    geometry: { type: 'Point' as const, coordinates: coord },
    properties: {
      pointType: i === 0 ? 'first' : 'middle',
    },
  }));
  if (cursorPos != null && points.length > 0) {
    features.push({
      type: 'Feature' as const,
      geometry: { type: 'Point' as const, coordinates: cursorPos },
      properties: { pointType: 'cursor' },
    });
  }
  source.setData({ type: 'FeatureCollection', features });
};

export const updateLineSource = (
  map: Map,
  from: [number, number],
  to: [number, number],
) => {
  const source = map.getSource(LINE_SOURCE) as GeoJSONSource | undefined;
  if (!source) return;
  source.setData({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature' as const,
        geometry: { type: 'LineString' as const, coordinates: [from, to] },
        properties: {},
      },
    ],
  });
};

export const clearLineSource = (map: Map) => {
  const source = map.getSource(LINE_SOURCE) as GeoJSONSource | undefined;
  if (!source) return;
  source.setData(EMPTY_FC);
};

export const updateSolidLineSource = (map: Map, points: [number, number][]) => {
  const source = map.getSource(SOLID_LINE_SOURCE) as GeoJSONSource | undefined;
  if (!source) return;
  if (points.length < 2) {
    source.setData(EMPTY_FC);
    return;
  }
  source.setData({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature' as const,
        geometry: { type: 'LineString' as const, coordinates: points },
        properties: {},
      },
    ],
  });
};

export const addSourcesAndLayers = (map: Map) => {
  ensureSquareImages(map);

  if (!map.getSource(POINT_SOURCE)) {
    map.addSource(POINT_SOURCE, { type: 'geojson', data: EMPTY_FC });
  }
  if (!map.getSource(LINE_SOURCE)) {
    map.addSource(LINE_SOURCE, { type: 'geojson', data: EMPTY_FC });
  }
  if (!map.getSource(SOLID_LINE_SOURCE)) {
    map.addSource(SOLID_LINE_SOURCE, { type: 'geojson', data: EMPTY_FC });
  }

  if (!map.getLayer(SOLID_LINE_BORDER_LAYER)) {
    map.addLayer({
      id: SOLID_LINE_BORDER_LAYER,
      type: 'line',
      source: SOLID_LINE_SOURCE,
      layout: MEASUREMENT_LINE_LAYOUT,
      paint: { 'line-color': colors.grayAlpha9, 'line-width': 6 },
    });
  }
  if (!map.getLayer(SOLID_LINE_FILL_LAYER)) {
    map.addLayer({
      id: SOLID_LINE_FILL_LAYER,
      type: 'line',
      source: SOLID_LINE_SOURCE,
      layout: MEASUREMENT_LINE_LAYOUT,
      paint: { 'line-color': colors.slate12, 'line-width': 2 },
    });
  }

  if (!map.getLayer(LINE_BORDER_LAYER)) {
    map.addLayer({
      id: LINE_BORDER_LAYER,
      type: 'line',
      source: LINE_SOURCE,
      layout: MEASUREMENT_LINE_LAYOUT,
      paint: {
        'line-color': colors.grayAlpha9,
        'line-width': 6,
        'line-dasharray': [2, 1],
      },
    });
  }
  if (!map.getLayer(LINE_FILL_LAYER)) {
    map.addLayer({
      id: LINE_FILL_LAYER,
      type: 'line',
      source: LINE_SOURCE,
      layout: MEASUREMENT_LINE_LAYOUT,
      paint: {
        'line-color': colors.accent8,
        'line-width': 2,
        'line-dasharray': [0, 1, 4, 4],
      },
    });
  }

  if (!map.getLayer(POINT_LAYER)) {
    map.addLayer({
      id: POINT_LAYER,
      type: 'symbol',
      source: POINT_SOURCE,
      layout: {
        'icon-image': [
          'match',
          ['get', 'pointType'],
          'first',
          'edge-dot',
          'middle',
          'middle-dot',
          'cursor',
          'new-dot',
          'middle-dot',
        ],
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
      },
    });
  }
};

export const removeSourcesAndLayers = (map: Map) => {
  const layers = [
    POINT_LAYER,
    LINE_FILL_LAYER,
    LINE_BORDER_LAYER,
    SOLID_LINE_FILL_LAYER,
    SOLID_LINE_BORDER_LAYER,
  ];
  const sources = [POINT_SOURCE, LINE_SOURCE, SOLID_LINE_SOURCE];

  for (const id of layers) {
    if (map.getLayer(id)) map.removeLayer(id);
  }
  for (const id of sources) {
    if (map.getSource(id)) map.removeSource(id);
  }
};

export const addCompletedMeasurement = (
  map: Map,
  id: number,
  allPoints: [number, number][],
) => {
  ensureSquareImages(map);

  const lineSourceId = `measurement-completed-line-${id}`;
  const pointSourceId = `measurement-completed-point-${id}`;
  const lineBorderLayerId = `measurement-completed-line-border-${id}`;
  const lineFillLayerId = `measurement-completed-line-fill-${id}`;
  const pointLayerId = `measurement-completed-point-layer-${id}`;

  map.addSource(lineSourceId, {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features:
        allPoints.length >= 2
          ? [
              {
                type: 'Feature' as const,
                geometry: {
                  type: 'LineString' as const,
                  coordinates: allPoints,
                },
                properties: {},
              },
            ]
          : [],
    },
  });

  map.addSource(pointSourceId, {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: allPoints.map((coord, i) => ({
        type: 'Feature' as const,
        geometry: { type: 'Point' as const, coordinates: coord },
        properties: {
          pointType:
            i === 0 ? 'first' : i === allPoints.length - 1 ? 'last' : 'middle',
        },
      })),
    },
  });

  map.addLayer({
    id: lineBorderLayerId,
    type: 'line',
    source: lineSourceId,
    layout: MEASUREMENT_LINE_LAYOUT,
    paint: { 'line-color': colors.grayAlpha9, 'line-width': 6 },
  });
  map.addLayer({
    id: lineFillLayerId,
    type: 'line',
    source: lineSourceId,
    layout: MEASUREMENT_LINE_LAYOUT,
    paint: { 'line-color': colors.slate12, 'line-width': 2 },
  });

  map.addLayer({
    id: pointLayerId,
    type: 'symbol',
    source: pointSourceId,
    layout: {
      'icon-image': [
        'match',
        ['get', 'pointType'],
        'first',
        'edge-dot',
        'last',
        'edge-dot',
        'middle',
        'middle-dot',
        'middle-dot',
      ],
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
    },
  });
};

export const removeCompletedMeasurement = (map: Map, id: number) => {
  const lineSourceId = `measurement-completed-line-${id}`;
  const pointSourceId = `measurement-completed-point-${id}`;
  const lineBorderLayerId = `measurement-completed-line-border-${id}`;
  const lineFillLayerId = `measurement-completed-line-fill-${id}`;
  const pointLayerId = `measurement-completed-point-layer-${id}`;

  if (map.getLayer(pointLayerId)) map.removeLayer(pointLayerId);
  if (map.getLayer(lineFillLayerId)) map.removeLayer(lineFillLayerId);
  if (map.getLayer(lineBorderLayerId)) map.removeLayer(lineBorderLayerId);
  if (map.getSource(pointSourceId)) map.removeSource(pointSourceId);
  if (map.getSource(lineSourceId)) map.removeSource(lineSourceId);
};
