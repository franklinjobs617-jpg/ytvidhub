const STATUS_TEXT = {
  pending: '待处理',
  in_progress: '进行中',
  success: '成功',
  fail: '失败',
  skip: '跳过'
};

const RUN_MODE_TEXT = {
  idle: '待命中',
  running: '运行中',
  paused: '已暂停'
};

const elements = {
  csvFileInput: document.getElementById('csvFileInput'),
  importBtn: document.getElementById('importBtn'),
  runToggleBtn: document.getElementById('runToggleBtn'),
  exportBtn: document.getElementById('exportBtn'),
  copyTitleBtn: document.getElementById('copyTitleBtn'),
  copyBodyBtn: document.getElementById('copyBodyBtn'),
  markSuccessBtn: document.getElementById('markSuccessBtn'),
  markFailBtn: document.getElementById('markFailBtn'),
  markSkipBtn: document.getElementById('markSkipBtn'),
  progressText: document.getElementById('progressText'),
  domainText: document.getElementById('domainText'),
  runStateText: document.getElementById('runStateText'),
  taskTitleText: document.getElementById('taskTitleText'),
  taskList: document.getElementById('taskList'),
  toast: document.getElementById('toast')
};

let latestState = {
  run: {
    mode: 'idle',
    currentTaskId: null,
    currentDomain: '',
    statusMessage: '待命中'
  },
  progress: {
    completed: 0,
    total: 0
  },
  currentTask: null,
  tasks: []
};

bootstrap();

async function bootstrap() {
  bindEvents();
  chrome.runtime.onMessage.addListener((message) => {
    if (message?.type === 'STATE_UPDATE' && message.payload) {
      applyState(message.payload);
    }
  });
  await refreshState();
  setInterval(() => {
    refreshState();
  }, 2000);
}

function bindEvents() {
  elements.importBtn.addEventListener('click', () => {
    elements.csvFileInput.click();
  });
  elements.csvFileInput.addEventListener('change', importCsvFile);

  elements.runToggleBtn.addEventListener('click', async () => {
    const isRunning = latestState?.run?.mode === 'running';
    const type = isRunning ? 'PAUSE_TASKS' : 'START_TASKS';
    const response = await sendMessage({ type });
    if (!response?.ok) {
      notify(response?.error || '切换任务状态失败');
      return;
    }
    notify(isRunning ? '任务已暂停' : '任务已启动');
  });

  elements.copyTitleBtn.addEventListener('click', async () => {
    const task = latestState.currentTask;
    if (!task) {
      notify('当前没有进行中的任务');
      return;
    }

    await navigator.clipboard.writeText(task.title || '');
    notify('标题已复制');
  });

  elements.copyBodyBtn.addEventListener('click', async () => {
    const task = latestState.currentTask;
    if (!task) {
      notify('当前没有进行中的任务');
      return;
    }

    const html = task.body_html || '';
    const plain = stripHtml(html);
    try {
      if (window.ClipboardItem) {
        const item = new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([plain], { type: 'text/plain' })
        });
        await navigator.clipboard.write([item]);
      } else {
        await navigator.clipboard.writeText(html);
      }
      notify('正文 (HTML) 已复制，前往编辑器粘贴即可');
    } catch (_error) {
      await navigator.clipboard.writeText(html);
      notify('浏览器限制了富文本复制，已复制原始 HTML 文本');
    }
  });

  elements.markSuccessBtn.addEventListener('click', () => markCurrent('success'));
  elements.markFailBtn.addEventListener('click', () => markCurrent('fail'));
  elements.markSkipBtn.addEventListener('click', () => markCurrent('skip'));

  elements.exportBtn.addEventListener('click', exportResultsCsv);
}

async function importCsvFile(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  const csvText = await readCsvFile(file);
  const rows = parseCsv(csvText);
  const tasks = normalizeImportedRows(rows);
  if (!tasks.length) {
    notify('CSV 未检测到合法的 post_url');
    elements.csvFileInput.value = '';
    return;
  }

  const response = await sendMessage({
    type: 'IMPORT_TASKS',
    tasks
  });

  if (!response?.ok) {
    notify(response?.error || 'CSV 导入失败');
    elements.csvFileInput.value = '';
    return;
  }

  notify(`导入成功：${tasks.length} 条任务`);
  elements.csvFileInput.value = '';
}

