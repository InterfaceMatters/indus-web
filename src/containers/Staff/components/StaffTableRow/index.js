import React, { useState } from 'react';
import { MoreHoriz } from '@material-ui/icons';
import { Typography, TableCell, TableRow, Switch } from '@material-ui/core';
import IconMenu from '../../../../components/IconMenu';
import { colors } from '../../../../theme/colors';
import { marginGenerator } from '../../../../theme/utils';
import { getAge, getTimeFromSeconds } from '../../../../utils';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    dotStyles: {
      height: '8px',
      width: '8px',
      borderRadius: '50%',
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)'
    },
    healthStyles: {
      position: 'relative',
      width: '100%',
      paddingLeft: '20px'
    }
  };
});

const healthIndicators = {
  Sick: colors.warning.main,
  Healthy: colors.success.main,
  TestedPositive: colors.error.main
};

const StaffTableRow = ({
  row,
  handleMenuItemClick,
  menuItems,
  handleUpdateMember
}) => {
  const classes = useStyles();

  const [access, setAccess] = useState(row.hasAccess);

  const handleChange = () => {
    setAccess(!access);
    const data = {
      hasAccess: !row.hasAccess
    };
    handleUpdateMember(row.id, data);
  };

  return (
    <TableRow hover tabIndex={-1}>
      <TableCell align="left" scope="row">
        <Typography style={{ fontWeight: 'bold' }}>{row.name}</Typography>
      </TableCell>
      <TableCell align="left">{`${row.dob ? getAge(row.dob.seconds) : '-'}, ${
        row.gender ? row.gender.charAt(0) : '-'
      }`}</TableCell>
      <TableCell align="left">{row.phoneNumber}</TableCell>
      <TableCell align="left">{row.department || '-'}</TableCell>
      <TableCell align="left" colSpan={2}>
        {`${getTimeFromSeconds(row.entryTime)}`}{' '}
        <Typography style={{ display: 'inline', color: colors.grey[400] }}>
          to
        </Typography>{' '}
        {`${getTimeFromSeconds(row.exitTime)}`}
      </TableCell>
      <TableCell>
        <div className={classes.healthStyles}>
          <span
            className={classes.dotStyles}
            style={{
              backgroundColor: healthIndicators[row.healthStatus]
            }}
          />{' '}
          {row.healthStatus === 'TestedPositive'
            ? `Tested +ve`
            : row.healthStatus}
        </div>
      </TableCell>
      {/*<TableCell>*/}
      {/*  {row.recVio === 0 ? 'None' : `${row.violations} Violations`}*/}
      {/*</TableCell>*/}
      <TableCell align="left">
        <Switch checked={access} onChange={handleChange} />
        <Typography
          style={{
            display: 'inline',
            ...marginGenerator(['ml-10']),
            color: access === true ? colors.success.main : colors.error.main
          }}
          variant="subtitle2">
          {access === true ? 'Granted' : 'Denied'}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <IconMenu
          icon={<MoreHoriz style={{ color: colors.common.black }} />}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 150
          }}
          menuItems={menuItems}
          data={row}
          handleMenuItemClick={handleMenuItemClick}
        />
      </TableCell>
    </TableRow>
  );
};

export default StaffTableRow;
