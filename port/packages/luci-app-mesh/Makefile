# luci-app-mesh — adapted for PonWRT TYFZA1 (RTL9617C / mbedtls)
# Source: xxosdev/luci-app-mesh
#
# TYFZA1 adaptation notes:
#  - The rtl_ax_ap driver only exposes NL80211_IFTYPE_AP|MONITOR (no MESH_POINT),
#    so 802.11s wireless mesh links cannot be established directly by this driver.
#    The mesh package still works for batman-adv over wired interfaces and as a
#    management plane; wireless 802.11s requires a compatible mac80211 radio.
#  - wpad-mbedtls (already in the base firmware) compiles with CONFIG_MESH=y,
#    so the full supplicant is capable of 802.11s when the radio supports it.
#  - kmod-batman-adv is from the openwrt packages feed (external kernel module).

include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-mesh
PKG_VERSION:=1.0.0
PKG_RELEASE:=1
PKG_LICENSE:=Apache-2.0
PKG_MAINTAINER:=Xx

LUCI_TITLE:=802.11s Mesh management (JS UI / batman-adv / roaming)
LUCI_PKGARCH:=all

# wpad-mbedtls is the full supplicant variant already in tyfza1-boot.config;
# it compiles with CONFIG_MESH=y and provides mesh point support.
# kmod-batman-adv + batctl are from the openwrt packages feed (external kmod).
LUCI_DEPENDS:=+uclient-fetch +rpcd +jsonfilter +iwinfo +iw \
	+wpad-mbedtls \
	+kmod-batman-adv +batctl-default +luci-proto-batman-adv \
	+dawn

PKG_INSTALL:=$(CURDIR)/root

include $(TOPDIR)/feeds/luci/luci.mk

define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
endef

define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/usr/sbin
	$(INSTALL_BIN) $(CURDIR)/root/usr/sbin/meshctl $(1)/usr/sbin/
	$(INSTALL_BIN) $(CURDIR)/mesh-install.sh $(1)/usr/sbin/mesh-install
	$(INSTALL_DIR) $(1)/usr/libexec/mesh
	$(INSTALL_DATA) $(CURDIR)/root/usr/libexec/mesh/functions.sh $(1)/usr/libexec/mesh/
	$(INSTALL_DATA) $(CURDIR)/root/usr/libexec/mesh/version $(1)/usr/libexec/mesh/
	$(INSTALL_DIR) $(1)/usr/libexec/rpcd
	$(INSTALL_BIN) $(CURDIR)/root/usr/libexec/rpcd/mesh $(1)/usr/libexec/rpcd/mesh
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) $(CURDIR)/root/etc/init.d/mesh $(1)/etc/init.d/
	$(INSTALL_BIN) $(CURDIR)/root/etc/init.d/97-wifi-roaming $(1)/etc/init.d/
	$(INSTALL_BIN) $(CURDIR)/root/etc/init.d/99-dawn-roaming $(1)/etc/init.d/
	$(INSTALL_DIR) $(1)/etc/uci-defaults
	$(INSTALL_BIN) $(CURDIR)/root/etc/uci-defaults/40-luci-app-mesh-roaming $(1)/etc/uci-defaults/
	$(INSTALL_DIR) $(1)/etc/hotplug.d/iface
	$(INSTALL_BIN) $(CURDIR)/root/etc/hotplug.d/iface/30-mesh-bat-mtu $(1)/etc/hotplug.d/iface/
	$(INSTALL_DIR) $(1)/etc/rc.wps
	$(INSTALL_BIN) $(CURDIR)/root/etc/rc.wps/10-mesh $(1)/etc/rc.wps/10-mesh
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_DATA) $(CURDIR)/root/etc/config/mesh $(1)/etc/config/
	$(INSTALL_DIR) $(1)/www/cgi-bin
	$(INSTALL_BIN) $(CURDIR)/root/www/cgi-bin/mesh-sync $(1)/www/cgi-bin/
	$(INSTALL_DIR) $(1)/etc/nginx/conf.d
	$(INSTALL_DATA) $(CURDIR)/root/etc/nginx/conf.d/mesh-sync.locations $(1)/etc/nginx/conf.d/
	$(INSTALL_DIR) $(1)/usr/share/luci/menu.d
	$(INSTALL_DATA) $(CURDIR)/root/usr/share/luci/menu.d/luci-app-mesh.json $(1)/usr/share/luci/menu.d/
	$(INSTALL_DIR) $(1)/usr/share/rpcd/acl.d
	$(INSTALL_DATA) $(CURDIR)/root/usr/share/rpcd/acl.d/luci-app-mesh.json $(1)/usr/share/rpcd/acl.d/
	$(INSTALL_DIR) $(1)/www/luci-static/resources/view/mesh
	$(INSTALL_DATA) $(CURDIR)/htdocs/luci-static/resources/view/mesh/*.js $(1)/www/luci-static/resources/view/mesh/
	$(INSTALL_DATA) $(CURDIR)/htdocs/luci-static/resources/view/mesh/mesh.css $(1)/www/luci-static/resources/view/mesh/
endef

define Package/$(PKG_NAME)/conffiles
/etc/config/mesh
endef

define Package/$(PKG_NAME)/postinst
#!/bin/sh
[ -x /etc/init.d/rpcd ] && /etc/init.d/rpcd restart >/dev/null 2>&1
[ -x /etc/init.d/mesh ] && /etc/init.d/mesh enable >/dev/null 2>&1
for s in 97-wifi-roaming 99-dawn-roaming; do
	[ -x "/etc/init.d/$$s" ] && "/etc/init.d/$$s" enable >/dev/null 2>&1
	[ -x "/etc/init.d/$$s" ] && "/etc/init.d/$$s" cron_enable >/dev/null 2>&1
done
if [ -x /etc/init.d/nginx ] && [ -f /etc/nginx/conf.d/mesh-sync.locations ] \
	&& grep -q 'conf\.d/\*\.locations' /etc/config/nginx 2>/dev/null; then
	/etc/init.d/nginx reload >/dev/null 2>&1
fi
rm -f /tmp/luci-indexcache* 2>/dev/null
rm -rf /tmp/luci-modulecache 2>/dev/null
exit 0
endef

define Package/$(PKG_NAME)/prerm
#!/bin/sh
[ -x /etc/init.d/mesh ] && /etc/init.d/mesh stop >/dev/null 2>&1
[ -x /etc/init.d/mesh ] && /etc/init.d/mesh disable >/dev/null 2>&1
for s in 97-wifi-roaming 99-dawn-roaming; do
	[ -x "/etc/init.d/$$s" ] && "/etc/init.d/$$s" cron_disable >/dev/null 2>&1
	[ -x "/etc/init.d/$$s" ] && "/etc/init.d/$$s" disable >/dev/null 2>&1
done
exit 0
endef

$(eval $(call BuildPackage,luci-app-mesh))