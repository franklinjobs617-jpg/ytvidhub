(function () {
  let isNavigating = false;
  let navigationTimeout = null;

  const originalReplaceState = window.history.replaceState;
  const originalPushState = window.history.pushState;

  window.history.replaceState = function (...args) {
    try {
      return originalReplaceState.apply(this, args);
    } catch (e) {
      // console.warn('History replaceState error:', e);
    }
  };

  window.history.pushState = function (...args) {
    try {
      const currentPath = window.location.pathname;
      const newPath = args[2]
        ? new URL(args[2], window.location.origin).pathname
        : currentPath;
      if (newPath !== currentPath) {
        isNavigating = true;
        if (navigationTimeout) clearTimeout(navigationTimeout);
        navigationTimeout = setTimeout(() => {
          isNavigating = false;
        }, 500);
      }
      return originalPushState.apply(this, args);
    } catch (e) {
      // console.warn('History pushState error:', e);
      return originalPushState.apply(this, args);
    }
  };

  window.addEventListener("popstate", () => {
    isNavigating = true;
    if (navigationTimeout) clearTimeout(navigationTimeout);
    navigationTimeout = setTimeout(() => {
      isNavigating = false;
    }, 500);
  });

  const CONTAINER_SELECTOR =
    "ins.adsbygoogle, div.adsbygoogle, ins[data-ad-slot][data-ad-client], div[data-ad-slot][data-ad-client], ins[data-anchor-status], ins[data-anchor-shown], ins[data-vignette-status], div[data-vignette-status], ins[data-ad-type], div[data-ad-type]";

  if (typeof window !== "undefined") {
    window.ttq = window.ttq || {};
    if (!window.ttq.track) {
      window.ttq.track = function (eventName, parameters) {
        // console.warn('TikTok pixel not loaded, event:', eventName, parameters);
      };
    }
  }

  class IframeTrackerInsert {
    constructor(resolution = 300) {
      this.resolution = resolution;
      this.iframes = [];
      this.interval = null;
      this.lastActiveElement = null;
      this.dataLayer = window.dataLayer || [];

      this.tikTokClickId = this.getTikTokClickId();

      // 配置选项
      this.config = {
        eventCooldown: 50, // 事件去重冷却时间（毫秒）- 缩短到50ms作为兜底
        clickCooldown: 1000, // 点击冷却时间（毫秒）- 主要防重复机制
        eventCleanupTime: 15000, // 事件记录清理时间（毫秒）
        enableDebug: false, // 是否启用调试模式
      };

      this.sentEvents = new Map();
      this.domObserver = null;

      setTimeout(() => {
        try {
          this.bindEvents();
          this.initHashTracking();
          this.initUnifiedDOMObserver();
          this.detectExistingVignetteAds();

          // 新增：轮询检测 iframe 聚焦
          this.interval = setInterval(() => this.checkClick(), this.resolution);
        } catch (e) {
          // console.warn('Ad tracker init error:', e);
        }
      }, 100);
    }

    getTikTokClickId() {
      const urlParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const clickIdParams = [
        "ttclid",
        "tt_click_id",
        "tt_clickid",
        "click_id",
        "clickid",
        "tt_cid",
        "cid",
        "tt_id",
        "tid",
        "tiktok_id",
        "tiktokid",
        "tt_click",
        "click",
        "tt_ref",
        "ref",
        "tt_source",
        "source",
      ];
      for (const param of clickIdParams) {
        const value = urlParams.get(param) || hashParams.get(param);
        if (value) return value;
      }
      return null;
    }

    isEventDuplicate(eventName, params = {}, eventKey = null) {
      const now = Date.now();
      const stableParams = { ...params };

      // 移除动态变化的参数
      delete stableParams.timestamp;
      delete stableParams.value;
      delete stableParams.currency;

      // 强制在eventKey中加入广告槽位和类型，确保不同广告的唯一性
      const adSlot = params.adSlot || params.adSlot || "unknown";
      const adType = params.ad_type || "generic";

      // 如果传入了eventKey，直接使用；否则创建基于参数的键
      let eventKeyToCheck;
      if (eventKey) {
        // 使用传入的eventKey，它已经包含了iframe的唯一标识
        eventKeyToCheck = eventKey;
      } else {
        // 创建基于参数的键，去掉时间戳，确保去重机制有效
        eventKeyToCheck = `${eventName}_${adSlot}_${adType}_${JSON.stringify(
          stableParams
        )}`;
      }

      const lastSentTime = this.sentEvents.get(eventKeyToCheck) || 0;

      if (now - lastSentTime < this.config.eventCooldown) return true;

      this.sentEvents.set(eventKeyToCheck, now);

      // 清理过期的事件记录
      for (const [key, time] of this.sentEvents.entries()) {
        if (now - time > this.config.eventCleanupTime)
          this.sentEvents.delete(key);
      }
      return false;
    }

    bindEvents() {
      try {
        document.addEventListener("click", (e) => this.handleClick(e), {
          passive: false,
          capture: true,
        });
      } catch (e) {
        // console.warn('Event binding error:', e);
      }
    }

    handleClick(e) {
      const target = e.target;
      const adContainer = this.findAdContainer(target);
      if (adContainer) {
        this.handleAdContainerClick(adContainer);
      }
    }

    findAdContainer(target) {
      const container = target.closest(CONTAINER_SELECTOR);
      if (container && this.isRealAd(container)) {
        return container;
      }
      return null;
    }

    handleAdContainerClick(adContainer) {
      const adSlot =
        adContainer.getAttribute("data-ad-slot") || "fallback-slot";
      const adType = adContainer.getAttribute("data-ad-type") || "generic";
      const iframe = adContainer.querySelector("iframe");

      if (!iframe) {
        return;
      }

      let match = this.iframes.find((f) => f.element === iframe);
      if (!match) {
        this.addIframe(iframe, adType);
        match = this.iframes.find((f) => f.element === iframe);
      }

      if (match) {
        const now = Date.now();
        const timeSinceLastClick = now - match.lastTriggered;
        const cooldownTime = this.config.clickCooldown;

        if (timeSinceLastClick < cooldownTime) {
          return;
        }

        const eventMap = {
          anchor: "clickButton",
          vignette: "clickButton",
          generic: "clickButton",
        };
        const eventName = eventMap[match.type] || "clickButton";

        const eventParams = {
          adSlot,
          ad_type: match.type,
          value: 0.01,
          currency: "USD",
          content_id: adSlot,
          content_type: "product",
        };
        if (this.tikTokClickId) eventParams.ttclid = this.tikTokClickId;

        // 创建基于iframe元素的唯一事件键
        const iframeId = this.getIframeUniqueId(iframe);
        const clickEventKey = `click_${adSlot}_${match.type}_${iframeId}`;

        if (!this.isEventDuplicate(eventName, eventParams, clickEventKey)) {
          this.sendTTQ(eventName, eventParams);
        }

        match.lastTriggered = now;
      }
    }

    // 获取iframe的唯一标识符
    getIframeUniqueId(iframe) {
      // 优先使用iframe的src作为唯一标识
      if (iframe.src) {
        return btoa(iframe.src).substring(0, 8);
      }

      // 如果没有src，使用iframe在页面中的位置信息
      const rect = iframe.getBoundingClientRect();
      const position = `${Math.round(rect.left)}_${Math.round(rect.top)}`;
      return btoa(position).substring(0, 8);
    }

    addIframe(iframe, type = "generic") {
      const existingIframe = this.iframes.find((f) => f.element === iframe);
      if (existingIframe) return;

      const adContainer = iframe.closest(CONTAINER_SELECTOR);
      const adSlot =
        adContainer?.getAttribute("data-ad-slot") || "unknown-slot";
      const adClient =
        adContainer?.getAttribute("data-ad-client") || "unknown-client";

      this.iframes.push({
        element: iframe,
        type,
        adSlot,
        adClient,
        addedTime: Date.now(),
        lastTriggered: 0,
      });
    }

    checkClick() {
      const ae = document.activeElement;
      if (ae && ae.tagName === "IFRAME" && ae !== this.lastActiveElement) {
        const container = ae.closest(CONTAINER_SELECTOR);
        if (container) {
          this.handleAdContainerClick(container);
        }
      }
      this.lastActiveElement = ae;
    }

    sendTTQ(name, params = {}) {
      try {
        if (window.ttq && typeof window.ttq.track === "function") {
          const payload = {
            value: 0.01,
            currency: "USD",
            content_type: name,
            content_id: params.content_id || params.adSlot || "unknown",
            ...params,
            timestamp: new Date().toISOString(),
          };
          if (this.tikTokClickId && !payload.ttclid)
            payload.ttclid = this.tikTokClickId;
          window.ttq.track(name, payload);
          if (window.dataLayer) {
            try {
              window.dataLayer.push({
                event: "tiktok_event_sent",
                event_name: name,
                event_params: payload,
              });
            } catch (e) {}
          }
        }
      } catch (e) {
        // console.warn('TikTok事件发送失败:', e);
      }
    }

    isRealAd(container) {
      if (!container) return false;
      const iframe = container.querySelector("iframe");
      if (!iframe) return false;
      const src = iframe.src || "";
      if (!(src.includes("googlesyndication") || src.includes("doubleclick")))
        return false;
      if (container.offsetWidth === 0 || container.offsetHeight === 0)
        return false;
      return true;
    }

    destroy() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
      if (this.domObserver) {
        this.domObserver.disconnect();
        this.domObserver = null;
      }
      this.iframes = [];
      this.sentEvents.clear();
    }

    // 更新配置选项
    updateConfig(newConfig) {
      if (newConfig && typeof newConfig === "object") {
        this.config = { ...this.config, ...newConfig };
        return true;
      }
      return false;
    }

    // 获取当前配置
    getConfig() {
      return { ...this.config };
    }

    // 初始化hash跟踪
    initHashTracking() {
      // 监听URL hash变化，检测插页广告
      window.addEventListener("hashchange", () => {
        if (location.hash === "#google_vignette") {
          // console.log('检测到插页广告hash变化');
          this.detectExistingVignetteAds();
        }
      });

      // 页面加载时检查
      if (location.hash === "#google_vignette") {
        // console.log('页面加载时检测到插页广告hash');
        setTimeout(() => this.detectExistingVignetteAds(), 1000);
      }
    }

    // 初始化统一的DOM观察器
    initUnifiedDOMObserver() {
      try {
        this.domObserver = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === "childList") {
              mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                  this.handleNewAdNode(node);
                }
              });
            } else if (mutation.type === "attributes") {
              if (
                mutation.attributeName === "data-vignette-status" ||
                mutation.attributeName === "data-anchor-status"
              ) {
                this.handleAdStatusChange(mutation.target);
              }
            }
          });
        });

        this.domObserver.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: [
            "data-vignette-status",
            "data-anchor-status",
            "data-ad-type",
          ],
        });
      } catch (e) {
        // console.warn('DOM观察器初始化失败:', e);
      }
    }

    // 检测现有的插页广告
    detectExistingVignetteAds() {
      try {
        // console.log('开始检测现有插页广告...');

        // 查找所有可能的插页广告容器
        const possibleContainers = document.querySelectorAll(
          "ins.adsbygoogle, div.adsbygoogle, ins[data-ad-slot], div[data-ad-slot]"
        );
        // console.log('找到可能的广告容器数量:', possibleContainers.length);

        possibleContainers.forEach((container, index) => {
          const iframes = container.querySelectorAll("iframe");
          if (iframes.length > 0) {
            const iframe = iframes[0];
            const rect = iframe.getBoundingClientRect();
            const isLargeAd = rect.width >= 300 && rect.height >= 250;
            const isCentered =
              Math.abs(rect.left - (window.innerWidth - rect.width) / 2) < 100;

            if (isLargeAd && isCentered) {
              // console.log(`找到插页广告容器 ${index + 1}:`, container);

              // 设置插页广告属性
              container.setAttribute("data-ad-type", "vignette");

              // 添加到iframe跟踪
              iframes.forEach((iframe) => this.addIframe(iframe, "vignette"));
            }
          }
        });
      } catch (e) {
        // console.warn('检测现有插页广告时出错:', e);
      }
    }

    // 处理新的广告节点
    handleNewAdNode(node) {
      try {
        // 检查是否是插页广告
        if (
          node.matches &&
          (node.matches("ins[data-vignette-status]") ||
            node.matches("div[data-vignette-status]") ||
            node.matches('ins[data-ad-type="vignette"]') ||
            node.matches('div[data-ad-type="vignette"]'))
        ) {
          // console.log('检测到新的插页广告节点:', node);
          node.setAttribute("data-ad-type", "vignette");

          const iframes = node.querySelectorAll("iframe");
          iframes.forEach((iframe) => this.addIframe(iframe, "vignette"));
        }

        // 检查是否包含iframe的广告容器
        if (node.matches && node.matches(CONTAINER_SELECTOR)) {
          node
            .querySelectorAll("iframe")
            .forEach((iframe) => this.addIframe(iframe, "generic"));
        }
        node
          .querySelectorAll?.(CONTAINER_SELECTOR + " iframe")
          ?.forEach((iframe) => this.addIframe(iframe, "generic"));
      } catch (e) {
        // console.warn('处理新广告节点时出错:', e);
      }
    }

    // 处理广告状态变化
    handleAdStatusChange(adElement) {
      try {
        const vignetteStatus = adElement.getAttribute("data-vignette-status");
        const anchorStatus = adElement.getAttribute("data-anchor-status");

        if (vignetteStatus === "displayed") {
          // console.log('插页广告状态变为displayed:', adElement);
          adElement.setAttribute("data-ad-type", "vignette");

          const iframes = adElement.querySelectorAll("iframe");
          iframes.forEach((iframe) => this.addIframe(iframe, "vignette"));
        } else if (anchorStatus === "displayed") {
          // console.log('锚定广告状态变为displayed:', adElement);
          adElement.setAttribute("data-ad-type", "anchor");

          const iframes = adElement.querySelectorAll("iframe");
          iframes.forEach((iframe) => this.addIframe(iframe, "anchor"));
        }
      } catch (e) {
        // console.warn('处理广告状态变化时出错:', e);
      }
    }
  }

  if (!window.adTracker) {
    window.adTracker = new IframeTrackerInsert();

    // 暴露配置管理方法
    window.updateAdTrackerConfig = (config) =>
      window.adTracker.updateConfig(config);
    window.getAdTrackerConfig = () => window.adTracker.getConfig();

    // 暴露测试方法（注释掉，生产环境不需要）
    // window.testVignetteAd = () => {
    //     console.log('=== 插页广告测试 ===');
    //     console.log('当前iframe数量:', window.adTracker.iframes.length);
    //     console.log('iframe列表:', window.adTracker.iframes);

    //     const vignetteContainers = document.querySelectorAll('[data-ad-type="vignette"]');
    //     console.log('插页广告容器数量:', vignetteContainers.length);
    //     vignetteContainers.forEach((container, index) => {
    //         console.log(`插页广告容器 ${index + 1}:`, {
    //             tagName: container.tagName,
    //             className: container.className,
    //             adType: container.getAttribute('data-ad-type'),
    //             adSlot: container.getAttribute('data-ad-slot'),
    //             iframeCount: container.querySelectorAll('iframe').length
    //         });
    //     });

    //     console.log('URL hash:', location.hash);
    //     console.log('=== 测试完成 ===');
    // };

    // window.forceVignetteEvent = () => {
    //     console.log('强制发送插页广告事件...');
    //     if (window.adTracker && window.adTracker.sendTTQ) {
    //         window.adTracker.sendTTQ('ViewContent', {
    //             adSlot: 'test-vignette-slot',
    //             ad_type: 'vignette',
    //             value: 0.01,
    //             currency: 'USD'
    //         });
    //     }
    // };

    window.addEventListener("beforeunload", () => {
      if (window.adTracker) window.adTracker.destroy();
    });
  }
})();
