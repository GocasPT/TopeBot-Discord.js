@ECHO off
cls

call npm run upload
call npm i
git pull
pause