#!/usr/bin/env bash

project_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
project_name="Jellyfin Electron"
project_description="Electron app for Jellyfin"
output_dir="release-builds"
icon="$project_dir/icons/win/icon.ico"

if [ ! -f "$icon" ]; then
  echo "Convert the Jellyfin icon with 'npm run convert-icon' first"
  exit 1
fi

echo ""
echo "Building for Windows..."
"$project_dir/node_modules/.bin/electron-packager" "$project_dir" "$project_name" \
  --platform=win32 --arch=ia32 \
  --icon="$icon" \
  --prune=true --out="$output_dir" --overwrite \
  --version-string.CompanyName=JonEllis \
  --version-string.FileDescription="$project_description" \
  --version-string.ProductName="$project_name"

if [ $? -eq 0 ]; then
  echo "Success"
else
  echo "Failed"
  exit 1
fi
