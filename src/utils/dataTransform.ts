import { AggregatedDataPoint } from '../types/data';

/**
 * Format period label for display
 */
export function formatPeriodLabel(
  period: string,
  aggregationType: 'weekly' | 'monthly',
): string {
  if (aggregationType === 'weekly') {
    // Format: "2025-W12" -> "Week 12, 2025"
    const match = period.match(/^(\d{4})-W(\d{2})$/);
    if (match) {
      return `Week ${parseInt(match[2])}, ${match[1]}`;
    }
    return period;
  } else {
    // Format: "2025-03" -> "March 2025"
    const date = new Date(period + '-01');
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
}

/**
 * Get chart data for energy production
 */
export function getEnergyProductionData(data: AggregatedDataPoint[]) {
  return data.map((point) => ({
    period: point.period,
    date: point.date,
    Heating: point.heatingProduced,
    'Hot Water': point.hotWaterProduced,
    Pool: point.poolProduced,
    Cooling: point.coolingProduced,
    Outdoor: point.avgOutdoorTemp,
    COP: point.cop,
  }));
}

/**
 * Get chart data for energy consumption
 */
export function getEnergyConsumptionData(data: AggregatedDataPoint[]) {
  return data.map((point) => ({
    period: point.period,
    date: point.date,
    Heating: point.heatingConsumed,
    'Hot Water': point.hotWaterConsumed,
    Pool: point.poolConsumed,
    Cooling: point.coolingConsumed,
    Outdoor: point.avgOutdoorTemp,
  }));
}

/**
 * Get chart data for additional heater usage
 */
export function getAdditionalHeaterData(data: AggregatedDataPoint[]) {
  return data.map((point) => ({
    period: point.period,
    date: point.date,
    Heating: point.heatingAddition,
    'Hot Water': point.hotWaterAddition,
    Pool: point.poolAddition,
    Total: point.totalAddition,
    Outdoor: point.avgOutdoorTemp,
  }));
}

/**
 * Get chart data for temperatures
 */
export function getTemperatureData(data: AggregatedDataPoint[]) {
  return data.map((point) => ({
    period: point.period,
    date: point.date,
    Outdoor: point.avgOutdoorTemp,
    Indoor: point.avgIndoorTemp,
  }));
}

/**
 * Check which columns in the chart data are always zero
 * Returns a set of column names that have all zero values
 */
export function getZeroColumns(
  chartData: Record<string, unknown>[],
): Set<string> {
  if (chartData.length === 0) {
    return new Set();
  }

  const zeroColumns = new Set<string>();
  const allColumns = new Set<string>();

  // Get all column names (excluding period and date)
  for (const point of chartData) {
    for (const key of Object.keys(point)) {
      if (key !== 'period' && key !== 'date') {
        allColumns.add(key);
      }
    }
  }

  // Check each column to see if all values are zero
  for (const column of allColumns) {
    const hasNonZero = chartData.some((point) => {
      const value = point[column];
      return value !== undefined && value !== null && value !== 0;
    });

    if (!hasNonZero) {
      zeroColumns.add(column);
    }
  }

  return zeroColumns;
}
