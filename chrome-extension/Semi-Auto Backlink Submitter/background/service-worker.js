const STORAGE_KEY = 'seoBacklinkSubmitterStateV1';

const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  SUCCESS: 'success',
  FAIL: 'fail',
  SKIP: 'skip'
};

const RUN_MODE = {
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused'
};

const WAITING_REASON = {
  NONE: 'none',
  CLOUDFLARE: 'cloudflare',
  CAPTCHA: 'captcha',
  MANUAL_FILL: 'manual_fill'
};

const DEFAULT_STATE = {
  tasks: [],
  run: {
    mode: RUN_MODE.IDLE,
    currentTaskId: null,
    currentTabId: null,
    currentDomain: '',
    waitingReason: WAITING_REASON.NONE,
    statusMessage: '待命中'
  },
  updatedAt: 0
};

chrome.runtime.onInstalled.addListener(async () => {
  const state = await loadState();
  await saveState(state);
  if (chrome.sidePanel?.setPanelBehavior) {
    await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  }
});

chrome.tabs.onRemoved.addListener(async (tabId) => {
  const state = await loadState();
  if (state.run.currentTabId !== tabId) {
    return;
  }

  const currentTaskIndex = findTaskIndexById(state, state.run.currentTaskId);
  if (currentTaskIndex >= 0 && state.tasks[currentTaskIndex].status === TASK_STATUS.IN_PROGRESS) {
    state.tasks[currentTaskIndex].status = TASK_STATUS.PENDING;
    state.tasks[currentTaskIndex].note = '当前标签被关闭，任务已回到待处理';
    state.tasks[currentTaskIndex].updatedAt = Date.now();
  }

  state.run.mode = RUN_MODE.PAUSED;
  state.run.currentTaskId = null;
  state.run.currentTabId = null;
  state.run.currentDomain = '';
  state.run.waitingReason = WAITING_REASON.NONE;
  state.run.statusMessage = '任务标签被关闭，已暂停';
  await saveState(state);
  await broadcastState();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleMessage(message, sender)
    .then((result) => sendResponse({ ok: true, ...result }))
    .catch((error) => sendResponse({ ok: false, error: error.message || 'unknown error' }));
  return true;
});

async function handleMessage(message, sender) {
  switch (message?.type) {
    case 'GET_STATE':
      return { state: buildUiState(await loadState()) };
    case 'IMPORT_TASKS':
      return handleImportTasks(message.tasks || []);
    case 'START_TASKS':
      return { state: buildUiState(await startOrResumeRun()) };
    case 'PAUSE_TASKS':
      return { state: buildUiState(await pauseRun()) };
    case 'MARK_RESULT':
      return {
        state: buildUiState(
          await finalizeCurrentTask({
            status: message.status,
            note: message.note || '',
            explicitUrl: message.url || '',
            source: 'manual'
          })
        )
      };
    case 'CONTENT_READY':
      return handleContentReady(sender);
    case 'CF_STATUS':
      await handleCloudflareStatus(message, sender);
      return {};
    case 'AUTOFILL_STATUS':
      await handleAutofillStatus(message, sender);
      return {};
    case 'CAPTCHA_STATUS':
      await handleCaptchaStatus(message, sender);
      return {};
    case 'AUTO_SUCCESS':
      await handleAutoSuccess(message, sender);
      return {};
    default:
      return {};
  }
}

async function handleImportTasks(rawTasks) {
  const normalizedTasks = rawTasks
    .map((item, index) => normalizeTask(item, index))
    .filter(Boolean);

  const state = await loadState();
  state.tasks = normalizedTasks;
  state.run = {
    mode: RUN_MODE.IDLE,
    currentTaskId: null,
    currentTabId: null,
    currentDomain: '',
    waitingReason: WAITING_REASON.NONE,
    statusMessage: normalizedTasks.length ? 'CSV 导入完成，等待开始' : 'CSV 没有有效任务'
  };
  await saveState(state);
  await broadcastState();
  return { state: buildUiState(state) };
}

async function startOrResumeRun() {
  const state = await loadState();
  if (!state.tasks.length) {
    throw new Error('请先导入 task.csv');
  }

  state.run.mode = RUN_MODE.RUNNING;
  state.run.statusMessage = '任务运行中';
  await saveState(state);

  const currentTaskIndex = findTaskIndexById(state, state.run.currentTaskId);
  const currentTab = await getTabById(state.run.currentTabId);
  if (
    currentTaskIndex >= 0 &&
    state.tasks[currentTaskIndex].status === TASK_STATUS.IN_PROGRESS &&
    currentTab
  ) {
    await broadcastState();
    return state;
  }

  return openNextPendingTask(state);
}

async function pauseRun() {
  const state = await loadState();
  state.run.mode = RUN_MODE.PAUSED;
  state.run.statusMessage = '任务已暂停';
  await saveState(state);
  await broadcastState();
  return state;
}

