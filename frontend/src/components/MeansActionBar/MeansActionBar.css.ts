import { colors, radius, space } from '@src/theme/tokens.css';
import { style } from '@vanilla-extract/css';

export const meansActionBarStyles = {
  baseButton: style({
    width: space.spacing6,
    height: space.spacing6,
    borderRadius: radius.borderRadiusFull,
    background: `${colors.naturalNatural5} !important`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  buttonBaseHover: style({
    selectors: {
      '&:hover': {
        backgroundColor: colors.naturalNatural7,
      },
    },
  }),
};
