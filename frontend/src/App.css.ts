import { style } from '@vanilla-extract/css';
import {colors, layout} from './theme/tokens.css'

export const appShellStyles = {
  header: style({
    backgroundColor: `${colors.background} !important`,
    borderBottom: `1px solid ${colors.border} !important`,
  }),

  navbar: style({
    backgroundColor: `${colors.background} !important`,
    borderLeft: `1px solid ${colors.border} !important`,
  }),

  main: style({
    height: `calc(100vh - ${layout.topbarHeight}px)`,
    backgroundColor: `${colors.background} !important`,
    overflow: 'hidden',
  }),
};