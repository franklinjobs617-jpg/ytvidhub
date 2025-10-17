/**
 * @file history.js
 * @summary Logic for displaying and managing download history.
 */

document.addEventListener("DOMContentLoaded", () => {
  const historyContainer = document.getElementById("history-container");
  const clearHistoryBtn = document.getElementById("clear-history-btn");

  loadHistory();

  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", handleClearAllHistory);
  }

  // Event delegation for dynamically created buttons
  historyContainer.addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".delete-history-item");
    if (deleteButton) {
      handleDeleteItem(deleteButton.dataset.itemId);
    }

    const toggleButton = event.target.closest(".toggle-details-btn");
    if (toggleButton) {
      toggleDetails(toggleButton);
    }

    const redownloadButton = event.target.closest(".redownload-btn");
    if (redownloadButton) {
      handleRedownload(redownloadButton);
    }

    const previewButton = event.target.closest(".preview-btn");
    if (previewButton) {
      openVideoPreview(previewButton.dataset.videoId);
    }
  });

  const videoModal = document.getElementById("video-preview-modal");
  if (videoModal) {
    videoModal.addEventListener(
      "click",
      (e) => e.target === videoModal && closeVideoPreview()
    );
  }
});

function loadHistory() {
  const historyContainer = document.getElementById("history-container");
  const clearHistoryBtn = document.getElementById("clear-history-btn");
  const history = JSON.parse(localStorage.getItem("downloadHistory")) || [];

  historyContainer.innerHTML = "";

  if (history.length === 0) {
    displayEmptyState();
    clearHistoryBtn.style.display = "none";
  } else {
    history.forEach((item) => {
      const card = createHistoryCard(item);
      historyContainer.appendChild(card);
    });
    clearHistoryBtn.style.display = "flex";
  }
}

function displayEmptyState() {
  const historyContainer = document.getElementById("history-container");
  historyContainer.innerHTML = `
        <div class="text-center py-16 px-6 bg-white rounded-2xl shadow-md border border-gray-200">
            <svg class="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            <h3 class="mt-4 text-xl font-bold text-gray-700">No History Yet</h3>
            <p class="mt-2 text-gray-500">Your downloaded subtitles will appear here for easy access.</p>
            <a href="./index.html" class="mt-6 inline-block bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition">Start a New Download</a>
        </div>
    `;
}

function createHistoryCard(item) {
  const card = document.createElement("div");
  card.className =
    "history-card bg-white p-5 rounded-2xl shadow-lg border border-gray-200";

  const downloadType =
    item.type === "bulk" ? "Bulk Download" : "Single Download";
  const videoCount = item.videos.length;
  const date = new Date(item.date).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const videoDetailsHTML = item.videos
    .map(
      (video) => `
        <div class="flex items-center gap-4 py-3 border-b border-gray-100 last:border-b-0">
            <img src="${video.thumbnail}" class="w-24 h-14 object-cover rounded-md border border-gray-200">
            <div class="flex-grow min-w-0">
                <p class="font-semibold text-gray-800 truncate">${video.title}</p>
                <p class="text-sm text-gray-500">by ${video.uploader}</p>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
                <button title="Preview Video" class="preview-btn p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 transition" data-video-id="${video.id}">
                     <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
                </button>
                <div class="relative">
                    <select class="redownload-format custom-select text-sm w-24">
                        <option value="srt">SRT</option>
                        <option value="txt">TXT</option>
                        <option value="vtt">VTT</option>
                    </select>
                </div>
                <button title="Re-download Subtitle" class="redownload-btn p-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition" data-video-url="${video.url}" data-video-title="${video.title}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </button>
            </div>
        </div>
    `
    )
    .join("");

  card.innerHTML = `
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
                <h3 class="text-xl font-bold text-gray-800">${downloadType} - ${videoCount} Video${
    videoCount > 1 ? "s" : ""
  }</h3>
                <p class="text-sm text-gray-500 mt-1">${date}</p>
            </div>
            <div class="flex items-center gap-3 mt-3 sm:mt-0">
                <button class="toggle-details-btn text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    View Details
                    <svg class="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <button class="delete-history-item text-gray-400 hover:text-red-500 transition" title="Delete this entry" data-item-id="${
                  item.id
                }">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        </div>
        <div class="video-details-container hidden mt-4 pt-4 border-t border-gray-200">
            ${videoDetailsHTML}
        </div>
    `;
  return card;
}

function handleClearAllHistory() {
  if (
    confirm(
      "Are you sure you want to delete all your download history? This action cannot be undone."
    )
  ) {
    localStorage.removeItem("downloadHistory");
    loadHistory();
  }
}

function handleDeleteItem(itemId) {
  let history = JSON.parse(localStorage.getItem("downloadHistory")) || [];
  history = history.filter((item) => item.id.toString() !== itemId);
  localStorage.setItem("downloadHistory", JSON.stringify(history));
  loadHistory();
}

function toggleDetails(button) {
  const detailsContainer = button
    .closest(".history-card")
    .querySelector(".video-details-container");
  const icon = button.querySelector("svg");
  const isHidden = detailsContainer.classList.contains("hidden");

  if (isHidden) {
    detailsContainer.classList.remove("hidden");
    icon.style.transform = "rotate(180deg)";
  } else {
    detailsContainer.classList.add("hidden");
    icon.style.transform = "rotate(0deg)";
  }
}

async function handleRedownload(button) {
  const spinner = `<div class="w-5 h-5 border-2 border-gray-400 border-t-white rounded-full animate-spin"></div>`;
  const originalContent = button.innerHTML;

  button.disabled = true;
  button.innerHTML = spinner;

  const url = button.dataset.videoUrl;
  const title = button.dataset.videoTitle;
  const formatSelect = button.parentElement.querySelector(".redownload-format");
  const format = formatSelect.value;

  try {
    await downloadFile(url, "en", format, title);
    button.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
  } catch (error) {
    console.error("Redownload failed:", error);
    button.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
    alert("Failed to re-download subtitle. Please try again.");
  } finally {
    setTimeout(() => {
      button.disabled = false;
      button.innerHTML = originalContent;
    }, 2000);
  }
}

// --- UTILITY FUNCTIONS (Copied from main.js) ---

function sanitizeFilename(name) {
  let sanitized = name.replace(/[\\/:*?"<>|]/g, "_");
  sanitized = sanitized.replace(/_+/g, "_");
  return sanitized.slice(0, 100) || "download";
}

async function downloadFile(url, lang, format, title) {
  const response = await fetch("https://ytdlp.vistaflyer.com/api/download", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, lang, format, title }),
  });
  if (!response.ok) throw new Error("Download failed from server.");
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









