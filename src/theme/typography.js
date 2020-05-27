/*
  Typography specifications
 */

import { colors } from './colors';

export const typography = {
  fontFamily: 'Chivo',

  h1: {
    fontSize: '1.5rem',
    fontWeight: 500,
    lineHeight: 2.5,
    paddingTop: '8px',
    paddingBottom: '4px',
    letterSpacing: 'normal',
    color: colors.common.black
  },
  h2: {
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: 1.5,
    paddingTop: '6px',
    paddingBottom: '4px',
    letterSpacing: 'normal',
    color: colors.common.black
  },
  h4: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    lineHeight: 1.5,
    paddingTop: '5px',
    paddingBottom: '4px',
    letterSpacing: 'normal',
    color: colors.common.black
  },
  h5: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    lineHeight: 1.5,
    paddingTop: '5px',
    paddingBottom: '4px',
    letterSpacing: 'normal',
    color: colors.common.white
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: colors.grey[400]
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: colors.grey[500]
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: colors.common.black
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 'normal',
    lineHeight: 1.29,
    letterSpacing: 'normal',
    color: colors.common.black
  }
};
