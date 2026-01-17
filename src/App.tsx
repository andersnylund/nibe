import { useState, useMemo } from 'react';
import { NibeDataPoint, AggregationType, DateRange } from './types/data';
import { FileUpload } from './components/FileUpload';
import { DataVisualizer } from './components/DataVisualizer';
import { getDataDateBounds } from './utils/dateFilter';
import { formatDate } from './utils/locale';
import {
  saveData,
  loadData,
  clearData,
  saveAggregationType,
  loadAggregationType,
} from './utils/storage';

function App() {
  const [data, setData] = useState<NibeDataPoint[] | null>(() => loadData());
  const [aggregationType, setAggregationType] = useState<AggregationType>(
    () => loadAggregationType(),
  );

  // Calculate date bounds from data
  const dateBounds = useMemo(() => {
    if (!data) return null;
    return getDataDateBounds(data);
  }, [data]);

  // Initialize date range to full data span
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const initialData = loadData();
    if (initialData) {
      const bounds = getDataDateBounds(initialData);
      if (bounds) {
        return { startDate: bounds.minDate, endDate: bounds.maxDate };
      }
    }
    return { startDate: null, endDate: null };
  });

  const handleDataParsed = (parsedData: NibeDataPoint[]) => {
    setData(parsedData);
    saveData(parsedData);

    // Reset date range to full span of new data
    const bounds = getDataDateBounds(parsedData);
    if (bounds) {
      setDateRange({ startDate: bounds.minDate, endDate: bounds.maxDate });
    }
  };

  const handleAggregationChange = (type: AggregationType) => {
    setAggregationType(type);
    saveAggregationType(type);
  };

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
  };

  const handleReset = () => {
    setData(null);
    clearData();
    setDateRange({ startDate: null, endDate: null });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              NIBE Heat Pump Data Visualizer
            </h1>
            {data && (
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Upload New File
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!data ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <FileUpload onDataParsed={handleDataParsed} />
          </div>
        ) : (
          <div>
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-blue-800 text-sm">
                Loaded {data.length} data points. Data spans from{' '}
                {formatDate(data[0].date)} to{' '}
                {formatDate(data[data.length - 1].date)}.
              </p>
            </div>
            <DataVisualizer
              data={data}
              aggregationType={aggregationType}
              onAggregationChange={handleAggregationChange}
              dateRange={dateRange}
              onDateRangeChange={handleDateRangeChange}
              minDate={dateBounds?.minDate ?? new Date()}
              maxDate={dateBounds?.maxDate ?? new Date()}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
