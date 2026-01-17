import { NibeDataPoint, DateRange } from '../types/data';

/**
 * Filter data points by date range
 */
export function filterByDateRange(
  data: NibeDataPoint[],
  dateRange: DateRange,
): NibeDataPoint[] {
  const { startDate, endDate } = dateRange;

  if (!startDate && !endDate) {
    return data;
  }

  return data.filter((point) => {
    const pointTime = point.date.getTime();

    if (startDate && pointTime < startDate.getTime()) {
      return false;
    }

    if (endDate && pointTime > endDate.getTime()) {
      return false;
    }

    return true;
  });
}

/**
 * Get the date bounds from the data
 */
export function getDataDateBounds(
  data: NibeDataPoint[],
): { minDate: Date; maxDate: Date } | null {
  if (data.length === 0) {
    return null;
  }

  // Data is assumed to be sorted by date
  return {
    minDate: data[0].date,
    maxDate: data[data.length - 1].date,
  };
}
