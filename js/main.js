/**
 * @file main.js
 * @summary Core application logic for the YouTube Subtitle Downloader.
 */

// --- STATE MANAGEMENT ---
let videoData = [];
const selectedVideos = new Set();
let currentTaskId = null;
let pollingInterval = null;
let perceivedProgressInterval = null;
let currentPerceivedProgress = 0;
let initialUrlCount = 0;

const youtubeRegex =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

// --- DOM ELEMENT CACHING ---
let inputArea, analyzingArea, resultsArea, globalFormatSelect;
let urlInput, analyzeBtn, clearBtn, fileInput, dragContainer;
let selectAllCheckbox,
  downloadSelectedBtn,
  downloadSelectedText,
  downloadSelectedIcon,
  downloadSelectedSpinner,
  downloadBtnLoadingOverlay,
  createNumber,
  credits_mobile;
let videoList,
  resultsSummary,
  downloadStatusArea,
  downloadStatusContent,
  loginModalContainer;

  
function initApp() {
  inputArea = document.getElementById("inputArea");
  loginModalContainer = document.getElementById("login-modal-container");
  analyzingArea = document.getElementById("analyzingArea");
  resultsArea = document.getElementById("resultsArea");
  globalFormatSelect = document.getElementById("globalFormat");
  urlInput = document.getElementById("urlInput");
  analyzeBtn = document.getElementById("analyzeBtn");
  clearBtn = document.getElementById("clearBtn");
  fileInput = document.getElementById("fileInput");
  dragContainer = document.querySelector("#inputArea .main-card");
  selectAllCheckbox = document.getElementById("selectAllCheckbox");
  downloadSelectedBtn = document.getElementById("downloadSelectedBtn");
  downloadSelectedText = document.getElementById("downloadSelectedText");
  downloadSelectedIcon = document.getElementById("downloadSelectedIcon");
  downloadSelectedSpinner = document.getElementById("downloadSelectedSpinner");
  createNumber = document.querySelector("#credits");
  credits_mobile = document.querySelector("#credits_mobile");
  downloadBtnLoadingOverlay = document.getElementById(
    "downloadBtnLoadingOverlay"
  );
  videoList = document.getElementById("videoList");
  resultsSummary = document.getElementById("resultsSummary");
  downloadStatusArea = document.getElementById("downloadStatusArea");
  downloadStatusContent = document.getElementById("downloadStatusContent");

  analyzeBtn.addEventListener("click", handleAnalyzeClick);
  clearBtn.addEventListener("click", handleClear);
  fileInput.addEventListener("change", handleFileUpload);
  selectAllCheckbox.addEventListener("change", handleSelectAll);
  downloadSelectedBtn.addEventListener("click", handleBulkDownload);
  globalFormatSelect.addEventListener("change", () =>
    applyGlobalSettingHighlight("format")
  );

  ["dragenter", "dragover", "dragleave", "drop"].forEach((e) =>
    dragContainer.addEventListener(e, preventDefaults, false)
  );
  ["dragenter", "dragover"].forEach((e) =>
    dragContainer.addEventListener(
      e,
      () => dragContainer.classList.add("dragging"),
      false
    )
  );
  ["dragleave", "drop"].forEach((e) =>
    dragContainer.addEventListener(
      e,
      () => dragContainer.classList.remove("dragging"),
      false
    )
  );
  dragContainer.addEventListener("drop", handleFileDrop, false);

  const videoModal = document.getElementById("video-preview-modal");
  if (videoModal) {
    videoModal.addEventListener("click", (event) => {
      if (event.target === videoModal) closeVideoPreview();
    });
  }
}

