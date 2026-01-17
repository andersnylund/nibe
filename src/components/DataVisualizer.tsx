import { useMemo } from 'react';
import { NibeDataPoint, AggregationType } from '../types/data';
import { aggregateData } from '../utils/dataAggregator';
import { AggregationSelector } from './AggregationSelector';
import {
  EnergyProductionChart,
  EnergyConsumptionChart,
  AdditionalHeaterChart,
  TemperatureChart,
} from './ChartContainer';

interface DataVisualizerProps {
  data: NibeDataPoint[];
  aggregationType: AggregationType;
  onAggregationChange: (type: AggregationType) => void;
}

export function DataVisualizer({
  data,
  aggregationType,
  onAggregationChange,
}: DataVisualizerProps) {

  const aggregatedData = useMemo(
    () => aggregateData(data, aggregationType),
    [data, aggregationType],
  );

  return (
    <div className="w-full">
      <div className="mb-6">
        <AggregationSelector
          aggregationType={aggregationType}
          onAggregationChange={onAggregationChange}
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
    </div>
  );
}
