import React, { useEffect, useState } from 'react';
import { paddingGenerator, marginGenerator } from '../../theme/utils';
import Layout from '../../components/Layout';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import { colors } from '../../theme/colors';
import DashboardCards from './components/DashboardCards';
import RecentGrievanceReports from './components/RecentGrievanceReports';
import ActiveProposals from './components/ActiveProtocols';
import AreaChartWrapper from '../../components/Charts/AreaChartWrapper';
import {
  fetchRecentGrievances,
  fetchRecentProtocols,
  fetchStats
} from '../../operations/dashboard';
import Loader from '../../components/Loader';

const useStyles = makeStyles(theme => ({
  day: {
    position: 'fixed',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.common.white,
    width: '100%',
    top: '56px',
    boxShadow: 'inset 0 -1px 0 0 #EEEEEE, 0 0 2px 0 rgba(0, 0, 0, 0.1)',
    left: 0,
    zIndex: 99
  }
}));

const data = [
  {
    name: 'M',
    uv: 24,
    pv: 22,
    amt: 2400
  },
  {
    name: 'T',
    uv: 15,
    pv: 32,
    amt: 2210
  },
  {
    name: 'W',
    uv: 22,
    pv: 12,
    amt: 2290
  },
  {
    name: 'T',
    uv: 44,
    pv: 14,
    amt: 2000
  },
  {
    name: 'F',
    uv: 32,
    pv: 31,
    amt: 2181
  },
  {
    name: 'S',
    uv: 22,
    pv: 11,
    amt: 2500
  },
  {
    name: 'S',
    uv: 16,
    pv: 18,
    amt: 2100
  }
];

const chartData = [
  {
    data: data,
    color: '#2196f3',
    dataKeyChart: 'uv',
    dataKeyXAxis: 'name'
  },
  {
    data: data,
    color: colors.primary.main,
    dataKeyChart: 'pv',
    dataKeyXAxis: 'name'
  },
  {
    data: data,
    color: '#ffcc28',
    dataKeyChart: 'uv',
    dataKeyXAxis: 'name'
  }
];

const Dashboard = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [grievanceList, setRecentGrievances] = useState([]);
  const [recentProtocols, setRecentProtocols] = useState([]);
  const [cards, setCardList] = useState([]);

  const fetchStatistics = async () => {
    const result = await fetchStats();
    if (result) {
      setCards(result.data);
    }
  };

  const fetchGrievanceList = async () => {
    const result = await fetchRecentGrievances();
    setRecentGrievances(result);
  };

  const fetchProtocolList = async () => {
    const result = await fetchRecentProtocols();
    setRecentProtocols(result);
  };

  const setCards = data => {
    const cardList = [
      {
        title: 'Staff Attendance',
        subtitle: `Updated Today at ${new Date().toLocaleTimeString()}.`,
        stats: data.attendance || 0,
        border: { borderLeft: `solid 4px #2196f3` }
      },
      {
        title: 'Healthy meter',
        subtitle: `${data.healthyCount} out of ${data.totalStaff} Staff Healthy`,
        stats: `${Math.round(
          ((data.healthyCount / data.totalStaff) * 10000) / 100
        )}%`,
        border: { borderLeft: `solid 4px #66bb6a` }
      },
      {
        title: 'New Grievance Reports',
        stats: data.grievanceCount || 0,
        border: { borderLeft: `solid 4px #ffca28` }
      }
    ];
    setCardList(cardList);
  };

  useEffect(() => {
    async function fetchData() {
      await fetchStatistics();
      await fetchGrievanceList();
      await fetchProtocolList();
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <Layout contentStyles={paddingGenerator(['pr-90', 'pl-90', 'pt-112'])}>
      <div style={paddingGenerator(['pl-90'])} className={classes.day}>
        <Typography variant="body1" style={{ fontSize: '14px' }}>
          {new Date().toLocaleDateString('en', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Typography>
      </div>
      <Grid
        container
        spacing={2}
        style={paddingGenerator(['pt-32'])}
        justify={'space-between'}>
        {cards &&
          cards.map((card, index) => <DashboardCards key={index} {...card} />)}
      </Grid>

      <Grid
        style={marginGenerator(['mt-7'])}
        container
        spacing={2}
        justify={'space-between'}>
        {chartData.map((chart, index) => (
          <Grid key={index} item xs={4}>
            <div
              style={{
                backgroundColor: colors.common.white,
                border: `solid 1px ${colors.grey[200]}`,
                ...paddingGenerator(['pl-32', 'pr-32', 'pt-41'])
              }}>
              <AreaChartWrapper
                dataKeyXAxis={chart.dataKeyXAxis}
                dataKeyChart={chart.dataKeyChart}
                data={chart.data}
                chartColor={chart.color}
              />
            </div>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={0} style={{ width: '100%' }}>
        <Grid container item xs={9}>
          <RecentGrievanceReports rows={grievanceList} columns={columns} />
        </Grid>

        <Grid container item xs={3}>
          <ActiveProposals protocols={recentProtocols} />
        </Grid>
      </Grid>
    </Layout>
  );
};

const columns = [
  {
    label: 'Grievance',
    size: 9
  },
  {
    label: 'Posted',
    size: 2
  }
];

export default Dashboard;
