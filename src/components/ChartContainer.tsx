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
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Heating"
            stroke={colors.heating}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="Hot Water"
            stroke={colors.hotWater}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="Pool"
            stroke={colors.pool}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="Cooling"
            stroke={colors.cooling}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function EnergyConsumptionChart({ data, aggregationType }: ChartContainerProps) {
  const chartData = getEnergyConsumptionData(data);

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
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Heating"
            stroke={colors.heating}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="Hot Water"
            stroke={colors.hotWater}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="Pool"
            stroke={colors.pool}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="Cooling"
            stroke={colors.cooling}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AdditionalHeaterChart({ data, aggregationType }: ChartContainerProps) {
  const chartData = getAdditionalHeaterData(data);

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
          />
          <Legend />
          <Bar dataKey="Heating" fill={colors.heating} />
          <Bar dataKey="Hot Water" fill={colors.hotWater} />
          <Bar dataKey="Pool" fill={colors.pool} />
          <Bar dataKey="Total" fill="#6b7280" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TemperatureChart({ data, aggregationType }: ChartContainerProps) {
  const chartData = getTemperatureData(data);

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
          <YAxis yAxisId="left" label={{ value: 'Outdoor Temp (°C)', angle: -90, position: 'insideLeft' }} />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: 'Indoor Temp (°C)', angle: 90, position: 'insideRight' }}
          />
          <Tooltip
            labelFormatter={(value) => formatPeriodLabel(value as string, aggregationType)}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="Outdoor"
            stroke={colors.outdoor}
            strokeWidth={2}
            dot={{ r: 3 }}
            name="Outdoor Temp"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="Indoor"
            stroke={colors.indoor}
            strokeWidth={2}
            dot={{ r: 3 }}
            name="Indoor Temp"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
