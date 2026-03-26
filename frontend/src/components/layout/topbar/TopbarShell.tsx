import type { ReactNode } from 'react';
import { topBarShellStyles } from './TopbarShell.css';
import GroupFourLogo from '../../../assets/icons/group-4-logo.svg?react'
import OneHundredLogo from '../../../assets/icons/100-logo.svg?react'
import MagenimLogo from '../../../assets/icons/magenim-logo.svg?react'
import MagenimLabel from '../../../assets/icons/magenim-label.svg?react'
import { Divider } from '@mantine/core';
import { colors } from '../../../theme/tokens.css';

export type TopbarSlots  = {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
};

type TopbarShellProps = TopbarSlots;

export function TopbarShell({ left, center, right}: TopbarShellProps) {
  return (
    <div className={topBarShellStyles.root}>
      <div className={topBarShellStyles.rightSection}>
          <div className={topBarShellStyles.rightSectionInner}>
            <GroupFourLogo/>
            <OneHundredLogo/>
            <Divider
              orientation="vertical"
              size="sm"
              color={colors.border}
              style={{height: 45, alignSelf: 'center'}}
            />
            <MagenimLogo/>
            <MagenimLabel/>
            {right}
          </div>
      </div>

      <div className={topBarShellStyles.centerSection}>
        <div className={topBarShellStyles.centerSectionInner}>{center}</div>
      </div>

      <div className={topBarShellStyles.leftSection}>
        <div className={topBarShellStyles.leftSectionInner}>{left}</div>
      </div>
    </div>
  );
}