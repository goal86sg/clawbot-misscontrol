#!/usr/bin/env bash
# Generates a system snapshot JSON for the vitals dashboard
# Run: ./gen-vitals.sh > mission-control/public/vitals-data.json

set -euo pipefail

# CPU
CPU_PCT=$(top -bn1 | grep "Cpu(s)" | awk '{print 100 - $8}' | cut -d. -f1)
CPU_LOAD=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | tr -d ',')

# Memory
MEM_TOTAL=$(free -m | awk '/Mem:/{print $2}')
MEM_USED=$(free -m | awk '/Mem:/{print $3}')
MEM_PCT=$(( MEM_USED * 100 / MEM_TOTAL ))

# Disk
DISK_PCT=$(df -h / | awk 'NR==2 {print $5}' | tr -d '%')
DISK_USED=$(df -h / | awk 'NR==2 {print $3}')
DISK_TOTAL=$(df -h / | awk 'NR==2 {print $2}')

# Uptime
UPTIME=$(uptime -p | sed 's/^up //')

# Processes
PROCS=$(ps aux --no-headers 2>/dev/null | wc -l)

# Network interfaces (active, non-loopback)
IFACE=$(ip -br addr 2>/dev/null | grep -v lo | grep UP | head -1 | awk '{print $1}')
IP_ADDR=$(ip -br addr 2>/dev/null | grep -v lo | grep UP | head -1 | awk '{print $3}' | cut -d/ -f1)

# Temperature (if available)
TEMP="N/A"
if [ -f /sys/class/thermal/thermal_zone0/temp ]; then
  TEMP=$(awk '{printf "%.1f", $1/1000}' /sys/class/thermal/thermal_zone0/temp)
fi

# Docker containers (if docker exists)
DOCKER_CT=$(docker ps -q 2>/dev/null | wc -l)

# OpenClaw status
OC_STATUS="online"
if ! pgrep -f "openclaw" > /dev/null 2>&1; then
  OC_STATUS="offline"
fi

# Git repos in workspace
REPOS=$(find /home/goal86sg/.openclaw/workspace -maxdepth 3 -name ".git" -type d 2>/dev/null | wc -l)

cat <<EOF
{
  "generated": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "generated_sgt": "$(TZ='Asia/Singapore' date '+%Y-%m-%d %H:%M:%S SGT')",
  "cpu": { "pct": $CPU_PCT, "load": "$CPU_LOAD" },
  "memory": { "total_mb": $MEM_TOTAL, "used_mb": $MEM_USED, "pct": $MEM_PCT },
  "disk": { "pct": $DISK_PCT, "used": "$DISK_USED", "total": "$DISK_TOTAL" },
  "uptime": "$UPTIME",
  "processes": $PROCS,
  "network": { "interface": "$IFACE", "ip": "$IP_ADDR" },
  "temperature_c": "$TEMP",
  "docker_containers": $DOCKER_CT,
  "openclaw": "$OC_STATUS",
  "repos": $REPOS
}
EOF
