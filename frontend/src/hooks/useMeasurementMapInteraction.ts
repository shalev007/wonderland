import type { MapMouseEvent } from 'maplibre-gl';
import { Marker } from 'maplibre-gl';
import { useEffect, useRef } from 'react';
import { useMap } from '../contexts/MapContext';
import { useMeasurementStore } from '../stores/useMeasurementStore';
import {
  addCompletedMeasurement,
  addSourcesAndLayers,
  calculateAzimuth,
  clearDynamicMarker,
  clearLineSource,
  clearMarkers,
  createCursorTotalMarker,
  createLabelMarker,
  formatMeasurementPreview,
  formatSegmentLabel,
  haversineDistance,
  midpoint,
  removeCompletedMeasurement,
  removeSourcesAndLayers,
  updateLineSource,
  updatePointSource,
  updateSolidLineSource,
} from '../utils/measurement';
import { committedLabelStyle } from '@src/styles/MeasurementLabel.css';

const DBLCLICK_THRESHOLD_MS = 300;

const completedMeasurementMarkers: Marker[] = [];

export const useMeasurementMapInteraction = () => {
  const map = useMap();
  const points = useMeasurementStore((s) => s.points);
  const pendingCompletedLayersRemoval = useMeasurementStore(
    (s) => s.pendingCompletedLayersRemoval,
  );
  const committedMarkersRef = useRef<Marker[]>([]);
  const dynamicMarkerRef = useRef<Marker | null>(null);
  const cursorTotalMarkerRef = useRef<Marker | null>(null);
  const lastClickTimeRef = useRef(0);

  useEffect(() => {
    if (!map) return;

    map.doubleClickZoom.disable();
    map.getCanvas().style.cursor = 'default';
    addSourcesAndLayers(map);

    const onClick = (e: MapMouseEvent) => {
      const now = Date.now();
      if (now - lastClickTimeRef.current < DBLCLICK_THRESHOLD_MS) {
        lastClickTimeRef.current = 0;
        return;
      }
      lastClickTimeRef.current = now;

      const lngLat: [number, number] = [e.lngLat.lng, e.lngLat.lat];
      const store = useMeasurementStore.getState();

      let newTotal = store.totalDistance;
      if (store.points.length > 0) {
        newTotal += haversineDistance(
          store.points[store.points.length - 1],
          lngLat,
        );
      }

      store.addPoint(lngLat);
      store.setTotalDistance(newTotal);
      store.changeMeasurementMeters(newTotal);

      const updatedPoints = [...store.points, lngLat];
      updatePointSource(map, updatedPoints);
      updateSolidLineSource(map, updatedPoints);
      clearLineSource(map);

      clearDynamicMarker(dynamicMarkerRef);
      clearDynamicMarker(cursorTotalMarkerRef);
    };

    const onMouseMove = (e: MapMouseEvent) => {
      const cursorPos: [number, number] = [e.lngLat.lng, e.lngLat.lat];
      const store = useMeasurementStore.getState();

      if (store.points.length > 0) {
        store.setCursorPos(cursorPos);
        const lastPoint = store.points[store.points.length - 1];
        const previewDist = haversineDistance(lastPoint, cursorPos);
        const totalWithPreview = store.totalDistance + previewDist;
        store.changeMeasurementMeters(totalWithPreview);
        updateLineSource(map, lastPoint, cursorPos);
        updatePointSource(map, store.points, cursorPos);

        const azimuth = calculateAzimuth(lastPoint, cursorPos);
        const segLabel = formatSegmentLabel(previewDist, azimuth);
        const mid = midpoint(lastPoint, cursorPos);

        if (dynamicMarkerRef.current) {
          dynamicMarkerRef.current.setLngLat(mid);
          dynamicMarkerRef.current.getElement().textContent = segLabel;
        } else {
          dynamicMarkerRef.current = createLabelMarker(
            map,
            mid,
            segLabel,
            committedLabelStyle,
          );
        }

        const totalLabel = formatMeasurementPreview(totalWithPreview);
        if (cursorTotalMarkerRef.current) {
          cursorTotalMarkerRef.current.setLngLat(cursorPos);
          cursorTotalMarkerRef.current.getElement().textContent = totalLabel;
        } else {
          cursorTotalMarkerRef.current = createCursorTotalMarker(
            map,
            cursorPos,
            totalLabel,
          );
        }
      }
    };

    const onDblClick = (e: MapMouseEvent) => {
      e.preventDefault();
      lastClickTimeRef.current = 0;

      const store = useMeasurementStore.getState();
      if (store.points.length === 0) return;

      const finalPoint: [number, number] = [e.lngLat.lng, e.lngLat.lat];
      const lastPoint = store.points[store.points.length - 1];
      const segmentDist = haversineDistance(lastPoint, finalPoint);
      const allPoints =
        segmentDist > 1 ? [...store.points, finalPoint] : [...store.points];

      const completedId = store.completedMeasurementsCount;
      addCompletedMeasurement(map, completedId, allPoints);

      const newCompletedMarkers: Marker[] = [];
      for (let i = 1; i < allPoints.length; i++) {
        const from = allPoints[i - 1];
        const to = allPoints[i];
        const dist = haversineDistance(from, to);
        const azimuth = calculateAzimuth(from, to);
        const lbl = formatSegmentLabel(dist, azimuth);
        const mid = midpoint(from, to);
        newCompletedMarkers.push(
          createLabelMarker(map, mid, lbl, committedLabelStyle),
        );
      }

      let totalDist = 0;
      for (let i = 1; i < allPoints.length; i++) {
        totalDist += haversineDistance(allPoints[i - 1], allPoints[i]);
      }
      newCompletedMarkers.push(
        createCursorTotalMarker(
          map,
          allPoints[allPoints.length - 1],
          formatMeasurementPreview(totalDist),
        ),
      );

      completedMeasurementMarkers.push(...newCompletedMarkers);

      store.incrementCompletedMeasurements();

      clearMarkers(committedMarkersRef.current);
      committedMarkersRef.current = [];
      clearDynamicMarker(dynamicMarkerRef);
      clearDynamicMarker(cursorTotalMarkerRef);

      store.finishMeasurement();
    };

    map.on('click', onClick);
    map.on('mousemove', onMouseMove);
    map.on('dblclick', onDblClick);

    return () => {
      map.off('click', onClick);
      map.off('mousemove', onMouseMove);
      map.off('dblclick', onDblClick);
      removeSourcesAndLayers(map);
      map.doubleClickZoom.enable();
      map.getCanvas().style.cursor = '';
      clearMarkers(committedMarkersRef.current);
      committedMarkersRef.current = [];
      clearDynamicMarker(dynamicMarkerRef);
      clearDynamicMarker(cursorTotalMarkerRef);
    };
  }, [map]);

  useEffect(() => {
    if (pendingCompletedLayersRemoval === 0) return;

    if (!map) {
      clearMarkers(completedMeasurementMarkers);
      completedMeasurementMarkers.length = 0;
      useMeasurementStore.setState({ pendingCompletedLayersRemoval: 0 });
      return;
    }

    for (let i = 0; i < pendingCompletedLayersRemoval; i++) {
      removeCompletedMeasurement(map, i);
    }
    clearMarkers(completedMeasurementMarkers);
    completedMeasurementMarkers.length = 0;
    useMeasurementStore.setState({ pendingCompletedLayersRemoval: 0 });
  }, [pendingCompletedLayersRemoval, map]);

  useEffect(() => {
    if (!map) return;

    updatePointSource(map, points);
    updateSolidLineSource(map, points);
    clearLineSource(map);

    clearMarkers(committedMarkersRef.current);
    committedMarkersRef.current = [];
    clearDynamicMarker(dynamicMarkerRef);
    clearDynamicMarker(cursorTotalMarkerRef);

    for (let i = 1; i < points.length; i++) {
      const from = points[i - 1];
      const to = points[i];
      const dist = haversineDistance(from, to);
      const azimuth = calculateAzimuth(from, to);
      const label = formatSegmentLabel(dist, azimuth);
      const mid = midpoint(from, to);
      committedMarkersRef.current.push(
        createLabelMarker(map, mid, label, committedLabelStyle),
      );
    }
  }, [points, map]);
};
