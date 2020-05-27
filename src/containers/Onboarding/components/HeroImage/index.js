import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import heroImage from '../../../../images/hero.svg';
import { colors } from '../../../../theme/colors';

const useStyles = makeStyles(theme => ({
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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

const HeroImage = () => {
  const classes = useStyles();
  return (
    <div
      className={classes.center}
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: colors.primary.main
      }}>
      <img
        style={{
          position: 'absolute',
          top: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          height: '52%'
        }}
        src={heroImage}
        alt="indus-hero"
      />
      <div className={classes.nameAndTitle}>
        <div className={`${classes.logo} ${classes.center}`}>Indus</div>
        <Typography
          style={{
            fontWeight: 'normal',
            lineHeight: 1.5,
            color: colors.common.white
          }}
          variant="h2">
          Workplace safety, precautions and guidelines for a healthier you
        </Typography>
      </div>
    </div>
  );
};

export default HeroImage;
