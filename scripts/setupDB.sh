#!/bin/bash

# Check if Prisma is installed
command -v npx > /dev/null || { echo "Prisma CLI (npx) is not installed. Install with 'npm install -g prisma'."; exit 1; }

# Load environment variables
[ -f .env ] && export $(cat .env | xargs)

# Ensure DATABASE_URL is set
: "${DATABASE_URL:?Error: DATABASE_URL is not set in the environment}"

echo "Setting up the database..."
npx prisma migrate dev --name init || { echo "Database migration failed."; exit 1; }

echo "Seeding the database..."
node prisma/seed.ts || { echo "Database seeding failed."; exit 1; }

echo "Database setup complete."
