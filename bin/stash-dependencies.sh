#!/usr/bin/env bash

set -e

# Stashing the dependencies from node_modules independently so that we can remove the full jellyfin-web (and all it's
# dependencies) from the distributed app as we only require about 8 files, so good to save however many tens of
# thousands of files that would otherwise be distributed with the app

bin_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
stashed_dependencies_dir="$bin_dir/../stashed-dependencies"
node_modules_dir="$bin_dir/../node_modules"


# Create directory structure - keeping the same structure to make updating paths easier (also makes undoing easier too)
mkdir -p "$stashed_dependencies_dir/reset-css"
mkdir -p "$stashed_dependencies_dir/jellyfin-web/dist/themes/dark"
mkdir -p "$stashed_dependencies_dir/jellyfin-web/dist/assets/css"
mkdir -p "$stashed_dependencies_dir/jellyfin-web/dist/assets/img"
mkdir -p "$stashed_dependencies_dir/jellyfin-web/dist/elements/emby-input"
mkdir -p "$stashed_dependencies_dir/jellyfin-web/dist/elements/emby-button"
mkdir -p "$stashed_dependencies_dir/jellyfin-web/dist/elements/emby-checkbox"
mkdir -p "$stashed_dependencies_dir/material-design-icons-iconfont/dist"
mkdir -p "$stashed_dependencies_dir/jellyfin-web/dist/components/loading"

# Reset css
cp "$node_modules_dir/reset-css/reset.css" "$stashed_dependencies_dir/reset-css/reset.css"

# Jellyfin css
cp "$node_modules_dir/jellyfin-web/dist/themes/dark/theme.css" "$stashed_dependencies_dir/jellyfin-web/dist/themes/dark/theme.css"
cp "$node_modules_dir/jellyfin-web/dist/assets/css/fonts.css" "$stashed_dependencies_dir/jellyfin-web/dist/assets/css/fonts.css"
cp "$node_modules_dir/jellyfin-web/dist/elements/emby-input/emby-input.css" "$stashed_dependencies_dir/jellyfin-web/dist/elements/emby-input/emby-input.css"
cp "$node_modules_dir/jellyfin-web/dist/elements/emby-button/emby-button.css" "$stashed_dependencies_dir/jellyfin-web/dist/elements/emby-button/emby-button.css"
cp "$node_modules_dir/jellyfin-web/dist/elements/emby-checkbox/emby-checkbox.css" "$stashed_dependencies_dir/jellyfin-web/dist/elements/emby-checkbox/emby-checkbox.css"
cp "$node_modules_dir/jellyfin-web/dist/components/loading/loading.css" "$stashed_dependencies_dir/jellyfin-web/dist/components/loading/loading.css"

# Jellyfin images
cp "$node_modules_dir/jellyfin-web/dist/assets/img/banner-light.png" "$stashed_dependencies_dir/jellyfin-web/dist/assets/img/banner-light.png"

# Material design icon css
cp "$node_modules_dir/material-design-icons-iconfont/dist/material-design-icons.css" "$stashed_dependencies_dir/material-design-icons-iconfont/dist/material-design-icons.css"