const openModal = () => {
  if (loginModalContainer) {
    loginModalContainer.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
};

const closeModal = () => {
  if (loginModalContainer) {
    loginModalContainer.classList.add("hidden");
    document.body.style.overflow = "";
  }
};

// --- API HELPER ---

/**
 * @summary A wrapper for the native fetch API that automatically adds the Authorization header.
 * @description Retrieves the auth token from localStorage and adds it as a 'Bearer' token
 * to the request headers. All API calls to the backend should use this function.
 * @param {string} url - The URL to fetch.
 * @param {object} options - The options for the fetch call (e.g., method, body).
 * @returns {Promise<Response>} A Promise that resolves to the Response object.
 */
async function authenticatedFetch(url, options = {}) {
  const token = localStorage.getItem("auth_token");

  const headers = new Headers(options.headers || {});

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  // Ensure Content-Type is set for POST requests with a body
  if (options.body && !headers.has("Content-Type")) {
    headers.append("Content-Type", "application/json");
  }

  const fetchOptions = {
    ...options,
    headers,
  };

  return fetch(url, fetchOptions);
}

// --- UI AND STATE TRANSITION FUNCTIONS ---

function resetUI() {
  urlInput.value = "";
  resultsArea.classList.add("hidden");
  analyzingArea.classList.add("hidden");
  inputArea.classList.remove("hidden");
  resultsSummary.classList.add("hidden");
  downloadStatusArea.classList.add("hidden");
  videoData = [];
  selectedVideos.clear();
  initialUrlCount = 0;
  currentTaskId = null;
  if (pollingInterval) clearInterval(pollingInterval);
  if (perceivedProgressInterval) clearInterval(perceivedProgressInterval);
  pollingInterval = null;
  perceivedProgressInterval = null;

  downloadSelectedBtn.disabled = false;
  downloadSelectedText.classList.remove("hidden");
  downloadSelectedIcon.classList.remove("hidden");
  downloadSelectedSpinner.classList.add("hidden");
}
window.resetToInputArea = resetUI;

function handleClear() {
  resetUI();
}

// --- INPUT HANDLING & ANALYSIS ---

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

async function handleFileUpload(e) {
  const file = e.target.files[0];
  if (file) await processFile(file);
}

async function handleFileDrop(e) {
  const file = e.dataTransfer.files[0];
  if (file) await processFile(file);
}

async function processFile(file) {
  if (
    !["text/plain", "text/csv", "application/vnd.ms-excel"].includes(file.type)
  ) {
    return showNotification(
      "Invalid file type. Please use .txt or .csv",
      "error"
    );
  }
  urlInput.value = await file.text();
  await handleAnalyzeClick();
}

async function handleAnalyzeClick() {
  const isLoggedIn = !!localStorage.getItem("auth_token");

  if (!isLoggedIn) {
    openModal();
    return;
  }

  const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/g;
  const urls = [...new Set(urlInput.value.match(urlRegex) || [])];
  initialUrlCount = (urlInput.value.match(urlRegex) || []).length;

  if (urls.length === 0) {
    return showNotification(
      "No valid YouTube URLs found. Please check your input.",
      "error"
    );
  }

  inputArea.classList.add("hidden");
  resultsArea.classList.add("hidden");
  analyzingArea.classList.remove("hidden");
  startAnalysisProgress();

  try {
    const details = await fetchVideoDetails(urls);
    if (perceivedProgressInterval) clearInterval(perceivedProgressInterval);
    videoData = details.map((d) => ({ ...d, selectedFormat: "srt" }));
    displayResults(videoData);
    analyzingArea.classList.add("hidden");
    resultsArea.classList.remove("hidden");
  } catch (error) {
    showNotification(`Analysis Error: ${error.message}`, "error");
    resetUI();
  }
}

async function fetchVideoDetails(urls) {
  const response = await authenticatedFetch(
    "https://ytdlp.vistaflyer.com/api/batch_check",
    {
      method: "POST",
      body: JSON.stringify({ urls: urls }),
    }
  );

  if (response.status === 402) {
    // Handle "Payment Required" specifically
    const errorData = await response.json();
    throw new Error(
      errorData.detail || "Insufficient credits to perform this action."
    );
  }
  if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

  const data = await response.json();
  if (data.status !== "completed")
    throw new Error("Server could not process URLs.");
  return data.results.map((item) => ({
    id: (item.url.match(youtubeRegex) || [])[1],
    url: item.url,
    title: item.video_info.title || "Untitled",
    uploader: item.video_info.uploader || "Unknown",
    thumbnail: `https://i.ytimg.com/vi/${
      (item.url.match(youtubeRegex) || [])[1]
    }/hqdefault.jpg`,
    hasSubtitles: item.can_download,
  }));
}

// --- RESULTS DISPLAY & INTERACTION ---

function displayResults(data) {
  videoList.innerHTML = "";
  selectedVideos.clear();
  const successCount = data.filter((v) => v.id).length;
  const failedCount = initialUrlCount - successCount;
  resultsSummary.innerHTML = `Processed <strong>${initialUrlCount}</strong> URLs: Found <strong>${successCount}</strong> valid videos. ${
    failedCount > 0
      ? `<strong>${failedCount}</strong> were invalid or duplicates.`
      : ""
  }`;
  resultsSummary.classList.remove("hidden");

  if (!data || data.length === 0) return;

  data.forEach((video) => {
    if (video.hasSubtitles) selectedVideos.add(video.id);
    videoList.appendChild(createVideoCard(video));
  });

  const selectableCount = data.filter((v) => v.hasSubtitles).length;
  document
    .getElementById("bulkActions")
    .classList.toggle("hidden", selectableCount < 2);

  updateSelectionUI();
}

function createVideoCard(video) {
  const card = document.createElement("div");
  card.className = `bg-white p-4 rounded-xl shadow-md border-2 transition-all duration-200 ${
    selectedVideos.has(video.id)
      ? "border-blue-500"
      : "border-gray-200 hover:border-blue-300"
  }`;
  card.id = `card-${video.id}`;
  const statusBadge = video.hasSubtitles
    ? '<span class="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">English Subtitles Available</span>'
    : `<span class="inline-flex items-center gap-1 text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">No Manual Subtitles<span class="tooltip-trigger text-yellow-500"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div class="tooltip-content">This tool only downloads high-quality, manually-created English subtitles. YouTube's auto-generated captions are not supported.</div></span></span>`;

  card.innerHTML = `<div class="flex flex-col sm:flex-row items-start sm:items-center gap-4"><div class="flex items-center gap-4 flex-shrink-0">${
    video.hasSubtitles
      ? `<input type="checkbox" class="custom-checkbox" onchange="toggleVideoSelection('${
          video.id
        }')" ${selectedVideos.has(video.id) ? "checked" : ""}>`
      : '<div class="w-5 h-5"></div>'
  }
    <div class="relative cursor-pointer group" onclick="openVideoPreview('${
      video.id
    }')" title="Click to preview video">
      <img src="${
        video.thumbnail
      }" class="w-28 h-16 object-cover rounded-lg border border-gray-200">
      <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg">
        <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
      </div>
    </div>
    </div><div class="flex-grow min-w-0"><p class="font-semibold text-gray-800 truncate text-base" title="${video.title.replace(
      /"/g,
      "&quot;"
    )}">${video.title}</p><p class="text-sm text-gray-500">by ${
    video.uploader
  }</p>${statusBadge}</div>${
    video.hasSubtitles
      ? `<div class="flex flex-col sm:flex-row items-center gap-2 flex-shrink-0 ml-auto pt-2 sm:pt-0"><select onchange="updateVideoSetting('${video.id}', 'selectedFormat', this.value)" class="per-video-format custom-select w-full sm:w-20 text-sm"><option value="srt">SRT</option><option value="txt">TXT</option><option value="vtt">VTT</option></select><button onclick="handleSingleDownload(event, '${video.id}')" title="Download this subtitle" class="single-download-btn bg-gray-100 hover:bg-blue-500 hover:text-white text-gray-700 p-2 rounded-lg transition flex-shrink-0 w-full sm:w-auto"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg></button></div>`
      : ""
  }</div>`;
  return card;
}

function toggleVideoSelection(videoId) {
  if (selectedVideos.has(videoId)) selectedVideos.delete(videoId);
  else selectedVideos.add(videoId);
  updateSelectionUI();
}
window.toggleVideoSelection = toggleVideoSelection;

function handleSelectAll() {
  const isChecked = selectAllCheckbox.checked;
  videoData.forEach((video) => {
    if (video.hasSubtitles) {
      if (isChecked) selectedVideos.add(video.id);
      else selectedVideos.delete(video.id);
    }
  });
  updateSelectionUI();
}

function updateSelectionUI() {
  const count = selectedVideos.size;
  const totalSelectable = videoData.filter((v) => v.hasSubtitles).length;
  downloadSelectedText.textContent = `Download Selected (${count})`;
  downloadSelectedBtn.disabled = count === 0;
  selectAllCheckbox.checked = count > 0 && count === totalSelectable;
  selectAllCheckbox.indeterminate = count > 0 && count < totalSelectable;
  videoData.forEach((video) => {
    const card = document.getElementById(`card-${video.id}`);
    if (card) {
      card.classList.toggle("border-blue-500", selectedVideos.has(video.id));
      card.classList.toggle("border-gray-200", !selectedVideos.has(video.id));
      const checkbox = card.querySelector('input[type="checkbox"]');
      if (checkbox) checkbox.checked = selectedVideos.has(video.id);
    }
  });
}

function updateVideoSetting(videoId, key, value) {
  const video = videoData.find((v) => v.id === videoId);
  if (video) video[key] = value;
}
window.updateVideoSetting = updateVideoSetting;

function applyGlobalSettingHighlight() {
  const targetClass = ".per-video-format";
  selectedVideos.forEach((id) => {
    const card = document.getElementById(`card-${id}`);
    if (card) {
      const select = card.querySelector(targetClass);
      if (select) {
        select.classList.add("highlight-change");
        setTimeout(() => select.classList.remove("highlight-change"), 800);
      }
    }
  });
}

// --- DOWNLOAD LOGIC ---

async function handleSingleDownload(event, videoId) {
  const video = videoData.find((v) => v.id === videoId);
  if (!video) return;

  const button = event.currentTarget;
  const originalContent = button.innerHTML;
  const parentContainer = button.parentNode;
  let progressInterval = null;

  const progressContainer = document.createElement("div");
  progressContainer.className =
    "w-full col-span-full mt-3 opacity-0 transition-opacity duration-300";

  const progressHeader = document.createElement("div");
  progressHeader.className =
    "flex justify-between items-center mb-1 text-sm font-medium";

  const statusText = document.createElement("span");
  statusText.className = "text-gray-600";
  statusText.textContent = "Preparing...";

  const percentageText = document.createElement("span");
  percentageText.className = "text-blue-600 font-bold";
  percentageText.textContent = "0%";

  progressHeader.appendChild(statusText);
  progressHeader.appendChild(percentageText);

  const progressBarContainer = document.createElement("div");
  progressBarContainer.className =
    "w-full bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner";
  const progressBar = document.createElement("div");
  progressBar.className =
    "h-2 rounded-full transition-all duration-300 ease-out";
  progressBar.style.width = "0%";
  progressBar.style.background = "linear-gradient(to right, #60a5fa, #3b82f6)";
  progressBarContainer.appendChild(progressBar);

  progressContainer.appendChild(progressHeader);
  progressContainer.appendChild(progressBarContainer);

  const spinner = `<div class="w-5 h-5 border-2 border-gray-400 border-t-white rounded-full animate-spin"></div>`;
  const successIcon = `<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
  const errorIcon = `<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;

  button.disabled = true;
  button.innerHTML = spinner;
  button.classList.remove("bg-gray-100", "hover:bg-blue-500", "text-gray-700");
  button.classList.add("bg-blue-500", "text-white", "cursor-not-allowed");

  parentContainer.after(progressContainer);
  setTimeout(() => {
    progressContainer.classList.remove("opacity-0");
  }, 10);

  let progress = 0;
  progressInterval = setInterval(() => {
    if (progress < 20) {
      progress += Math.random() * 2;
      statusText.textContent = "Connecting...";
    } else if (progress < 80) {
      progress += Math.random() * 1.5;
      statusText.textContent = "Downloading file...";
    } else if (progress < 95) {
      progress += Math.random() * 0.5;
      statusText.textContent = "Finalizing...";
    } else {
      progress = 95;
    }

    const roundedProgress = Math.round(progress);
    progressBar.style.width = `${roundedProgress}%`;
    percentageText.textContent = `${roundedProgress}%`;

    if (progress >= 95) clearInterval(progressInterval);
  }, 100);

  try {
    const selectedFormat =
      parentContainer.querySelector(".per-video-format").value;
    await downloadFile(video.url, "en", selectedFormat, video.title);
    await updateUser();
    const videoToSave = {
      id: video.id,
      url: video.url,
      title: video.title,
      uploader: video.uploader,
      thumbnail: video.thumbnail,
    };
    saveToHistory("single", [videoToSave]);
    clearInterval(progressInterval);
    progressBar.style.width = "100%";
    percentageText.textContent = "100%";
    progressBar.style.background =
      "linear-gradient(to right, #4ade80, #16a34a)";
    statusText.textContent = "Complete!";
    statusText.className = "text-green-700 font-semibold";
    percentageText.className = "text-green-700 font-bold";

    button.innerHTML = successIcon;
    button.classList.remove("bg-blue-500");
    button.classList.add("bg-green-500");

    setTimeout(() => {
      progressContainer.remove();
      button.disabled = false;
      button.innerHTML = originalContent;
      button.classList.remove(
        "bg-green-500",
        "text-white",
        "cursor-not-allowed"
      );
      button.classList.add("bg-gray-100", "hover:bg-blue-500", "text-gray-700");
    }, 2000);
  } catch (error) {
    clearInterval(progressInterval);
    showNotification(error.message, "error");

    progressBar.style.width = "100%";
    progressBar.style.background =
      "linear-gradient(to right, #f87171, #dc2626)";
    statusText.textContent = "Failed!";
    statusText.className = "text-red-700 font-semibold";
    percentageText.textContent = `Error`;
    percentageText.className = "text-red-700 font-bold";

    button.innerHTML = errorIcon;
    button.classList.remove("bg-blue-500");
    button.classList.add("bg-red-500");

    setTimeout(() => {
      progressContainer.remove();
      button.disabled = false;
      button.innerHTML = originalContent;
      button.classList.remove("bg-red-500", "text-white", "cursor-not-allowed");
      button.classList.add("bg-gray-100", "hover:bg-blue-500", "text-gray-700");
    }, 3000);
  }
}
window.handleSingleDownload = handleSingleDownload;

//保存内容到历史记录
function saveToHistory(type, videos) {
  try {
    const history = JSON.parse(localStorage.getItem("downloadHistory")) || [];
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      type: type,
      videos: videos,
    };

    history.unshift(newEntry);

    if (history.length > 50) {
      // Keep history to a reasonable size
      history.pop();
    }

    localStorage.setItem("downloadHistory", JSON.stringify(history));
  } catch (error) {
    console.error("Failed to save to history:", error);
  }
}

async function handleBulkDownload() {
  const videosToDownload = videoData
    .filter((v) => selectedVideos.has(v.id))
    .map((v) => ({ url: v.url, title: v.title, uploader: v.uploader }));
  if (videosToDownload.length === 0) return;

  downloadSelectedBtn.disabled = true;
  downloadSelectedText.classList.add("hidden");
  downloadSelectedIcon.classList.add("hidden");
  downloadSelectedSpinner.classList.remove("hidden");
  downloadBtnLoadingOverlay.classList.remove("hidden");

  try {
    const format = globalFormatSelect.value;
    const task = await createBulkTask(videosToDownload, "en", format);
    currentTaskId = task.task_id;
    const videosForHistory = videoData
      .filter((v) => selectedVideos.has(v.id))
      .map((v) => ({
        id: v.id,
        url: v.url,
        title: v.title,
        uploader: v.uploader,
        thumbnail: v.thumbnail,
      }));
    saveToHistory("bulk", videosForHistory);

    showDownloadStatus("processing", videosToDownload.length);
    startPerceivedProgress(videosToDownload.length);
    startPolling();

    downloadSelectedText.classList.remove("hidden");
    downloadSelectedIcon.classList.remove("hidden");
    downloadSelectedSpinner.classList.add("hidden");
    downloadBtnLoadingOverlay.classList.add("hidden");
  } catch (error) {
    showNotification(error.message, "error");
    downloadSelectedBtn.disabled = false;
    downloadSelectedText.classList.remove("hidden");
    downloadSelectedIcon.classList.remove("hidden");
    downloadSelectedSpinner.classList.add("hidden");
    downloadBtnLoadingOverlay.classList.add("hidden");
  }
}

function sanitizeFilename(name) {
  let sanitized = name.replace(/[\\/:*?"<>|]/g, "_");
  sanitized = sanitized.replace(/_+/g, "_");
  sanitized = sanitized.replace(/^_+|_+$/g, "");
  return sanitized.slice(0, 100) || "download";
}

async function downloadFile(url, lang, format, title) {
  const response = await authenticatedFetch(
    "https://ytdlp.vistaflyer.com/api/download",
    {
      method: "POST",
      body: JSON.stringify({ url, lang, format, title }),
    }
  );

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const errorData = await response.json();
    if (errorData.status === "1" || errorData.status === 1) {
      throw new Error(errorData.message || "Not enough Credits");
    }
    throw new Error(errorData.message || "An unknown API error occurred.");
  }

  if (!response.ok)
    throw new Error(`File download failed: ${response.statusText}`);

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = `${sanitizeFilename(title)}.${format}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(objectUrl);
}

