@echo off
echo Samsung Tizen builder -- prog4food (c) 2o22
echo.
SET TIZEN_STUDIO=C:\tizen-studio
SET TIZEN_STUDIO_DATA=C:\tizen-studio-data
SET PATH=%TIZEN_STUDIO%\tools;%TIZEN_STUDIO%\tools\ide\bin;%PATH%

SET PWD=Hell0123

if not exist "%TIZEN_STUDIO_DATA%\keystore\author\prog4food.p12" (
  tizen.bat certificate -a prog4food -n prog4food -f prog4food -p "%PWD%"
  tizen.bat security-profiles add -a "%TIZEN_STUDIO_DATA%\keystore\author\prog4food.p12" -n prog4food -p "%PWD%"
  tizen.bat security-profiles list
)

del /F /Q .\wgt\signature1.xml .\wgt\author-signature.xml .\OTTplayFOSS.wgt .\wgt\.manifest.tmp
tizen package -t wgt -o .\ -s prog4food -- wgt

pause