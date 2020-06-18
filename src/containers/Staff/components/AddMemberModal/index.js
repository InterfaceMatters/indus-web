import React, { useState, useEffect } from 'react';
import {
  DialogTitle,
  Divider,
  Typography,
  FormControl,
  InputBase,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';
import CustomSelect from '../../../../components/CustomSelect';
import { marginGenerator, paddingGenerator } from '../../../../theme/utils';
import PropTypes from 'prop-types';
import CustomAutoComplete from '../../../../components/CustomAutoComplete';
import TextField from '@material-ui/core/TextField';
import { ROLE_ID } from '../../../../operations/constants';
import { getTimeFromSecondsIn24HourFormat } from '../../../../utils';
import { GenericErrorForm } from '../../../../operations/utils';

function AddMemberModal({
  open,
  handleClose,
  staffData,
  handleAddNewMember,
  handleUpdateMember
}) {
  const [currentData, setCurrentData] = useState({
    entryTime: '09:30',
    exitTime: '17:30',
    countryCode: '+91'
  });

  const healthOptions = [
    { name: 'Healthy', id: 'Healthy' },
    { name: 'Sick', id: 'Sick' },
    { name: 'Tested +ve', id: 'TestedPositive' }
  ];

  const departmentOptions = [
    'None',
    'Production Line',
    'Management',
    'Security'
  ];

  useEffect(() => {
    if (staffData) {
      setCurrentData({
        name: staffData.name,
        gender: staffData.gender,
        countryCode: staffData.phoneNumber.slice(0, 3),
        phoneNumber: staffData.phoneNumber.slice(3),
        department: staffData.department,
        entryTime: staffData.entryTime
          ? getTimeFromSecondsIn24HourFormat(staffData.entryTime)
          : null,
        exitTime: staffData.exitTime
          ? getTimeFromSecondsIn24HourFormat(staffData.exitTime)
          : null,
        healthStatus: staffData.healthStatus,
        memberType: staffData.memberType,
        roleId: staffData.roleId,
        dob: staffData.dob
          ? new Date(staffData.dob.seconds * 1000).toISOString().slice(0, 10)
          : new Date(),
        uid: staffData.id
      });
    } else return;
    return () => {
      setCurrentData({});
    };
  }, [staffData]);

  let regEx = {
    phoneNumber: /^[0-9\b]+$/
  };

  const handleChange = name => (e, autoCompleteValue = '') => {
    if (name === 'department') {
      setCurrentData({ ...currentData, [name]: autoCompleteValue });
      return;
    }
    if (name === 'phoneNumber') {
      let value = e.target.value;
      if (value === '' || regEx.phoneNumber.test(value))
        setCurrentData({ ...currentData, [name]: e.target.value });
      return;
    }
    setCurrentData({ ...currentData, [name]: e.target.value });
  };

  const memberTypeOptions = ['External', 'Internal'];
  const roleOptions = [
    { name: 'Employee', id: ROLE_ID.EMPLOYEE },
    { name: 'Security Personnel', id: ROLE_ID.SECURITY }
  ];

  const prepareDataForUpdate = () => {
    return {
      ...(staffData.name !== currentData.name
        ? { name: currentData.name }
        : null),
      ...(staffData.dob !== currentData.dob ? { dob: currentData.dob } : null),
      ...(staffData.gender !== currentData.gender
        ? { gender: currentData.gender }
        : null),
      ...(staffData.phoneNumber !== currentData.phoneNumber
        ? {
            phoneNumber: `${currentData.countryCode}${currentData.phoneNumber}`
          }
        : null),
      ...(staffData.department !== currentData.department
        ? { department: currentData.department }
        : null),
      ...(staffData.entryTime !== currentData.entryTime
        ? { entryTime: currentData.entryTime }
        : null),
      ...(staffData.exitTime !== currentData.exitTime
        ? { exitTime: currentData.exitTime }
        : null),
      ...(staffData.healthStatus !== currentData.healthStatus
        ? { healthStatus: currentData.healthStatus }
        : null),
      ...(staffData.memberType !== currentData.memberType
        ? { memberType: currentData.memberType }
        : null),
      ...(staffData.roleId !== currentData.roleId
        ? { roleId: currentData.roleId }
        : null)
    };
  };

  return (
    <Dialog
      aria-labelledby="update-details-modal"
      aria-describedby="update-details-modal"
      open={open}
      onClose={() => {
        handleClose();
      }}>
      <DialogTitle>
        <Typography variant="body1">
          {staffData === null ? 'Add Member' : 'Update Member'}
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent
        style={{ ...paddingGenerator(['pt-12']), overflowX: 'hidden' }}>
        <Grid container>
          <FormControl style={{ width: '100%' }}>
            <Typography variant="subtitle2">Name *</Typography>
            <InputBase
              id="name"
              style={marginGenerator(['mt-12'])}
              value={currentData.name || ''}
              onChange={handleChange('name')}
            />
          </FormControl>
        </Grid>

        <Grid container style={marginGenerator(['mt-27'])}>
          <FormControl style={{ width: '100%' }}>
            <Typography variant="subtitle2">Health Status *</Typography>
            <CustomSelect
              styleOverrides={{ width: '100%' }}
              val={currentData.healthStatus || ''}
              handleChange={handleChange('healthStatus')}
              options={healthOptions}
            />
          </FormControl>
        </Grid>

        <Grid container spacing={2} style={marginGenerator(['mt-23'])}>
          <Grid item xs={6}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <Typography variant="subtitle2">Department</Typography>
              <CustomAutoComplete
                value={currentData.department || 'None'}
                handleChange={handleChange('department')}
                options={departmentOptions}
              />
            </FormControl>
          </Grid>
          <Grid container item xs={6}>
            <Typography variant="subtitle2">Phone Number *</Typography>
            <Grid container direction="row">
              <Grid item xs={4}>
                <FormControl variant="outlined" style={{ width: '100%' }}>
                  <InputBase
                    id="countryCode"
                    style={marginGenerator(['mt-12'])}
                    value={currentData.countryCode || ''}
                    disabled={true}
                    inputProps={{
                      maxLength: 3
                    }}
                    onChange={handleChange('countryCode')}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl variant="outlined" style={{ width: '100%' }}>
                  <InputBase
                    id="phone"
                    type="tel"
                    style={marginGenerator(['mt-12'])}
                    inputProps={{
                      maxLength: 10
                    }}
                    value={currentData.phoneNumber || ''}
                    onChange={handleChange('phoneNumber')}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={marginGenerator(['mt-27'])}>
          <Grid item xs={5}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <Typography variant="subtitle2">Gender *</Typography>
              <CustomSelect
                styleOverrides={{
                  width: '100%'
                }}
                val={currentData.gender || ''}
                small={true}
                handleChange={handleChange('gender')}
                options={['Male', 'Female', 'Other']}
              />
            </FormControl>
          </Grid>

          <Grid container item xs={7}>
            <Typography variant="subtitle2">Access Timings *</Typography>
            <Grid container direction="row">
              <Grid item container xs={5}>
                <FormControl>
                  <TextField
                    id="entry-time"
                    type="time"
                    name={'entryTime'}
                    value={currentData.entryTime}
                    inputProps={{
                      step: 300
                    }}
                    onChange={handleChange('entryTime')}
                  />
                </FormControl>
              </Grid>

              <Grid item container xs={2}>
                <Typography
                  style={{
                    alignSelf: 'center',
                    ...marginGenerator(['mt-12', 'ml-10'])
                  }}
                  variant="subtitle2">
                  to
                </Typography>
              </Grid>

              <Grid item container xs={5}>
                <FormControl>
                  <TextField
                    id="exit-time"
                    type="time"
                    value={currentData.exitTime}
                    name={'exitTime'}
                    inputProps={{
                      step: 300
                    }}
                    onChange={handleChange('exitTime')}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={marginGenerator(['mt-23'])}>
          <Grid container item xs={6}>
            <FormControl>
              <Typography variant="subtitle2">Date of birth *</Typography>
              <InputBase
                style={marginGenerator(['mt-12'])}
                type="date"
                value={currentData.dob}
                onChange={handleChange('dob')}
              />
            </FormControl>
          </Grid>
          <Grid container item xs={6}>
            <FormControl style={{ width: '100%' }}>
              <Typography variant="subtitle2">Member type *</Typography>
              <CustomSelect
                options={memberTypeOptions}
                handleChange={handleChange('memberType')}
                val={currentData.memberType || ''}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={marginGenerator(['mt-23'])}>
          <Grid container item xs={6}>
            <FormControl style={{ width: '100%' }}>
              <Typography variant="subtitle2">Employee Role *</Typography>
              <CustomSelect
                options={roleOptions}
                handleChange={handleChange('roleId')}
                val={currentData.roleId || ''}
              />
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions style={paddingGenerator(['pl-32', 'pr-32', 'pb-18'])}>
        <Grid container>
          <Grid container item xs={6} justify="flex-start">
            <Button onClick={handleClose}>Discard</Button>
          </Grid>
          <Grid container item xs={6} justify="flex-end">
            <Button
              disableElevation
              color="primary"
              variant="contained"
              onClick={() => {
                if (
                  !currentData.dob ||
                  !currentData.entryTime ||
                  !currentData.exitTime ||
                  !currentData.gender ||
                  !currentData.healthStatus ||
                  !currentData.memberType ||
                  !currentData.name ||
                  !currentData.phoneNumber ||
                  !currentData.roleId
                ) {
                  GenericErrorForm();
                } else {
                  if (currentData && currentData.uid) {
                    const data = prepareDataForUpdate();
                    handleUpdateMember(currentData.uid, data);
                  } else {
                    handleAddNewMember({
                      ...currentData,
                      phoneNumber: `${currentData.countryCode}${currentData.phoneNumber}`
                    });
                  }
                  handleClose();
                }
              }}>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

AddMemberModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default AddMemberModal;