// --- POLLING & PROGRESS BAR LOGIC ---

function startAnalysisProgress() {
  let percent = 0;
  const progressBar = document.getElementById("analysisProgressBar");
  const percentageText = document.getElementById("analysisPercentageText");
  const progressText = document.getElementById("analysisProgressText");
  const analysisMessages = [
    "Validating URLs...",
    "Establishing connection...",
    "Fetching video metadata...",
    "Checking for English subtitles...",
  ];
  let messageIndex = 0;
  const messageInterval = setInterval(() => {
    if (progressText)
      progressText.textContent =
        analysisMessages[messageIndex % analysisMessages.length];
    messageIndex++;
  }, 1500);
  perceivedProgressInterval = setInterval(() => {
    percent += (95 - percent) * 0.1;
    if (progressBar) progressBar.style.width = `${percent}%`;
    if (percentageText) percentageText.textContent = `${Math.floor(percent)}%`;
    if (percent >= 94) {
      clearInterval(perceivedProgressInterval);
      clearInterval(messageInterval);
    }
  }, 400);
}

async function createBulkTask(videos, lang, format) {
  const response = await authenticatedFetch(
    "https://ytdlp.vistaflyer.com/api/batch_submit",
    {
      method: "POST",
      body: JSON.stringify({ videos, lang, format }),
    }
  );
  if (response.status === 402) {
    const errorData = await response.json();
    throw new Error(
      errorData.detail || "Insufficient credits to start this bulk task."
    );
  }
  if (!response.ok) throw new Error("Failed to create bulk task.");

  const data = await response.json();
  if (data.status !== "pending")
    throw new Error(data.message || "Task submission failed.");
  return data;
}

