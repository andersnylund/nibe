/**
 * Raw hourly data point from NIBE CSV file
 */
export interface NibeDataPoint {
  date: Date;
  heatingProduced: number; // Thermal energy (Inc. additional heater) [kWh]
  hotWaterProduced: number; // Thermal energy (Inc. additional heater) [kWh]
  poolProduced: number; // Thermal energy (Inc. additional heater) [kWh]
  coolingProduced: number; // Thermal energy (Inc. additional heater) [kWh]
  heatingConsumed: number; // Electricity (Excl. additional heater) [kWh]
  hotWaterConsumed: number; // Electricity (Excl. additional heater) [kWh]
  poolConsumed: number; // Electricity (Excl. additional heater) [kWh]
  coolingConsumed: number; // Electricity (Excl. additional heater) [kWh]
  heatingAddition: number; // [kWh]
  hotWaterAddition: number; // [kWh]
  poolAddition: number; // [kWh]
  outdoorTemp: number; // [°C]
  indoorTemp: number; // [°C]
}

/**
 * Aggregated data point for daily, weekly or monthly views
 */
export interface AggregatedDataPoint {
  period: string; // Daily: "2025-01-15", Weekly: "2025-W12", Monthly: "2025-03"
  date: Date; // Start date of the period
  // Produced thermal energy (sums)
  heatingProduced: number;
  hotWaterProduced: number;
  poolProduced: number;
  coolingProduced: number;
  totalProduced: number;
  // Consumed electricity (sums)
  heatingConsumed: number;
  hotWaterConsumed: number;
  poolConsumed: number;
  coolingConsumed: number;
  totalConsumed: number;
  // Additional heater usage (sums)
  heatingAddition: number;
  hotWaterAddition: number;
  poolAddition: number;
  totalAddition: number;
  // Temperature averages
  avgOutdoorTemp: number;
  avgIndoorTemp: number;
  // Efficiency metrics
  cop?: number; // Coefficient of Performance (totalProduced / totalConsumed)
}

/**
 * Aggregation type for grouping data
 */
export type AggregationType = 'daily' | 'weekly' | 'monthly';

/**
 * Date range for filtering data
 */
export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}
