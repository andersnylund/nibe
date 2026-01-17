import { format } from 'date-fns';
import { DateRange } from '../types/data';

interface DateRangeSelectorProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  minDate: Date;
  maxDate: Date;
}

export function DateRangeSelector({
  dateRange,
  onDateRangeChange,
  minDate,
  maxDate,
}: DateRangeSelectorProps) {
  const formatDateForInput = (date: Date | null): string => {
    if (!date) return '';
    return format(date, 'yyyy-MM-dd');
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newStartDate = value ? new Date(value + 'T00:00:00') : null;
    onDateRangeChange({
      ...dateRange,
      startDate: newStartDate,
    });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newEndDate = value ? new Date(value + 'T23:59:59') : null;
    onDateRangeChange({
      ...dateRange,
      endDate: newEndDate,
    });
  };

  const handleReset = () => {
    onDateRangeChange({
      startDate: minDate,
      endDate: maxDate,
    });
  };

  const isFullRange =
    dateRange.startDate?.getTime() === minDate.getTime() &&
    dateRange.endDate?.getTime() === maxDate.getTime();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <label
          htmlFor="start-date"
          className="text-sm font-medium text-gray-700"
        >
          From:
        </label>
        <input
          type="date"
          id="start-date"
          value={formatDateForInput(dateRange.startDate)}
          min={formatDateForInput(minDate)}
          max={formatDateForInput(dateRange.endDate || maxDate)}
          onChange={handleStartDateChange}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="end-date" className="text-sm font-medium text-gray-700">
          To:
        </label>
        <input
          type="date"
          id="end-date"
          value={formatDateForInput(dateRange.endDate)}
          min={formatDateForInput(dateRange.startDate || minDate)}
          max={formatDateForInput(maxDate)}
          onChange={handleEndDateChange}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {!isFullRange && (
        <button
          onClick={handleReset}
          className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
        >
          Reset
        </button>
      )}
    </div>
  );
}