function startPolling() {
  if (pollingInterval) clearInterval(pollingInterval);
  pollingInterval = setInterval(async () => {
    if (!currentTaskId) return clearInterval(pollingInterval);
    try {
      const status = await checkTaskStatus(currentTaskId);
      if (status.progress_str) updateProgressWithRealData(status);

      if (status.status === "completed") {
        clearInterval(pollingInterval);
        if (perceivedProgressInterval) clearInterval(perceivedProgressInterval);

        try {
          // Attempt to download the file first. This can throw an error.
          await downloadBulkFile();

          // If download succeeds, show the success screen and update user credits.
          showDownloadStatus("complete");
          await updateUser();
        } catch (error) {
          // If download fails (e.g., for credit reasons), show an appropriate error screen.
          if (
            error.message &&
            error.message.toLowerCase().includes("credits")
          ) {
            showDownloadStatus("credits_error");
          } else {
            showDownloadStatus("error");
          }
          showNotification(error.message, "error");
        }
      } else if (status.status === "failed") {
        clearInterval(pollingInterval);
        if (perceivedProgressInterval) clearInterval(perceivedProgressInterval);
        showNotification("Bulk download task failed.", "error");
        showDownloadStatus("error");
      }
    } catch (error) {
      clearInterval(pollingInterval);
      if (perceivedProgressInterval) clearInterval(perceivedProgressInterval);
      showNotification("Error checking status.", "error");
      showDownloadStatus("error");
    }
  }, 3000);
}

