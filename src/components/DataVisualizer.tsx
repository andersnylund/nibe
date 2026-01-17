import { useMemo, useEffect } from 'react';
import { NibeDataPoint, AggregationType, DateRange } from '../types/data';
import { aggregateData } from '../utils/dataAggregator';
import { filterByDateRange } from '../utils/dateFilter';
import { differenceInDays } from 'date-fns';
import { AggregationSelector } from './AggregationSelector';
import { DateRangeSelector } from './DateRangeSelector';
import {
  EnergyProductionChart,
  EnergyConsumptionChart,
  AdditionalHeaterChart,
  TemperatureChart,
} from './ChartContainer';
import { StatsSummary } from './StatsSummary';

const MAX_DAILY_DAYS = 90;

interface DataVisualizerProps {
  data: NibeDataPoint[];
  aggregationType: AggregationType;
  onAggregationChange: (type: AggregationType) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  minDate: Date;
  maxDate: Date;
}

export function DataVisualizer({
  data,
  aggregationType,
  onAggregationChange,
  dateRange,
  onDateRangeChange,
  minDate,
  maxDate,
}: DataVisualizerProps) {
  // Auto-switch from daily to weekly if range becomes too large
  useEffect(() => {
    if (aggregationType === 'daily' && dateRange.startDate && dateRange.endDate) {
      const days = differenceInDays(dateRange.endDate, dateRange.startDate);
      if (days > MAX_DAILY_DAYS) {
        onAggregationChange('weekly');
      }
    }
  }, [dateRange, aggregationType, onAggregationChange]);

  const filteredData = useMemo(
    () => filterByDateRange(data, dateRange),
    [data, dateRange],
  );

  const aggregatedData = useMemo(
    () => aggregateData(filteredData, aggregationType),
    [filteredData, aggregationType],
  );

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <AggregationSelector
          aggregationType={aggregationType}
          onAggregationChange={onAggregationChange}
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
          maxDate={maxDate}
        />
        <DateRangeSelector
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnergyProductionChart
          data={aggregatedData}
          aggregationType={aggregationType}
        />
        <EnergyConsumptionChart
          data={aggregatedData}
          aggregationType={aggregationType}
        />
        <AdditionalHeaterChart
          data={aggregatedData}
          aggregationType={aggregationType}
        />
        <TemperatureChart
          data={aggregatedData}
          aggregationType={aggregationType}
        />
      </div>

      <StatsSummary data={aggregatedData} />
    </div>
  );
}
