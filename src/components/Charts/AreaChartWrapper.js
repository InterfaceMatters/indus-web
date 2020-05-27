import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis
} from 'recharts';
import { colors } from '../../theme/colors';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import PropTypes from 'prop-types';
import { fade } from '@material-ui/core';

const AreaChartWrapper = ({
  data,
  dataKeyXAxis,
  dataKeyChart,
  chartColor,
  name,
  stacked = false,
  secondChartName,
  secondChartColor,
  secondChartDataKey
}) => {
  return (
    <div style={{ width: '100%', height: 121 }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id={`color-chart-${chartColor}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1">
              <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
              <stop offset="80%" stopColor={chartColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="0" fill="#ffffff" />
          <XAxis
            dataKey={dataKeyXAxis}
            stroke={colors.grey[200]}
            interval="preserveStartEnd"
            dy={10}
            tickLine={false}
            tick={{ fill: '#d8d8d8', fontSize: 13, marginTop: 11 }}
          />
          <Tooltip labelFormatter={() => null}/>
          <Area
            name="Total"
            type="linear"
            dot={{ stroke: chartColor, strokeWidth: 2 }}
            dataKey={dataKeyChart}
            strokeWidth={3}
            stroke={chartColor}
            label={false}
            fill={`url(#color-chart-${chartColor})`}
            stackId="1"
          />
          {stacked && (
            <Area
              name={secondChartName}
              type="monotone"
              dataKey={secondChartDataKey}
              strokeWidth={3}
              stroke={secondChartColor}
              fill={fade(secondChartColor, 0.5)}
              stackId="1"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

AreaChartWrapper.propTypes = {
  data: PropTypes.array.isRequired,
  dataKeyXAxis: PropTypes.string.isRequired,
  // dataKeyChart: PropTypes.string.isRequired,
  chartColor: PropTypes.string.isRequired,
  secondChartName: PropTypes.string,
  secondChartColor: PropTypes.string,
  secondChartDataKey: PropTypes.string
};

export default AreaChartWrapper;
