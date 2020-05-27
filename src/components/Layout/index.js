import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Navbar from '../Navbar';

const useStyles = makeStyles(theme => ({
  content: {
    backgroundColor: theme.palette.background.default,
    minHeight: 'calc(100vh)',
    width: '100%'
  }
}));

function Layout({ children, contentStyles }) {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <div className={classes.content} style={contentStyles}>
        {children}
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.object
};

export default Layout;
