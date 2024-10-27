#!/bin/bash

# Check for curl
command -v curl > /dev/null || { echo "curl is not installed."; exit 1; }

# Load environment variables
[ -f .env ] && export $(cat .env | xargs)

if [ -z "$1" ]; then
  echo "Usage: $0 <instruction>"
  exit 1
fi

INSTRUCTION="$1"
echo "Submitting instruction to agent: $INSTRUCTION"
curl -X POST -H "Content-Type: application/json" -d "{\"instruction\": \"$INSTRUCTION\"}" http://localhost:3000/api/submit-instruction || {
  echo "Failed to submit instruction."
  exit 1
}
