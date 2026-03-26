import { style } from '@vanilla-extract/css';

export const svg = style({
  width: 48,
  height: 48,
  display: 'block',
  flexShrink: 0,
  transformOrigin: 'center center',
  transition: 'transform 0.1s linear',
});

export const compassContainer = style({
  width: 48,
  height: 48,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  clipPath: 'circle(50%)',
  pointerEvents: 'auto',
});
