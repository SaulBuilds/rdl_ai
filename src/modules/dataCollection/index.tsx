// src/modules/dataCollection/index.ts

import { scrape } from './Scraper';
import { processImage } from './ImageProcesser';
import { cleanData } from './DataCleaner';

export const dataCollection = {
  scrape,
  processImage,
  cleanData,
};