async function checkTaskStatus(taskId) {
  const response = await authenticatedFetch(
    `https://ytdlp.vistaflyer.com/api/task_status?task_id=${taskId}`
  );
  if (!response.ok) throw new Error("Status check failed.");
  const data = await response.json();
  const [completed, total] = (data.progress || "0/0").split("/").map(Number);
  return {
    id: taskId,
    status: data.status,
    progress: total > 0 ? (completed / total) * 100 : 0,
    completed,
    total,
    progress_str: data.progress,
  };
}

// =======================================================================
// ===     START OF REVAMPED DOWNLOAD STATUS UI (WITH FIXES)           ===
// =======================================================================
function showDownloadStatus(status, totalFiles = 0) {
  let contentHTML = "";
  // Inject CSS for the animated stripes, ensuring it only happens once
  if (!document.getElementById("progress-bar-styles")) {
    const style = document.createElement("style");
    style.id = "progress-bar-styles";
    style.innerHTML = `
      @keyframes progress-bar-stripes {
        from { background-position: 1rem 0; }
        to { background-position: 0 0; }
      }
      .progress-bar-animated {
        animation: progress-bar-stripes 1s linear infinite;
        background-image: linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
        background-size: 1rem 1rem;
      }
    `;
    document.head.appendChild(style);
  }

  switch (status) {
    case "processing":
      contentHTML = `
        <div class="text-center">
            <h3 class="text-xl font-bold text-blue-700 mb-2">Processing Bulk Download</h3>
            <p class="text-gray-500 mb-6">Your subtitles are being prepared. Please wait a moment.</p>
        </div>
        <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-semibold text-gray-700">Overall Progress</span>
            <span id="percentageText" class="text-sm font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md">0%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
            <div id="progressBar"
                 class="h-4 rounded-full transition-all duration-500 ease-out progress-bar-animated"
                 style="width: 0%; background: linear-gradient(to right, #3b82f6, #1e40af);">
            </div>
          </div>
          <p id="progressText" class="text-center text-sm text-gray-600 mt-3">Initializing... (0 of ${totalFiles} files)</p>
        </div>
      `;
      break;
    case "complete":
      contentHTML = `
        <div class="text-center">
            <div class="mx-auto bg-green-100 rounded-full h-20 w-20 flex items-center justify-center mb-4">
                <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800">Download Complete!</h3>
            <p class="text-gray-500 mt-2 mb-6">Your ZIP file is ready and should be downloading automatically.</p>
            <button onclick="resetToInputArea()" class="w-full sm:w-auto bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl">Start a New Download</button>
        </div>
      `;
      break;
    case "error":
      contentHTML = `
        <div class="text-center">
            <div class="mx-auto bg-red-100 rounded-full h-20 w-20 flex items-center justify-center mb-4">
                <svg class="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800">Download Failed</h3>
            <p class="text-gray-500 mt-2 mb-6">An error occurred while processing your request. Please try again.</p>
            <button onclick="resetToInputArea()" class="w-full sm:w-auto bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition">Start Over</button>
        </div>
      `;
      break;
    case "credits_error":
      contentHTML = `
        <div class="text-center">
            <div class="mx-auto bg-yellow-100 rounded-full h-20 w-20 flex items-center justify-center mb-4">
                <svg class="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 14v3m-4.5-6.5H6a2.25 2.25 0 00-2.25 2.25v3.5A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14v-3.5A2.25 2.25 0 0018 8.25h-1.5m-6 0v-1.5"></path></svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800">Download Failed</h3>
            <p class="text-gray-500 mt-2 mb-6">Insufficient credits to complete this download. Please purchase more credits to continue.</p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <button onclick="resetToInputArea()" class="w-full sm:w-auto bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition">Start a New Download</button>
                <a href="/pricing" class="w-full sm:w-auto bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl inline-block">Purchase Credits</a>
            </div>
        </div>
      `;
      break;
  }
  downloadStatusContent.innerHTML = contentHTML;
  downloadStatusArea.classList.remove("hidden");
}
// =======================================================================
// ===      END OF REVAMPED DOWNLOAD STATUS UI (WITH FIXES)            ===
// =======================================================================

