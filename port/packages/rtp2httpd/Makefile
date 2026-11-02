include $(TOPDIR)/rules.mk

PKG_NAME:=rtp2httpd
PKG_VERSION:=3.17.2
PKG_RELEASE:=1
PKG_MAINTAINER:=Stackie Jia <jsq2627@gmail.com>
PKG_LICENSE:=GPL-2.0-or-later
PKG_LICENSE_FILES:=LICENSE

# PonWRT fork: player UI branded IPTV播放器; source pinned to the fork commit
# carrying the regenerated embedded web UI (see sources.lock.json).
PKG_SOURCE_REF:=d7cc99a
PKG_SOURCE:=rtp2httpd-$(PKG_VERSION).tar.gz
PKG_SOURCE_URL:=https://codeload.github.com/mayipashu/rtp2httpd/tar.gz/$(PKG_SOURCE_REF)?
PKG_HASH:=9d6e524f427813f91f4badf8d3c2b07138533c9805b1cd598d3530e0fa42daaa

# codeload commit archives extract into <repo>-<ref>/ while OpenWrt's default
# unpack (TAR_OPTIONS=-xf -) keeps that top-level directory.  Point the build
# directory at the directory that actually gets extracted, otherwise all
# $(PKG_BUILD_DIR)/... paths are empty and the build dies without output.
PKG_BUILD_DIR:=$(BUILD_DIR)/rtp2httpd-$(PKG_SOURCE_REF)

include $(INCLUDE_DIR)/package.mk

define Package/rtp2httpd
  SECTION:=net
  CATEGORY:=Network
  TITLE:=Multicast RTP/RTSP to Unicast HTTP stream converter, optimized for China IPTV
  URL:=https://github.com/stackia/rtp2httpd
endef

define Package/rtp2httpd/description
  rtp2httpd converts RTP/UDP/RTSP media into http stream.
  It acts as a tiny HTTP server. When client connect,
  pre-configured multicast RTP service is choosen by URL.
  Program then join pre-configured multicast address and translate
  incoming RTP data to HTTP stream.
endef

define Build/Compile
	@test -d $(PKG_BUILD_DIR)/src || { \
		echo "ERROR: rtp2httpd sources not unpacked into $(PKG_BUILD_DIR)" >&2; \
		exit 1; }
	mkdir -p $(PKG_INSTALL_DIR)/usr/bin
	$(TARGET_CC) $(TARGET_CFLAGS) -std=c11 -D_GNU_SOURCE \
		-DSYSCONFDIR='"/etc"' -DPACKAGE='"rtp2httpd"' -DVERSION='"$(PKG_VERSION)"' \
		-O3 -fstack-protector-strong -D_FORTIFY_SOURCE=2 \
		-I $(PKG_BUILD_DIR)/src \
		-o $(PKG_INSTALL_DIR)/usr/bin/rtp2httpd \
		$(filter-out %/poller_kqueue.c, $(wildcard $(PKG_BUILD_DIR)/src/*.c)) \
		$(wildcard $(PKG_BUILD_DIR)/src/vendor/hashmap/*.c) \
		$(wildcard $(PKG_BUILD_DIR)/src/vendor/md5/*.c) \
		$(wildcard $(PKG_BUILD_DIR)/src/vendor/picohttpparser/*.c) \
		-lpthread -lm
endef

define Package/rtp2httpd/conffiles
/etc/config/rtp2httpd
/etc/rtp2httpd.conf
endef

define Package/rtp2httpd/install
	$(INSTALL_DIR) $(1)/etc/init.d $(1)/etc/config $(1)/usr/bin
	$(INSTALL_CONF) ./files/rtp2httpd.conf $(1)/etc/config/rtp2httpd
	$(INSTALL_CONF) $(PKG_BUILD_DIR)/rtp2httpd.conf $(1)/etc
	$(INSTALL_BIN) ./files/rtp2httpd.init $(1)/etc/init.d/rtp2httpd
	$(INSTALL_BIN) $(PKG_INSTALL_DIR)/usr/bin/rtp2httpd $(1)/usr/bin
endef

$(eval $(call BuildPackage,rtp2httpd))
