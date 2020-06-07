import React, { useEffect, useState } from 'react';
import { marginGenerator, paddingGenerator } from '../../../theme/utils';
import Layout from '../../../components/Layout';
import { useParams } from 'react-router-dom';
import { fetchLogs } from '../../../operations/staff';
import Loader from '../../../components/Loader';
import LogTable from './components/LogTable';

const Logs = () => {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState({});
  const { id } = useParams();

  const fetchDetails = async id => {
    const result = await fetchLogs(id);
    setLogs(result);
    setLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      await fetchDetails(id);
    }
    fetchData();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <Layout contentStyles={paddingGenerator(['pt-12', 'pr-250', 'pl-250'])}>
      <LogTable
        styleOverrides={marginGenerator(['mt-152'])}
        columns={columns}
        rows={logs}
      />
    </Layout>
  );
};

const columns = [
  {
    label: 'Date'
  },
  {
    label: 'Temperature'
  },
  {
    label: 'Mask Status'
  },
  {
    label: 'Access  '
  }
];

export default Logs;
