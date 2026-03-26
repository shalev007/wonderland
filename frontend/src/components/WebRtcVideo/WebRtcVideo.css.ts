import { style } from '@vanilla-extract/css';

export const webRtcVideoHost = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const webRtcVideoElement = style({
  width: '100%',
  height: 'auto',
  maxWidth: '100%',
  maxHeight: '100%',
  aspectRatio: '16 / 9',
  objectFit: 'contain',
});

export const webRtcVideoHidden = style({
  display: 'none',
});
