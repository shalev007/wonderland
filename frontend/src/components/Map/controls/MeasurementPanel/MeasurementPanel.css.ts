import { colors } from '@theme/tokens.css';
import { style } from '@vanilla-extract/css';

export const measurementPanelStyles = {
  panel: style({
    backgroundColor: colors.background,
    position: 'absolute',
    bottom: 24,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    borderRadius: 8,
    padding: 8,
    zIndex: 10,
  }),
  inputWrapper: style({
    selectors: {
      '&&': {
        width: 'fit-content',
        minWidth: 80,
        maxWidth: 160,
      },
    },
  }),
  input: style({
    selectors: {
      '&&': {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        border: `1px solid ${colors.neutralAlpha6}`,
        color: colors.neutral12,
        fontWeight: 500,
        fontSize: 13,
        textAlign: 'center',
        fieldSizing: 'content',
        padding: 8,
        cursor: 'default',
      },
      '&&::placeholder': {
        color: colors.neutralAlpha9,
        opacity: 1,
      },
    },
  }),
  divider: style({
    selectors: {
      '&&': {
        backgroundColor: colors.neutral5,
        borderRadius: 16,
      },
    },
  }),
};
