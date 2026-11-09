# SPDX-License-Identifier: GPL-3.0-only
# Copyright (C) 2021-2026  sirpdboy  <herboy2008@gmail.com>
#
# Built with BuildPackage, exactly like luci-app-filebrowser-service.
#
# This package ships a JS-only front end (htdocs/ + root/, no luasrc/).
# Going through feeds/luci/luci.mk does not work for that shape here: the
# package is copied into package/ by sync-overlay.sh before scripts/feeds
# runs, and prepare_luci_feeds.sh deliberately filters it out of
# "feeds install".  luci.mk then expands $(LUCI_BUILD_PACKAGES) during a
# scan that never registered this directory, so the package silently drops
# out of the world build:
#
#   make[1] world            <- luci-app-lucky is absent from the target list
#
# The daemon and its init script shipped, but menu.d, acl.d, the rpcd ucode
# handler and the two views did not, so LuCI had no Lucky entry.  That was
# already true in v0.1.3.
#
# Note: the earlier BuildPackage attempt failed for a different reason than
# luci.mk does -- it declared its own "Package/luci-app-lucky" block but the
# install rule below is what actually puts the files in the image, and the
# dependency warnings about luci-base / luci-compat are harmless scan noise
# (every luci-app in this tree prints them, including the ones that build).

include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-lucky
PKG_VERSION:=3.0.3
PKG_RELEASE:=15
PKG_LICENSE:=GPL-3.0-only
PKG_MAINTAINER:=sirpdboy <herboy2008@gmail.com>

include $(INCLUDE_DIR)/package.mk

define Package/luci-app-lucky
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=3. Applications
  TITLE:=LuCI Support for Dynamic lucky Client
  URL:=https://github.com/sirpdboy/luci-app-lucky
  PKGARCH:=all
  DEPENDS:=+lucky +luci-base +luci-compat +rpcd-mod-ucode
endef

define Package/luci-app-lucky/description
  LuCI interface for the Lucky network tool (ipv4/ipv6 port forward,
  DDNS, IOT wake on LAN, reverse proxy and more).
endef

define Build/Compile
	true
endef

define Package/luci-app-lucky/conffiles
/etc/config/lucky
endef

define Package/luci-app-lucky/install
	$(INSTALL_DIR) $(1)/www/luci-static/resources/view/lucky
	$(INSTALL_DATA) $(CURDIR)/htdocs/luci-static/resources/view/lucky/config.js \
		$(1)/www/luci-static/resources/view/lucky/config.js
	$(INSTALL_DATA) $(CURDIR)/htdocs/luci-static/resources/view/lucky/lucky.js \
		$(1)/www/luci-static/resources/view/lucky/lucky.js

	$(INSTALL_DIR) $(1)/usr/share/luci/menu.d
	$(INSTALL_DATA) $(CURDIR)/root/usr/share/luci/menu.d/luci-app-lucky.json \
		$(1)/usr/share/luci/menu.d/luci-app-lucky.json

	$(INSTALL_DIR) $(1)/usr/share/rpcd/acl.d
	$(INSTALL_DATA) $(CURDIR)/root/usr/share/rpcd/acl.d/luci-app-lucky.json \
		$(1)/usr/share/rpcd/acl.d/luci-app-lucky.json

	$(INSTALL_DIR) $(1)/usr/share/rpcd/ucode
	$(INSTALL_DATA) $(CURDIR)/root/usr/share/rpcd/ucode/luci.lucky \
		$(1)/usr/share/rpcd/ucode/luci.lucky

	$(INSTALL_DIR) $(1)/etc/uci-defaults
	$(INSTALL_BIN) $(CURDIR)/root/etc/uci-defaults/luci-app-lucky \
		$(1)/etc/uci-defaults/luci-app-lucky

	$(INSTALL_DIR) $(1)/usr/lib/lua/luci/i18n
	$(STAGING_DIR_HOSTPKG)/bin/po2lmo $(CURDIR)/po/zh_Hans/lucky.po \
		$(1)/usr/lib/lua/luci/i18n/lucky.zh-cn.lmo
endef

$(eval $(call BuildPackage,luci-app-lucky))
