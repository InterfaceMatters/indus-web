import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import CustomTabs from '../../components/CustomTabs';
import { paddingGenerator, marginGenerator } from '../../theme/utils';
import GrievanceList from './components/GrievanceList';
import { colors } from '../../theme/colors';
import CustomSelect from '../../components/CustomSelect';
import { FormControl } from '@material-ui/core';
import { fetchAllGrievance, updateGrievance } from '../../operations/grievance';
import Loader from '../../components/Loader';


// eslint-disable-next-line no-unused-vars
const GrievanceSelects = () => {
  const [selectState, setSelectState] = useState({});

  const handleChange = name => e => {
    setSelectState({ ...selectState, [name]: e.target.value });
  };

  return (
    <>
      <FormControl style={{ minWidth: '100px', ...marginGenerator(['mr-10']) }}>
        <CustomSelect
          styleOverrides={{
            width: '100%'
          }}
          selectOverrides={{ backgroundColor: colors.common.white }}
          handleChange={handleChange('day')}
          val={'Today'}
          options={['Today', 'Yesterday', 'Day Before Yesterday']}
        />
      </FormControl>
      <FormControl style={{ minWidth: '100px' }}>
        <CustomSelect
          styleOverrides={{
            width: '100%'
          }}
          selectOverrides={{ backgroundColor: colors.common.white }}
          handleChange={handleChange('grievanceType')}
          val={'Any Grievance Type'}
          options={['Any Grievance Type', 'A', 'B']}
        />
      </FormControl>
    </>
  );
};

const Grievance = () => {
  const [loading, setLoading] = useState(true);
  const [grievanceList, setGrievances] = useState([]);
  const [unreadList, setUnreadGrievances] = useState([]);
  const [notedList, setNotedGrievances] = useState([]);

  const fetchGrievanceList = async () => {
    const result = await fetchAllGrievance();
    const unreadList = result.filter(item => !item.noted);
    const notedList = result.filter(item => item.noted);
    setGrievances(result);
    setUnreadGrievances(unreadList);
    setNotedGrievances(notedList);
  };

  useEffect(() => {
    async function fetchData() {
      await fetchGrievanceList();
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleMarkAsNoted = async id => {
    setLoading(true);
    await updateGrievance(id);
    await fetchGrievanceList();
    setLoading(false);
  };

  if (loading) return <Loader />;

  return (
    <Layout
      contentStyles={{ ...paddingGenerator(['pl-90', 'pr-90', 'pt-112']) }}>
      <div>
        <CustomTabs
          // sideBox={<GrievanceSelects />}
          styleOverrides={{
            width: '100%',
            ...marginGenerator(['mt-56']),
            ...paddingGenerator(['pl-90']),
            boxShadow: 'inset 0 -1px 0 0 #EEEEEE, 0 0 2px 0 rgba(0,0,0,0.1)'
          }}
          activeIndex={0}
          tabs={[
            {
              label: 'All',
              children: (
                <>
                  <GrievanceList
                    handleMarkAsNoted={handleMarkAsNoted}
                    columns={columns}
                    rows={grievanceList}
                    type={'all'}
                  />
                </>
              )
            },
            {
              label: 'Unread',
              children: (
                <>
                  <GrievanceList
                    columns={columns}
                    handleMarkAsNoted={handleMarkAsNoted}
                    rows={unreadList}
                    type={'unread'}
                  />
                </>
              )
            },
            {
              label: 'Noted',
              children: (
                <>
                  <GrievanceList
                    columns={columns}
                    handleMarkAsNoted={handleMarkAsNoted}
                    rows={notedList}
                    type={'noted'}
                  />
                </>
              )
            }
          ]}
        />
      </div>
    </Layout>
  );
};

const columns = [
  {
    label: 'Grievance',
    size: 5
  },
  {
    label: 'Type',
    size: 3
  },
  {
    label: 'Shared By',
    size: 2
  },
  {
    label: 'Posted',
    size: 2
  },
  {
    label: '',
    size: 2
  }
];

export default Grievance;
