import {
  IconButton,
  type IconButtonProps,
} from '@components/common/IconButton';

interface MeasurementPanelButtonProps extends Omit<IconButtonProps, 'size'> {
  isActive?: boolean;
}

export const MeasurementPanelButton: React.FC<MeasurementPanelButtonProps> = ({
  ...props
}) => {
  return <IconButton size={32} {...props} />;
};
