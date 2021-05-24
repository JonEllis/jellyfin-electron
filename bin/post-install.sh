#!/usr/bin/env bash

set -e

bin_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

"$bin_dir/build-jellyfin-web.sh"
"$bin_dir/convert-icon.sh"
"$bin_dir/stash-dependencies.sh"
