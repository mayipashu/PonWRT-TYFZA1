# SPDX-License-Identifier: GPL-3.0-only
# Copyright (C) 2021-2026  sirpdboy  <herboy2008@gmail.com>
#
# Adapted for PonWRT-TYFZA1: built with BuildPackage instead of
# feeds/luci/luci.mk because the package lives under package/ and is
# not registered by any feed scan.

include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-lucky
PKG_VERSION:=3.0.3
PKG_RELEASE:=15
PKG_LICENSE:=GPL-3.0-only

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
endef

$(eval $(call BuildPackage,luci-app-lucky))