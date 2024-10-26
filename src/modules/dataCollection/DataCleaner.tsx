// src/modules/dataCollection/dataCleaner.ts

import { ScrapedContent } from './Scraper';

export interface CleanedData {
  uniqueData: ScrapedContent[];
}

/**
 * Cleans raw scraped data by removing duplicates
 */
export function cleanData(rawData: ScrapedContent[]): CleanedData {
  const uniqueData = Array.from(new Set(rawData.map((item) => JSON.stringify(item)))).map((item) => JSON.parse(item));
  return { uniqueData };
}