function startPerceivedProgress(totalFiles) {
  if (perceivedProgressInterval) clearInterval(perceivedProgressInterval);
  currentPerceivedProgress = 0;
  perceivedProgressInterval = setInterval(() => {
    const progressBar = document.getElementById("progressBar");
    const percentageText = document.getElementById("percentageText");
    const progressText = document.getElementById("progressText");

    currentPerceivedProgress += (90 - currentPerceivedProgress) * 0.05;

    if (progressBar) progressBar.style.width = `${currentPerceivedProgress}%`;
    if (percentageText)
      percentageText.textContent = `${Math.floor(currentPerceivedProgress)}%`;
    if (progressText)
      progressText.textContent = `Processing files... (This may take a moment)`;

    if (currentPerceivedProgress >= 89.5)
      clearInterval(perceivedProgressInterval);
  }, 200);
}

function updateProgressWithRealData(status) {
  if (status.progress > currentPerceivedProgress) {
    if (perceivedProgressInterval) {
      clearInterval(perceivedProgressInterval);
      perceivedProgressInterval = null;
    }
    currentPerceivedProgress = status.progress;
    const progressBar = document.getElementById("progressBar");
    const percentageText = document.getElementById("percentageText");
    if (progressBar) progressBar.style.width = `${status.progress}%`;
    if (percentageText)
      percentageText.textContent = `${Math.round(status.progress)}%`;
  }
  const progressText = document.getElementById("progressText");
  if (progressText)
    progressText.textContent = `Processed ${status.completed} of ${status.total} files.`;
}

