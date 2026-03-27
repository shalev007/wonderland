import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import { useMap } from '../../contexts/MapContext';
import { useSelfLocation } from '../../hooks/useSelfLocation';

export const SelfLocationLayer = () => {
  const map = useMap();
  const { location } = useSelfLocation();
  const markerRef = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    if (!map) return;

    if (location) {
      if (!markerRef.current) {
        const marker = new maplibregl.Marker({ color: '#FF0000' });

        const label = document.createElement('div');
        label.innerText = 'מיקום עצמי';
        label.style.position = 'absolute';
        label.style.top = '-28px';
        label.style.left = '50%';
        label.style.transform = 'translateX(-50%)';
        label.style.background = 'rgba(20, 31, 50, 0.4)';
        label.style.color = 'white';
        label.style.padding = '2px 8px';
        label.style.borderRadius = '6px';
        label.style.fontSize = '12px';
        label.style.fontWeight = 'bold';
        label.style.whiteSpace = 'nowrap';
        label.style.pointerEvents = 'none';
        label.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        label.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';

        marker.getElement().appendChild(label);

        marker.setLngLat([location.lng, location.lat]).addTo(map);
        markerRef.current = marker;
      } else {
        markerRef.current.setLngLat([location.lng, location.lat]);
      }
    } else {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
    }
  }, [map, location]);

  useEffect(() => {
    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
    };
  }, []);

  return null;
};
