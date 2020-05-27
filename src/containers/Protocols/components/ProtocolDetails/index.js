import React, { useEffect, useState } from 'react';
import Layout from '../../../../components/Layout';
import { paddingGenerator, marginGenerator } from '../../../../theme/utils';
import { Typography, Button } from '@material-ui/core';
import ProtocolDetailsMain from './components/ProtocolDetailsMain';
import { colors } from '../../../../theme/colors';
import AddIcon from '@material-ui/icons/Add';
import AdditionalInfo from './components/AdditionalInfo';
import {
  addNewStep,
  createNewProtocol,
  fetchProtocolDetails,
  updateProtocol,
  updateStep
} from '../../../../operations/protocol';
import { useParams } from 'react-router-dom';
import { addTag, fetchTags } from '../../../../operations/common';
import Loader from '../../../../components/Loader';

const newProtocolHeading = {
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  top: '0',
  left: 0,
  height: '56px',
  backgroundColor: 'white',
  boxShadow: `0 0 2px 0 rgba(0, 0, 0, 0.1), inset 0 -1px 0 0 ${colors.grey[200]}`,
  ...marginGenerator(['mt-56']),
  ...paddingGenerator(['pl-90']),
  zIndex: 99
};

const ProtocolDetails = () => {
  const [loading, setLoading] = useState(true);
  const [protocolDetails, setProtocolDetails] = useState({});
  const [addDetails, setAddDetails] = useState([]);
  const [tagList, setTagList] = useState([]);
  const { id } = useParams();

  let isNew = id === 'new';

  const fetchDetails = async id => {
    const result = await fetchProtocolDetails(id);

    setProtocolDetails(result);

    let details = result.additionalInfo;

    setAddDetails(details);
  };

  const fetchTagList = async () => {
    const { list } = await fetchTags('protocols');
    setTagList(list);
  };

  useEffect(() => {
    async function fetchData() {
      await fetchDetails(id);
      setLoading(false);
    }
    async function fetchTags() {
      await fetchTagList();
    }
    if (isNew === true) {
      setProtocolDetails({
        name: '',
        description: '',
        createdBy: '',
        createdDate: '',
        updatedDate: '',
        tags: [],
        additionalInfo: []
      });
      setLoading(false);
    } else {
      fetchData();
    }
    fetchTags();
  }, [id, isNew]);

  const handleAddNewTag = async tag => {
    await addTag('protocols', tag);
    await fetchTagList();
  };

  const handleDiscardClick = item => {
    if (item.id) {
      setAddDetails(addDetails);
    } else {
      let newDetails = addDetails.filter(detail => detail.id !== undefined);
      setAddDetails(newDetails);
    }
  };

  const handleCreateProtocol = async data => {
    setLoading(true);
    await createNewProtocol(data);
  };

  const handleUpdateProtocol = async data => {
    setLoading(true);
    await updateProtocol({ protocolId: id, data });
    await fetchDetails(id);
    setLoading(false);
  };

  const handleAddNewStep = async ({ description, file }) => {
    setLoading(true);
    await addNewStep({ protocolId: id, description, file });
    await fetchDetails(id);
    setLoading(false);
  };

  const handleUpdateStep = async ({ stepId, description, file }) => {
    setLoading(true);
    await updateStep(stepId, { protocolId: id, description, file });
    await fetchDetails(id);
    setLoading(false);
  };

  if (loading) return <Loader />;

  return (
    <Layout contentStyles={paddingGenerator(['pt-112', 'pr-250', 'pl-250'])}>
      <div style={newProtocolHeading}>
        <Typography variant="h4">
          {isNew ? 'New Protocol' : protocolDetails.name}
        </Typography>
      </div>
      <ProtocolDetailsMain
        tagList={tagList}
        handleAddNewTag={handleAddNewTag}
        isNew={isNew}
        protocolDetails={protocolDetails}
        handleSaveClick={isNew ? handleCreateProtocol : handleUpdateProtocol}
        style={marginGenerator(['mt-56'])}
      />
      <div style={{ width: '100%' }}>
        {addDetails.map(item => (
          <AdditionalInfo
            handleSaveClick={item.id ? handleUpdateStep : handleAddNewStep}
            handleDiscardClick={handleDiscardClick}
            key={item.id || item.tempId.toString()}
            item={item}
          />
        ))}
      </div>
      {!isNew && (
        <Button
          style={{
            backgroundColor: 'transparent',
            ...marginGenerator(['mt-13', 'mb-13'])
          }}
          color="primary"
          variant="text"
          onClick={() => {
            setAddDetails(oldDetails => [
              ...oldDetails,
              {
                tempId: addDetails.length,
                description: '',
                fileUrls: []
              }
            ]);
            setTimeout(() => {
              window.scrollTo(0, document.body.scrollHeight);
            }, 0);
          }}
          startIcon={<AddIcon />}>
          Add additional info and files
        </Button>
      )}
    </Layout>
  );
};

export default ProtocolDetails;
