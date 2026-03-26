import { beforeEach, describe, expect, test } from 'vitest';
import { useMapToolsStore } from './useMapTools';

describe('useMapToolsStore', () => {
  beforeEach(() => {
    useMapToolsStore.setState({
      isOpen: false,
      selectedTool: null,
    });
  });

  test('starts closed with no selected tool', () => {
    const { isOpen, selectedTool } = useMapToolsStore.getState();

    expect(isOpen).toBe(false);
    expect(selectedTool).toBeNull();
  });

  test('toggleTools opens and closes the tray', () => {
    const { toggleTools } = useMapToolsStore.getState();

    toggleTools();
    expect(useMapToolsStore.getState().isOpen).toBe(true);

    toggleTools();
    expect(useMapToolsStore.getState().isOpen).toBe(false);
  });

  test('selectTool stores the tool and keeps the tray open', () => {
    const { selectTool } = useMapToolsStore.getState();

    selectTool('line');

    expect(useMapToolsStore.getState()).toMatchObject({
      isOpen: true,
      selectedTool: 'line',
    });
  });

  test('closeTools closes without clearing the last selection', () => {
    const { closeTools, selectTool, toggleTools } = useMapToolsStore.getState();

    selectTool('polygon');
    closeTools();

    expect(useMapToolsStore.getState()).toMatchObject({
      isOpen: false,
      selectedTool: 'polygon',
    });

    toggleTools();

    expect(useMapToolsStore.getState()).toMatchObject({
      isOpen: true,
      selectedTool: 'polygon',
    });
  });
});
