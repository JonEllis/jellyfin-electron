#!/usr/bin/env bash

project_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

"$project_dir/build-linux.sh"
"$project_dir/build-macos.sh"
"$project_dir/build-windows.sh"
