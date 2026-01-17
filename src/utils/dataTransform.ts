import { AggregatedDataPoint } from '../types/data';

/**
 * Format period label for display
 */
export function formatPeriodLabel(period: string, aggregationType: 'weekly' | 'monthly'): string {
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
