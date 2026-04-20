(() => {
  const ASSISTANT_ID = 'seo-backlink-assistant';
  const SUCCESS_KEYWORDS = [
    'post published',
    'published successfully',
    'successfully published',
    'submission received',
    'thank you for your submission',
    '发布成功',
    '提交成功',
    '已发布'
  ];

  let currentTaskId = '';
  let hasReportedSuccess = false;
  let successMonitorTimer = null;
  let running = false;
  let submitIntentAt = 0;

  ensureAssistantUI();
  bindSubmitIntentListeners();
  setupMessageListener();
  notifyReady('init');

  window.addEventListener('focus', () => notifyReady('focus'));
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      notifyReady('visible');
    }
  });

  function setupMessageListener() {
    chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      if (message?.type !== 'RUN_TASK' || !message.task) {
        sendResponse?.({ ok: false });
        return;
      }

      runTask(message.task)
        .then(() => sendResponse?.({ ok: true }))
        .catch((error) => sendResponse?.({ ok: false, error: error.message }));
      return true;
    });
  }

  async function notifyReady(reason) {
    const response = await runtimeMessage({
      type: 'CONTENT_READY',
      url: location.href,
      title: document.title,
      reason
    });

    if (!response?.ok || !response.shouldRun || !response.task) {
      return;
    }

    await runTask(response.task);
  }

  async function runTask(task) {
    if (!task || running) {
      return;
    }

    if (currentTaskId === task.id && successMonitorTimer) {
      return;
    }

    running = true;
    currentTaskId = task.id;
    hasReportedSuccess = false;
    submitIntentAt = 0;
    showStatus('页面接管中，开始执行流程', '自动化初始化', 'info');

    const shieldDetected = detectCloudflare();
    if (shieldDetected) {
      showStatus('检测到 Cloudflare / 风控页', '请人工过盾，通过后会自动继续', 'warn');
      playAlertTone();
      await runtimeMessage({ type: 'CF_STATUS', detected: true });
      await waitCloudflareCleared();
      await runtimeMessage({ type: 'CF_STATUS', detected: false });
      showStatus('风控已通过', '进入自动填充阶段', 'info');
    }

    const titleFilled = fillTitle(task.title);
    const bodyFilled = fillBody(task.body_html);
    await runtimeMessage({
      type: 'AUTOFILL_STATUS',
      titleFilled,
      bodyFilled
    });

    if (!bodyFilled) {
      showStatus('正文自动填充失败', '请在侧边栏点击“一键复制正文”后手动粘贴', 'warn');
    } else {
      showStatus('自动填充完成', '请检查排版后手动点击 Publish / Submit', 'ok');
    }

    const captchaDetected = detectCaptcha();
    await runtimeMessage({ type: 'CAPTCHA_STATUS', detected: captchaDetected });
    if (captchaDetected) {
      showStatus('检测到验证码', '请先人工完成验证码再发布', 'warn');
    }

    startSuccessMonitor(task.title, task.post_url);
    running = false;
  }

  async function waitCloudflareCleared() {
    const timeoutMs = 30 * 60 * 1000;
    const startAt = Date.now();

    while (Date.now() - startAt < timeoutMs) {
      await sleep(1500);
      if (!detectCloudflare()) {
        return;
      }
    }

    showStatus('仍在等待人工过盾', '你可手动刷新后继续', 'warn');
  }

  function fillTitle(title) {
    if (!title) {
      return false;
    }

    const selectors = [
      'input[name*="title" i]',
      'input[id*="title" i]',
      'input[placeholder*="title" i]',
      'textarea[name*="title" i]',
      '[contenteditable="true"][aria-label*="title" i]',
      'h1[contenteditable="true"]'
    ];

    const element = findFirstEditable(selectors);
    if (!element) {
      return false;
    }

    return setElementValue(element, title);
  }

  function fillBody(html) {
    if (!html) {
      return false;
    }

    if (fillTinyMceIframe(html)) {
      return true;
    }

    const textareaSelectors = [
      'textarea[name*="content" i]',
      'textarea[id*="content" i]',
      'textarea[name*="body" i]',
      'textarea[id*="body" i]',
      'textarea'
    ];

    const textarea = findFirstEditable(textareaSelectors);
    if (textarea && setElementValue(textarea, html)) {
      return true;
    }

    const richSelectors = [
      '[contenteditable="true"][role="textbox"]',
      '[contenteditable="true"][data-placeholder]',
      '[contenteditable="true"]',
      '.ProseMirror',
      '.ql-editor',
      '[class*="editor"] [contenteditable="true"]'
    ];
    const richEditor = findLargestEditable(richSelectors);
    if (!richEditor) {
      return false;
    }

    return setRichEditorHtml(richEditor, html);
  }

  function fillTinyMceIframe(html) {
    const iframes = Array.from(
      document.querySelectorAll(
        'iframe[id*="mce" i], iframe.tox-edit-area__iframe, iframe[title*="Rich Text" i]'
      )
    );

    for (const iframe of iframes) {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        const body = iframeDoc?.body;
        if (!body) {
          continue;
        }
        body.innerHTML = html;
        body.dispatchEvent(new InputEvent('input', { bubbles: true }));
        return true;
      } catch (_error) {
      }
    }

    return false;
  }

  function setElementValue(element, value) {
    try {
      element.focus();
      if (element.isContentEditable) {
        element.textContent = value;
        element.dispatchEvent(new InputEvent('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }

      const prototype = Object.getPrototypeOf(element);
      const descriptor = Object.getOwnPropertyDescriptor(prototype, 'value');
      const valueSetter = descriptor?.set;
      if (valueSetter) {
        valueSetter.call(element, value);
      } else {
        element.value = value;
      }
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    } catch (_error) {
      return false;
    }
  }

  function setRichEditorHtml(element, html) {
    try {
      element.focus();
      const didInsert = document.execCommand('insertHTML', false, html);
      if (!didInsert) {
        element.innerHTML = html;
      }
      element.dispatchEvent(new InputEvent('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    } catch (_error) {
      return false;
    }
  }

  function findFirstEditable(selectors) {
    for (const selector of selectors) {
      const nodes = Array.from(document.querySelectorAll(selector));
      const target = nodes.find((node) => isEditableAndVisible(node));
      if (target) {
        return target;
      }
    }
    return null;
  }

  function findLargestEditable(selectors) {
    const allNodes = [];
    for (const selector of selectors) {
      const nodes = Array.from(document.querySelectorAll(selector)).filter((node) =>
        isEditableAndVisible(node)
      );
      allNodes.push(...nodes);
    }
    if (!allNodes.length) {
      return null;
    }

    return allNodes.sort((a, b) => getArea(b) - getArea(a))[0] || null;
  }

  function isEditableAndVisible(node) {
    if (!node) {
      return false;
    }

    const rect = node.getBoundingClientRect();
    if (rect.width < 8 || rect.height < 8) {
      return false;
    }
    const style = window.getComputedStyle(node);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
      return false;
    }

    return (
      node.tagName === 'INPUT' ||
      node.tagName === 'TEXTAREA' ||
      node.isContentEditable ||
      node.getAttribute('contenteditable') === 'true'
    );
  }

  function getArea(node) {
    const rect = node.getBoundingClientRect();
    return rect.width * rect.height;
  }

  function detectCloudflare() {
    const title = (document.title || '').toLowerCase();
    if (title.includes('just a moment') || title.includes('cloudflare')) {
      return true;
    }

    const selectors = [
      'iframe[src*="turnstile"]',
      '#challenge-running',
      '#cf-challenge-running',
      '.cf-browser-verification',
      '[data-ray]'
    ];
    return selectors.some((selector) => document.querySelector(selector));
  }

  function detectCaptcha() {
    const selectors = [
      '.g-recaptcha',
      '.h-captcha',
      'iframe[src*="recaptcha"]',
      'iframe[src*="hcaptcha"]',
      '[id*="captcha" i]',
      '[class*="captcha" i]'
    ];
    return selectors.some((selector) => document.querySelector(selector));
  }

  function startSuccessMonitor(title, postUrl) {
    if (successMonitorTimer) {
      clearInterval(successMonitorTimer);
    }

    const expectedSlug = slugify(title);
    const initialUrl = canonicalizeUrl(postUrl || location.href);
    let lastUrl = canonicalizeUrl(location.href);
    let successHitCount = 0;

    successMonitorTimer = window.setInterval(async () => {
      if (hasReportedSuccess) {
        return;
      }

      const currentUrl = canonicalizeUrl(location.href);
      const urlChanged = currentUrl !== lastUrl;
      const meaningfulChanged = currentUrl !== initialUrl;
      const slugMatched = expectedSlug ? currentUrl.includes(expectedSlug) : false;
      const publishLikeUrl = isLikelyPublishedUrl(currentUrl, initialUrl);
      const bannerMatched = hasSuccessBanner();
      const textMatched = bodyContainsSuccess();
      const hasRecentSubmitIntent = Date.now() - submitIntentAt < 30 * 60 * 1000;

      const successSignal =
        hasRecentSubmitIntent &&
        (
          (urlChanged && meaningfulChanged && (slugMatched || publishLikeUrl || textMatched)) ||
          bannerMatched
        );

      if (successSignal) {
        successHitCount += 1;
      } else {
        successHitCount = 0;
      }

      if (successHitCount >= 2) {
        hasReportedSuccess = true;
        clearInterval(successMonitorTimer);
        successMonitorTimer = null;
        showStatus('检测到发布成功信号', '将自动记录结果并继续下一条', 'ok');
        await runtimeMessage({
          type: 'AUTO_SUCCESS',
          url: currentUrl,
          reason: slugMatched
            ? 'URL 命中标题 slug'
            : bannerMatched
              ? '页面出现成功提示组件'
              : '提交后检测到成功文案或发布型 URL'
        });
      }

      lastUrl = currentUrl;
    }, 1800);
  }

  function bodyContainsSuccess() {
    const text = collectFeedbackText().toLowerCase();
    return SUCCESS_KEYWORDS.some((keyword) => text.includes(keyword));
  }

  function collectFeedbackText() {
    const feedbackSelectors = [
      '.notice',
      '.notice-success',
      '.updated',
      '.alert',
      '.alert-success',
      '.message',
      '.success',
      '[role="alert"]',
      '[aria-live]'
    ];

    const parts = [];
    for (const selector of feedbackSelectors) {
      const nodes = document.querySelectorAll(selector);
      for (const node of nodes) {
        const text = node.textContent?.trim();
        if (text) {
          parts.push(text);
        }
      }
    }

    if (parts.length) {
      return parts.join(' ');
    }

    return (document.body?.innerText || '').slice(0, 2600);
  }

  function hasSuccessBanner() {
    const selectors = [
      '.notice-success',
      '.alert-success',
      '.message.success',
      '.updated',
      '[class*="success"][class*="notice"]',
      '[class*="success"][class*="alert"]'
    ];

    return selectors.some((selector) => {
      const node = document.querySelector(selector);
      if (!node) {
        return false;
      }
      const text = (node.textContent || '').toLowerCase();
      return SUCCESS_KEYWORDS.some((keyword) => text.includes(keyword));
    });
  }

  function isLikelyPublishedUrl(currentUrl, initialUrl) {
    try {
      const current = new URL(currentUrl);
      const initial = new URL(initialUrl);
      if (current.hostname !== initial.hostname) {
        return false;
      }
      if (current.pathname === initial.pathname) {
        return false;
      }

      const publishPath = current.pathname.toLowerCase();
      const adminLike = /wp-admin|submit|new|edit|draft|preview|comment|login|register/.test(publishPath);
      return !adminLike;
    } catch (_error) {
      return false;
    }
  }

  function canonicalizeUrl(url) {
    try {
      const parsed = new URL(url);
      parsed.hash = '';
      let output = parsed.toString().toLowerCase();
      if (output.endsWith('/')) {
        output = output.slice(0, -1);
      }
      return output;
    } catch (_error) {
      return (url || '').toLowerCase();
    }
  }

  function slugify(text) {
    return (text || '')
      .toLowerCase()
      .trim()
      .replace(/<[^>]*>/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  function bindSubmitIntentListeners() {
    document.addEventListener(
      'click',
      (event) => {
        const target = event.target;
        if (!(target instanceof Element)) {
          return;
        }

        const clickable = target.closest('button, input[type="submit"], a, [role="button"]');
        if (!clickable) {
          return;
        }

        const hint = [
          clickable.textContent || '',
          clickable.getAttribute('value') || '',
          clickable.getAttribute('aria-label') || '',
          clickable.getAttribute('title') || '',
          clickable.id || '',
          clickable.className || ''
        ]
          .join(' ')
          .toLowerCase();

        if (/(publish|submit|post|send|发布|提交)/.test(hint)) {
          submitIntentAt = Date.now();
        }
      },
      true
    );

    document.addEventListener(
      'submit',
      () => {
        submitIntentAt = Date.now();
      },
      true
    );
  }

  function ensureAssistantUI() {
    if (document.getElementById(ASSISTANT_ID)) {
      return;
    }

    const panel = document.createElement('div');
    panel.id = ASSISTANT_ID;
    panel.className = 'assist-info';
    panel.innerHTML = `
      <div class="assist-head">
        <div class="assist-title">SEO 发布助手</div>
        <div class="assist-dot"></div>
      </div>
      <div class="assist-body">
        <div class="assist-status">等待任务中...</div>
        <div class="assist-hint">侧边栏导入 CSV 后开始执行。</div>
      </div>
    `;
    document.documentElement.appendChild(panel);
  }

  function showStatus(mainText, hintText, level = 'info') {
    const panel = document.getElementById(ASSISTANT_ID);
    if (!panel) {
      return;
    }

    panel.classList.remove('assist-info', 'assist-warn', 'assist-ok');
    panel.classList.add(level === 'warn' ? 'assist-warn' : level === 'ok' ? 'assist-ok' : 'assist-info');

    const statusNode = panel.querySelector('.assist-status');
    const hintNode = panel.querySelector('.assist-hint');
    if (statusNode) {
      statusNode.textContent = mainText;
    }
    if (hintNode) {
      hintNode.textContent = hintText;
    }
  }

  function playAlertTone() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      oscillator.type = 'triangle';
      oscillator.frequency.value = 770;
      gain.gain.value = 0.05;
      oscillator.connect(gain);
      gain.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.25);
    } catch (_error) {
    }
  }

  function runtimeMessage(payload) {
    return new Promise((resolve) => {
      try {
        chrome.runtime.sendMessage(payload, (response) => {
          if (chrome.runtime.lastError) {
            resolve(null);
            return;
          }
          resolve(response || null);
        });
      } catch (_error) {
        resolve(null);
      }
    });
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
})();
