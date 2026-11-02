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

# Source list mirrors CMakeLists.txt COMMON_SOURCES plus the Linux poller.
# It is spelled out on purpose: $(wildcard) is expanded while this Makefile is
# parsed, i.e. before Build/Prepare has unpacked the archive, so a wildcard
# based list is permanently baked as empty and the first build of a fresh tree
# dies with "no input files".
RTP2HTTPD_SOURCES := \
	src/rtp2httpd.c \
	src/supervisor.c \
	src/pid_file.c \
	src/configuration.c \
	src/access_log.c \
	src/http.c \
	src/http_headers.c \
	src/http_fetch.c \
	src/service.c \
	src/url_template.c \
	src/rtp.c \
	src/rtp_reorder.c \
	src/rtp_fec.c \
	src/rs_fec.c \
	src/multicast.c \
	src/fcc.c \
	src/fcc_telecom.c \
	src/fcc_huawei.c \
	src/stream.c \
	src/rtsp.c \
	src/http_chunked_decoder.c \
	src/http_proxy.c \
	src/http_proxy_rewrite.c \
	src/stun.c \
	src/snapshot.c \
	src/timezone.c \
	src/status.c \
	src/connection.c \
	src/worker.c \
	src/unix_socket.c \
	src/buffer_pool.c \
	src/send_queue.c \
	src/m3u.c \
	src/epg.c \
	src/embedded_web.c \
	src/utils.c \
	src/poller_epoll.c \
	src/vendor/hashmap/hashmap.c \
	src/vendor/md5/md5.c \
	src/vendor/picohttpparser/picohttpparser.c

define Build/Compile
	@test -f $(PKG_BUILD_DIR)/src/rtp2httpd.c || { \
		echo "ERROR: rtp2httpd sources not unpacked into $(PKG_BUILD_DIR)" >&2; \
		exit 1; }
	mkdir -p $(PKG_INSTALL_DIR)/usr/bin
	cd $(PKG_BUILD_DIR) && $(TARGET_CC) $(TARGET_CFLAGS) -std=c11 -D_GNU_SOURCE \
		-DSYSCONFDIR='"/etc"' -DPACKAGE='"rtp2httpd"' -DVERSION='"$(PKG_VERSION)"' \
		-O3 -fstack-protector-strong \
		-I src -o $(PKG_INSTALL_DIR)/usr/bin/rtp2httpd \
		$(addprefix $(PKG_BUILD_DIR)/,$(RTP2HTTPD_SOURCES)) \
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
