import React, { useState } from 'react';
import { makeStyles, Paper, Backdrop } from '@material-ui/core';
import { commonStyles } from '../../theme/commonStyles';
import { colors } from '../../theme/colors';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: colors.common.white
  }
}));

export default function PreviewImage({ src, alt }) {
  const [enlarged, setEnlarged] = useState(false);
  const classes = useStyles();

  return enlarged === true ? (
    <Backdrop
      className={classes.backdrop}
      open={enlarged}
      onClick={() => setEnlarged(false)}>
      <Paper style={{ padding: '10px', borderRadius: '4px' }}>
        <img style={{ maxHeight: '90vh', width: 'auto' }} src={src} alt={alt} />
      </Paper>
    </Backdrop>
  ) : (
    <img
      style={commonStyles.attachmentImage}
      onClick={() => setEnlarged(true)}
      src={src}
      alt={alt}
    />
  );
}
