const API_BASE_CANDIDATES = [
  "https://ytdlp.vistaflyer.com",
  "http://127.0.0.1:5000",
  "http://localhost:5000"
];

const SUBTITLE_API_PATH = "/api/extension/youtube-subtitle";
const VIDEO_INFO_API_PATH = "/api/video_info";

async function callApi(path, payload, options = {}) {
  const { treatAnyOkAsSuccess = false } = options;
  let lastNetworkError = "Network error";

  for (let index = 0; index < API_BASE_CANDIDATES.length; index += 1) {
    const base = API_BASE_CANDIDATES[index];
    try {
      const response = await fetch(`${base}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload || {})
      });

      const responseJson = await response.json().catch(() => ({}));

      const isSubtitleSuccess = response.ok && responseJson?.status === 0;
      const isGenericSuccess = response.ok && treatAnyOkAsSuccess && !responseJson?.error;

      if (isSubtitleSuccess || isGenericSuccess) {
        return {
          ok: true,
          data: isSubtitleSuccess ? responseJson.data : responseJson,
          base
        };
      }

      const errorPayload = {
        ok: false,
        status: response.status,
        code: responseJson?.code || "REQUEST_FAILED",
        message: responseJson?.message || `Request failed (${response.status})`,
        redirect_url: responseJson?.redirect_url || null,
        data: responseJson?.data || null,
        base
      };

      if (response.status === 404 && index < API_BASE_CANDIDATES.length - 1) {
        continue;
      }

      return errorPayload;
    } catch (error) {
      lastNetworkError = error?.message || "Network error";
    }
  }

  return {
    ok: false,
    code: "NETWORK_ERROR",
    message: lastNetworkError
  };
}

async function callSubtitleApi(payload) {
  return callApi(SUBTITLE_API_PATH, payload);
}

async function callVideoInfoApi(payload) {
  return callApi(VIDEO_INFO_API_PATH, payload, { treatAnyOkAsSuccess: true });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "YT_SUBTITLE_FETCH") {
    callSubtitleApi(message.payload)
      .then((result) => sendResponse(result))
      .catch((error) => {
        sendResponse({
          ok: false,
          code: "UNEXPECTED_ERROR",
          message: error?.message || "Unexpected background error"
        });
      });
    return true;
  }

  if (message?.type === "YT_SUBTITLE_VIDEO_INFO") {
    callVideoInfoApi(message.payload)
      .then((result) => sendResponse(result))
      .catch((error) => {
        sendResponse({
          ok: false,
          code: "UNEXPECTED_ERROR",
          message: error?.message || "Unexpected background error"
        });
      });
    return true;
  }

  if (message?.type === "YT_SUBTITLE_OPEN_URL") {
    const url = message?.url || "https://ytvidhub.com";
    chrome.tabs.create({ url });
    sendResponse({ ok: true });
    return false;
  }

  return false;
});

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab?.id) {
    return;
  }
  chrome.tabs.sendMessage(tab.id, { type: "YT_SUBTITLE_TOGGLE_PANEL" });
});
