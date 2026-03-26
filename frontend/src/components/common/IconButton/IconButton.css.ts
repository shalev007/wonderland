import { colors } from '@theme/tokens.css';
import { style } from '@vanilla-extract/css';

const container = style({
  borderRadius: 6,
  pointerEvents: 'auto',
  selectors: {
    '&&:disabled': {
      backgroundColor: colors.neutralAlpha3,
    },
  },
});

export const iconButtonStyles = {
  container,
  icon: style({
    display: 'block',
    width: '50%',
    height: '50%',
    flexShrink: 0,
    selectors: {
      [`${container}:disabled &`]: {
        color: colors.neutralAlpha8,
      },
    },
  }),
};
