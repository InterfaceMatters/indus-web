import React from 'react';
import PropTypes from 'prop-types';

import { paddingGenerator, marginGenerator } from '../../../../theme/utils';
import { colors } from '../../../../theme/colors';
import { Typography, Divider, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { returnDay, returnTime, trimString } from '../../../../utils/index';
import ChipsWrapper from '../../../../components/ChipsWrapper';
import { commonStyles } from '../../../../theme/commonStyles';

function GrievanceTableHead({ columns }) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          ...paddingGenerator(['pb-20']),
          ...marginGenerator(['mt-40'])
        }}>
        {columns.map((column, index) => (
          <div style={{ flex: column.size }} key={index}>
            <Typography variant="subtitle2">{column.label}</Typography>
          </div>
        ))}
      </div>
      <Divider />
    </>
  );
}

GrievanceTableHead.propTypes = {
  columns: PropTypes.array.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  rowHover: {
    color: colors.common.black,
    '&:hover': {
      color: colors.primary.main
    }
  }
}));

export default function GrievanceList({
  columns,
  rows,
  styleOverrides,
  type,
  handleMarkAsNoted
  // handleMenuItemClick,
  // returnHealth
}) {
  const classes = useStyles();

  const flexStartStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column'
  };

  return (
    <div className={classes.root} style={styleOverrides}>
      <Typography
        variant="subtitle1"
        style={{
          fontSize: '14px',
          ...marginGenerator(['mt-43'])
        }}>{`Total of ${rows.length} Grievance Reports`}</Typography>

      <GrievanceTableHead columns={columns} />

      {rows && rows.length
        ? rows.map((row, index) => (
            <div key={`${index}-${type}`}>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  minHeight: '81px',
                  height: 'auto'
                }}
                className={classes.protocol}
                key={index}>
                <div
                  style={{
                    ...flexStartStyles,
                    flex: 5
                  }}>
                  <Typography
                    align="left"
                    variant={'body1'}
                    style={{ fontWeight: 'bold' }}>
                    <Link
                      className={classes.rowHover}
                      style={commonStyles.linkStyles}
                      to={`/grievance/details/${row.id}`}>
                      {row.title}
                    </Link>
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    align="left"
                    style={paddingGenerator(['pt-9'])}>
                    {trimString(row.description)}
                  </Typography>
                </div>

                <ChipsWrapper
                  key={`${type}-${index}`}
                  tags={row.tags}
                  width={3}
                />

                <div
                  style={{
                    flex: 2,
                    ...flexStartStyles
                  }}>
                  <Typography variant="body1" style={{ fontSize: '15px' }}>
                    {row.createdByName}
                  </Typography>
                  {/*<Typography variant="subtitle1" style={{ fontSize: '14px' }}>*/}
                  {/*  {row.createdByphoneNumber}*/}
                  {/*</Typography>*/}
                </div>
                <div
                  style={{
                    flex: 2,
                    ...flexStartStyles
                  }}>
                  <Typography variant="body1" style={{ fontSize: '15px' }}>
                    {returnDay(row.createdDate)}
                  </Typography>
                  <Typography variant="subtitle1" style={{ fontSize: '14px' }}>
                    {returnTime(row.createdDate)}
                  </Typography>
                </div>

                <div
                  style={{
                    flex: 2,
                    ...flexStartStyles
                  }}>
                  <Button
                    onClick={() =>
                      row.noted ? null : handleMarkAsNoted(row.id)
                    }
                    disableElevation
                    variant={row.noted ? 'contained' : 'outlined'}
                    color={row.noted === true ? 'primary' : 'default'}>
                    {row.noted === true ? 'Noted' : 'Mark as Noted'}
                  </Button>
                </div>
                {/*<div*/}
                {/*  style={{*/}
                {/*    flex: 1,*/}
                {/*    ...flexStartStyles*/}
                {/*  }}>*/}
                {/*  <IconButton>*/}
                {/*    <MoreHoriz />*/}
                {/*  </IconButton>*/}
                {/*</div>*/}
              </div>
              <Divider />
            </div>
          ))
        : ''}
    </div>
  );
}

GrievanceList.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired
};
