import { style } from '@vanilla-extract/css';
import { colors } from '../../../../../theme/tokens.css';

export const root = style({
  width: 32,
  height: 32,
  borderRadius: 5,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  background: `${colors.neutral5} !important`,
  cursor: 'pointer',
  transition: 'background 150ms ease, color 150ms ease',
  color: colors.accentContrast,

  selectors: {
    '&[data-open="true"]': {
      background: `${colors.accentContrast} !important`,
      color: colors.neutral1,
    },
  },
});

export const icon = style({
  transition: 'color 150ms ease',
});
