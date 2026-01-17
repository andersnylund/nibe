import { AggregatedDataPoint } from '../types/data';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import {
  getEnergyProductionData,
  getEnergyConsumptionData,
  getAdditionalHeaterData,
  getTemperatureData,
  formatPeriodLabel,
  getZeroColumns,
} from '../utils/dataTransform';
import { AggregationType } from '../types/data';

interface ChartContainerProps {
  data: AggregatedDataPoint[];
  aggregationType: AggregationType;
}

const colors = {
  heating: '#3b82f6', // blue
  hotWater: '#10b981', // green
  pool: '#f59e0b', // amber
  cooling: '#8b5cf6', // purple
  outdoor: '#ef4444', // red
  indoor: '#06b6d4', // cyan
};

export function EnergyProductionChart({ data, aggregationType }: ChartContainerProps) {
  const chartData = getEnergyProductionData(data);
  const zeroColumns = getZeroColumns(chartData);

  const lineConfigs = [
    { key: 'Heating', color: colors.heating },
    { key: 'Hot Water', color: colors.hotWater },
    { key: 'Pool', color: colors.pool },
    { key: 'Cooling', color: colors.cooling },
  ].filter((config) => !zeroColumns.has(config.key));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Energy Production (kWh)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="period"
            tickFormatter={(value) => formatPeriodLabel(value, aggregationType)}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(value) => formatPeriodLabel(value as string, aggregationType)}
            formatter={(value: number) => Math.round(value * 100) / 100}
          />
          <Legend verticalAlign="top" height={36} />
          {lineConfigs.map((config) => (
            <Line
              key={config.key}
              type="monotone"
              dataKey={config.key}
              stroke={config.color}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function EnergyConsumptionChart({ data, aggregationType }: ChartContainerProps) {
  const chartData = getEnergyConsumptionData(data);
  const zeroColumns = getZeroColumns(chartData);

  const lineConfigs = [
    { key: 'Heating', color: colors.heating },
    { key: 'Hot Water', color: colors.hotWater },
    { key: 'Pool', color: colors.pool },
    { key: 'Cooling', color: colors.cooling },
  ].filter((config) => !zeroColumns.has(config.key));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Energy Consumption (kWh)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="period"
            tickFormatter={(value) => formatPeriodLabel(value, aggregationType)}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(value) => formatPeriodLabel(value as string, aggregationType)}
            formatter={(value: number) => Math.round(value * 100) / 100}
          />
          <Legend verticalAlign="top" height={36} />
          {lineConfigs.map((config) => (
            <Line
              key={config.key}
              type="monotone"
              dataKey={config.key}
              stroke={config.color}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AdditionalHeaterChart({ data, aggregationType }: ChartContainerProps) {
  const chartData = getAdditionalHeaterData(data);
  const zeroColumns = getZeroColumns(chartData);

  const barConfigs = [
    { key: 'Heating', color: colors.heating },
    { key: 'Hot Water', color: colors.hotWater },
    { key: 'Pool', color: colors.pool },
    { key: 'Total', color: '#6b7280' },
  ].filter((config) => !zeroColumns.has(config.key));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Additional Heater Usage (kWh)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="period"
            tickFormatter={(value) => formatPeriodLabel(value, aggregationType)}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(value) => formatPeriodLabel(value as string, aggregationType)}
            formatter={(value: number) => Math.round(value * 100) / 100}
          />
          <Legend verticalAlign="top" height={36} />
          {barConfigs.map((config) => (
            <Bar key={config.key} dataKey={config.key} fill={config.color} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TemperatureChart({ data, aggregationType }: ChartContainerProps) {
  const chartData = getTemperatureData(data);
  const zeroColumns = getZeroColumns(chartData);

  const lineConfigs = [
    { key: 'Outdoor', color: colors.outdoor, yAxisId: 'left', name: 'Outdoor Temp' },
    { key: 'Indoor', color: colors.indoor, yAxisId: 'right', name: 'Indoor Temp' },
  ].filter((config) => !zeroColumns.has(config.key));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Temperature Trends (°C)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="period"
            tickFormatter={(value) => formatPeriodLabel(value, aggregationType)}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          {!zeroColumns.has('Outdoor') && (
            <YAxis yAxisId="left" />
          )}
          {!zeroColumns.has('Indoor') && (
            <YAxis
              yAxisId="right"
              orientation="right"
            />
          )}
          <Tooltip
            labelFormatter={(value) => formatPeriodLabel(value as string, aggregationType)}
            formatter={(value: number) => Math.round(value * 100) / 100}
          />
          <Legend verticalAlign="top" height={36} />
          {lineConfigs.map((config) => (
            <Line
              key={config.key}
              yAxisId={config.yAxisId}
              type="monotone"
              dataKey={config.key}
              stroke={config.color}
              strokeWidth={2}
              dot={{ r: 3 }}
              name={config.name}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
