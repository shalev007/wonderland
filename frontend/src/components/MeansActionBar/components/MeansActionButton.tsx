import { UnstyledButton } from '@mantine/core';
import type { ReactNode } from 'react';
import { meansActionBarStyles } from '../MeansActionBar.css';

type MeansActionButtonProps = {
  children: ReactNode;
  onClick?: () => void;
};

const MeansActionButton = ({ children, onClick }: MeansActionButtonProps) => {
  return (
    <UnstyledButton
      className={`${meansActionBarStyles.baseButton} ${meansActionBarStyles.buttonBaseHover}`}
      onClick={onClick}
    >
      {children}
    </UnstyledButton>
  );
};

export default MeansActionButton;
