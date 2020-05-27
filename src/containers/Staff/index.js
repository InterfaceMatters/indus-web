import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { FormControl, Button } from '@material-ui/core';
import { colors } from '../../theme/colors';
import { makeStyles } from '@material-ui/core/styles';
import StaffTable from './components/StaffTable';
import CustomTabs from '../../components/CustomTabs';
import { paddingGenerator, marginGenerator } from '../../theme/utils';
import AddMemberModal from './components/AddMemberModal';
import {
  addEmployee,
  fetchAllEmployees,
  removeEmployee,
  updateEmployeeData
} from '../../operations/staff';
import Loader from '../../components/Loader';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center'
  },
  searchBar: {
    width: '183px',
    height: '28px',
    border: 'none',
    backgroundColor: colors.grey[200]
  },
  searchButton: {
    color: colors.common.white
  }
}));

const AddMember = ({ handleAdd }) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.form}>
      {/*<InputBase*/}
      {/*  style={marginGenerator(['mr-8'])}*/}
      {/*  onChange={handleMemberChange}*/}
      {/*  className={classes.searchBar}*/}
      {/*  placeholder="Search"*/}
      {/*/>*/}
      <Button
        size="small"
        color="primary"
        disableElevation
        onClick={evt => handleAdd()}
        className={classes.searchButton}
        variant="contained">
        Add Member
      </Button>
    </FormControl>
  );
};

const Staff = () => {
  const [loading, setLoading] = useState(true);
  const [staffList, setStaffList] = useState([]);
  const [externalList, setExternalList] = useState([]);
  const [addMemberModal, setModal] = useState(false);
  const [staffData, setStaffData] = useState(null);

  const fetchStaff = async () => {
    const result = await fetchAllEmployees();
    const externalList = result.filter(item => item.memberType === 'External');
    const internalList = result.filter(item => item.memberType === 'Internal');
    setStaffList(internalList);
    setExternalList(externalList);
  };

  useEffect(() => {
    async function fetchData() {
      await fetchStaff();
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleAddMemberPress = () => {
    setStaffData(null);
    setModal(true);
  };

  const handleAddNewMember = async data => {
    setLoading(true);
    await addEmployee({ ...data });
    await fetchStaff();
    setLoading(false);
  };

  const handleUpdateMember = async (uid, data) => {
    setLoading(true);
    await updateEmployeeData(uid, data);
    await fetchStaff();
    setLoading(false);
  };

  const handleRemoveMember = async id => {
    setLoading(true);
    await removeEmployee(id);
    await fetchStaff();
    setLoading(false);
  };

  const handleMenuItemClick = async (item, row) => {
    if (item.label.toLowerCase() === 'update details') {
      setStaffData(row);
      setModal(true);
    } else if (item.label.toLowerCase() === 'remove') {
      await handleRemoveMember(row.id);
    }
  };

  if (loading) return <Loader />;

  return (
    <Layout contentStyles={{ ...paddingGenerator(['pl-90', 'pr-90']) }}>
      <div>
        <CustomTabs
          sideBox={<AddMember handleAdd={handleAddMemberPress} />}
          styleOverrides={{
            width: '100%',
            ...marginGenerator(['mt-56']),
            ...paddingGenerator(['pl-90']),
            boxShadow: 'inset 0 -1px 0 0 #EEEEEE, 0 0 2px 0 rgba(0,0,0,0.1)'
          }}
          activeIndex={0}
          tabs={[
            {
              label: 'Internal',
              children: (
                <>
                  <StaffTable
                    styleOverrides={marginGenerator(['mt-152'])}
                    handleMenuItemClick={handleMenuItemClick}
                    columns={columns}
                    rows={staffList}
                    handleUpdateMember={handleUpdateMember}
                  />
                </>
              )
            },
            {
              label: 'External',
              children: (
                <>
                  <StaffTable
                    styleOverrides={marginGenerator(['mt-152'])}
                    handleMenuItemClick={handleMenuItemClick}
                    columns={columns}
                    rows={externalList}
                    handleUpdateMember={handleUpdateMember}
                  />
                </>
              )
            }
          ]}
        />
      </div>
      {addMemberModal === true ? (
        <AddMemberModal
          staffData={staffData}
          open={addMemberModal}
          handleClose={() => setModal(false)}
          handleAddNewMember={handleAddNewMember}
          handleUpdateMember={handleUpdateMember}
        />
      ) : null}
    </Layout>
  );
};

const columns = [
  {
    label: 'Name'
  },
  {
    label: 'Age, Gender'
  },
  {
    label: 'Phone number'
  },
  {
    label: 'Department'
  },
  {
    label: 'Access Timing'
  },
  {
    label: 'Health Status'
  },
  // {
  //   label: 'Recent Violations'
  // },
  {
    label: 'Access  '
  },
  {
    label: ''
  }
];

export default Staff;
