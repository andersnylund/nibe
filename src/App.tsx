import { useState } from 'react';
import { NibeDataPoint } from './types/data';
import { FileUpload } from './components/FileUpload';
import { DataVisualizer } from './components/DataVisualizer';

function App() {
  const [data, setData] = useState<NibeDataPoint[] | null>(null);

  const handleDataParsed = (parsedData: NibeDataPoint[]) => {
    setData(parsedData);
  };

  const handleReset = () => {
    setData(null);
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
                {data[0].date.toLocaleDateString()} to{' '}
                {data[data.length - 1].date.toLocaleDateString()}.
              </p>
            </div>
            <DataVisualizer data={data} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
