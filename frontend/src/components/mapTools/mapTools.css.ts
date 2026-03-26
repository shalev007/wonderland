import { style, styleVariants } from '@vanilla-extract/css';
import { colors } from '@src/theme/tokens.css';

const controlTransition =
  'background-color 140ms ease, border-color 140ms ease, color 140ms ease, transform 140ms ease';

const borderColor = 'rgba(255, 255, 255, 0.1)';
const trayShadow = '0 18px 32px rgba(5, 11, 24, 0.42)';
const segmentShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.04)';
const controlSize = 40;
const controlRadius = 8;

const focusRing = {
  outline: '2px solid rgba(255, 255, 255, 0.9)',
  outlineOffset: 2,
};

const sharedControl = style({
  border: `1px solid ${borderColor}`,
  color: colors.textPrimary,
  transition: controlTransition,
  selectors: {
    '&:focus-visible': focusRing,
  },
});

const toggleBase = style([
  sharedControl,
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: controlSize,
    height: controlSize,
    borderRadius: controlRadius,
    backgroundColor: 'rgba(20, 31, 50, 0.96)',
    pointerEvents: 'auto',
    cursor: 'pointer',
    boxShadow: trayShadow,
    selectors: {
      '&:hover': {
        backgroundColor: 'rgba(28, 42, 65, 0.98)',
      },
      '&:active': {
        transform: 'translateY(1px)',
      },
    },
  },
]);

const toolButtonBase = style([
  sharedControl,
  {
    width: controlSize,
    height: controlSize,
    borderRadius: controlRadius,
    backgroundColor: 'rgba(77, 90, 112, 0.94)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'auto',
    cursor: 'pointer',
    color: colors.textPrimary,
    boxShadow: segmentShadow,
    selectors: {
      '&:hover': {
        backgroundColor: 'rgba(92, 106, 130, 0.98)',
      },
      '&:active': {
        transform: 'translateY(1px)',
      },
    },
  },
]);

export const mapToolsStyles = {
  overlay: style({
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 10,
  }),

  toggle: styleVariants({
    idle: [toggleBase],
    active: [
      toggleBase,
      {
        backgroundColor: colors.mapToolsActive,
        borderColor: 'rgba(183, 214, 255, 0.88)',
        selectors: {
          '&:hover': {
            backgroundColor: colors.mapToolsActiveHover,
          },
        },
      },
    ],
  }),

  trayAnchor: style({
    position: 'absolute',
    left: '50%',
    bottom: 24,
    transform: 'translateX(-50%)',
    width: 'calc(100% - 96px)',
    maxWidth: 520,
    display: 'flex',
    justifyContent: 'center',
    '@media': {
      'screen and (max-width: 720px)': {
        width: 'calc(100% - 40px)',
        maxWidth: 'none',
      },
    },
  }),

  tray: style([
    {
      width: 'fit-content',
      maxWidth: '100%',
      minHeight: 52,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: 8,
      borderRadius: 14,
      backgroundColor: 'rgba(13, 21, 35, 0.96)',
      border: `1px solid ${borderColor}`,
      boxShadow: trayShadow,
      pointerEvents: 'auto',
      direction: 'ltr',
      overflowX: 'auto',
      overflowY: 'hidden',
    },
  ]),

  toolButton: styleVariants({
    idle: [toolButtonBase],
    active: [
      toolButtonBase,
      {
        backgroundColor: colors.mapToolsActive,
        borderColor: 'rgba(183, 214, 255, 0.88)',
        color: colors.textPrimary,
        boxShadow:
          '0 10px 18px rgba(29, 110, 242, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.16)',
        selectors: {
          '&:hover': {
            backgroundColor: colors.mapToolsActiveHover,
          },
        },
      },
    ],
  }),

  toolIcon: style({
    width: 16,
    height: 16,
    flexShrink: 0,
  }),

  groupLabel: style({
    minWidth: 104,
    height: controlSize,
    padding: '0 14px',
    borderRadius: 10,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(17, 28, 45, 0.98)',
    boxShadow: segmentShadow,
    direction: 'rtl',
    flexShrink: 0,
    color: colors.textPrimary,
  }),

  groupLabelText: style({
    whiteSpace: 'nowrap',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '18px',
  }),

  srOnly: style({
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0,
  }),
};
