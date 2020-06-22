import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import { Paths } from '../../routes/routePaths';
import { withRouter } from 'react-router-dom';

import MenuWrapper from '../MenuWrapper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import { Button } from '@material-ui/core';

import { marginGenerator } from '../../theme/utils';
import { colors } from '../../theme/colors';
import { NavLink, useHistory } from 'react-router-dom';
import { signOut } from '../../operations/onBoarding';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    boxShadow: `inset 0 -20px 0 0 ${colors.grey[200]}, 0 0 2px 0 rgba(0,0,0,0.1)`
  },
  logoContainer: {
    height: '100%',
    width: '200px',
    boxShadow: `inset -1px -1px 0 0 ${colors.grey[200]}`
  },
  logo: {
    ...marginGenerator(['ml-90', 'mr-65', 'mt-18', 'mb-21']),
    fontWeight: 'bold',
    fontSize: '16px'
  },
  primaryMenu: {
    display: 'flex',
    marginLeft: '5px',
    height: '100%'
  },
  link: {
    textDecoration: 'none',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: theme.palette.grey[300],
    marginLeft: '45px'
  },
  active: {
    borderBottom: `solid 2px ${theme.palette.success.main}`,
    color: theme.palette.common.black
  }
}));

const primaryMenuItems = [
  {
    label: 'Dashboard',
    route: Paths.Dashboard
  },
  {
    label: 'Staff',
    route: Paths.Staff
  },
  {
    label: 'Protocols',
    route: Paths.Protocols
  },
  {
    label: 'Grievance Reports',
    route: Paths.Grievance
  }
];

const menuItems = ['Logout'];

function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar
        style={{ display: 'flex', flexDirection: 'row' }}
        position="fixed"
        color="default"
        elevation={0}>
        <Toolbar style={{ flexGrow: 1 }} disableGutters variant="dense">
          <div className={classes.logoContainer}>
            <NavLink
              to="/dashboard"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer'
              }}>
              <div className={classes.logo}>
                <span style={{ color: colors.primary.main }}>In</span>
                <span>dus</span>
              </div>
            </NavLink>
          </div>

          <div className={classes.primaryMenu}>
            {primaryMenuItems &&
              primaryMenuItems.map((item, index) => (
                <NavLink
                  activeClassName={classes.active}
                  exact
                  className={classes.link}
                  key={index}
                  to={item.route}>
                  {item.label}
                </NavLink>
              ))}
          </div>
        </Toolbar>
        <Button
          startIcon={<AcUnitIcon />}
          style={{
            ...marginGenerator(['mr-90']),
            backgroundColor: 'transparent'
          }}
          endIcon={<ArrowDropDownIcon />}
          onClick={evt => {
            setAnchorEl(evt.target);
          }}>
          Acme Incorporated
        </Button>
      </AppBar>
      {anchorEl && (
        <MenuWrapper
          id={'nav-menu'}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 30,
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          handleClose={evt => {
            evt.stopPropagation();
            setAnchorEl(null);
          }}
          menuItems={menuItems}
          handleMenuItemClick={async item => {
            setAnchorEl(null);
            if (item === 'Logout') {
              await signOut();
              history.replace(Paths.Login);
            }
          }}
        />
      )}
    </div>
  );
}

export default withRouter(Navbar);
