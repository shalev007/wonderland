import type { Map } from 'maplibre-gl';

export const DEFAULT_RESIZE_DEBOUNCE_MS = 150;
export const DEFAULT_IGNORE_SUBPIXEL_JITTER_PX = 1;

export const isJitterOnlyDimensionChange = (
  previousWidthPx: number,
  previousHeightPx: number,
  nextWidthPx: number,
  nextHeightPx: number,
  maxIgnoredDeltaPx: number,
): boolean => {
  const widthDeltaPx = Math.abs(nextWidthPx - previousWidthPx);
  const heightDeltaPx = Math.abs(nextHeightPx - previousHeightPx);
  return (
    widthDeltaPx <= maxIgnoredDeltaPx && heightDeltaPx <= maxIgnoredDeltaPx
  );
};

type SubscribeMapResizeOptions = {
  debounceMs?: number;
  jitterThresholdPx?: number;
};

export const subscribeMapResizeToContainer = (
  containerElement: HTMLElement,
  map: Map,
  options?: SubscribeMapResizeOptions,
): (() => void) => {
  const debounceMs = options?.debounceMs ?? DEFAULT_RESIZE_DEBOUNCE_MS;
  const jitterThresholdPx =
    options?.jitterThresholdPx ?? DEFAULT_IGNORE_SUBPIXEL_JITTER_PX;

  let resizeDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  let scheduledResizeFrameId: number | null = null;
  let lastResizedWidthPx = 0;
  let lastResizedHeightPx = 0;

  const applyMapResizeIfDimensionsChanged = () => {
    const { width: widthPx, height: heightPx } =
      containerElement.getBoundingClientRect();
    if (widthPx <= 0 || heightPx <= 0) return;

    if (
      isJitterOnlyDimensionChange(
        lastResizedWidthPx,
        lastResizedHeightPx,
        widthPx,
        heightPx,
        jitterThresholdPx,
      )
    ) {
      return;
    }

    lastResizedWidthPx = widthPx;
    lastResizedHeightPx = heightPx;
    map.resize();
  };

  const scheduleResizeAfterPaint = () => {
    if (scheduledResizeFrameId !== null)
      cancelAnimationFrame(scheduledResizeFrameId);
    scheduledResizeFrameId = requestAnimationFrame(() => {
      scheduledResizeFrameId = null;
      applyMapResizeIfDimensionsChanged();
    });
  };

  const handleContainerResize = () => {
    if (resizeDebounceTimer !== null) clearTimeout(resizeDebounceTimer);
    resizeDebounceTimer = setTimeout(() => {
      resizeDebounceTimer = null;
      scheduleResizeAfterPaint();
    }, debounceMs);
  };

  const resizeObserver = new ResizeObserver(handleContainerResize);
  resizeObserver.observe(containerElement);
  handleContainerResize();

  return () => {
    if (resizeDebounceTimer !== null) clearTimeout(resizeDebounceTimer);
    if (scheduledResizeFrameId !== null)
      cancelAnimationFrame(scheduledResizeFrameId);
    resizeObserver.disconnect();
  };
};
