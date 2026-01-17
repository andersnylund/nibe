import Papa from 'papaparse';
import { NibeDataPoint } from '../types/data';
import { parse } from 'date-fns';
import type { ParseResult } from 'papaparse';

/**
 * Parse CSV file content and convert to structured NibeDataPoint array
 */
export async function parseNibeCsv(file: File): Promise<NibeDataPoint[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      delimiter: ' ', // Space-delimited CSV
      quoteChar: '"',
      escapeChar: '"',
      complete: (results: ParseResult<Record<string, string>>) => {
        try {
          const dataPoints: NibeDataPoint[] = [];

          for (const row of results.data as Record<string, string>[]) {
            // Parse date - format: "2025-03-24 16:00"
            const dateStr = row['Date']?.replace(/"/g, '').trim();
            if (!dateStr) continue;

            let date: Date;
            try {
              date = parse(dateStr, 'yyyy-MM-dd HH:mm', new Date());
              if (isNaN(date.getTime())) {
                console.warn(`Invalid date: ${dateStr}`);
                continue;
              }
            } catch (error) {
              console.warn(`Date parsing error for ${dateStr}:`, error);
              continue;
            }

            // Helper function to parse numeric values
            const parseNumber = (value: string | undefined): number => {
              if (!value) return 0;
              const cleaned = value.replace(/"/g, '').trim();
              const num = parseFloat(cleaned);
              return isNaN(num) ? 0 : num;
            };

            // Extract column values - handle quoted column names
            // Find temperature columns with flexible matching (handle encoding issues)
            const outdoorTempKey = Object.keys(row).find(
              (key) =>
                key.toLowerCase().includes('outdoor') &&
                key.toLowerCase().includes('temp'),
            );
            const indoorTempKey = Object.keys(row).find(
              (key) =>
                key.toLowerCase().includes('indoor') &&
                key.toLowerCase().includes('temp'),
            );
            const outdoorTempRaw = outdoorTempKey
              ? row[outdoorTempKey]
              : row['Outdoor temp [°C]'];
            const indoorTempRaw = indoorTempKey
              ? row[indoorTempKey]
              : row['Indoor temp [°C]'];
            const outdoorTempParsed = parseNumber(outdoorTempRaw);
            const indoorTempParsed = parseNumber(indoorTempRaw);
            const dataPoint: NibeDataPoint = {
              date,
              heatingProduced: parseNumber(
                row[
                  'Heating Produced Thermal energy (Inc. additional heater) [kWh]'
                ],
              ),
              hotWaterProduced: parseNumber(
                row[
                  'Hot water Produced Thermal energy (Inc. additional heater) [kWh]'
                ],
              ),
              poolProduced: parseNumber(
                row[
                  'Pool Produced Thermal energy (Inc. additional heater) [kWh]'
                ],
              ),
              coolingProduced: parseNumber(
                row[
                  'Cooling Produced Thermal energy (Inc. additional heater) [kWh]'
                ],
              ),
              heatingConsumed: parseNumber(
                row[
                  'Heating Consumed Electricity (Excl. additional heater) [kWh]'
                ],
              ),
              hotWaterConsumed: parseNumber(
                row[
                  'Hot water Consumed Electricity (Excl. additional heater) [kWh]'
                ],
              ),
              poolConsumed: parseNumber(
                row[
                  'Pool Consumed Electricity (Excl. additional heater) [kWh]'
                ],
              ),
              coolingConsumed: parseNumber(
                row[
                  'Cooling Consumed Electricity (Excl. additional heater) [kWh]'
                ],
              ),
              heatingAddition: parseNumber(row['Heating Addition [kWh]']),
              hotWaterAddition: parseNumber(row['Hot water Addition [kWh]']),
              poolAddition: parseNumber(row['Pool Addition [kWh]']),
              outdoorTemp: outdoorTempParsed,
              indoorTemp: indoorTempParsed,
            };

            dataPoints.push(dataPoint);
          }

          if (dataPoints.length === 0) {
            reject(new Error('No valid data points found in CSV file'));
            return;
          }

          resolve(dataPoints);
        } catch (error) {
          reject(
            new Error(
              `Failed to parse CSV: ${error instanceof Error ? error.message : 'Unknown error'}`,
            ),
          );
        }
      },
      error: (error: Error) => {
        reject(new Error(`CSV parsing error: ${error.message}`));
      },
    });
  });
}
