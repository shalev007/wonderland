import { UnstyledButton } from '@mantine/core';
import type { ReactNode } from 'react';
import { meansActionBarStyles } from '../MeansActionBar.css';

type MeansActionButtonProps = {
  children: ReactNode;
};

const MeansActionButton = ({ children }: MeansActionButtonProps) => {
  return (
    <UnstyledButton
      className={`${meansActionBarStyles.baseButton} ${meansActionBarStyles.buttonBaseHover}`}
    >
      {children}
    </UnstyledButton>
  );
};

export default MeansActionButton;
