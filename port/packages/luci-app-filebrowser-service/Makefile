# luci-app-filebrowser-service — LuCI front end for the FileBrowser daemon
#
# The luci feed already ships "luci-app-filebrowser", but that is only an
# upload widget for the router filesystem (view/system/filebrowser.js) and
# has nothing to do with the FileBrowser web file manager.  It also owns
# /usr/share/luci/menu.d/luci-app-filebrowser.json, so overriding it is not
# an option ("Not overriding core package").
#
# This package is a separate app for the filebrowser binary installed by
# port/packages/filebrowser, with its own menu, ACL and view.

include $(TOPDIR)/rules.mk

LUCI_TITLE:=LuCI support for the FileBrowser web file manager
LUCI_DESCRIPTION:=Start and stop the FileBrowser service, and configure its port, root directory and account.
LUCI_DEPENDS:=+luci-base +luci-compat +filebrowser
LUCI_PKGARCH:=all

PKG_NAME:=luci-app-filebrowser-service
PKG_VERSION:=1.0.0
PKG_RELEASE:=1
PKG_LICENSE:=Apache-2.0
PKG_MAINTAINER:=PonWRT-TYFZA1

include $(TOPDIR)/feeds/luci/luci.mk

# luci.mk calls BuildPackage for this package.
