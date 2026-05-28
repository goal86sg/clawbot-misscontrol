#!/bin/bash
# Mission Control - Standalone Dashboard Launcher
cd /home/goal86sg/.openclaw/workspace/mission-control

# Kill any existing instance on port 3101
lsof -ti:3101 | xargs kill -9 2>/dev/null || true

# Start fresh
echo "🚀 Starting Mission Control on http://localhost:3101"
NEXT_PUBLIC_GATEWAY_URL=http://localhost:18789 PORT=3101 nohup npm run start > /tmp/mission-control.log 2>&1 &
echo "PID: $!"
sleep 2
curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:3101
echo "Logs: tail -f /tmp/mission-control.log"