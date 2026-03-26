import { useState, useEffect } from 'react';
import { Box } from '@mantine/core';
import { CompassIcon } from './CompassIcon';
import { compassContainer, svg } from './MapCompass.css';
import { useMap } from '@src/contexts/MapContext';

export const MapCompass: React.FC = () => {
  const map = useMap();
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!map) return;

    const handleRotate = () => {
      setRotation(map.getBearing());
    };

    const handleLoad = () => {
      map.on('rotate', handleRotate);
    };

    if (map.loaded()) {
      map.on('rotate', handleRotate);
    } else {
      map.on('load', handleLoad);
    }

    return () => {
      map.off('load', handleLoad);
      map.off('rotate', handleRotate);
    };
  }, [map]);

  const resetRotation = () => {
    map?.easeTo({ bearing: 0, duration: 500 });
  };

  return (
    <Box className={compassContainer} onClick={resetRotation}>
      <CompassIcon
        className={svg}
        style={{ transform: `rotate(${-rotation}deg)` }}
      />
    </Box>
  );
};
