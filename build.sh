#!/bin/sh
VER=002
PKG=ottplay-foss.samsung_orsay_720p_v$VER
rm "./${PKG}.zip" > /dev/null 2>&1
cd "./app_DEFHJ/"
zip -r "../${PKG}.zip" *
cd ..

PKG=ottplay-foss.samsung_h_720p_v$VER
rm "./${PKG}.zip" > /dev/null 2>&1
cd "./app_H/"
zip -r "../${PKG}.zip" *
cd ..
