import { cursorTotalLabelStyle } from '@src/styles/MeasurementLabel.css';
import type { Map } from 'maplibre-gl';
import { Marker } from 'maplibre-gl';

export const createLabelMarker = (
  map: Map,
  position: [number, number],
  text: string,
  cssClass: string,
): Marker => {
  const el = document.createElement('div');
  el.className = cssClass;
  el.textContent = text;
  return new Marker({ element: el, anchor: 'left', offset: [8, 0] })
    .setLngLat(position)
    .addTo(map);
};

export const createCursorTotalMarker = (
  map: Map,
  position: [number, number],
  text: string,
): Marker => {
  const el = document.createElement('div');
  el.className = cursorTotalLabelStyle;
  el.textContent = text;
  return new Marker({ element: el, anchor: 'bottom', offset: [0, -16] })
    .setLngLat(position)
    .addTo(map);
};

export const clearMarkers = (markers: Marker[]) => {
  for (const m of markers) m.remove();
};

export const clearDynamicMarker = (ref: React.RefObject<Marker | null>) => {
  ref.current?.remove();
  ref.current = null;
};
