@echo off
echo Samsung Tizen installer -- prog4food (c) 2o22
echo.
SET TIZEN_STUDIO=C:\tizen-studio
SET TIZEN_STUDIO_DATA=C:\tizen-studio-data
SET PATH=%TIZEN_STUDIO%\tools;%TIZEN_STUDIO%\tools\ide\bin;%PATH%

set /p TVIP=Enter TV IP: 

sdb connect %TVIP%
sdb devices
sdb install "%~dp0OTTplayFOSS.wgt"

pause