async function openNextPendingTask(inputState) {
  const state = inputState || (await loadState());
  const nextIndex = state.tasks.findIndex((task) => task.status === TASK_STATUS.PENDING);

  if (nextIndex < 0) {
    state.run.mode = RUN_MODE.IDLE;
    state.run.currentTaskId = null;
    state.run.currentTabId = null;
    state.run.currentDomain = '';
    state.run.waitingReason = WAITING_REASON.NONE;
    state.run.statusMessage = '全部任务已处理完成';
    await saveState(state);
    await broadcastState();
    return state;
  }

  const nextTask = state.tasks[nextIndex];
  nextTask.status = TASK_STATUS.IN_PROGRESS;
  nextTask.note = '';
  nextTask.updatedAt = Date.now();

  if (state.run.currentTabId) {
    await closeTab(state.run.currentTabId);
  }

  const tab = await createTab(nextTask.post_url);
  state.run.currentTaskId = nextTask.id;
  state.run.currentTabId = tab.id;
  state.run.currentDomain = getDomainFromUrl(nextTask.post_url);
  state.run.waitingReason = WAITING_REASON.NONE;
  state.run.statusMessage = '已打开投稿页，等待页面接管';
  await saveState(state);
  await broadcastState();
  return state;
}

async function finalizeCurrentTask({ status, note = '', explicitUrl = '', source = 'manual' }) {
  const state = await loadState();
  const currentTaskIndex = findTaskIndexById(state, state.run.currentTaskId);
  if (currentTaskIndex < 0) {
    throw new Error('当前没有可标记的任务');
  }

  const normalizedStatus = normalizeResultStatus(status);
  const currentTask = state.tasks[currentTaskIndex];
  currentTask.status = normalizedStatus;
  currentTask.note = note || '';
  currentTask.finishedBy = source;
  currentTask.updatedAt = Date.now();

  if (normalizedStatus === TASK_STATUS.SUCCESS) {
    const finalUrl = explicitUrl || (await getTabUrl(state.run.currentTabId)) || '';
    currentTask.resultUrl = finalUrl;
  } else {
    currentTask.resultUrl = '';
  }

  const tabIdToClose = state.run.currentTabId;
  state.run.currentTaskId = null;
  state.run.currentTabId = null;
  state.run.currentDomain = '';
  state.run.waitingReason = WAITING_REASON.NONE;
  state.run.statusMessage = `任务已标记为 ${normalizedStatus}`;
  await saveState(state);

  if (tabIdToClose) {
    await closeTab(tabIdToClose);
  }

  if (state.run.mode === RUN_MODE.RUNNING) {
    return openNextPendingTask(await loadState());
  }

  await broadcastState();
  return await loadState();
}

async function handleContentReady(sender) {
  const tabId = sender?.tab?.id;
  const state = await loadState();
  if (!tabId || state.run.mode !== RUN_MODE.RUNNING || tabId !== state.run.currentTabId) {
    return { shouldRun: false };
  }

  const currentTaskIndex = findTaskIndexById(state, state.run.currentTaskId);
  if (currentTaskIndex < 0) {
    return { shouldRun: false };
  }

  return {
    shouldRun: true,
    task: state.tasks[currentTaskIndex],
    run: state.run
  };
}

async function handleCloudflareStatus(message, sender) {
  const tabId = sender?.tab?.id;
  const state = await loadState();
  if (!tabId || tabId !== state.run.currentTabId) {
    return;
  }

  if (message.detected) {
    state.run.waitingReason = WAITING_REASON.CLOUDFLARE;
    state.run.statusMessage = '检测到 Cloudflare，等待人工过盾';
  } else if (state.run.waitingReason === WAITING_REASON.CLOUDFLARE) {
    state.run.waitingReason = WAITING_REASON.NONE;
    state.run.statusMessage = 'Cloudflare 已通过，继续填充流程';
  }

  await saveState(state);
  await broadcastState();
}

async function handleAutofillStatus(message, sender) {
  const tabId = sender?.tab?.id;
  const state = await loadState();
  if (!tabId || tabId !== state.run.currentTabId) {
    return;
  }

  const currentTaskIndex = findTaskIndexById(state, state.run.currentTaskId);
  if (currentTaskIndex < 0) {
    return;
  }

  const task = state.tasks[currentTaskIndex];
  task.autofill = {
    titleFilled: Boolean(message.titleFilled),
    bodyFilled: Boolean(message.bodyFilled),
    updatedAt: Date.now()
  };

  if (!message.bodyFilled) {
    state.run.waitingReason = WAITING_REASON.MANUAL_FILL;
    state.run.statusMessage = '正文自动填充失败，请使用手动复制粘贴';
  } else {
    state.run.waitingReason = WAITING_REASON.NONE;
    state.run.statusMessage = '自动填充完成，等待人工核验发布';
  }

  await saveState(state);
  await broadcastState();
}

