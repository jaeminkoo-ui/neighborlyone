#!/bin/bash
cd "$(dirname "$0")"

# Load environment variables from .env file
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

exec node --enable-source-maps build/server/index.js