function normalizeImportedRows(rows) {
  return rows
    .map((row) => {
      const normalized = {};
      for (const [key, value] of Object.entries(row)) {
        normalized[normalizeHeader(key)] = value;
      }

      const postUrl = (
        normalized.post_url ||
        normalized.url ||
        normalized.post ||
        normalized.posturl ||
        ''
      ).trim();

      const bodyHtml = (
        normalized.body_html ||
        [normalized.body, normalized.html].filter(Boolean).join('\n')
      ).trim();

      return {
        post_url: postUrl,
        title: (normalized.title || '').trim(),
        body_html: bodyHtml,
        tags: normalized.tags || ''
      };
    })
    .filter((task) => /^https?:\/\//i.test(task.post_url));
}

async function markCurrent(status) {
  if (!latestState.currentTask) {
    notify('当前没有可标记任务');
    return;
  }
  const response = await sendMessage({
    type: 'MARK_RESULT',
    status
  });

  if (!response?.ok) {
    notify(response?.error || '状态标记失败');
    return;
  }

  const label = STATUS_TEXT[status] || status;
  notify(`当前任务已标记：${label}`);
}

async function exportResultsCsv() {
  const response = await sendMessage({ type: 'GET_STATE' });
  if (!response?.ok || !response.state) {
    notify(response?.error || '读取结果失败');
    return;
  }

  const rows = response.state.tasks.map((task) => ({
    '原始URL': task.post_url || '',
    '发布状态': STATUS_TEXT[task.status] || task.status || '',
    '成功后的外链URL': task.resultUrl || '',
    '任务标题': task.title || '',
    '备注': task.note || ''
  }));
  const csv = buildCsv(rows);
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
  const objectUrl = URL.createObjectURL(blob);
  const filename = `result-${timestampForFile()}.csv`;

  await new Promise((resolve) => {
    chrome.downloads.download(
      {
        url: objectUrl,
        filename,
        saveAs: true
      },
      () => {
        URL.revokeObjectURL(objectUrl);
        resolve();
      }
    );
  });
  notify('结果 CSV 已导出');
}

async function refreshState() {
  const response = await sendMessage({ type: 'GET_STATE' });
  if (!response?.ok || !response.state) {
    return;
  }
  applyState(response.state);
}

function applyState(state) {
  latestState = state;
  const completed = state?.progress?.completed || 0;
  const total = state?.progress?.total || 0;
  elements.progressText.textContent = `${completed} / ${total}`;
  elements.domainText.textContent = state?.run?.currentDomain || '-';

  const mode = state?.run?.mode || 'idle';
  const modeText = RUN_MODE_TEXT[mode] || mode;
  const waitText = state?.run?.statusMessage ? ` · ${state.run.statusMessage}` : '';
  elements.runStateText.textContent = `${modeText}${waitText}`;

  elements.taskTitleText.textContent = state?.currentTask?.title || '-';
  elements.runToggleBtn.textContent = mode === 'running' ? '暂停任务' : '开始任务';

  const hasCurrent = Boolean(state?.currentTask);
  elements.copyTitleBtn.disabled = !hasCurrent;
  elements.copyBodyBtn.disabled = !hasCurrent;
  elements.markSuccessBtn.disabled = !hasCurrent;
  elements.markFailBtn.disabled = !hasCurrent;
  elements.markSkipBtn.disabled = !hasCurrent;

  renderTaskList(state.tasks || []);
}

function renderTaskList(tasks) {
  elements.taskList.innerHTML = '';
  if (!tasks.length) {
    const empty = document.createElement('li');
    empty.textContent = '暂无任务，请先导入 CSV。';
    elements.taskList.appendChild(empty);
    return;
  }

  const preview = tasks.slice(0, 12);
  for (const task of preview) {
    const li = document.createElement('li');
    const statusClass = `state-${task.status || 'pending'}`;
    li.innerHTML = `
      <div><strong>${task.title || '（无标题）'}</strong></div>
      <div class="task-url">${task.post_url || '-'}</div>
      <div>
        <span class="task-status ${statusClass}">${STATUS_TEXT[task.status] || task.status}</span>
      </div>
    `;
    elements.taskList.appendChild(li);
  }
}

function parseCsv(input) {
  const text = (input || '').replace(/^\uFEFF/, '');
  const delimiter = detectDelimiter(text);
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (char === '"') {
      const next = text[i + 1];
      if (inQuotes && next === '"') {
        field += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === delimiter && !inQuotes) {
      row.push(field);
      field = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && text[i + 1] === '\n') {
        i += 1;
      }
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      continue;
    }

    field += char;
  }

  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }

  if (!rows.length) {
    return [];
  }

  const headers = rows[0].map((header) => normalizeHeader(header));
  const output = [];
  for (let line = 1; line < rows.length; line += 1) {
    const values = rows[line];
    if (!values || !values.some((value) => String(value || '').trim())) {
      continue;
    }
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] ?? '';
    });
    output.push(obj);
  }
  return output;
}

function detectDelimiter(text) {
  const firstLine = String(text || '')
    .split(/\r\n|\n|\r/)
    .find((line) => line.trim().length) || '';

  const candidates = [',', ';', '\t', '|'];
  let best = ',';
  let score = -1;
  for (const delimiter of candidates) {
    const count = (firstLine.match(new RegExp(escapeRegExp(delimiter), 'g')) || []).length;
    if (count > score) {
      best = delimiter;
      score = count;
    }
  }
  return best;
}

function buildCsv(rows) {
  if (!rows.length) {
    return '原始URL,发布状态,成功后的外链URL,任务标题,备注';
  }

  const headers = Object.keys(rows[0]);
  const lines = [headers.join(',')];
  for (const row of rows) {
    const line = headers.map((header) => escapeCsvCell(row[header])).join(',');
    lines.push(line);
  }
  return lines.join('\r\n');
}

function escapeCsvCell(value) {
  const text = String(value ?? '');
  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function normalizeHeader(header) {
  return String(header || '')
    .replace(/^\uFEFF/, '')
    .trim()
    .toLowerCase()
    .replace(/["']/g, '')
    .replace(/-/g, '_')
    .replace(/\s+/g, '_');
}

async function readCsvFile(file) {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  if (bytes.length >= 2) {
    if (bytes[0] === 0xff && bytes[1] === 0xfe) {
      return new TextDecoder('utf-16le').decode(bytes);
    }
    if (bytes[0] === 0xfe && bytes[1] === 0xff) {
      return new TextDecoder('utf-16be').decode(bytes);
    }
  }

  if (bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) {
    return new TextDecoder('utf-8').decode(bytes);
  }

  return new TextDecoder('utf-8').decode(bytes);
}

function escapeRegExp(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html || '', 'text/html');
  return doc.body.textContent || '';
}

function timestampForFile() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  return `${yyyy}${mm}${dd}-${hh}${min}${ss}`;
}

function notify(text) {
  elements.toast.textContent = text;
}

function sendMessage(payload) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(payload, (response) => {
      if (chrome.runtime.lastError) {
        resolve({ ok: false, error: chrome.runtime.lastError.message });
        return;
      }
      resolve(response || { ok: false, error: 'No response' });
    });
  });
}
