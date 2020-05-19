#!/usr/bin/env bash
echo "Starting app"
set -x
echo $VIYA_SERVER
exec npx @sassoftware/viyacaddy 
