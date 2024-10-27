#!/bin/bash

# Load environment variables
[ -f .env ] && export $(cat .env | xargs)

echo "Initializing learning process..."
node src/modules/learning/index.js
if [ $? -eq 0 ]; then
  echo "Learning process completed successfully."
else
  echo "Learning process encountered an error." >&2
  exit 1
fi
