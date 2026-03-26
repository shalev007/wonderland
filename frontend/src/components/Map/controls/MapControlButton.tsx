import { colors } from '@theme/tokens.css';
import { IconButton, type IconButtonProps } from '../../common/IconButton';

interface MapControlButtonProps extends Omit<
  IconButtonProps,
  'size' | 'color'
> {
  isActive?: boolean;
}

const MapControlButton: React.FC<MapControlButtonProps> = ({
  isActive = false,
  ...props
}) => {
  return (
    <IconButton
      size={40}
      color={isActive ? colors.neutral6 : colors.slate2}
      {...props}
    />
  );
};

export default MapControlButton;
