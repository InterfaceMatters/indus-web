import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';

import { paddingGenerator } from '../../../../theme/utils';
import { colors } from '../../../../theme/colors';
import StaffTableRow from '../StaffTableRow';

function StaffTableHead({ columns }) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column, index) => (
          <TableCell
            colSpan={column.label.toLowerCase() === 'access timing' ? 2 : 0}
            align="left"
            style={{
              padding: '20px 0',
              color: colors.grey[500],
              fontSize: '14px'
            }}
            key={index}>
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

StaffTableHead.propTypes = {
  columns: PropTypes.array.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  tableRow: {
    color: colors.common.black
  },
  dot: {
    height: '8px',
    width: '8px',
    borderRadius: '50%',
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)'
  },
  health: {
    position: 'relative',
    width: '100%',
    paddingLeft: '20px'
  }
}));

export default function StaffTable({
  columns,
  rows,
  styleOverrides,
  handleMenuItemClick,
  handleUpdateMember
}) {
  const classes = useStyles();

  const menuItems = [
    { label: 'Update Details' },
    { label: 'Remove', style: { color: colors.error.main } }
  ];

  return (
    <div className={classes.root} style={styleOverrides}>
      <Typography style={{ fontSize: '14px' }} variant="subtitle1">
        Total {rows.length} members added
      </Typography>
      <TableContainer style={paddingGenerator(['pt-19'])}>
        <Table aria-labelledby="tableTitle" aria-label="enhanced table">
          <StaffTableHead columns={columns} />
          <TableBody>
            {rows.map((row, index) => {
              return (
                <StaffTableRow
                  key={index}
                  handleUpdateMember={handleUpdateMember}
                  menuItems={menuItems}
                  handleMenuItemClick={handleMenuItemClick}
                  row={row}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

StaffTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired
};
