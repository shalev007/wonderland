import { style } from '@vanilla-extract/css';

export const mapControlsStyles = {
  container: style({
    position: 'absolute',
    right: 24,
    bottom: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 24,
    zIndex: 10,
    pointerEvents: 'none',
  }),
  buttonsContainer: style({
    display: 'flex',
    gap: 8,
  }),
};
