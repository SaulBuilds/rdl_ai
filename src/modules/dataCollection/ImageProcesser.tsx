// src/modules/dataCollection/imageProcessor.ts

import sharp from 'sharp';

export interface ImageOptions {
  width: number;
  height: number;
  quality: number;
}

export async function processImage(imagePath: string, options: ImageOptions): Promise<Buffer> {
  const { width, height, quality } = options;
  return await sharp(imagePath)
    .resize(width, height)
    .jpeg({ quality })
    .toBuffer();
}
