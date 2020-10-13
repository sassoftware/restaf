#!/usr/bin/env bash
echo "Starting app"
set -x
echo $VIYA_SERVER
echo $CASPROXY
exec npx jest -- $TESTS
