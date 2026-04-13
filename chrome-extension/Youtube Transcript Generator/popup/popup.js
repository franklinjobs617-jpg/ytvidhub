const WATCH_HOSTS = new Set(["youtube.com", "www.youtube.com", "m.youtube.com", "music.youtube.com"]);
const WEBSITE_URL = "https://ytvidhub.com";

function isWatchUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    if (!WATCH_HOSTS.has(parsed.hostname.toLowerCase())) {
      return false;
    }
    if (parsed.pathname !== "/watch") {
      return false;
    }
    return Boolean((parsed.searchParams.get("v") || "").trim());
  } catch (error) {
    return false;
  }
}

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab || null;
}

async function init() {
  const statusPill = document.getElementById("status-pill");
  const statusText = document.getElementById("status-text");
  const openPanelBtn = document.getElementById("open-panel-btn");
  const openSiteBtn = document.getElementById("open-site-btn");

  const tab = await getActiveTab();
  const isWatch = Boolean(tab?.url) && isWatchUrl(tab.url);

  if (isWatch) {
    statusPill.textContent = "Watch page";
    statusPill.classList.add("ok");
    statusText.textContent = "Ready to extract subtitle from current video.";
    openPanelBtn.disabled = false;
  } else {
    statusPill.textContent = "Not supported";
    statusPill.classList.add("warn");
    statusText.textContent = "Please open a YouTube watch page first.";
    openPanelBtn.disabled = true;
  }

  openPanelBtn.addEventListener("click", async () => {
    if (!tab?.id) {
      return;
    }
    await chrome.tabs.sendMessage(tab.id, { type: "YT_SUBTITLE_TOGGLE_PANEL" });
    window.close();
  });

  openSiteBtn.addEventListener("click", async () => {
    await chrome.runtime.sendMessage({ type: "YT_SUBTITLE_OPEN_URL", url: WEBSITE_URL });
    window.close();
  });
}

init();
