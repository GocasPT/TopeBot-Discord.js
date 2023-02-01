#!/bin/sh
cd /home/pi/TopeBot-Discord.js
npm run upload
screen -dmS TopeBot npm run dev
#npm run dev