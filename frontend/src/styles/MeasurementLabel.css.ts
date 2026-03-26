import { colors } from '@theme/tokens.css';
import { style } from '@vanilla-extract/css';

const baseLabelStyle = {
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  userSelect: 'none',
  borderRadius: 6,
} as const;

export const committedLabelStyle = style({
  ...baseLabelStyle,
  fontSize: 12,
  fontWeight: 500,
  padding: '4px 6px',
  backgroundColor: colors.slate2,
  color: colors.neutralAlpha11,
});

export const cursorTotalLabelStyle = style({
  ...baseLabelStyle,
  backgroundColor: colors.neutral8,
  color: colors.slate12,
  fontSize: 13,
  fontWeight: 700,
  padding: 10,
});
