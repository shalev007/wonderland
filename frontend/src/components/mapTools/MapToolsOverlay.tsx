import { type KeyboardEvent, type ReactElement } from 'react';
import { Box } from '@mantine/core';
import {
  type MapToolKind,
  orderedMapToolKinds,
  useMapToolsStore,
} from '@src/stores/useMapTools';
import { mapToolsStyles } from './mapTools.css';
import { DotIcon, LineIcon, PolygonIcon } from './mapToolIcons';
import { DraftingCompassIcon } from 'lucide-react';

const toolLabels: Record<MapToolKind, string> = {
  dot: 'נקודה',
  line: 'קו',
  polygon: 'פוליגון',
};

const toolIcons: Record<MapToolKind, () => ReactElement> = {
  dot: DotIcon,
  line: LineIcon,
  polygon: PolygonIcon,
};

export function MapToolsOverlay() {
  const isOpen = useMapToolsStore((state) => state.isOpen);
  const selectedTool = useMapToolsStore((state) => state.selectedTool);
  const closeTools = useMapToolsStore((state) => state.closeTools);
  const selectTool = useMapToolsStore((state) => state.selectTool);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen || event.key !== 'Escape') return;

    event.preventDefault();
    closeTools();
  };

  return (
    <Box className={mapToolsStyles.overlay} onKeyDown={handleKeyDown}>
      {isOpen && (
        <Box className={mapToolsStyles.trayAnchor} data-tray-placement="center">
          <div
            aria-label="בחירת כלי מפה"
            className={mapToolsStyles.tray}
            role="toolbar"
          >
            {orderedMapToolKinds.map((tool) => {
              const ToolIcon = toolIcons[tool];
              const isSelected = selectedTool === tool;

              return (
                <button
                  key={tool}
                  aria-pressed={isSelected}
                  className={
                    mapToolsStyles.toolButton[isSelected ? 'active' : 'idle']
                  }
                  data-tool-kind={tool}
                  title={toolLabels[tool]}
                  type="button"
                  onClick={() => selectTool(tool)}
                >
                  <ToolIcon />
                  <span className={mapToolsStyles.srOnly}>
                    {toolLabels[tool]}
                  </span>
                </button>
              );
            })}
            <div className={mapToolsStyles.groupLabel}>
              <DraftingCompassIcon />
              <span className={mapToolsStyles.groupLabelText}>כלי מפה</span>
            </div>
          </div>
        </Box>
      )}
    </Box>
  );
}
