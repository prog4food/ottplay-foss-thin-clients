#!/bin/sh
PKG=dune_plugin_ottplay_foss_v003
rm "./${PKG}.zip" > /dev/null 2>&1
cd "./plugin/"
zip -r "../$PKG" *
cd ..
