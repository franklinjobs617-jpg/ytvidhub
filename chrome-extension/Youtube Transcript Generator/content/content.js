(function () {
  if (window.__ytSubtitleExtractorLoaded) {
    return;
  }
  window.__ytSubtitleExtractorLoaded = true;

  const subtitleCache = new Map();
  let uiMounted = false;
  let lastWatchUrl = "";
  let currentData = null;
  let lastQuotaRedirectAt = 0;

  function isWatchUrl(rawUrl) {
    try {
      const parsed = new URL(rawUrl);
      const host = parsed.hostname.toLowerCase();
      if (!["youtube.com", "www.youtube.com", "m.youtube.com", "music.youtube.com"].includes(host)) {
        return false;
      }
      if (parsed.pathname !== "/watch") {
        return false;
      }
      const videoId = (parsed.searchParams.get("v") || "").trim();
      return Boolean(videoId);
    } catch (error) {
      return false;
    }
  }

  function getNormalizedWatchUrl(rawUrl = window.location.href) {
    if (!isWatchUrl(rawUrl)) {
      return "";
    }
    const parsed = new URL(rawUrl);
    const videoId = (parsed.searchParams.get("v") || "").trim();
    return `${parsed.origin}/watch?v=${encodeURIComponent(videoId)}`;
  }

  function getElements() {
    return {
      launcher: document.getElementById("ytse-launcher"),
      panel: document.getElementById("ytse-panel"),
      openBtn: document.getElementById("ytse-open-btn"),
      closeBtn: document.getElementById("ytse-close-btn"),
      retryBtn: document.getElementById("ytse-retry-btn"),
      langSelect: document.getElementById("ytse-lang"),
      txtBtn: document.getElementById("ytse-download-txt"),
      srtBtn: document.getElementById("ytse-download-srt"),
      quotaGoBtn: document.getElementById("ytse-go-website"),
      stateIdle: document.getElementById("ytse-state-idle"),
      stateUnsupported: document.getElementById("ytse-state-unsupported"),
      stateLoading: document.getElementById("ytse-state-loading"),
      stateError: document.getElementById("ytse-state-error"),
      stateQuota: document.getElementById("ytse-state-quota"),
      stateResult: document.getElementById("ytse-state-result"),
      errorText: document.getElementById("ytse-error-text"),
      quotaText: document.getElementById("ytse-quota-text"),
      videoText: document.getElementById("ytse-video-url"),
      quotaMeta: document.getElementById("ytse-quota-meta"),
      subtitleText: document.getElementById("ytse-subtitle-text")
    };
  }

  function setSectionVisible(sectionId) {
    const ids = [
      "ytse-state-idle",
      "ytse-state-unsupported",
      "ytse-state-loading",
      "ytse-state-error",
      "ytse-state-quota",
      "ytse-state-result"
    ];
    ids.forEach((id) => {
      const node = document.getElementById(id);
      if (node) {
        node.hidden = id !== sectionId;
      }
    });
  }

  function setDownloadButtonsEnabled(enabled) {
    const { txtBtn, srtBtn } = getElements();
    if (txtBtn) {
      txtBtn.disabled = !enabled;
    }
    if (srtBtn) {
      srtBtn.disabled = !enabled;
    }
  }

  function triggerDownload(content, filename) {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(blobUrl);
  }

  function ensureUi() {
    if (uiMounted) {
      return;
    }
    const root = document.createElement("div");
    root.id = "ytse-root";
    root.innerHTML = `
      <button id="ytse-launcher" class="ytse-launcher" type="button" aria-label="Open subtitle panel">
        <span class="ytse-launcher-text">SUB</span>
      </button>

      <aside id="ytse-panel" class="ytse-panel" aria-hidden="true">
        <div class="ytse-panel-header">
          <div class="ytse-title-wrap">
            <h3>YouTube Subtitle Extractor</h3>
          </div>
          <button id="ytse-close-btn" class="ytse-icon-btn" type="button" aria-label="Close panel">✕</button>
        </div>

        <div class="ytse-toolbar">
          <label for="ytse-lang">Lang</label>
          <select id="ytse-lang">
            <option value="en">English</option>
            <option value="zh-CN">中文 (简体)</option>
            <option value="zh-TW">中文 (繁體)</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
          </select>
          <button id="ytse-open-btn" class="ytse-primary-btn" type="button">Extract</button>
        </div>

        <div class="ytse-meta">
          <span id="ytse-video-url"></span>
          <span id="ytse-quota-meta"></span>
        </div>

        <section id="ytse-state-idle" class="ytse-state">
          <p>Open a YouTube watch page and click Extract.</p>
        </section>

        <section id="ytse-state-unsupported" class="ytse-state" hidden>
          <p>Only YouTube watch pages are supported.</p>
          <p class="ytse-tip">Example: youtube.com/watch?v=...</p>
        </section>

        <section id="ytse-state-loading" class="ytse-state" hidden>
          <div class="ytse-skeleton-line"></div>
          <div class="ytse-skeleton-line"></div>
          <div class="ytse-skeleton-line short"></div>
        </section>

        <section id="ytse-state-error" class="ytse-state" hidden>
          <p id="ytse-error-text">Something went wrong.</p>
          <button id="ytse-retry-btn" class="ytse-secondary-btn" type="button">Retry</button>
        </section>

        <section id="ytse-state-quota" class="ytse-state" hidden>
          <p id="ytse-quota-text">Continue free on website.</p>
          <button id="ytse-go-website" class="ytse-primary-btn" type="button">Continue on website</button>
        </section>

        <section id="ytse-state-result" class="ytse-state" hidden>
          <div class="ytse-download-row">
            <button id="ytse-download-txt" class="ytse-secondary-btn" type="button" disabled>Download TXT</button>
            <button id="ytse-download-srt" class="ytse-secondary-btn" type="button" disabled>Download SRT</button>
          </div>
          <pre id="ytse-subtitle-text"></pre>
        </section>
      </aside>
    `;
    document.documentElement.appendChild(root);
    uiMounted = true;
    bindEvents();
    refreshByUrl();
  }

  function togglePanel(nextOpen) {
    ensureUi();
    const { panel } = getElements();
    if (!panel) {
      return;
    }
    const shouldOpen = typeof nextOpen === "boolean" ? nextOpen : !panel.classList.contains("ytse-open");
    panel.classList.toggle("ytse-open", shouldOpen);
    panel.setAttribute("aria-hidden", shouldOpen ? "false" : "true");
    if (shouldOpen) {
      loadSubtitle({ force: false });
    }
  }

  function updateHeaderMeta(_quota) {
    const { videoText, quotaMeta } = getElements();
    const watchUrl = getNormalizedWatchUrl();
    if (videoText) {
      videoText.textContent = watchUrl ? watchUrl : "Not on watch page";
    }
    if (quotaMeta) {
      quotaMeta.textContent = "Free subtitle extraction";
    }
  }

  function showError(message) {
    const { errorText } = getElements();
    if (errorText) {
      errorText.textContent = message || "Request failed";
    }
    setDownloadButtonsEnabled(false);
    setSectionVisible("ytse-state-error");
  }

  function showQuotaError(result) {
    const { quotaText, quotaGoBtn } = getElements();
    if (quotaText) {
      quotaText.textContent = "Current free channel is busy. Continue for free on ytvidhub.";
    }
    if (quotaGoBtn) {
      quotaGoBtn.dataset.url = result?.redirect_url || "https://ytvidhub.com";
    }
    setDownloadButtonsEnabled(false);
    setSectionVisible("ytse-state-quota");
  }

  function buildWebsiteRedirectUrl(baseUrl, watchUrl, lang) {
    const fallbackBase = "https://ytvidhub.com/";
    const sourceBase = baseUrl || fallbackBase;
    try {
      const target = new URL(sourceBase);
      target.searchParams.set("youtube_url", watchUrl);
      target.searchParams.set("lang", lang || "en");
      target.searchParams.set("src", "chrome_ext");
      target.searchParams.set("reason", "quota");
      target.searchParams.set("auto_start", "1");
      return target.toString();
    } catch (error) {
      const params = new URLSearchParams();
      params.set("youtube_url", watchUrl);
      params.set("lang", lang || "en");
      params.set("src", "chrome_ext");
      params.set("reason", "quota");
      params.set("auto_start", "1");
      return `${fallbackBase}?${params.toString()}`;
    }
  }

  async function redirectToWebsiteOnQuota(result, watchUrl, lang) {
    const now = Date.now();
    if (now - lastQuotaRedirectAt < 12000) {
      return;
    }
    lastQuotaRedirectAt = now;
    const redirectUrl = buildWebsiteRedirectUrl(result?.redirect_url, watchUrl, lang);
    try {
      await chrome.runtime.sendMessage({ type: "YT_SUBTITLE_OPEN_URL", url: redirectUrl });
    } catch (error) {
      window.open(redirectUrl, "_blank", "noopener,noreferrer");
    }
  }

  function renderResult(data) {
    currentData = data;
    const { subtitleText } = getElements();
    if (subtitleText) {
      subtitleText.textContent = (data?.subtitle_txt || "").trim() || "(No subtitle text returned)";
    }
    setDownloadButtonsEnabled(true);
    updateHeaderMeta(data?.quota);
    setSectionVisible("ytse-state-result");
  }

  async function loadSubtitle({ force = false } = {}) {
    ensureUi();
    const { langSelect } = getElements();
    const watchUrl = getNormalizedWatchUrl();
    if (!watchUrl) {
      currentData = null;
      updateHeaderMeta(null);
      setDownloadButtonsEnabled(false);
      setSectionVisible("ytse-state-unsupported");
      return;
    }

    const lang = (langSelect?.value || "en").trim();
    const cacheKey = `${watchUrl}|${lang}`;
    if (!force && subtitleCache.has(cacheKey)) {
      renderResult(subtitleCache.get(cacheKey));
      return;
    }

    currentData = null;
    setDownloadButtonsEnabled(false);
    updateHeaderMeta(null);
    setSectionVisible("ytse-state-loading");

    const result = await chrome.runtime.sendMessage({
      type: "YT_SUBTITLE_FETCH",
      payload: {
        url: watchUrl,
        lang
      }
    });

    if (!result || result.ok === false) {
      if (result?.code === "QUOTA_EXCEEDED") {
        await redirectToWebsiteOnQuota(result, watchUrl, lang);
        togglePanel(false);
        return;
      }
      showError(result?.message || "Unable to fetch subtitles.");
      return;
    }

    subtitleCache.set(cacheKey, result.data);
    renderResult(result.data);
  }

  function refreshByUrl() {
    ensureUi();
    const { launcher, panel } = getElements();
    const watchUrl = getNormalizedWatchUrl();
    if (launcher) {
      launcher.style.display = watchUrl ? "flex" : "none";
    }
    if (!watchUrl && panel?.classList.contains("ytse-open")) {
      loadSubtitle({ force: false });
    }
  }

  function bindEvents() {
    const {
      launcher,
      openBtn,
      closeBtn,
      retryBtn,
      langSelect,
      txtBtn,
      srtBtn,
      quotaGoBtn
    } = getElements();

    launcher?.addEventListener("click", () => togglePanel());
    openBtn?.addEventListener("click", () => loadSubtitle({ force: true }));
    closeBtn?.addEventListener("click", () => togglePanel(false));
    retryBtn?.addEventListener("click", () => loadSubtitle({ force: true }));
    langSelect?.addEventListener("change", () => loadSubtitle({ force: false }));

    txtBtn?.addEventListener("click", () => {
      if (!currentData?.subtitle_txt) {
        return;
      }
      const filenameBase = currentData?.filename_base || "youtube-subtitle";
      triggerDownload(currentData.subtitle_txt, `${filenameBase}.txt`);
    });

    srtBtn?.addEventListener("click", () => {
      if (!currentData?.subtitle_srt) {
        return;
      }
      const filenameBase = currentData?.filename_base || "youtube-subtitle";
      triggerDownload(currentData.subtitle_srt, `${filenameBase}.srt`);
    });

    quotaGoBtn?.addEventListener("click", () => {
      const url = quotaGoBtn.dataset.url || "https://ytvidhub.com";
      chrome.runtime.sendMessage({ type: "YT_SUBTITLE_OPEN_URL", url });
    });
  }

  chrome.runtime.onMessage.addListener((message) => {
    if (message?.type === "YT_SUBTITLE_TOGGLE_PANEL") {
      togglePanel();
    }
  });

  function observeUrlChanges() {
    setInterval(() => {
      const currentWatchUrl = getNormalizedWatchUrl();
      if (currentWatchUrl !== lastWatchUrl) {
        lastWatchUrl = currentWatchUrl;
        refreshByUrl();
      }
    }, 600);
  }

  ensureUi();
  observeUrlChanges();
})();
