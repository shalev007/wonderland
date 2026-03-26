import { colors } from '@src/theme/tokens.css';
import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 5,
  pointerEvents: 'auto',
});

export const zoomButton = style({
  selectors: {
    '&&': {
      width: 40,
      height: 40,
    },
    '&:first-child': {
      borderBottom: `1px solid ${colors.neutralAlpha6}`,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    '&:last-child': {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  },
});
