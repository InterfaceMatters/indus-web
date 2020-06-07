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
import { colors } from '../../../../../theme/colors';
import { paddingGenerator } from '../../../../../theme/utils';
import { returnDay } from '../../../../../utils';

function LogTableHead({ columns }) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column, index) => (
          <TableCell
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

LogTableHead.propTypes = {
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

export default function LogTable({ columns, rows, styleOverrides }) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={styleOverrides}>
      <Typography style={{ fontSize: '14px' }} variant="subtitle1">
        Total {rows.length} logs
      </Typography>
      <TableContainer style={paddingGenerator(['pt-19'])}>
        <Table aria-labelledby="logTable" aria-label="log table">
          <LogTableHead columns={columns} />
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow tabIndex={-1} key={index}>
                  <TableCell>{returnDay(row.createdDate)}</TableCell>
                  <TableCell>{row.temperature}</TableCell>
                  <TableCell>{row.maskStatus}</TableCell>
                  <TableCell>{row.hasAccess ? 'yes' : 'no'}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

LogTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired
};
