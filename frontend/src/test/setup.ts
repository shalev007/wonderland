import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

class ResizeObserverMock implements ResizeObserver {
  observe(): void {}

  unobserve(): void {}

  disconnect(): void {}
}

const matchMediaMock: Window['matchMedia'] = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
});

vi.stubGlobal('ResizeObserver', ResizeObserverMock);
vi.stubGlobal('matchMedia', matchMediaMock);

afterEach(() => {
  cleanup();
});
