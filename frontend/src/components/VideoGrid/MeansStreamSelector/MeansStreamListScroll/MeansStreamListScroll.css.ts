import { style } from '@vanilla-extract/css';
import { colors, radius, space } from '@src/theme/tokens.css';

const listViewportHeight = 'clamp(72px, 22vh, 125px)';

export const root = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  width: '100%',
  minWidth: 0,
  minHeight: 0,
  gap: space.spacing2,
});

export const content = style({
  width: '100%',
  minWidth: 0,
  maxWidth: '100%',
  minHeight: 'min-content',
});

export const viewport = style({
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  height: listViewportHeight,
  direction: 'ltr',
  overflowY: 'auto',
  overflowX: 'hidden',
  boxSizing: 'border-box',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
      width: 0,
      height: 0,
    },
  },
});

export const track = style({
  width: '4px',
  flexShrink: 0,
  height: listViewportHeight,
  boxSizing: 'border-box',
  padding: `${space.spacing1} 0`,
  backgroundColor: colors.neutralAlpha3,
  borderRadius: radius.borderRadiusMax1,
  position: 'relative',
});

export const thumb = style({
  position: 'absolute',
  left: 0,
  right: 0,
  borderRadius: radius.borderRadiusMax1,
  backgroundColor: colors.neutralAlpha8,
  minHeight: '24px',
  pointerEvents: 'none',
});
