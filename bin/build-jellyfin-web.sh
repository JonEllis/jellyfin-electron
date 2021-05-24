#!/usr/bin/env bash

set -e

bin_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# For some reason when installing jellyfin-web on linux, the dist directory is not available

pushd "$bin_dir/../node_modules/jellyfin-web" > /dev/null

yarn install
yarn build:production

popd > /dev/null
