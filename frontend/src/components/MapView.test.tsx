import { beforeEach, describe, expect, test, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@src/test/renderWithProviders';
import MapView from './Map/MapView';
import { useMapToolsStore } from '@src/stores/useMapTools';

type MockMapInstance = {
  remove: ReturnType<typeof vi.fn>;
};

const { mapInstances, observerRecords } = vi.hoisted(() => ({
  mapInstances: [] as MockMapInstance[],
  observerRecords: [] as Array<{
    callback: ResizeObserverCallback;
    observe: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
  }>,
}));

vi.mock('maplibre-gl', () => {
  class MockMap {
    remove = vi.fn();

    constructor() {
      mapInstances.push(this);
    }
  }

  return {
    default: { Map: MockMap },
    Map: MockMap,
  };
});

class MockResizeObserver implements ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();

  constructor(callback: ResizeObserverCallback) {
    observerRecords.push({
      callback,
      observe: this.observe,
      disconnect: this.disconnect,
    });
  }
}

describe('MapView', () => {
  beforeEach(() => {
    mapInstances.length = 0;
    observerRecords.length = 0;
    vi.stubGlobal('ResizeObserver', MockResizeObserver);
    useMapToolsStore.setState({
      isOpen: false,
      selectedTool: null,
    });
  });

  test('relies on MapLibre resize tracking instead of registering a second ResizeObserver', () => {
    renderWithProviders(<MapView />);

    expect(mapInstances).toHaveLength(1);
    expect(observerRecords).toHaveLength(0);
    expect(screen.getByRole('button', { name: 'כלי מפה' })).toBeInTheDocument();
  });

  test('removes the map without resetting map tools state', () => {
    useMapToolsStore.setState({
      isOpen: true,
      selectedTool: 'polygon',
    });

    const view = renderWithProviders(<MapView />);

    const mapInstance = mapInstances[0];

    view.unmount();

    expect(observerRecords).toHaveLength(0);
    expect(mapInstance?.remove).toHaveBeenCalledTimes(1);
    expect(useMapToolsStore.getState()).toMatchObject({
      isOpen: true,
      selectedTool: 'polygon',
    });
  });
});
