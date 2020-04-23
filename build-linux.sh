#!/usr/bin/env bash

project_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
project_name="Jellyfin Electron"
output_dir="release-builds"
icon="$project_dir/icons/png/128x128.png"

if [ ! -f "$icon" ]; then
  echo "Convert the Jellyfin icon with 'yarn run convert-icon' first"
  exit 1
fi

echo ""
echo "Building for Linux..."
"$project_dir/node_modules/.bin/electron-packager" "$project_dir" "$project_name" \
  --platform=linux --arch=x64 \
  --icon="$icon" \
  --prune=true --out="$output_dir" --overwrite

if [ $? -eq 0 ]; then
  echo "Success"
else
  echo "Failed"
  exit 1
fi
