#!/usr/bin/env bash

# For some reason when installing jellyfin-web on linux, the dist directory is not available

cd node_modules/jellyfin-web
yarn install
yarn build:production
