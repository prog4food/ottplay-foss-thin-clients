#!/bin/sh
# Extract: dpkg-deb -R <file>.ipk
BDIR=.
PKG=com.ottplay-foss_lg_webos_v0.1.6

# Pre clean
rm -r "$BDIR/${PKG}.ipk" > /dev/null 2>&1
# Build
dpkg-deb -Zgzip -b "$BDIR/ipk"
# Convert to ar
ar xo "$BDIR/ipk.deb"
ar rUov "$BDIR/${PKG}.ipk" "$BDIR/debian-binary" "$BDIR/control.tar.gz" "$BDIR/data.tar.gz"
# Clean
rm "$BDIR/ipk.deb" "$BDIR/debian-binary" "$BDIR/control.tar.gz" "$BDIR/data.tar.gz"
