# FileBrowser — prebuilt arm64 binary v2.43.0
# Cannot compile from source on OpenWrt: the upstream build needs Go + pnpm
# (node-pnpm is not in the official feed). We ship the official release binary
# for linux/arm64 (aarch64), matching TYFZA1's Cortex-A55.

include $(TOPDIR)/rules.mk

PKG_NAME:=filebrowser
PKG_VERSION:=2.43.0
PKG_RELEASE:=1
PKG_LICENSE:=Apache-2.0
PKG_LICENSE_FILES:=LICENSE
PKG_MAINTAINER:=FileBrowser contributors

PKG_SOURCE:=linux-arm64-filebrowser.tar.gz
PKG_SOURCE_URL:=https://github.com/filebrowser/filebrowser/releases/download/v$(PKG_VERSION)/
PKG_HASH:=8d854adca14cf8f9dfdc5f49d564ab5521e99ea940aba10baae74ac327ada962

include $(INCLUDE_DIR)/package.mk

define Package/filebrowser
  SECTION:=utils
  CATEGORY:=Utilities
  TITLE:=Filebrowser — web-based file manager (arm64 prebuilt)
  URL:=https://github.com/filebrowser/filebrowser
endef

define Package/filebrowser/description
  A web-based file manager. This package ships the official prebuilt
  linux/arm64 binary (aarch64) for TYFZA1, because the Go+pnpm source
  buildchain is not available in the OpenWrt packages feed.
endef

define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
	tar -xzf $(DL_DIR)/$(PKG_SOURCE) -C $(PKG_BUILD_DIR)
endef

define Build/Compile
	true
endef

define Package/filebrowser/conffiles
/etc/config/filebrowser
endef

define Package/filebrowser/install
	$(INSTALL_DIR) $(1)/usr/bin $(1)/etc/init.d $(1)/etc/config
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/filebrowser $(1)/usr/bin/
	$(INSTALL_BIN) ./files/filebrowser.init $(1)/etc/init.d/filebrowser
	$(INSTALL_CONF) ./files/filebrowser.config $(1)/etc/config/filebrowser
endef

$(eval $(call BuildPackage,filebrowser))