async function downloadBulkFile() {
  const response = await authenticatedFetch(
    "https://ytdlp.vistaflyer.com/api/download_zip",
    {
      method: "POST",
      body: JSON.stringify({ task_id: currentTaskId }),
    }
  );

  // Check if the response is JSON, which indicates an error.
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const errorData = await response.json();
    if (errorData.status === "1" || errorData.status === 1) {
      throw new Error(errorData.message || "Not enough Credits");
    }
    throw new Error(
      errorData.message ||
        "An unknown error occurred while downloading the ZIP file."
    );
  }

  // If the response is not ok and not JSON, it's a generic HTTP error.
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // If we reach here, the response should be the ZIP file blob.
  const now = new Date();
  const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(
    2,
    "0"
  )}${String(now.getMinutes()).padStart(2, "0")}${String(
    now.getSeconds()
  ).padStart(2, "0")}`;
  let filename = `youtube_subtitles_bulk_${timestamp}.zip`;
  const disposition = response.headers.get("content-disposition");
  if (disposition) {
    const match = disposition.match(/filename="(.+)"/);
    if (match) filename = match[1];
  }
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// --- UTILITY FUNCTIONS ---

let notificationTimeout;
function showNotification(message, type = "info") {
  clearTimeout(notificationTimeout);
  const existing = document.querySelector(".notification");
  if (existing) existing.remove();
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;

  if (!document.getElementById("notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `.notification { position: fixed; top: 20px; right: 20px; padding: 16px; border-radius: 8px; color: white; font-weight: 500; z-index: 1000; min-width: 320px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); transform: translateX(calc(100% + 20px)); opacity: 0; transition: all 0.4s cubic-bezier(0.21, 1.02, 0.73, 1); display: flex; align-items: center; gap: 12px; } .notification.show { transform: translateX(0); opacity: 1; } .notification.success { background-color: #10b981; } .notification.error { background-color: #ef4444; } .notification.info { background-color: #3b82f6; }`;
    document.head.appendChild(style);
  }

  const icons = { success: "✓", error: "✗", info: "ℹ" };
  notification.innerHTML = `<span class="font-bold text-lg">${icons[type]}</span><span>${message}</span>`;
  document.body.appendChild(notification);
  requestAnimationFrame(() => notification.classList.add("show"));
  notificationTimeout = setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 400);
  }, 5000);
}

