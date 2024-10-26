// src/modules/dataCollection/scraper.tsx

import puppeteer, { Browser } from 'puppeteer';
import { InstructionResult } from '../autoAgentManager';

export interface ScrapedContent {
  title: string;
  content: string;
}

export interface ScrapeResult {
  data: ScrapedContent;
  metadata: { url: string; timestamp: Date };
}

/**
 * Initializes Puppeteer and opens a new browser instance.
 */
export async function initializeBrowser(): Promise<Browser> {
  return await puppeteer.launch();
}

/**
 * Scrapes data from a given URL.
 * @param url - The URL to scrape.
 * @returns - The title and content of the page, along with metadata.
 */
export async function scrape(url: string): Promise<ScrapeResult> {
  const browser = await initializeBrowser();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const data = await page.evaluate(() => ({
      title: document.title,
      content: document.body.innerText,
    }));
    return { data, metadata: { url, timestamp: new Date() } };
  } catch (error) {
    console.error('Scraping failed:', error instanceof Error ? error.message : error);
    throw new Error(`Failed to scrape data from ${url}`);
  } finally {
    await browser.close();
  }
}

/**
 * Starts scraping for a list of URLs.
 * @param urls - An array of URLs to scrape.
 * @returns - An array of scraping results or an error message if scraping fails.
 */
export async function startScraping(urls: string[]): Promise<InstructionResult> {
  try {
    const results: ScrapeResult[] = [];
    for (const url of urls) {
      console.log(`Starting scraping for URL: ${url}`);
      const result = await scrape(url);
      results.push(result);
      console.log(`Scraped content from ${url}:`, result.data);
    }
    return { success: true, message: "Scraping process completed successfully." };
  } catch (error) {
    console.error("Error in startScraping:", error instanceof Error ? error.message : error);
    return { success: false, message: `Failed to complete scraping. Error: ${error instanceof Error ? error.message : error}` };
  }
}
