import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { commonStyles } from '../../../../theme/commonStyles';
import { paddingGenerator, marginGenerator } from '../../../../theme/utils';
import { colors } from '../../../../theme/colors';

import { MoreHoriz } from '@material-ui/icons';
import IconMenu from '../../../../components/IconMenu';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { Typography, Grid, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { toShortFormat, trimString } from '../../../../utils';
import ChipsWrapper from '../../../../components/ChipsWrapper';

function ProtocolsTableHead({ columns }) {
  return (
    <>
      <Grid
        container
        style={{
          width: '100%',
          ...paddingGenerator(['pb-20']),
          ...marginGenerator(['mt-40'])
        }}>
        {columns.map((column, index) => (
          <Grid
            item
            container
            xs={column.size}
            justify="flex-start"
            key={index}>
            <Typography variant="subtitle2">{column.label}</Typography>
          </Grid>
        ))}
      </Grid>
      <Divider />
    </>
  );
}

ProtocolsTableHead.propTypes = {
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

export default function ProtocolsList({
  columns,
  rows,
  styleOverrides,
  handleMenuItemClick
}) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={styleOverrides}>
      <Typography
        variant="subtitle1"
        style={{
          fontSize: '14px',
          ...marginGenerator(['mt-43'])
        }}>{`Total of ${rows.length} protocols`}</Typography>

      <ProtocolsTableHead columns={columns} />

      {rows
        ? rows.map((row, index) => (
            <div key={index}>
              <Grid
                container
                style={{
                  width: '100%',
                  minHeight: '81px',
                  height: 'auto'
                }}
                className={classes.protocol}
                key={index}>
                <Grid item container direction="row" alignItems="center" xs={6}>
                  <Grid item xs={1}>
                    <DescriptionOutlinedIcon
                      style={
                        row.active === true
                          ? {
                              color: colors.primary.main,
                              ...commonStyles.iconMedium
                            }
                          : {
                              color: colors.grey[400],
                              ...commonStyles.iconMedium
                            }
                      }
                    />
                  </Grid>

                  <Grid item xs={10}>
                    <Typography
                      variant={row.active === true ? 'body1' : 'subtitle1'}
                      style={{ fontWeight: 'bold' }}>
                      <Link
                        className={classes.rowHover}
                        style={commonStyles.linkStyles}
                        to={`/protocols/details/${row.id}`}>
                        {row.name}
                      </Link>
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      style={paddingGenerator(['pt-9'])}>
                      {trimString(row.description)}
                    </Typography>
                  </Grid>
                </Grid>

                <ChipsWrapper tags={row.tags} len={1} width={3} />

                <Grid item container alignItems="center" xs={2}>
                  <Typography variant="body1">
                    {toShortFormat(row.updatedDate.toDate())}
                  </Typography>
                </Grid>
                <Grid item container alignItems="center" xs={1}>
                  <IconMenu
                    icon={<MoreHoriz style={{ color: colors.common.black }} />}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center'
                    }}
                    menuItems={[
                      { label: 'Update' },
                      ...(row.active
                        ? [
                            {
                              label: 'Decommission',
                              style: { color: colors.error.main }
                            }
                          ]
                        : [])
                    ]}
                    data={row}
                    handleMenuItemClick={handleMenuItemClick}
                  />
                </Grid>
              </Grid>
              <Divider />
            </div>
          ))
        : ''}
    </div>
  );
}

ProtocolsList.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired
};
