import React, { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../TabPanel';
import PropTypes from 'prop-types';

import { marginGenerator } from '../../theme/utils';

const useStyles = makeStyles(theme => ({
  tabAppbar: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.palette.common.white,
    borderBottom: 'none',
    position: 'fixed',
    left: 0
  },
  tabStyles: {
    color: theme.palette.grey[400]
  },

  sideBox: {
    height: '100%'
  }
}));

export default function CustomTabs({
  tabs,
  activeIndex,
  styleOverrides,
  sideBox
}) {
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    setValue(activeIndex);
  }, [activeIndex]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar
        style={styleOverrides}
        className={classes.tabAppbar}
        elevation={0}>
        <div style={{ flexGrow: 1 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary">
            {tabs.length &&
              tabs.map((tab, tabIndex) => (
                <Tab
                  label={tab.label}
                  id={`tab-${tabIndex}`}
                  key={tabIndex}
                  className={classes.tabStyles}
                  color={'primary'}
                />
              ))}
          </Tabs>
        </div>
        <div style={marginGenerator(['mr-90'])} className={classes.sideBox}>
          {sideBox}
        </div>
      </AppBar>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChange}>
        {tabs.length &&
          tabs.map((tab, tabIndex) => (
            <TabPanel
              value={value}
              index={tabIndex}
              dir={theme.direction}
              key={tabIndex}>
              {tab.children}
            </TabPanel>
          ))}
      </SwipeableViews>
    </>
  );
}

CustomTabs.defaultProps = {
  activeIndex: 0
};

CustomTabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  activeIndex: PropTypes.number,
  sideBox: PropTypes.node
};
