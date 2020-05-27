import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import CustomTabs from '../../components/CustomTabs';
import { paddingGenerator, marginGenerator } from '../../theme/utils';
import ProtocolsTable from './components/ProtocolsList';
import { makeStyles, FormControl, InputBase, Button } from '@material-ui/core';
import { colors } from '../../theme/colors';
import { fetchAllProtocols, updateProtocol } from '../../operations/protocol';
import { Link, useHistory } from 'react-router-dom';
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

const handleChange = () => {
  console.log('change');
};

const NewProtocol = () => {
  const classes = useStyles();
  return (
    <FormControl className={classes.form}>
      {/*<InputBase*/}
      {/*  style={marginGenerator(['mr-8'])}*/}
      {/*  onChange={handleChange}*/}
      {/*  className={classes.searchBar}*/}
      {/*  placeholder="Search"*/}
      {/*/>*/}
      <Link style={{ textDecoration: 'none' }} to="/protocols/details/new">
        <Button
          size="small"
          color="primary"
          disableElevation
          onClick={evt => null}
          className={classes.searchButton}
          variant="contained">
          New Protocol
        </Button>
      </Link>
    </FormControl>
  );
};

const Protocols = () => {
  const [loading, setLoading] = useState(true);
  const [allProtocols, setProtocolList] = useState([]);
  const [activeProtocols, setActiveList] = useState([]);
  const history = useHistory();

  const handleMenuItemClick = async (item, row) => {
    if (item.label === 'Update') {
      history.push(`/protocols/details/${row.id}`);
    }
    if (item.label === 'Decommission') {
      setLoading(true);
      await updateProtocol({ protocolId: row.id, data: { active: false } });
      await fetchProtocolList();
      setLoading(false);
    }
  };

  const fetchProtocolList = async () => {
    const result = await fetchAllProtocols();
    const activeList = result.filter(item => item.active);
    setProtocolList(result);
    setActiveList(activeList);
  };

  useEffect(() => {
    async function fetchData() {
      await fetchProtocolList();
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <Layout
      contentStyles={{ ...paddingGenerator(['pl-90', 'pr-90', 'pt-112']) }}>
      <div>
        <CustomTabs
          sideBox={<NewProtocol />}
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
                  <ProtocolsTable
                    handleMenuItemClick={handleMenuItemClick}
                    columns={columns}
                    rows={allProtocols}
                  />
                </>
              )
            },
            {
              label: 'Active',
              children: (
                <>
                  <ProtocolsTable
                    handleMenuItemClick={handleMenuItemClick}
                    columns={columns}
                    rows={activeProtocols}
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
    label: 'Protocol',
    size: 6
  },
  {
    label: 'Tags',
    size: 3
  },
  {
    label: 'Last Updated',
    size: 2
  },
  {
    label: '',
    size: 1
  }
];

export default Protocols;
