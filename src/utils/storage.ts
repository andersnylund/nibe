import { NibeDataPoint, AggregationType } from '../types/data';

const STORAGE_KEY = 'nibe-data';
const AGGREGATION_KEY = 'nibe-aggregation';

interface StoredData {
  data: Array<Omit<NibeDataPoint, 'date'> & { date: string }>;
  storedAt: string;
}

export function saveData(data: NibeDataPoint[]): void {
  const storedData: StoredData = {
    data: data.map((point) => ({
      ...point,
      date: point.date.toISOString(),
    })),
    storedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
}

export function loadData(): NibeDataPoint[] | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    const parsed: StoredData = JSON.parse(stored);
    return parsed.data.map((point) => ({
      ...point,
      date: new Date(point.date),
    }));
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function clearData(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function saveAggregationType(type: AggregationType): void {
  localStorage.setItem(AGGREGATION_KEY, type);
}

export function loadAggregationType(): AggregationType {
  const stored = localStorage.getItem(AGGREGATION_KEY);
  if (stored === 'weekly' || stored === 'monthly') {
    return stored;
  }
  return 'monthly';
}
