#!/bin/sh
# Extract: dpkg-deb -R <file>.ipk
BDIR=.
PKG=enigma2-plugin-extensions-ottplay-foss-e2hbbtv_1.0_all

# Pre clean
rm -r "$BDIR/${PKG}.ipk" > /dev/null 2>&1
# Build
dpkg-deb -Zgzip -b "$BDIR/ipk"
# Convert to ar
ar xo "$BDIR/ipk.deb"
ar rUov "$BDIR/${PKG}.ipk" "$BDIR/debian-binary" "$BDIR/control.tar.gz" "$BDIR/data.tar.gz"
# Clean
rm "$BDIR/ipk.deb" "$BDIR/debian-binary" "$BDIR/control.tar.gz" "$BDIR/data.tar.gz"
