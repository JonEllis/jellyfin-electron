#!/usr/bin/env bash

bin_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

"$bin_dir/build-linux.sh"
"$bin_dir/build-macos.sh"
"$bin_dir/build-windows.sh"
