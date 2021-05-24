#!/usr/bin/env bash

set -e

bin_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
project_dir="$bin_dir/../"

rm -f "$project_dir/icons/mac/icon.icns"
rm -f "$project_dir/icons/png/"*.png
rm -f "$project_dir/icons/win/icon.ico"

# todo: iterate to avoid the repetition

if [ -d "$project_dir/icons/mac" ]; then
  rmdir "$project_dir/icons/mac"
fi

if [ -d "$project_dir/icons/png" ]; then
  rmdir "$project_dir/icons/png"
fi

if [ -d "$project_dir/icons/win" ]; then
  rmdir "$project_dir/icons/win"
fi

if [ -d "$project_dir/icons" ]; then
  rmdir "$project_dir/icons"
fi

echo ""
echo "Converting logo to icns format"
"$project_dir/node_modules/.bin/electron-icon-maker" --input="$project_dir/node_modules/jellyfin-web/dist/assets/img/icon-transparent.png" --output="."

if [ $? -eq 0 ]; then
  echo "Success"
else
  echo "Failed"
  exit 1
fi
