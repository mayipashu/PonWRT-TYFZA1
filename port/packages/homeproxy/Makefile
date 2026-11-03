# SPDX-License-Identifier: GPL-2.0-only
# Copyright (C) 2022-2023 ImmortalWrt.org
include $(TOPDIR)/rules.mk

LUCI_TITLE:=The modern ImmortalWrt proxy platform for ARM64/AMD64
LUCI_PKGARCH:=all
# "sing-box" is a plain run dependency, not a "+sing-box" select.  With the
# plus sign OpenWrt treats it as a virtual dependency and arbitrates between
# the sing-box / sing-box-tiny variants, which produces an unsatisfiable
# Kconfig loop for this feed:
#   PACKAGE_sing-box is selected by PACKAGE_luci-app-homeproxy
#   PACKAGE_luci-app-homeproxy depends on PACKAGE_sing-box-tiny
#   PACKAGE_sing-box-tiny depends on PACKAGE_sing-box
# Without the plus, package-metadata emits "PACKAGE_sing-box ||
# PACKAGE_sing-box-tiny", so either variant satisfies it and the variant is
# picked explicitly in tyfza1-compat.config.
LUCI_DEPENDS:= \
	+firewall4 \
	+kmod-nft-tproxy \
	+ucode-mod-digest \
	sing-box

PKG_NAME:=luci-app-homeproxy

define Package/luci-app-homeproxy/conffiles
/etc/config/homeproxy
/etc/homeproxy/certs/
/etc/homeproxy/ruleset/
/etc/homeproxy/resources/direct_list.txt
/etc/homeproxy/resources/proxy_list.txt
endef

include $(TOPDIR)/feeds/luci/luci.mk
# call BuildPackage - OpenWrt buildroot signature