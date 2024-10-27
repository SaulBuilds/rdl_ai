#!/bin/bash

LOG_FILE="${1:-logs/app.log}"

if [ ! -f "$LOG_FILE" ]; then
  echo "Log file not found: $LOG_FILE"
  exit 1
fi

echo "Tailing logs from $LOG_FILE..."
tail -f "$LOG_FILE"
