# SPDX-License-Identifier: GPL-3.0-only
#
# Copyright (C) 2021-2025  sirpdboy  <herboy2008@gmail.com>
#
# Adapted for PonWRT-TYFZA1:
#   - the TYFZA1 target is aarch64 only, so the arm64 asset is hard-coded
#   - the release tarball is fetched through the normal PKG_SOURCE
#     machinery (with a real sha256) instead of a wget inside
#     Build/Prepare, so OpenWrt caches it in dl/ and verifies it

include $(TOPDIR)/rules.mk

PKG_NAME:=lucky
PKG_VERSION:=2.27.2
PKG_RELEASE:=1

PKG_SOURCE:=lucky_$(PKG_VERSION)_Linux_arm64.tar.gz
PKG_SOURCE_URL:=https://github.com/gdy666/lucky/releases/download/v$(PKG_VERSION)
PKG_HASH:=eb3a095238595193dab1fb486eed2a19d46190f37d4efd6630cc53e97d853466

PKG_LICENSE:=GPL-3.0-only
PKG_LICENSE_FILES:=LICENSE
PKG_MAINTAINER:=GDY666 <gdy666@foxmail.com>

PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)-$(PKG_VERSION)

# Prebuilt Go binary: stripping it serves no purpose and can only break it.
RSTRIP:=:

include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)
	SECTION:=net
	CATEGORY:=Network
	TITLE:=Lucky gdy
	DEPENDS:=@aarch64
	URL:=https://github.com/gdy666/lucky
endef

define Package/$(PKG_NAME)/description
  Main functions of Lucky: ipv4/ipv6 portforward, ddns, IOT wake on lan,
  reverse proxy and more...
endef

define Package/$(PKG_NAME)/conffiles
/etc/config/lucky
/etc/lucky/*
endef

define Build/Compile
	true
endef

define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/lucky $(1)/usr/bin/lucky
	$(INSTALL_BIN) $(CURDIR)/files/luckyarch.bin $(1)/usr/bin/luckyarch
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) $(CURDIR)/files/lucky.init $(1)/etc/init.d/lucky
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) $(CURDIR)/files/lucky.config $(1)/etc/config/lucky
endef

$(eval $(call BuildPackage,$(PKG_NAME)))