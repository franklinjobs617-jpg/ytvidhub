# YouTube Subtitle Extractor (for ytvidhub)

## Product flow
- Works only on YouTube watch pages (`/watch?v=...`).
- Open extension icon or right-side `SUB` launcher.
- Popup is included (quick status + open extractor panel).
- Panel shows skeleton first, then subtitle content.
- Download buttons are disabled until subtitle is ready.
- Supports `TXT` and `SRT` download in-panel.
- Includes `icon16/icon48/icon128` for store-ready packaging.
- Free mode is enforced by backend policy.
- When extension-side free channel is not available, backend returns `QUOTA_EXCEEDED` and `redirect_url`.

## Backend dependency
- Endpoint: `POST /api/extension/youtube-subtitle`
- File: `app.py`
- Request body:
```json
{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID",
  "lang": "en"
}
```

## Local test
1. Run backend:
   - `python app.py`
2. Open Chrome:
   - `chrome://extensions`
3. Enable Developer mode.
4. Load unpacked extension directory:
   - `E:\前端 github\ytvidhub\ytvidhub\chrome-extension\youtube-subtitle-extractor`
5. Open a YouTube watch page and click extension icon.
6. Verify:
   - non-watch pages are blocked with clear提示
   - first/second request returns subtitles
   - download buttons only enable after completion
   - third successful request shows website redirect CTA
