# luci-app-timecontrol — Internet time control for nftables, r6 payload
#
# The app is not in any feed for this pinned tree.  We ship the r6 build that
# was validated on a live device: the original 3.4.4 tarball plus two fixes
# baked into the payload
#   * acl.d grants path-level + cgi-io exec, otherwise every button is a no-op
#   * /etc/config/timecontrol uses the named section 'timecontrol', so the JS
#     frontend and the shell backend read the same uci section
# Everything is shell/JS and architecture independent, hence PKGARCH:=all.

include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-timecontrol
PKG_VERSION:=3.4.4
PKG_RELEASE:=6
PKG_LICENSE:=Apache-2.0
PKG_MAINTAINER:=sirpdboy <herboy2008@gmail.com>

include $(INCLUDE_DIR)/package.mk

define Package/luci-app-timecontrol
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=3. Applications
  TITLE:=Internet time control (nftables, r6)
  URL:=https://github.com/sirpdboy/luci-app-timecontrol
  PKGARCH:=all
  DEPENDS:=+luci-base +luci-compat +nftables +conntrack
endef

define Package/luci-app-timecontrol/description
  Schedule Internet access per client MAC address with nftables rules.
  Ships the r6 payload with the ACL and uci-section fixes applied.
endef

define Package/luci-app-timecontrol/conffiles
/etc/config/timecontrol
endef

define Build/Compile
	true
endef

define Package/luci-app-timecontrol/install
	$(INSTALL_DIR) $(1)/etc/config $(1)/etc/init.d $(1)/etc/uci-defaults
	$(INSTALL_DIR) $(1)/usr/bin $(1)/usr/libexec
	$(INSTALL_DIR) $(1)/usr/share/luci/menu.d $(1)/usr/share/rpcd/acl.d
	$(INSTALL_DIR) $(1)/www/luci-static/resources/view/timecontrol
	$(INSTALL_CONF) ./files/etc/config/timecontrol $(1)/etc/config/timecontrol
	$(INSTALL_BIN) ./files/etc/init.d/timecontrol $(1)/etc/init.d/timecontrol
	$(INSTALL_BIN) ./files/etc/uci-defaults/luci-timecontrol $(1)/etc/uci-defaults/luci-timecontrol
	$(INSTALL_BIN) ./files/usr/bin/timecontrol $(1)/usr/bin/timecontrol
	$(INSTALL_BIN) ./files/usr/bin/timecontrolctrl $(1)/usr/bin/timecontrolctrl
	$(INSTALL_BIN) ./files/usr/bin/timecontrol-log $(1)/usr/bin/timecontrol-log
	$(INSTALL_BIN) ./files/usr/libexec/timecontrol-call $(1)/usr/libexec/timecontrol-call
	$(INSTALL_DATA) ./files/usr/share/luci/menu.d/luci-app-timecontrol.json \
		$(1)/usr/share/luci/menu.d/luci-app-timecontrol.json
	$(INSTALL_DATA) ./files/usr/share/rpcd/acl.d/luci-app-timecontrol.json \
		$(1)/usr/share/rpcd/acl.d/luci-app-timecontrol.json
	$(INSTALL_DATA) ./files/www/luci-static/resources/view/timecontrol/basic.js \
		$(1)/www/luci-static/resources/view/timecontrol/basic.js
	$(INSTALL_DATA) ./files/www/luci-static/resources/view/timecontrol/log.js \
		$(1)/www/luci-static/resources/view/timecontrol/log.js
endef

$(eval $(call BuildPackage,luci-app-timecontrol))
