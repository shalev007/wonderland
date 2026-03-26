import { style } from '@vanilla-extract/css';

export const mapViewStyles = {
  wrapper: style({
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  }),
  mapContainer: style({
    width: '100%',
    height: '100%',
  }),
};
