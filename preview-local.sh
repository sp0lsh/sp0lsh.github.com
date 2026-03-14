#!/usr/bin/env bash
# Preview index.md locally as rendered GitHub-flavored markdown
set -euo pipefail
cd "$(dirname "$0")"
grip index.md --browser
