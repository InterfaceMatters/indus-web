import makeStyles from '@material-ui/core/styles/makeStyles';

export const commonStyles = {
  iconSmall: {
    height: 'auto',
    width: '16px'
  },
  iconRegular: {
    height: '16px',
    width: '16px'
  },
  iconMedium: {
    height: '24px',
    width: '24px'
  },
  iconLarge: {
    height: '32px',
    width: '32px'
  },
  iconExtraLarge: {
    height: '48px',
    width: '48px'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  column: {
    display: 'flex',
    alignItems: 'center'
  },
  buttonTextSmall: {
    lineHeight: '1.25',
    fontSize: '0.75rem',
    fontWeight: 500
  },
  normalFontWeight: {
    fontWeight: 400
  },
  italicize: {
    fontStyle: 'italic'
  },
  attachmentImage: {
    width: 92,
    height: 62,
    cursor: 'pointer'
  },
  linkStyles: {
    textDecoration: 'none',
    padding: 'inherit'
  }
};

export default makeStyles(theme => commonStyles);
