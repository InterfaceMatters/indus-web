import React, { useState } from 'react';
import { paddingGenerator, marginGenerator } from '../../../../../theme/utils';
import {
  Paper,
  Grid,
  Typography,
  IconButton,
  Chip,
  Divider,
  Button,
  InputBase,
  TextField
} from '@material-ui/core';
import { DescriptionOutlined } from '@material-ui/icons';
import commonStyles from '../../../../../theme/commonStyles';
import { colors } from '../../../../../theme/colors';
import EditableText from '../../../../../components/EditableText';
import AddIcon from '@material-ui/icons/Add';
import CustomAutoComplete from '../../../../../components/CustomAutoComplete';
import { toShortFormat } from '../../../../../utils/index';
import { useHistory } from 'react-router-dom';

const EditableTypography = EditableText(Typography, InputBase);
const EditableTextField = EditableText(Typography, TextField);

const ProtocolDetailsMain = ({
  protocolDetails,
  handleSaveClick,
  isNew,
  style,
  tagList,
  handleAddNewTag
}) => {
  const commonClasses = commonStyles();
  const [title, setTitle] = useState(protocolDetails.name || '');
  const [description, setDescription] = useState(
    protocolDetails.description || ''
  );
  const [edit, setEdit] = useState(isNew);
  const [tags, setTags] = useState(protocolDetails.tags || []);
  const history = useHistory();

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  if (!isEmpty(protocolDetails)) {
    return (
      <Paper
        style={{
          width: '100%',
          height: 'auto',
          boxShadow: `0 0 2px 0 rgba(0, 0, 0, 0.1), inset 0 -1px 0 0 ${colors.grey[200]}`,
          ...paddingGenerator(['pt-47', 'pl-80', 'pr-80', 'pb-24']),
          ...style
        }}
        elevation={0}>
        <div>
          <div>
            <DescriptionOutlined
              className={commonClasses.iconMedium}
              style={{ color: colors.primary.main }}
            />
          </div>
          <Grid style={marginGenerator(['mt-20'])} container>
            <Grid
              container
              direction="column"
              item
              xs={10}
              justify="flex-start">
              <EditableTypography
                style={{
                  fontSize: '20px',
                  padding: 0,
                  lineHeight: '1.5'
                }}
                inputStyles={{
                  padding: 0,
                  border: 'none',
                  lineHeight: '1.5',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}
                variant="h4"
                onChange={val => {
                  setEdit(true);
                  setTitle(val);
                }}
                placeholder="Enter Protocol Title"
                value={title}
              />

              <Typography
                variant="subtitle1"
                style={{
                  fontSize: '14px',
                  ...paddingGenerator(['pt-8']),
                  display: 'inline'
                }}>
                Protocols > Protocols Details
              </Typography>
            </Grid>
          </Grid>

          <EditableTextField
            style={marginGenerator(['mt-20'])}
            inputStyles={{
              padding: 0,
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '14px',
              width: '100%',
              height: 'auto'
            }}
            variant="subtitle2"
            onChange={val => {
              setDescription(val);
              setEdit(true);
            }}
            placeholder="Enter Description"
            value={description}
            rows={4}
          />

          <div style={marginGenerator(['mt-31', 'mb-24'])}>
            {edit === true ? (
              <CustomAutoComplete
                styleOverrides={{ width: '75%' }}
                options={tagList || []}
                handleAddNewTag={async (e, text) => {
                  if (!tagList.includes(text)) {
                    await handleAddNewTag(text);
                  }
                  setTags([...tags, text]);
                }}
                multiple={true}
                placeholder={'Add tags'}
                value={tags}
                handleChange={(e, val) => {
                  setTags(val);
                  setEdit(true);
                }}
              />
            ) : (
              <>
                {tags.length !== 0 ? (
                  <>
                    {tags.map((tag, index) => (
                      <Chip
                        style={marginGenerator(['mr-9'])}
                        key={index}
                        label={tag}
                      />
                    ))}
                    <IconButton
                      size="small"
                      style={{
                        backgroundColor: colors.grey[200],
                        width: '28px',
                        height: '28px'
                      }}
                      onClick={() => setEdit(true)}>
                      <AddIcon
                        style={{ fontSize: '14px', color: colors.grey[500] }}
                      />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Button
                      variant="text"
                      style={{ backgroundColor: 'transparent' }}
                      color="primary"
                      onClick={e => {
                        setEdit(true);
                      }}
                      startIcon={<AddIcon />}>
                      Add Tags
                    </Button>
                  </>
                )}
              </>
            )}
          </div>

          {edit === false && (
            <>
              <Divider />
              <div style={marginGenerator(['mt-20', 'mb-0'])}>
                <Grid container>
                  <Grid item xs={4}>
                    {protocolDetails.updatedDate && (
                      <>
                        <Typography
                          style={{
                            fontSize: '15px',
                            display: 'inline',
                            ...marginGenerator(['mr-3'])
                          }}
                          variant="subtitle1">
                          Last Updated
                        </Typography>
                        <Typography
                          style={{ fontSize: '15px', display: 'inline' }}
                          variant="body1">
                          {toShortFormat(protocolDetails.updatedDate.toDate())}
                        </Typography>
                      </>
                    )}
                  </Grid>
                </Grid>
              </div>
            </>
          )}
        </div>
        {edit === true && (
          <>
            <Divider />
            <Grid
              container
              justify="flex-end"
              alignItems="center"
              style={{
                width: '100%',
                ...paddingGenerator(['pt-16', 'pb-17', 'pr-24'])
              }}>
              <Button
                onClick={() => {
                  setTitle(!isNew ? protocolDetails.name : '');
                  setDescription(!isNew ? protocolDetails.description : '');
                  setTags(!isNew ? protocolDetails.tags : []);
                  setEdit(false);
                }}
                disableElevation
                style={marginGenerator(['mr-12'])}>
                Discard
              </Button>
              <Button
                disabled={title === '' || description === ''}
                disableElevation
                color="primary"
                onClick={async () => {
                  await handleSaveClick({
                    name: title,
                    description: description,
                    tags: tags
                  });
                  if(isNew) {
                    history.goBack();
                  }
                }}
                variant="contained">
                Save Changes
              </Button>
            </Grid>
          </>
        )}
      </Paper>
    );
  } else return <></>;
};

export default ProtocolDetailsMain;