function openVideoPreview(videoId) {
  const modal = document.getElementById("video-preview-modal");
  const iframe = document.getElementById("video-preview-iframe");
  if (modal && iframe) {
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }
}
window.openVideoPreview = openVideoPreview;

function closeVideoPreview() {
  const modal = document.getElementById("video-preview-modal");
  const iframe = document.getElementById("video-preview-iframe");
  if (modal && iframe) {
    modal.classList.remove("show");
    iframe.src = "";
    document.body.style.overflow = "";
  }
}
window.closeVideoPreview = closeVideoPreview;

// --- USER INFO UPDATE ---
async function updateUser() {
  const token = localStorage.getItem("auth_token");
  if (!token) return; // Don't try to update if user is not logged in.

  try {
    const response = await fetch(
      "https://api.ytvidhub.com/prod-api/g/getUser",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (!response.ok) return;
    const data = await response.json();
    if (data.data) {
      localStorage.setItem("loggedInUser", JSON.stringify(data.data)); // Sync local storage

      createNumber.innerHTML = data.data.credits;
      credits_mobile.innerHTML = data.data.credits;
    }
  } catch (error) {
    console.error("Failed to update user:", error);
  }
}

// --- INITIALIZE THE APP ---
document.addEventListener("DOMContentLoaded", initApp);
