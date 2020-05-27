import React, { useEffect, useState } from 'react';
import Layout from '../../../../components/Layout';
import { paddingGenerator, marginGenerator } from '../../../../theme/utils';
import { Paper, Typography, Divider, Grid, Button } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { returnTime, returnDay } from '../../../../utils';
import {
  fetchGrievanceDetails,
  updateGrievance
} from '../../../../operations/grievance';
import ChipsWrapper from '../../../../components/ChipsWrapper';
import { commonStyles } from '../../../../theme/commonStyles';
import { Paths } from '../../../../routes/routePaths';
import Loader from '../../../../components/Loader';
import PreviewImage from '../../../../components/PreviewImage';
import { SettingsInputComponent } from '@material-ui/icons';

const GrievanceDetails = () => {
  const [loading, setLoading] = useState(true);
  const [selectedGrievance, setSelectedGrievance] = useState({});
  const { id } = useParams();

  const fetchDetails = async id => {
    const result = await fetchGrievanceDetails(id);
    setSelectedGrievance(result);
    setLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      await fetchDetails(id);
    }
    fetchData();
  }, [id]);

  const handleMarkAsNoted = async id => {
    setLoading(true);
    await updateGrievance(id);
    await fetchDetails(id);
    setLoading(false);
  };

  if (loading) return <Loader />;

  return (
    <Layout contentStyles={paddingGenerator(['pr-250', 'pl-250', 'pt-112'])}>
      <Paper
        style={{
          ...paddingGenerator(['pl-80', 'pr-80', 'pt-40', 'pb-40']),
          boxShadow: 'inset 0 -1px 0 0 #EEEEEE, 0 0 2px 0 rgba(0,0,0,0.1)'
        }}>
        <Grid container>
          <Grid container direction="column" item xs={9} justify="flex-start">
            <Typography style={{ fontSize: '20px' }} variant="h4">
              {selectedGrievance.title}
            </Typography>
            <Typography variant="subtitle1" style={{ fontSize: '14px' }}>
              <Link style={commonStyles.linkStyles} to={Paths.Grievance}>
                Grievance Report
              </Link>{' '}
              > Details
            </Typography>
          </Grid>
          <Grid container direction="row" item xs={3} justify="flex-end">
            <Button
              variant={selectedGrievance.noted ? 'contained' : 'outlined'}
              size="small"
              disableElevation
              onClick={() =>
                selectedGrievance.noted
                  ? null
                  : handleMarkAsNoted(selectedGrievance.id)
              }
              color={selectedGrievance.noted === true ? 'primary' : 'default'}>
              {selectedGrievance.noted === true ? 'Noted' : 'Marked as noted'}
            </Button>
          </Grid>
        </Grid>

        <Typography
          variant="subtitle2"
          align="justify"
          style={{ ...paddingGenerator(['pt-12']), fontSize: '16px' }}>
          {selectedGrievance.description}
        </Typography>
        <div style={{ ...marginGenerator(['mt-31', 'mb-24']) }}>
          <ChipsWrapper tags={selectedGrievance.tags} len={3} />
        </div>
        <Divider />
        <Grid style={marginGenerator(['mt-20', 'mb-20'])} container>
          <Grid item direction="row" container xs={4}>
            <Typography
              style={{
                display: 'inline',
                fontSize: '15px',
                ...marginGenerator(['mr-5'])
              }}
              variant="subtitle1">
              Shared By
            </Typography>
            <Typography
              style={{ display: 'inline', fontSize: '15px' }}
              variant="body1">
              {selectedGrievance.createdByName}
            </Typography>
          </Grid>
          <Grid item container xs={4}>
            <Typography
              style={{
                display: 'inline',
                fontSize: '15px',
                ...marginGenerator(['mr-5'])
              }}
              variant="subtitle1">
              Shared on
            </Typography>
            <Typography
              style={{
                display: 'inline',
                fontSize: '15px',
                ...marginGenerator(['mr-5'])
              }}
              variant="body1">
              {returnDay(selectedGrievance.createdDate)}
            </Typography>
            <Typography
              style={{
                display: 'inline',
                fontSize: '15px',
                ...marginGenerator(['mr-5'])
              }}
              variant="subtitle1">
              at
            </Typography>
            <Typography
              style={{
                display: 'inline',
                fontSize: '15px',
                ...marginGenerator(['mr-5'])
              }}
              variant="body1">
              {returnTime(selectedGrievance.createdDate)}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        {selectedGrievance.fileUrls && selectedGrievance.fileUrls.length ? (
          <Grid container direction="row" style={marginGenerator(['mt-33'])}>
            <Typography variant="body1">Attachments</Typography>
            <Grid container>
              {selectedGrievance.fileUrls.map((attachment, index) => (
                <Grid
                  key={index}
                  item
                  style={{
                    ...marginGenerator(['mt-20', 'mr-8']),
                  }}>
                  <PreviewImage src={attachment} alt={attachment} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ) : null}
      </Paper>
    </Layout>
  );
};

export default GrievanceDetails;
