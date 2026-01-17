import { AggregatedDataPoint } from '../types/data';

interface StatsSummaryProps {
  data: AggregatedDataPoint[];
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  color?: string;
}

function StatCard({
  title,
  value,
  subtitle,
  color = 'text-gray-900',
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h4 className="text-sm font-medium text-gray-500">{title}</h4>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      {subtitle && (
        <p className="text-xs text-gray-400 mt-1 whitespace-nowrap">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function formatNumber(value: number, decimals: number = 0): string {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function StatsSummary({ data }: StatsSummaryProps) {
  if (data.length === 0) {
    return null;
  }

  // Calculate totals
  const totalProduced = data.reduce((sum, d) => sum + d.totalProduced, 0);
  const totalConsumed = data.reduce((sum, d) => sum + d.totalConsumed, 0);
  const totalAddition = data.reduce((sum, d) => sum + d.totalAddition, 0);

  // Calculate breakdown by type
  const heatingProduced = data.reduce((sum, d) => sum + d.heatingProduced, 0);
  const hotWaterProduced = data.reduce((sum, d) => sum + d.hotWaterProduced, 0);
  const heatingConsumed = data.reduce((sum, d) => sum + d.heatingConsumed, 0);
  const hotWaterConsumed = data.reduce((sum, d) => sum + d.hotWaterConsumed, 0);

  // Calculate average COP (weighted by consumption)
  const avgCOP = totalConsumed > 0 ? totalProduced / totalConsumed : 0;

  // Calculate temperature averages
  const avgOutdoorTemp =
    data.reduce((sum, d) => sum + d.avgOutdoorTemp, 0) / data.length;
  const avgIndoorTemp =
    data.reduce((sum, d) => sum + d.avgIndoorTemp, 0) / data.length;

  // Calculate net energy savings (produced - consumed = "free" energy from heat pump)
  const energySavings = totalProduced - totalConsumed;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Summary Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="Total Energy Produced"
          value={`${formatNumber(totalProduced)} kWh`}
          subtitle={`Heating: ${formatNumber(heatingProduced)} | HW: ${formatNumber(hotWaterProduced)}`}
          color="text-green-600"
        />
        <StatCard
          title="Total Energy Consumed"
          value={`${formatNumber(totalConsumed)} kWh`}
          subtitle={`Heating: ${formatNumber(heatingConsumed)} | HW: ${formatNumber(hotWaterConsumed)}`}
          color="text-blue-600"
        />
        <StatCard
          title="Average COP"
          value={formatNumber(avgCOP, 2)}
          subtitle="Coefficient of Performance"
          color="text-orange-600"
        />
        <StatCard
          title="Energy Gain"
          value={`${formatNumber(energySavings)} kWh`}
          subtitle="Produced minus consumed"
          color="text-emerald-600"
        />
        <StatCard
          title="Additional Heater"
          value={`${formatNumber(totalAddition)} kWh`}
          subtitle="Backup electric heating"
          color="text-gray-600"
        />
        <StatCard
          title="Avg Temperatures"
          value={`${formatNumber(avgOutdoorTemp, 1)}°C`}
          subtitle={`Indoor: ${formatNumber(avgIndoorTemp, 1)}°C`}
          color="text-red-600"
        />
      </div>
    </div>
  );
}
