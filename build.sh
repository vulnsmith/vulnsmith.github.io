#!/bin/bash

set -e

# Clean generated output before copying fresh files.
find public -type f -delete
find public -mindepth 1 -type d -empty -delete

# Copy root-level pages that are maintained outside src/pages.
cp index.html public/

# Copy all source page files to public/.
cp src/pages/*.html public/

# Copy project detail pages.
if [ -d projects ]; then
  cp -R projects public/
fi

# Copy nested page directories such as /blog/<entry>/.
if [ -d src/pages/blog ]; then
  cp -R src/pages/blog public/
fi

# Copy shared static assets used by generated pages.
mkdir -p public/css
cp css/*.css public/css/

if [ -d js ]; then
  mkdir -p public/js
  cp js/*.js public/js/
fi

if [ -d assets ]; then
  cp -R assets public/
fi

if [ -f CNAME ]; then
  cp CNAME public/
fi

touch public/.nojekyll

echo "Build complete. All pages copied to public/"
