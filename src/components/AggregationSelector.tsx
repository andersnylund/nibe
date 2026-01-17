import { AggregationType } from '../types/data';

interface AggregationSelectorProps {
  aggregationType: AggregationType;
  onAggregationChange: (type: AggregationType) => void;
}

export function AggregationSelector({
  aggregationType,
  onAggregationChange,
}: AggregationSelectorProps) {
  return (
    <div className="flex gap-2 mb-6">
      <button
        onClick={() => onAggregationChange('weekly')}
        className={`
          px-4 py-2 rounded-md font-medium transition-colors
          ${
            aggregationType === 'weekly'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }
        `}
      >
        Weekly
      </button>
      <button
        onClick={() => onAggregationChange('monthly')}
        className={`
          px-4 py-2 rounded-md font-medium transition-colors
          ${
            aggregationType === 'monthly'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }
        `}
      >
        Monthly
      </button>
    </div>
  );
}
