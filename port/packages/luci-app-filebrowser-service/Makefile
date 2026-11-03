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
#
# It intentionally does NOT include feeds/luci/luci.mk.  That file expands
# $(LUCI_BUILD_PACKAGES), which is populated by the luci feed scan, so a
# program added under package/ that is not installed from a feed never gets
# registered ("No feed for package '...' found").  Building it directly with
# BuildPackage, the same way luci-app-easytier is built, avoids that.

include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-filebrowser-service
PKG_VERSION:=1.0.0
PKG_RELEASE:=1
PKG_LICENSE:=Apache-2.0
PKG_MAINTAINER:=PonWRT-TYFZA1

include $(INCLUDE_DIR)/package.mk

define Package/luci-app-filebrowser-service
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=3. Applications
  TITLE:=LuCI support for the FileBrowser web file manager
  URL:=https://github.com/filebrowser/filebrowser
  PKGARCH:=all
  DEPENDS:=+luci-base +luci-compat +filebrowser
endef

define Package/luci-app-filebrowser-service/description
  Start and stop the FileBrowser service, and configure its port, root
  directory, reverse proxy base URL and shell command access.
endef

define Build/Compile
	true
endef

define Package/luci-app-filebrowser-service/install
	$(INSTALL_DIR) $(1)/www/luci-static/resources/view/filebrowser
	$(INSTALL_DIR) $(1)/usr/share/luci/menu.d $(1)/usr/share/rpcd/acl.d
	$(INSTALL_DATA) $(CURDIR)/htdocs/luci-static/resources/view/filebrowser/service.js \
		$(1)/www/luci-static/resources/view/filebrowser/service.js
	$(INSTALL_DATA) $(CURDIR)/root/usr/share/luci/menu.d/luci-app-filebrowser-service.json \
		$(1)/usr/share/luci/menu.d/luci-app-filebrowser-service.json
	$(INSTALL_DATA) $(CURDIR)/root/usr/share/rpcd/acl.d/luci-app-filebrowser-service.json \
		$(1)/usr/share/rpcd/acl.d/luci-app-filebrowser-service.json
endef

$(eval $(call BuildPackage,luci-app-filebrowser-service))
