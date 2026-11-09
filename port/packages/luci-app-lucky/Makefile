# SPDX-License-Identifier: GPL-3.0-only
# Copyright (C) 2021-2026  sirpdboy  <herboy2008@gmail.com>
#
# Built through feeds/luci/luci.mk like every other luci-app in this tree
# (luci-app-easytier, luci-app-syncthing, luci-app-rtp2httpd,
# luci-app-tyfza1-pon).  The previous BuildPackage form declared
# "+luci-base +luci-compat", and because sync-overlay.sh copies the package
# into package/ *before* scripts/feeds runs, the scan could not resolve those
# feed-provided names.  The package was consequently dropped from the world
# build without failing it:
#
#   WARNING: Makefile 'package/luci-app-lucky/Makefile' has a dependency on
#            'luci-base', which does not exist
#
# The lucky daemon shipped, but its menu, ACL, ucode handler and views never
# reached the image, so LuCI had no Lucky entry at all.

include $(TOPDIR)/rules.mk

LUCI_TITLE:=LuCI Support for Dynamic lucky Client
LUCI_DESCRIPTION:=Web UI for the Lucky network tool (IPv4/IPv6 port forward, \
	DDNS, IoT wake on LAN, reverse proxy and more).
LUCI_DEPENDS:=+lucky +luci-base +luci-compat +rpcd-mod-ucode
LUCI_PKGARCH:=all

PKG_NAME:=luci-app-lucky
PKG_VERSION:=3.0.3
PKG_RELEASE:=15
PKG_LICENSE:=GPL-3.0-only
PKG_MAINTAINER:=sirpdboy <herboy2008@gmail.com>

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
