#!/bin/sh
cd /home/pi/TopeBot-Discord.js

npm run upload

screen -S TopeBot npm run start
#pm2 start bot.js --name TopeBot
