import * as React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { colors } from '../../theme/colors';
import { Popover } from '@material-ui/core';
import PropTypes from 'prop-types';

function MenuWrapper({
  anchorEl,
  anchorOrigin,
  transformOrigin,
  handleClose,
  menuItems,
  handleMenuItemClick
}) {
  return (
    <Popover
      id="menu"
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={evt => handleClose(evt)}>
      {menuItems &&
        menuItems.map((item, index) => (
          <MenuItem
            key={index}
            style={{
              ...(index !== menuItems.length - 1
                ? { borderBottom: `1px solid ${colors.grey[200]}` }
                : null),
              ...(item.style ? item.style : null)
            }}
            onClick={evt => {
              evt.stopPropagation();
              handleMenuItemClick(item);
            }}>
            {item.label || item}
          </MenuItem>
        ))}
    </Popover>
  );
}

MenuWrapper.propTypes = {
  anchorEl: PropTypes.instanceOf(Element).isRequired,
  handleClose: PropTypes.func.isRequired,
  handleMenuItemClick: PropTypes.func.isRequired,
  menuItems: PropTypes.array.isRequired
};

export default MenuWrapper;
