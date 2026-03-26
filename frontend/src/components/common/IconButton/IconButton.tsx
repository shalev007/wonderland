import { ActionIcon, type ActionIconProps } from '@mantine/core';
import type { LucideIcon } from 'lucide-react';
import { iconButtonStyles as styles } from './IconButton.css';

export interface IconButtonProps extends Omit<
  ActionIconProps,
  'radius' | 'variant'
> {
  icon: LucideIcon;
  onClick: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon: IconComponent,
  onClick,
  ...props
}) => {
  return (
    <ActionIcon
      variant="filled"
      className={styles.container}
      onClick={onClick}
      {...props}
    >
      <IconComponent className={styles.icon} />
    </ActionIcon>
  );
};
