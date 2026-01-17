import { format, getISOWeek, getYear, startOfMonth, startOfWeek } from 'date-fns';
import { AggregatedDataPoint, AggregationType, NibeDataPoint } from '../types/data';

/**
 * Aggregate data points by week or month
 */
export function aggregateData(
  dataPoints: NibeDataPoint[],
  aggregationType: AggregationType
): AggregatedDataPoint[] {
  // Group data points by period
  const grouped = new Map<string, NibeDataPoint[]>();

  for (const point of dataPoints) {
    let periodKey: string;
    let periodStart: Date;

    if (aggregationType === 'weekly') {
      periodStart = startOfWeek(point.date, { weekStartsOn: 1 }); // Monday as start
      const year = getYear(periodStart);
      const week = getISOWeek(periodStart);
      periodKey = `${year}-W${week.toString().padStart(2, '0')}`;
    } else {
      // monthly
      periodStart = startOfMonth(point.date);
      periodKey = format(periodStart, 'yyyy-MM');
    }

    if (!grouped.has(periodKey)) {
      grouped.set(periodKey, []);
    }
    grouped.get(periodKey)!.push(point);
  }

  // Convert grouped data to aggregated points
  const aggregated: AggregatedDataPoint[] = [];

  for (const [period, points] of grouped.entries()) {
    const periodStart = aggregationType === 'weekly'
      ? startOfWeek(points[0].date, { weekStartsOn: 1 })
      : startOfMonth(points[0].date);

    // Calculate sums
    const heatingProduced = points.reduce((sum, p) => sum + p.heatingProduced, 0);
    const hotWaterProduced = points.reduce((sum, p) => sum + p.hotWaterProduced, 0);
    const poolProduced = points.reduce((sum, p) => sum + p.poolProduced, 0);
    const coolingProduced = points.reduce((sum, p) => sum + p.coolingProduced, 0);
    const totalProduced = heatingProduced + hotWaterProduced + poolProduced + coolingProduced;

    const heatingConsumed = points.reduce((sum, p) => sum + p.heatingConsumed, 0);
    const hotWaterConsumed = points.reduce((sum, p) => sum + p.hotWaterConsumed, 0);
    const poolConsumed = points.reduce((sum, p) => sum + p.poolConsumed, 0);
    const coolingConsumed = points.reduce((sum, p) => sum + p.coolingConsumed, 0);
    const totalConsumed = heatingConsumed + hotWaterConsumed + poolConsumed + coolingConsumed;

    const heatingAddition = points.reduce((sum, p) => sum + p.heatingAddition, 0);
    const hotWaterAddition = points.reduce((sum, p) => sum + p.hotWaterAddition, 0);
    const poolAddition = points.reduce((sum, p) => sum + p.poolAddition, 0);
    const totalAddition = heatingAddition + hotWaterAddition + poolAddition;

    // Calculate averages
    const avgOutdoorTemp = points.reduce((sum, p) => sum + p.outdoorTemp, 0) / points.length;
    const avgIndoorTemp = points.reduce((sum, p) => sum + p.indoorTemp, 0) / points.length;

    // Calculate COP (Coefficient of Performance)
    const cop = totalConsumed > 0 ? totalProduced / totalConsumed : undefined;

    aggregated.push({
      period,
      date: periodStart,
      heatingProduced,
      hotWaterProduced,
      poolProduced,
      coolingProduced,
      totalProduced,
      heatingConsumed,
      hotWaterConsumed,
      poolConsumed,
      coolingConsumed,
      totalConsumed,
      heatingAddition,
      hotWaterAddition,
      poolAddition,
      totalAddition,
      avgOutdoorTemp,
      avgIndoorTemp,
      cop,
    });
  }

  // Sort by date
  aggregated.sort((a, b) => a.date.getTime() - b.date.getTime());

  return aggregated;
}
