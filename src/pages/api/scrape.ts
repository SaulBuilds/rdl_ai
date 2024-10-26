// src/pages/api/scrape.ts

import { scrape } from '@/modules/dataCollection/Scraper';

export async function scrapeEndpoint(url: string): Promise<object> {
  try {
    const result = await scrape(url);
    return { status: 'success', data: result };
  } catch (error) {
    console.error("Scrape failed:", error);
    return { status: 'error', message: (error as Error).message };
  }
}
