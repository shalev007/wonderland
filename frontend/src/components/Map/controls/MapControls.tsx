import { DraftingCompass, Ruler } from 'lucide-react';
import { useMeasurementStore } from '@src/stores/useMeasurementStore';
import MapControlButton from './MapControlButton';
import { mapControlsStyles as styles } from './MapControls.css';
import { ZoomControls } from './ZoomControls';
import { useMapToolsStore } from '@stores/useMapTools';
import { MapCompass } from './Compass';

export const MapControls: React.FC = () => {
  const isMeasurementActive = useMeasurementStore((s) => s.isActive);
  const isToolsActive = useMapToolsStore((s) => s.isOpen);
  const toggleMeasurement = useMeasurementStore((s) => s.toggleMeasurement);
  const toggleTools = useMapToolsStore((s) => s.toggleTools);

  const handleToggleMeasurement = () => {
    if (!isMeasurementActive) {
      useMapToolsStore.getState().closeTools();
    }
    toggleMeasurement();
  };

  const handleToggleTools = () => {
    if (!isToolsActive) {
      useMeasurementStore.getState().deactivate();
    }
    toggleTools();
  };

  return (
    <div className={styles.container}>
      <ZoomControls />
      <MapCompass />
      <div className={styles.buttonsContainer}>
        <MapControlButton
          icon={Ruler}
          isActive={isMeasurementActive}
          onClick={handleToggleMeasurement}
        />
        <MapControlButton
          icon={DraftingCompass}
          isActive={isToolsActive}
          onClick={handleToggleTools}
        />
      </div>
    </div>
  );
};
