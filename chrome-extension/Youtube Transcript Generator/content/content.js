(function () {
  if (window.__ytSubtitleExtractorLoaded) {
    return;
  }
  window.__ytSubtitleExtractorLoaded = true;

  const subtitleCache = new Map();
  const languageOptionsCache = new Map();
  let uiMounted = false;
  let lastWatchUrl = "";
  let currentData = null;
  let latestLanguageRequestToken = 0;
  let subtitleSegments = [];
  let activeSegmentIndex = -1;
  let syncIntervalId = null;
  let feedbackTimerId = null;
  let learningModeEnabled = true;
  let autoFollowEnabled = true;

  const SYNC_INTERVAL_MS = 250;
  const LANG_LABELS = {
    en: "English",
    "en-US": "English (US)",
    "en-GB": "English (UK)",
    "en-orig": "English (Original)",
    zh: "Chinese",
    "zh-CN": "Chinese (Simplified)",
    "zh-Hans": "Chinese (Simplified)",
    "zh-Hant": "Chinese (Traditional)",
    "zh-TW": "Chinese (Traditional)",
    es: "Spanish",
    fr: "French",
    de: "German",
    ja: "Japanese",
    ko: "Korean",
  };

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

  function getWatchVideoId(rawUrl = window.location.href) {
    if (!isWatchUrl(rawUrl)) {
      return "";
    }
    const parsed = new URL(rawUrl);
    return (parsed.searchParams.get("v") || "").trim();
  }

  function stripHtml(value) {
    return (value || "")
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<")
      .trim();
  }

  function normalizeWhitespace(value) {
    return (value || "").replace(/\s+/g, " ").trim();
  }

  function parseTimestampToSeconds(timestamp) {
    const normalized = (timestamp || "").replace(",", ".").trim();
    const parts = normalized.split(":");
    if (parts.length !== 3) {
      return 0;
    }
    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);
    const seconds = Number(parts[2]);
    if (!Number.isFinite(hours) || !Number.isFinite(minutes) || !Number.isFinite(seconds)) {
      return 0;
    }
    return (hours * 3600) + (minutes * 60) + seconds;
  }

  function formatClock(totalSeconds) {
    if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
      return "00:00";
    }
    const whole = Math.floor(totalSeconds);
    const hours = Math.floor(whole / 3600);
    const minutes = Math.floor((whole % 3600) / 60);
    const seconds = whole % 60;
    if (hours > 0) {
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function parseSrtToSegments(srtContent) {
    const input = (srtContent || "").trim();
    if (!input) {
      return [];
    }

    const blocks = input.split(/\r?\n\r?\n/);
    const segments = [];

    for (let index = 0; index < blocks.length; index += 1) {
      const lines = blocks[index]
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

      if (!lines.length) {
        continue;
      }

      const timingLine = lines.find((line) => line.includes("-->"));
      if (!timingLine) {
        continue;
      }

      const timingMatch = timingLine.match(
        /(\d{2}:\d{2}:\d{2}[,.]\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}[,.]\d{3})/
      );

      if (!timingMatch) {
        continue;
      }

      const start = parseTimestampToSeconds(timingMatch[1]);
      const end = parseTimestampToSeconds(timingMatch[2]);
      const textLines = lines.filter(
        (line) => line !== timingLine && !/^\d+$/.test(line)
      );
      const text = normalizeWhitespace(stripHtml(textLines.join(" ")));

      if (!text) {
        continue;
      }

      segments.push({
        id: `seg-${index}`,
        start,
        end: end > start ? end : start + 0.8,
        label: formatClock(start),
        text,
      });
    }

    return segments;
  }

  function getVideoElement() {
    return document.querySelector("video.html5-main-video, video");
  }

  function getReadableDocumentTitle() {
    const rawTitle = (document.title || "").trim();
    if (!rawTitle) {
      return "Current YouTube Video";
    }
    return rawTitle.replace(/\s*-\s*YouTube$/i, "").trim();
  }

  function getFallbackLanguageOptions() {
    return [
      { code: "en", label: "English", is_auto: false },
      { code: "zh-CN", label: "Chinese (Simplified)", is_auto: false },
      { code: "zh-TW", label: "Chinese (Traditional)", is_auto: false },
      { code: "es", label: "Spanish", is_auto: false },
      { code: "fr", label: "French", is_auto: false },
      { code: "de", label: "German", is_auto: false },
      { code: "ja", label: "Japanese", is_auto: false },
      { code: "ko", label: "Korean", is_auto: false },
    ];
  }

  function normalizeLanguageOptions(rawLanguages) {
    const source = Array.isArray(rawLanguages) && rawLanguages.length
      ? rawLanguages
      : getFallbackLanguageOptions();

    const map = new Map();
    source.forEach((item) => {
      const code = String(item?.code || "").trim();
      if (!code) {
        return;
      }
      const rawLabel = String(item?.label || item?.name || LANG_LABELS[code] || code).trim();
      const isAuto = Boolean(item?.is_auto);
      const label = isAuto && !/\bauto\b/i.test(rawLabel) ? `${rawLabel} (Auto)` : rawLabel;

      if (!map.has(code)) {
        map.set(code, { code, label, is_auto: isAuto });
        return;
      }

      const existing = map.get(code);
      if (existing?.is_auto && !isAuto) {
        map.set(code, { code, label, is_auto: isAuto });
      }
    });

    return Array.from(map.values());
  }

  function resolveDefaultLanguageCode(defaultLang, options, previousLang = "") {
    if (!options.length) {
      return "en";
    }
    if (previousLang && options.some((item) => item.code === previousLang)) {
      return previousLang;
    }
    if (defaultLang && options.some((item) => item.code === defaultLang)) {
      return defaultLang;
    }

    const english = options.find((item) => ["en", "en-US", "en-GB", "en-orig"].includes(item.code));
    if (english) {
      return english.code;
    }

    return options[0].code;
  }

  function renderLanguageOptions(options, defaultLang = "", keepSelection = true) {
    const { langSelect } = getElements();
    if (!langSelect) {
      return;
    }

    const safeOptions = options.length ? options : getFallbackLanguageOptions();
    const previous = keepSelection ? String(langSelect.value || "").trim() : "";
    const selectedCode = resolveDefaultLanguageCode(defaultLang, safeOptions, previous);

    langSelect.innerHTML = "";
    safeOptions.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.code;
      option.textContent = item.label || item.code;
      langSelect.appendChild(option);
    });
    langSelect.value = selectedCode;
  }

  async function ensureLanguageOptionsLoaded({ force = false } = {}) {
    const watchUrl = getNormalizedWatchUrl();
    if (!watchUrl) {
      renderLanguageOptions(getFallbackLanguageOptions(), "en", false);
      return;
    }

    if (!force && languageOptionsCache.has(watchUrl)) {
      const cached = languageOptionsCache.get(watchUrl);
      renderLanguageOptions(cached.languages, cached.defaultLang, true);
      return;
    }

    const requestToken = Date.now() + Math.random();
    latestLanguageRequestToken = requestToken;

    let result = null;
    try {
      result = await chrome.runtime.sendMessage({
        type: "YT_SUBTITLE_VIDEO_INFO",
        payload: { url: watchUrl },
      });
    } catch (error) {
      result = null;
    }

    if (latestLanguageRequestToken !== requestToken) {
      return;
    }

    const options = normalizeLanguageOptions(result?.data?.languages);
    const defaultLang = String(result?.data?.default_lang || "").trim();
    languageOptionsCache.set(watchUrl, { languages: options, defaultLang });
    renderLanguageOptions(options, defaultLang, true);
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
      copyBtn: document.getElementById("ytse-copy-txt"),
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
      statusBadge: document.getElementById("ytse-status-badge"),
      feedback: document.getElementById("ytse-feedback"),
      subtitleText: document.getElementById("ytse-subtitle-text"),
      transcriptList: document.getElementById("ytse-transcript-list"),
      learningToggle: document.getElementById("ytse-learning-mode"),
      autoFollowToggle: document.getElementById("ytse-autofollow"),
      focusTime: document.getElementById("ytse-focus-time"),
      focusText: document.getElementById("ytse-focus-text"),
      videoCard: document.getElementById("ytse-video-card"),
      videoThumb: document.getElementById("ytse-video-thumb"),
      videoTitle: document.getElementById("ytse-video-title"),
      videoMeta: document.getElementById("ytse-video-meta"),
    };
  }

  function setSectionVisible(sectionId) {
    const ids = [
      "ytse-state-idle",
      "ytse-state-unsupported",
      "ytse-state-loading",
      "ytse-state-error",
      "ytse-state-quota",
      "ytse-state-result",
    ];
    ids.forEach((id) => {
      const node = document.getElementById(id);
      if (node) {
        node.hidden = id !== sectionId;
      }
    });
  }

  function setDownloadButtonsEnabled(enabled) {
    const { txtBtn, srtBtn, copyBtn } = getElements();
    if (txtBtn) {
      txtBtn.disabled = !enabled;
    }
    if (srtBtn) {
      srtBtn.disabled = !enabled;
    }
    if (copyBtn) {
      copyBtn.disabled = !enabled;
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

  function setStatusBadge(text, tone = "neutral") {
    const { statusBadge } = getElements();
    if (!statusBadge) {
      return;
    }
    statusBadge.textContent = text;
    statusBadge.dataset.tone = tone;
  }

  function setFeedback(type, title, detail = "", sticky = false) {
    const { feedback } = getElements();
    if (!feedback) {
      return;
    }
    if (feedbackTimerId) {
      clearTimeout(feedbackTimerId);
      feedbackTimerId = null;
    }
    feedback.hidden = false;
    feedback.className = `ytse-feedback ytse-feedback-${type}`;
    feedback.innerHTML = `
      <p class="ytse-feedback-title">${title}</p>
      ${detail ? `<p class="ytse-feedback-detail">${detail}</p>` : ""}
    `;
    if (!sticky) {
      feedbackTimerId = setTimeout(() => {
        const latest = getElements().feedback;
        if (latest) {
          latest.hidden = true;
        }
      }, 5000);
    }
  }

  function clearFeedback() {
    const { feedback } = getElements();
    if (!feedback) {
      return;
    }
    if (feedbackTimerId) {
      clearTimeout(feedbackTimerId);
      feedbackTimerId = null;
    }
    feedback.hidden = true;
  }

  function updateVideoCard(langCode = "en") {
    const { videoCard, videoThumb, videoTitle, videoMeta, langSelect } = getElements();
    if (!videoCard || !videoThumb || !videoTitle || !videoMeta) {
      return;
    }
    const watchUrl = getNormalizedWatchUrl();
    const videoId = getWatchVideoId();
    if (!watchUrl || !videoId) {
      videoCard.hidden = true;
      return;
    }

    videoCard.hidden = false;
    videoThumb.src = `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg`;
    videoThumb.alt = "YouTube video thumbnail";
    videoTitle.textContent = getReadableDocumentTitle();

    const video = getVideoElement();
    const duration = video && Number.isFinite(video.duration) ? formatClock(video.duration) : "Unknown duration";
    const selectedLabel = langSelect?.selectedOptions?.[0]?.textContent?.trim();
    const langLabel = selectedLabel || LANG_LABELS[langCode] || langCode || "English";
    videoMeta.textContent = `${duration} | ${langLabel}`;
  }

  function updateHeaderMeta() {
    const { videoText, quotaMeta, langSelect } = getElements();
    const watchUrl = getNormalizedWatchUrl();
    if (videoText) {
      videoText.textContent = watchUrl ? watchUrl : "Open a YouTube watch page";
    }
    if (quotaMeta) {
      const langCode = (langSelect?.value || "en").trim();
      const selectedLabel = langSelect?.selectedOptions?.[0]?.textContent?.trim();
      const langLabel = selectedLabel || LANG_LABELS[langCode] || langCode;
      quotaMeta.textContent = `Language: ${langLabel}`;
    }
    updateVideoCard((langSelect?.value || "en").trim());
  }

  function getFriendlyErrorMessage(result) {
    if (!result) {
      return "Request failed. Please try again.";
    }
    const code = result.code || "";
    if (code === "SUBTITLE_NOT_AVAILABLE") {
      return "No subtitles are available for this video in the selected language. Try another language.";
    }
    if (code === "INVALID_YOUTUBE_WATCH_URL") {
      return "This page is not a valid YouTube watch URL.";
    }
    if (code === "NETWORK_ERROR") {
      return "Network request failed. Check your connection and retry.";
    }
    if (code === "MISSING_URL") {
      return "Video URL is missing. Refresh the page and try again.";
    }
    return result.message || "Unable to fetch subtitles right now.";
  }

  function showError(message) {
    const { errorText } = getElements();
    if (errorText) {
      errorText.textContent = message || "Request failed";
    }
    setStatusBadge("Request failed", "error");
    setFeedback("error", "Extraction failed", message || "Please retry in a moment.", true);
    setDownloadButtonsEnabled(false);
    setSectionVisible("ytse-state-error");
  }

  function showQuotaError(result) {
    const { quotaText, quotaGoBtn } = getElements();
    if (quotaText) {
      quotaText.textContent =
        "Extension free slots are currently busy. Continue instantly on ytvidhub with this video prefilled.";
    }
    if (quotaGoBtn) {
      quotaGoBtn.dataset.url = result?.redirect_url || "https://ytvidhub.com";
    }
    setStatusBadge("Continue on website", "warning");
    setFeedback("warning", "Free channel busy", "Click Continue on ytvidhub to keep extracting this video.", true);
    setDownloadButtonsEnabled(false);
    setSectionVisible("ytse-state-quota");
  }

  function renderRawSubtitle(text) {
    const { subtitleText } = getElements();
    if (!subtitleText) {
      return;
    }
    subtitleText.hidden = false;
    subtitleText.textContent = (text || "").trim() || "(No subtitle text returned)";
  }

  function setPanelLearningMode(enabled) {
    learningModeEnabled = Boolean(enabled);
    const { panel, learningToggle } = getElements();
    if (learningToggle) {
      learningToggle.checked = learningModeEnabled;
    }
    if (panel) {
      panel.classList.toggle("ytse-learning-mode", learningModeEnabled);
    }
  }

  function setPanelAutoFollow(enabled) {
    autoFollowEnabled = Boolean(enabled);
    const { autoFollowToggle } = getElements();
    if (autoFollowToggle) {
      autoFollowToggle.checked = autoFollowEnabled;
    }
  }

  function updateFocusCard(index) {
    const { focusTime, focusText } = getElements();
    if (!focusTime || !focusText) {
      return;
    }
    if (index < 0 || !subtitleSegments[index]) {
      focusTime.textContent = "--:--";
      focusText.textContent = "Play the YouTube video to see real-time subtitle highlights.";
      return;
    }
    const segment = subtitleSegments[index];
    focusTime.textContent = segment.label;
    focusText.textContent = segment.text;
  }

  function setActiveSegment(index, source = "sync") {
    const { transcriptList } = getElements();
    if (!transcriptList) {
      return;
    }

    if (index === activeSegmentIndex) {
      return;
    }

    const previousNode = transcriptList.querySelector(`[data-index="${activeSegmentIndex}"]`);
    if (previousNode) {
      previousNode.classList.remove("ytse-line-active");
    }

    activeSegmentIndex = index;
    updateFocusCard(index);

    const activeNode = transcriptList.querySelector(`[data-index="${index}"]`);
    if (activeNode) {
      activeNode.classList.add("ytse-line-active");
      if (autoFollowEnabled && source === "sync") {
        activeNode.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }
  }

  function findSegmentIndexByTime(currentSeconds) {
    if (!subtitleSegments.length) {
      return -1;
    }

    let low = 0;
    let high = subtitleSegments.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const segment = subtitleSegments[mid];
      if (currentSeconds < segment.start) {
        high = mid - 1;
      } else if (currentSeconds > segment.end) {
        low = mid + 1;
      } else {
        return mid;
      }
    }

    const fallbackIndex = Math.max(0, Math.min(subtitleSegments.length - 1, high));
    const fallback = subtitleSegments[fallbackIndex];
    if (fallback && Math.abs(currentSeconds - fallback.start) <= 1.5) {
      return fallbackIndex;
    }
    return -1;
  }

  function syncHighlightWithVideo() {
    if (!subtitleSegments.length) {
      return;
    }
    const video = getVideoElement();
    if (!video) {
      return;
    }
    const index = findSegmentIndexByTime(video.currentTime);
    if (index !== -1) {
      setActiveSegment(index, "sync");
    }
  }

  function stopSyncLoop() {
    if (syncIntervalId) {
      clearInterval(syncIntervalId);
      syncIntervalId = null;
    }
    activeSegmentIndex = -1;
    updateFocusCard(-1);
  }

  function startSyncLoop() {
    stopSyncLoop();
    if (!subtitleSegments.length) {
      return;
    }
    syncIntervalId = setInterval(syncHighlightWithVideo, SYNC_INTERVAL_MS);
    syncHighlightWithVideo();
  }

  function jumpVideoToSegment(segmentIndex) {
    const segment = subtitleSegments[segmentIndex];
    if (!segment) {
      return;
    }
    const video = getVideoElement();
    if (!video) {
      setFeedback("warning", "Video player not found", "Open this panel on an active YouTube watch page.", false);
      return;
    }
    video.currentTime = Math.max(0, segment.start + 0.02);
    setActiveSegment(segmentIndex, "click");
  }

  function renderTranscriptList() {
    const { transcriptList, subtitleText } = getElements();
    if (!transcriptList || !subtitleText) {
      return;
    }

    transcriptList.innerHTML = "";
    subtitleText.hidden = true;

    if (!subtitleSegments.length) {
      transcriptList.innerHTML = `<div class="ytse-empty-transcript">Timestamped subtitles are unavailable. Showing plain text view.</div>`;
      renderRawSubtitle(currentData?.subtitle_txt || "");
      return;
    }

    const fragment = document.createDocumentFragment();
    subtitleSegments.forEach((segment, index) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "ytse-line";
      row.dataset.index = String(index);
      row.innerHTML = `
        <span class="ytse-line-time">${segment.label}</span>
        <span class="ytse-line-text">${segment.text}</span>
      `;
      row.addEventListener("click", () => jumpVideoToSegment(index));
      fragment.appendChild(row);
    });

    transcriptList.appendChild(fragment);
    updateFocusCard(-1);
  }

  function renderResult(data) {
    currentData = data || null;
    subtitleSegments = parseSrtToSegments(currentData?.subtitle_srt || "");
    renderTranscriptList();
    setDownloadButtonsEnabled(Boolean(currentData?.subtitle_txt || currentData?.subtitle_srt));
    updateHeaderMeta();
    setStatusBadge("Ready to download", "success");
    setFeedback(
      "success",
      "Subtitles ready",
      subtitleSegments.length
        ? "Playback-sync highlighting is enabled. Click any sentence to jump."
        : "Subtitle text is ready. Download TXT or SRT below.",
      false
    );
    setSectionVisible("ytse-state-result");
    startSyncLoop();
  }

  function ensureUi() {
    if (uiMounted) {
      return;
    }

    const root = document.createElement("div");
    root.id = "ytse-root";
    root.innerHTML = `
      <button id="ytse-launcher" class="ytse-launcher" type="button" aria-label="Open subtitle panel">
        <span class="ytse-launcher-text">CAP</span>
      </button>

      <aside id="ytse-panel" class="ytse-panel" aria-hidden="true">
        <div class="ytse-panel-header">
          <div class="ytse-title-wrap">
            <h3>YouTube Subtitle Extractor</h3>
            <p>Download-ready subtitles with synced reading mode</p>
          </div>
          <button id="ytse-close-btn" class="ytse-icon-btn" type="button" aria-label="Close panel">X</button>
        </div>

        <div class="ytse-toolbar">
          <label for="ytse-lang">Language</label>
          <select id="ytse-lang">
            <option value="en">English</option>
          </select>
          <button id="ytse-open-btn" class="ytse-primary-btn" type="button">Extract now</button>
        </div>

        <div class="ytse-meta">
          <span id="ytse-video-url"></span>
          <div class="ytse-meta-row">
            <span id="ytse-quota-meta"></span>
            <span id="ytse-status-badge" class="ytse-status-badge" data-tone="neutral">Idle</span>
          </div>
        </div>

        <div id="ytse-feedback" class="ytse-feedback ytse-feedback-info" hidden></div>

        <section id="ytse-video-card" class="ytse-video-card" hidden>
          <img id="ytse-video-thumb" class="ytse-video-thumb" src="" alt="YouTube video thumbnail" loading="lazy" />
          <div class="ytse-video-info">
            <p id="ytse-video-title"></p>
            <p id="ytse-video-meta"></p>
          </div>
        </section>

        <section id="ytse-state-idle" class="ytse-state">
          <p class="ytse-state-title">Ready when you are</p>
          <p>Click <strong>Extract now</strong> to fetch subtitles for this video.</p>
        </section>

        <section id="ytse-state-unsupported" class="ytse-state" hidden>
          <p class="ytse-state-title">Unsupported page</p>
          <p>Open a YouTube watch URL to use this extractor.</p>
          <p class="ytse-tip">Example: youtube.com/watch?v=VIDEO_ID</p>
        </section>

        <section id="ytse-state-loading" class="ytse-state" hidden>
          <p class="ytse-state-title">Extracting subtitles...</p>
          <div class="ytse-skeleton-line"></div>
          <div class="ytse-skeleton-line"></div>
          <div class="ytse-skeleton-line short"></div>
        </section>

        <section id="ytse-state-error" class="ytse-state" hidden>
          <p class="ytse-state-title">Request failed</p>
          <p id="ytse-error-text">Something went wrong.</p>
          <button id="ytse-retry-btn" class="ytse-secondary-btn" type="button">Try again</button>
        </section>

        <section id="ytse-state-quota" class="ytse-state" hidden>
          <p class="ytse-state-title">Continue for free on website</p>
          <p id="ytse-quota-text">Free extraction channel is currently busy.</p>
          <button id="ytse-go-website" class="ytse-primary-btn" type="button">Continue on ytvidhub</button>
        </section>

        <section id="ytse-state-result" class="ytse-state" hidden>
          <div class="ytse-download-row">
            <button id="ytse-download-txt" class="ytse-secondary-btn" type="button" disabled>Download TXT</button>
            <button id="ytse-download-srt" class="ytse-secondary-btn" type="button" disabled>Download SRT</button>
            <button id="ytse-copy-txt" class="ytse-secondary-btn" type="button" disabled>Copy Text</button>
          </div>

          <div class="ytse-reading-toolbar">
            <label class="ytse-toggle">
              <input id="ytse-learning-mode" type="checkbox" checked />
              Learning mode
            </label>
            <label class="ytse-toggle">
              <input id="ytse-autofollow" type="checkbox" checked />
              Auto follow
            </label>
          </div>

          <div class="ytse-focus-card">
            <p class="ytse-focus-label">Now playing</p>
            <p id="ytse-focus-time">--:--</p>
            <p id="ytse-focus-text">Play the video to sync subtitle highlighting.</p>
          </div>

          <div id="ytse-transcript-list" class="ytse-transcript-list"></div>
          <pre id="ytse-subtitle-text" hidden></pre>
        </section>
      </aside>
    `;

    document.documentElement.appendChild(root);
    uiMounted = true;
    bindEvents();
    renderLanguageOptions(getFallbackLanguageOptions(), "en", false);
    setPanelLearningMode(true);
    setPanelAutoFollow(true);
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
      updateHeaderMeta();
      loadSubtitle({ force: false });
    } else {
      stopSyncLoop();
      clearFeedback();
    }
  }

  async function loadSubtitle({ force = false } = {}) {
    ensureUi();
    const { langSelect } = getElements();
    const watchUrl = getNormalizedWatchUrl();
    if (!watchUrl) {
      currentData = null;
      subtitleSegments = [];
      stopSyncLoop();
      updateHeaderMeta();
      setDownloadButtonsEnabled(false);
      setStatusBadge("Watch page required", "warning");
      setSectionVisible("ytse-state-unsupported");
      return;
    }

    await ensureLanguageOptionsLoaded({ force });

    const lang = (langSelect?.value || "en").trim();
    const cacheKey = `${watchUrl}|${lang}`;
    if (!force && subtitleCache.has(cacheKey)) {
      renderResult(subtitleCache.get(cacheKey));
      return;
    }

    currentData = null;
    subtitleSegments = [];
    stopSyncLoop();
    setDownloadButtonsEnabled(false);
    updateHeaderMeta();
    setStatusBadge("Extracting...", "info");
    setFeedback("info", "Fetching subtitles", "This normally takes 2-8 seconds.", true);
    setSectionVisible("ytse-state-loading");

    let result;
    try {
      result = await chrome.runtime.sendMessage({
        type: "YT_SUBTITLE_FETCH",
        payload: {
          url: watchUrl,
          lang,
        },
      });
    } catch (error) {
      showError(error?.message || "Unable to communicate with extension background.");
      return;
    }

    if (!result || result.ok === false) {
      if (result?.code === "QUOTA_EXCEEDED") {
        showQuotaError(result);
        return;
      }
      showError(getFriendlyErrorMessage(result));
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
    if (watchUrl) {
      ensureLanguageOptionsLoaded({ force: false });
    }
    if (!watchUrl && panel?.classList.contains("ytse-open")) {
      loadSubtitle({ force: false });
    } else {
      updateHeaderMeta();
    }
  }

  async function copySubtitleText() {
    const text = (currentData?.subtitle_txt || "").trim();
    if (!text) {
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setFeedback("success", "Copied", "Subtitle text copied to clipboard.", false);
    } catch (error) {
      setFeedback("error", "Copy failed", "Your browser blocked clipboard access. Download TXT instead.", false);
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
      copyBtn,
      quotaGoBtn,
      learningToggle,
      autoFollowToggle,
    } = getElements();

    launcher?.addEventListener("click", () => togglePanel());
    openBtn?.addEventListener("click", () => loadSubtitle({ force: true }));
    closeBtn?.addEventListener("click", () => togglePanel(false));
    retryBtn?.addEventListener("click", () => loadSubtitle({ force: true }));
    langSelect?.addEventListener("change", () => loadSubtitle({ force: false }));

    learningToggle?.addEventListener("change", () => {
      setPanelLearningMode(Boolean(learningToggle.checked));
    });

    autoFollowToggle?.addEventListener("change", () => {
      setPanelAutoFollow(Boolean(autoFollowToggle.checked));
    });

    txtBtn?.addEventListener("click", () => {
      if (!currentData?.subtitle_txt) {
        return;
      }
      const filenameBase = currentData?.filename_base || "youtube-subtitle";
      triggerDownload(currentData.subtitle_txt, `${filenameBase}.txt`);
      setFeedback("success", "TXT downloaded", `${filenameBase}.txt saved successfully.`, false);
    });

    srtBtn?.addEventListener("click", () => {
      if (!currentData?.subtitle_srt) {
        return;
      }
      const filenameBase = currentData?.filename_base || "youtube-subtitle";
      triggerDownload(currentData.subtitle_srt, `${filenameBase}.srt`);
      setFeedback("success", "SRT downloaded", `${filenameBase}.srt saved successfully.`, false);
    });

    copyBtn?.addEventListener("click", copySubtitleText);

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
