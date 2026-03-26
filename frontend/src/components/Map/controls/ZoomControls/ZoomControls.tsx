import { ActionIcon } from '@mantine/core';
import { colors } from '@src/theme/tokens.css';
import { Plus, Minus } from 'lucide-react';
import * as classes from './ZoomControls.css';
import { useMap } from '@src/contexts/MapContext';

export const ZoomControls: React.FC = () => {
  const map = useMap();

  const handleZoom = (direction: 'in' | 'out') => {
    if (!map) return;
    if (direction === 'in') {
      map.zoomIn();
    } else {
      map.zoomOut();
    }
  };

  return (
    <div className={classes.root}>
      <ActionIcon
        aria-label="Zoom in"
        variant="filled"
        className={classes.zoomButton}
        color={colors.slate2}
        onClick={() => handleZoom('in')}
      >
        <Plus size={15} strokeWidth={2.5} />
      </ActionIcon>

      <ActionIcon
        aria-label="Zoom out"
        variant="filled"
        className={classes.zoomButton}
        color={colors.slate2}
        onClick={() => handleZoom('out')}
      >
        <Minus size={15} strokeWidth={2.5} />
      </ActionIcon>
    </div>
  );
};
