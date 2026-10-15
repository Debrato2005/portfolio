#!/bin/sh
# Keep the pinned design engine in the ignored, writable frontend cache.
set -eu

frontend_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
: "${IMPECCABLE_HOME:=$frontend_root/.local/impeccable}"
export IMPECCABLE_HOME

cd "$frontend_root"
exec sh "$frontend_root/.agents/skills/impeccable/scripts/impeccable" "$@"
