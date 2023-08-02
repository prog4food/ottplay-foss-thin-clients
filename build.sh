#!/bin/sh
APP_ID="ottplay-foss.orsay"
APP_ICONS="ott85x70.png ott95x78.png ott106x87.png ott115x95.png"

APP_VER=2
INSTALLER_VER=1

make_app() {
  echo "Packing app for: $1"
  pkg_zip="usb-app_${APP_ID}_${1}_720p.v${APP_VER}.zip"
  pkg_dir="${APP_ID}.app"

  # Clean
  [ -d "$pkg_dir" ] && rm -rf $pkg_dir

  # Prepare
  mkdir $pkg_dir
  cp -a -t $pkg_dir _app_base/* app_$1/*

  # Pack
  zip -r dist/$pkg_zip $pkg_dir
  cat unzipsfx6_overwrite_prog4food.stub dist/$pkg_zip > dist/${pkg_zip%.*}.exe

  # Clean
  rm -rf $pkg_dir

  # Build installer
  make_installer $1 $pkg_zip
}

make_installer() {
  echo "Packing app installer for: $pkg_zip"
  pkg_zip="tv-installer_${APP_ID}_${1}_720p.v${INSTALLER_VER}_${APP_VER}.zip"
  pkg_dir="${APP_ID}.installer"

  # Clean
  [ -d "$pkg_dir" ] && rm -rf $pkg_dir

  # Prepare
  mkdir $pkg_dir
  cp -a -t $pkg_dir app_installer/*
  for f in $APP_ICONS; do cp -a -t $pkg_dir/icon/ _app_base/$f; done
  cp -a dist/$2 $pkg_dir/data/ottplay-foss.orsay.zip

  # Pack
  zip -r dist/$pkg_zip $pkg_dir
  cat unzipsfx6_overwrite_prog4food.stub dist/$pkg_zip > dist/${pkg_zip%.*}.exe

  # Clean
  rm -rf $pkg_dir
}

[ -d "dist" ] && rm -rf dist
mkdir dist

make_app "DEFHJ"
make_app "H"

echo "All done!"