async function handleCaptchaStatus(message, sender) {
  const tabId = sender?.tab?.id;
  const state = await loadState();
  if (!tabId || tabId !== state.run.currentTabId) {
    return;
  }

  if (message.detected) {
    state.run.waitingReason = WAITING_REASON.CAPTCHA;
    state.run.statusMessage = '检测到验证码，请手动处理后发布';
  } else if (state.run.waitingReason === WAITING_REASON.CAPTCHA) {
    state.run.waitingReason = WAITING_REASON.NONE;
    state.run.statusMessage = '验证码状态已清除';
  }

  await saveState(state);
  await broadcastState();
}

async function handleAutoSuccess(message, sender) {
  const tabId = sender?.tab?.id;
  const state = await loadState();
  if (!tabId || tabId !== state.run.currentTabId) {
    return;
  }

  const currentTaskIndex = findTaskIndexById(state, state.run.currentTaskId);
  if (currentTaskIndex < 0) {
    return;
  }

  const currentTask = state.tasks[currentTaskIndex];
  if (currentTask.status !== TASK_STATUS.IN_PROGRESS) {
    return;
  }

  await finalizeCurrentTask({
    status: TASK_STATUS.SUCCESS,
    note: message.reason || '自动判定发布成功',
    explicitUrl: message.url || '',
    source: 'auto'
  });
}

function normalizeTask(item, index) {
  const postUrl = (item.post_url || '').trim();
  if (!/^https?:\/\//i.test(postUrl)) {
    return null;
  }

  return {
    id: `task_${Date.now()}_${index}_${Math.random().toString(16).slice(2, 8)}`,
    post_url: postUrl,
    title: (item.title || '').trim(),
    body_html: item.body_html || '',
    tags: item.tags || '',
    status: TASK_STATUS.PENDING,
    resultUrl: '',
    note: '',
    finishedBy: '',
    autofill: {
      titleFilled: false,
      bodyFilled: false,
      updatedAt: 0
    },
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
}

function normalizeResultStatus(status) {
  if (status === TASK_STATUS.SUCCESS || status === TASK_STATUS.FAIL || status === TASK_STATUS.SKIP) {
    return status;
  }
  throw new Error('不支持的任务状态');
}

function findTaskIndexById(state, taskId) {
  if (!taskId) {
    return -1;
  }
  return state.tasks.findIndex((task) => task.id === taskId);
}

function buildUiState(state) {
  const total = state.tasks.length;
  const completed = state.tasks.filter((task) =>
    [TASK_STATUS.SUCCESS, TASK_STATUS.FAIL, TASK_STATUS.SKIP].includes(task.status)
  ).length;

  const currentTask =
    state.tasks.find((task) => task.id === state.run.currentTaskId) || null;

  return {
    run: state.run,
    progress: {
      completed,
      total
    },
    currentTask,
    tasks: state.tasks
  };
}

function cloneDefaultState() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

async function loadState() {
  const stored = await storageGet(STORAGE_KEY);
  if (!stored) {
    return cloneDefaultState();
  }

  return {
    ...cloneDefaultState(),
    ...stored,
    run: {
      ...cloneDefaultState().run,
      ...(stored.run || {})
    },
    tasks: Array.isArray(stored.tasks) ? stored.tasks : []
  };
}

async function saveState(state) {
  state.updatedAt = Date.now();
  await storageSet({ [STORAGE_KEY]: state });
}

async function broadcastState() {
  const payload = buildUiState(await loadState());
  await runtimeSendMessage({
    type: 'STATE_UPDATE',
    payload
  });
}

function getDomainFromUrl(url) {
  try {
    return new URL(url).hostname;
  } catch (_error) {
    return '';
  }
}

function storageGet(key) {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], (value) => resolve(value[key]));
  });
}

function storageSet(value) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(value, () => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      resolve();
    });
  });
}

function runtimeSendMessage(message) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(message, () => {
      resolve();
    });
  });
}

function createTab(url) {
  return new Promise((resolve, reject) => {
    chrome.tabs.create({ url, active: true }, (tab) => {
      if (chrome.runtime.lastError || !tab) {
        reject(new Error(chrome.runtime.lastError?.message || '创建标签页失败'));
        return;
      }
      resolve(tab);
    });
  });
}

function getTabById(tabId) {
  if (!tabId) {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    chrome.tabs.get(tabId, (tab) => {
      if (chrome.runtime.lastError || !tab) {
        resolve(null);
        return;
      }
      resolve(tab);
    });
  });
}

function getTabUrl(tabId) {
  if (!tabId) {
    return Promise.resolve('');
  }
  return new Promise((resolve) => {
    chrome.tabs.get(tabId, (tab) => {
      if (chrome.runtime.lastError || !tab) {
        resolve('');
        return;
      }
      resolve(tab.url || '');
    });
  });
}

function closeTab(tabId) {
  if (!tabId) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    chrome.tabs.remove(tabId, () => resolve());
  });
}
