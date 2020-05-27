import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { marginGenerator, paddingGenerator } from '../../../../theme/utils';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../../theme/colors';
import HeroImage from '../HeroImage';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginInput: {
    backgroundColor: colors.common.white,
    fontSize: '16px',
    '& input': {
      padding: '19px 0 18px 0'
    },
    '& input::placeholder': {
      opacity: 1,
      color: colors.common.black
    }
  },
  nameAndTitle: {
    position: 'absolute',
    bottom: '104px',
    width: '460px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  logo: {
    width: '103px',
    height: '47px',
    backgroundColor: colors.common.white,
    color: colors.primary.main,
    borderRadius: '0 24px 0 0 ',
    fontSize: '24px'
  }
}));
const EmailSent = () => {
  const classes = useStyles();

  // eslint-disable-next-line no-unused-vars
  const handleResendLink = () => {};

  return (
    <div className={classes.root}>
      <HeroImage />
      <div style={{ position: 'relative', flex: 1 }}>
        <div
          style={{
            width: '460px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)'
          }}>
          <>
            <Typography
              align="center"
              style={{ fontWeight: 'normal', lineHeight: 1.5 }}
              variant="h1">
              Please Check your email
            </Typography>
            <Typography
              align="center"
              style={{ fontWeight: 'normal', fontSize: '14px' }}
              variant="subtitle1">
              A Verification Link has been sent to your email
            </Typography>
            <Typography
              align="center"
              style={{ fontWeight: 'normal', fontSize: '14px' }}
              variant="subtitle1">
              account. Please verify to continue
            </Typography>

            <Button
              style={{
                width: '100%',
                fontSize: '16px',
                ...marginGenerator(['mt-32']),
                ...paddingGenerator(['pt-17', 'pb-16']),
                borderRadius: '2px'
              }}
              variant="contained"
              disableElevation
              color="primary">
              Resend verification Link
            </Button>
          </>
        </div>
      </div>
    </div>
  );
};

export default EmailSent;
