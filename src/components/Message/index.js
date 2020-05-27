import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Snackbar, makeStyles, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { colors } from '../../theme/colors';

const useStyles = makeStyles(() => ({
  snackbar: {
    minWidth: '100%',
    '& .MuiSnackbarContent-root': {
      minWidth: '65%',
      boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.12)'
    }
  },
  success: {
    '& .MuiSnackbarContent-root': {
      background: colors.primary.main
    }
  },
  error: {
    '& .MuiSnackbarContent-root': {
      background: colors.error.main
    }
  }
}));

const GlobalMessage = props => {
  const { type, content, handleClose, index } = props;

  const classes = useStyles();

  return (
    <Snackbar
      className={`${classes.snackbar} ${classes[type]}`}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      style={index > 0 ? { bottom: index * 80 } : null}
      open={Boolean(content)}
      message={content}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
};

class Message {
  static success(content, index) {
    this.message('success', content, index);
  }
  static warn(content, index) {
    this.message('warn', content, index);
  }
  static error(content, index) {
    this.message('error', content, index);
  }
  static message(type, content, index) {
    const container = document.createElement('div');
    container.classList.add('message-bar-parent');
    document.body.appendChild(container);

    const handleClose = () => {
      unmountComponentAtNode(container);
      container.parentNode.removeChild(container);
    };

    render(
      <GlobalMessage
        type={type}
        handleClose={handleClose}
        content={content}
        index={index}
      />,
      container
    );
    setTimeout(() => {
      if (document.querySelector('.message-bar-parent')) {
        unmountComponentAtNode(container);
        container.parentNode.removeChild(container);
      }
    }, 3000);
  }
}

export default Message;
