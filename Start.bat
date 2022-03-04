@ECHO off
cls

:start

ECHO.
ECHO 1. Print start
ECHO 2. Print dev
ECHO.

set choice=
set /p choice=
if not '%choice%'=='' set choice=%choice:~0,1%
if '%choice%'=='1' goto start
if '%choice%'=='2' goto dev
ECHO "%choice%" is not valid, try again
ECHO.
goto start

:start
npm run start
goto end

:dev
npm run dev
goto end

:end
pause