import { AggregationType, DateRange } from '../types/data';
import { differenceInDays } from 'date-fns';

const MAX_DAILY_DAYS = 90;

interface AggregationSelectorProps {
  aggregationType: AggregationType;
  onAggregationChange: (type: AggregationType) => void;
  dateRange: DateRange;
}

export function AggregationSelector({
  aggregationType,
  onAggregationChange,
  dateRange,
}: AggregationSelectorProps) {
  const rangeDays =
    dateRange.startDate && dateRange.endDate
      ? differenceInDays(dateRange.endDate, dateRange.startDate)
      : Infinity;

  const isDailyDisabled = rangeDays > MAX_DAILY_DAYS;

  return (
    <div className="flex gap-2">
      <div className="relative group">
        <button
          onClick={() => !isDailyDisabled && onAggregationChange('daily')}
          disabled={isDailyDisabled}
          className={`
            px-4 py-2 rounded-md font-medium transition-colors
            ${
              aggregationType === 'daily'
                ? 'bg-blue-500 text-white'
                : isDailyDisabled
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
        >
          Daily
        </button>
        {isDailyDisabled && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Select a range of {MAX_DAILY_DAYS} days or less
          </div>
        )}
      </div>
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
