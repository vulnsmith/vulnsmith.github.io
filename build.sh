#!/bin/bash

set -e

# Clean output directory (except index.html)
find public -type f ! -name 'index.html' -delete

# Copy all .html files from src/pages to public/
cp src/pages/*.html public/

# Optionally copy CSS, JS, etc.
# cp -r src/css public/
# cp -r src/js public/
# cp -r src/assets public/

echo "Build complete. All pages copied to public/"