import React from 'react';
import { Grid, Typography, Divider, makeStyles } from '@material-ui/core';
import { marginGenerator, paddingGenerator } from '../../../../theme/utils';
import { Link } from 'react-router-dom';
import { returnDay, returnTime, trimString } from '../../../../utils';
import { colors } from '../../../../theme/colors';

const useStyles = makeStyles(theme => ({
  rowHover: {
    color: colors.common.black,
    '&:hover': {
      color: colors.primary.main
    }
  }
}));

const TableHead = ({ columns }) => {
  return (
    <>
      <Grid
        direction="row"
        justify={'space-between'}
        container
        style={{ width: '100%', ...marginGenerator(['mt-36']) }}>
        {columns.map((column, index) => (
          <Grid item key={index} xs={column.size}>
            <Typography variant="subtitle2">{column.label}</Typography>
          </Grid>
        ))}
      </Grid>
      <Divider style={marginGenerator(['mt-16'])} />
    </>
  );
};

const RecentGrievanceReports = ({ rows, columns }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        ...marginGenerator(['mt-43']),
        width: '100%',
        ...paddingGenerator(['pr-80'])
      }}>
      <Typography style={{ fontWeight: 'bold' }} variant="body1">
        Recent Grievance Reports
      </Typography>
      <TableHead columns={columns} />
      {rows.map((row, index) => (
        <div key={index}>
          <Grid
            container
            justify={'space-between'}
            style={{ height: '81px', ...paddingGenerator(['pt-20', 'pb-20']) }}
            key={index}>
            <Grid container direction="column" item justify="flex-start" xs={9}>
              <Typography
                align="left"
                variant={'body1'}
                style={{ fontWeight: 'bold' }}>
                <Link
                  className={classes.rowHover}
                  style={{
                    textDecoration: 'none'
                  }}
                  to={`/grievance/details/${row.id}`}>
                  {row.title}
                </Link>
              </Typography>
              <Typography
                variant="subtitle2"
                align="left"
                style={paddingGenerator(['pt-12'])}>
                {trimString(row.description)}
              </Typography>
            </Grid>
            <Grid container direction="row" item xs={2}>
              <Grid container item direction="column">
                <Typography variant="body1" style={{ fontSize: '15px' }}>
                  {returnDay(row.createdDate)}
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{ fontSize: '14px', ...marginGenerator(['mt-12']) }}>
                  {returnTime(row.createdDate)}
                </Typography>
              </Grid>
              {/*<Grid xs={6} item container>*/}
              {/*  <IconMenu*/}
              {/*    handleMenuItemClick={handleMenuItemClick}*/}
              {/*    icon={<MoreHoriz style={{ color: colors.common.black }} />}*/}
              {/*    menuItems={['1', '2', '3']}*/}
              {/*  />*/}
              {/*</Grid>*/}
            </Grid>
          </Grid>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default RecentGrievanceReports;
