import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { paddingGenerator } from '../../../../theme/utils';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../../theme/colors';

const useStyles = makeStyles(theme => ({
  statContainer: {
    height: '85px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: colors.common.white,
    border: `solid 1px ${colors.grey[200]}`
  }
}));

const DashboardCharts = ({ title, subtitle, stats, border }) => {
  const classes = useStyles();

  return (
    <Grid item container xs>
      <Grid
        container
        alignItems="center"
        style={{ ...border }}
        direction="row"
        className={classes.statContainer}>
        <Grid
          container
          alignItems="center"
          style={paddingGenerator(['pl-28', 'pt-26', 'pb-26'])}
          item
          xs={9}>
          <Grid item container>
            <Typography variant="body1">{title}</Typography>
          </Grid>
          <Grid item container>
            <Typography variant="subtitle1">{subtitle}</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          style={paddingGenerator(['pt-26', 'pb-26'])}
          justify="center"
          container
          xs={3}>
          <Typography variant="body1" style={{ fontSize: '20px' }}>
            {stats}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardCharts;
