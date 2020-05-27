import React, { useState, useEffect } from 'react';
import { colors } from '../../../../../theme/colors';
import EditableText from '../../../../../components/EditableText';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Grid
} from '@material-ui/core';
import { paddingGenerator, marginGenerator } from '../../../../../theme/utils';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ImageIcon from '@material-ui/icons/Image';
import CancelIcon from '@material-ui/icons/Cancel';
import { commonStyles } from '../../../../../theme/commonStyles';
import PreviewImage from '../../../../../components/PreviewImage';

const EditableTextField = EditableText(Typography, TextField);

const AdditionalInfo = ({ item, handleDiscardClick, handleSaveClick }) => {
  const [additionalItem, setAdditionalItem] = useState(item);
  const [file, setFile] = useState(null);
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    if (additionalItem.description !== '') {
      setEdit(false);
    }
  }, []);

  const handleFile = e => {
    setFile(e.target.files[0]);
  };

  return (
    <Paper
      elevation={0}
      style={{
        boxShadow: `0 0 2px 0 rgba(0, 0, 0, 0.1), inset 0 -1px 0 0 ${colors.grey[200]}`,
        ...marginGenerator(['mt-16', 'mb-16']),
        ...paddingGenerator(['pt-40', 'pb-16', 'pl-80', 'pr-80'])
      }}>
      <div>
        <EditableTextField
          style={{
            ...marginGenerator(['mb-24'])
          }}
          inputStyles={{
            padding: 0,
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '14px',
            width: '100%',
          }}
          variant="subtitle2"
          onChange={val => {
            setAdditionalItem({ ...additionalItem, description: val });
            setEdit(true);
          }}
          placeholder="Enter Additional Info"
          value={additionalItem.description}
          rows={edit ? 4 : 1}
        />
      </div>
      {edit === true && file === null ? (
        <div style={{ ...marginGenerator(['mt-10']) }}>
          <input
            style={{ display: 'none' }}
            id="contained-button-file"
            onChange={handleFile}
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button
              startIcon={<AttachFileIcon style={commonStyles.iconSmall} />}
              color="primary"
              variant="text"
              component={'span'}
              style={{
                backgroundColor: 'transparent'
              }}>
              Upload Files
            </Button>
          </label>
        </div>
      ) : null}
      {additionalItem.fileUrls && additionalItem.fileUrls.length ? (
        <Grid
          container
          direction="row"
          style={marginGenerator(['mt-16', 'mb-16'])}>
          <Typography variant="body1">Attachments</Typography>
          <Grid container>
            {additionalItem.fileUrls.map((attachment, index) => (
              <Grid key={index} item style={marginGenerator(['mt-20', 'mr-8'])}>
                <PreviewImage src={attachment} alt={attachment} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      ) : null}
      {file && (
        <div
          style={{
            borderRadius: '2px',
            ...marginGenerator(['mb-20'])
          }}>
          <div
            style={{
              border: `solid 1px ${colors.grey[200]}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '250px',
              maxWidth: '400px',
              flexDirection: 'row',
              ...paddingGenerator(['pt-3', 'pb-3', 'pl-5', 'pr-5'])
            }}>
            <ImageIcon style={{ color: colors.primary.main }} />
            <Typography
              variant="subtitle2"
              style={{ fontSize: '12px', ...marginGenerator(['ml-8']) }}>
              {file.name}
            </Typography>
            <CancelIcon
              style={{
                color: colors.grey[200],
                cursor: 'pointer',
                ...marginGenerator(['ml-3'])
              }}
              onClick={() => setFile(null)}
            />
          </div>
        </div>
      )}

      {edit === true && (
        <>
          <Divider style={marginGenerator(['mt-16'])} />
          <div style={{ width: '100%', height: '65px' }}>
            <Grid
              container
              justify="flex-end"
              alignItems="center"
              style={{
                width: '100%',
                ...paddingGenerator(['pt-16', 'pr-24'])
              }}>
              <Button
                onClick={() => {
                  handleDiscardClick(additionalItem);
                  setAdditionalItem(item);
                  setEdit(false);
                }}
                disableElevation
                style={marginGenerator(['mr-12'])}>
                Discard
              </Button>
              <Button
                disabled={additionalItem.description === ''}
                disableElevation
                onClick={() => {
                  handleSaveClick({
                    ...(additionalItem.id
                      ? { stepId: additionalItem.id }
                      : null),
                    description: additionalItem.description,
                    file
                  });
                  setEdit(false);
                }}
                color="primary"
                variant="contained">
                Save Changes
              </Button>
            </Grid>
          </div>
        </>
      )}
    </Paper>
  );
};

export default AdditionalInfo;
