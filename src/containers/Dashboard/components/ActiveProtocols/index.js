import React from 'react';
import { marginGenerator, paddingGenerator } from '../../../../theme/utils';
import commonStyles from '../../../../theme/commonStyles';
import { Typography, Grid, Divider, makeStyles } from '@material-ui/core';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { colors } from '../../../../theme/colors';
import { Link } from 'react-router-dom';
import { trimString } from '../../../../utils';

const useStyles = makeStyles(theme => ({
  rowHover: {
    color: colors.common.black,
    '&:hover': {
      color: colors.primary.main
    }
  }
}));

const ActiveProtocols = ({ protocols }) => {
  const commonClasses = commonStyles();
  const classes = useStyles();
  return (
    <div style={{ ...marginGenerator(['mt-43', 'ml-20']) }}>
      <Typography style={{ fontWeight: 'bold' }} variant="body1">
        Active Protocols
      </Typography>

      <Grid
        direction="row"
        container
        style={{ width: '100%', ...marginGenerator(['mt-36']) }}>
        <Grid item container>
          <Typography variant="subtitle2">Protocols</Typography>
        </Grid>
      </Grid>
      <Divider style={marginGenerator(['mt-16'])} />

      <Grid container>
        {protocols.map((protocol, index) => (
          <Grid key={index} style={{ width: '100%' }}>
            <Grid container>
              <Grid container item justify="center" alignItems="center" xs={2}>
                <DescriptionOutlinedIcon
                  className={commonClasses.iconMedium}
                  style={{ color: colors.primary.main }}
                />
              </Grid>
              <Grid
                container
                item
                xs={10}
                style={paddingGenerator(['pt-21', 'pb-23'])}>
                <Grid item container>
                  <Typography
                    className={classes.rowHover}
                    style={{ fontWeight: 'bold' }}
                    variant="body1">
                    <Link
                      style={{
                        textDecoration: 'none',
                        font: 'inherit',
                        color: 'inherit'
                      }}
                      to={`/protocols/details/${protocol.id}`}>
                      {protocol.name}
                    </Link>
                  </Typography>
                </Grid>
                <Grid item container>
                  <Typography variant="subtitle2">
                    {trimString(protocol.description)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ActiveProtocols;
