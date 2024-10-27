#!/bin/bash

# Check for Puppeteer installation
if ! command -v node > /dev/null; then
  echo "Node.js is not installed. Install it before running this script."
  exit 1
fi

# Load environment variables
[ -f .env ] && export $(cat .env | xargs)

URLS=("$@") # Accepts URLs passed as arguments or falls back to default URLs
if [ ${#URLS[@]} -eq 0 ]; then
  echo "No URLs provided. Usage: $0 <url1> <url2> ..."
  exit 1
fi

# Run scraper for each URL
for url in "${URLS[@]}"; do
  echo "Starting scraping for: $url"
  node src/modules/dataCollection/scraper.js "$url" || echo "Failed to scrape $url"
done
