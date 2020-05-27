import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import MenuWrapper from '../MenuWrapper';
// import { paddingGenerator } from '../../theme/utils';

const IconMenu = ({
  icon,
  menuItems,
  data,
  handleMenuItemClick,
  anchorOrigin,
  transformOrigin
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <div>
      {icon && (
        <IconButton
          onClick={evt => {
            setAnchorEl(evt.currentTarget);
            evt.stopPropagation();
          }}>
          {icon}
        </IconButton>
      )}
      {anchorEl && (
        <MenuWrapper
          id={'ticket-menu'}
          anchorEl={anchorEl}
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
          handleClose={evt => {
            evt.stopPropagation();
            setAnchorEl(null);
          }}
          menuItems={menuItems}
          handleMenuItemClick={item => {
            handleMenuItemClick(item, data);
            setAnchorEl(null);
          }}
        />
      )}
    </div>
  );
};

export default IconMenu;
