import { Link } from "@/i18n/routing";

type Locale = "en" | "es" | "zh" | string;

type IntentCard = {
  title: string;
  body: string;
};

type ComparisonRow = {
  label: string;
  bestFor: string;
  link?: {
    href: string;
    text: string;
  };
};

type LocalizedSeoContent = {
  badge: string;
  answerTitle: string;
  answerBody: string;
  intentTitle: string;
  intentSubtitle: string;
  intents: IntentCard[];
  formatTitle: string;
  formatRows: ComparisonRow[];
  workflowTitle: string;
  workflowRows: ComparisonRow[];
  linkTitle: string;
  linkBody: string;
  links: Array<{ href: string; text: string; body: string }>;
};

const contentByLocale: Record<"en" | "es" | "zh", LocalizedSeoContent> = {
  en: {
    badge: "Quick Guide",
    answerTitle: "Download subtitles from YouTube in a few clicks",
    answerBody:
      "Paste a YouTube video, playlist, or channel link, choose an available language, and export subtitles as SRT, VTT, or TXT. Use SRT for editing, VTT for web players, and TXT when you need clean readable transcript text.",
    intentTitle: "What can you download with YTVidHub?",
    intentSubtitle:
      "Choose the workflow that matches what you need to do with YouTube subtitles.",
    intents: [
      {
        title: "Download YouTube subtitles",
        body: "Extract creator-uploaded or auto-generated subtitles from YouTube videos for editing, translation, accessibility, and research.",
      },
      {
        title: "Download YouTube captions",
        body: "Save CC tracks and caption text when you need readable, time-aligned files for review or publishing.",
      },
      {
        title: "Extract YouTube subtitles",
        body: "Paste a video, playlist, or channel URL and move from manual copy-paste to structured subtitle export.",
      },
      {
        title: "Export SRT, VTT, or TXT",
        body: "Choose the file type that fits your workflow: editors, web players, clean notes, or AI-ready text.",
      },
    ],
    formatTitle: "SRT vs VTT vs TXT: choose the right subtitle export",
    formatRows: [
      {
        label: "SRT",
        bestFor:
          "Video editors, VLC, subtitle uploads, translation workflows, and broad player compatibility.",
        link: { href: "/what-is-an-srt-file", text: "Learn SRT format" },
      },
      {
        label: "VTT",
        bestFor:
          "HTML5 video, course platforms, browser playback, and WebVTT caption workflows.",
        link: { href: "/youtube-vtt-downloader", text: "Download VTT captions" },
      },
      {
        label: "TXT",
        bestFor:
          "Readable transcript text for notes, content repurposing, search, research, and AI prompts.",
        link: { href: "/youtube-transcript-generator", text: "Generate transcripts" },
      },
    ],
    workflowTitle: "Subtitle vs Caption vs Transcript",
    workflowRows: [
      {
        label: "Subtitle downloader",
        bestFor:
          "Best when you need timed SRT/VTT files from a single YouTube video.",
        link: { href: "/youtube-subtitle-downloader", text: "Open subtitle downloader" },
      },
      {
        label: "Caption downloader",
        bestFor:
          "Best when you need CC tracks, closed captions, and accessibility review.",
        link: { href: "/youtube-caption-downloader", text: "Open caption downloader" },
      },
      {
        label: "Bulk downloader",
        bestFor:
          "Best when you need subtitles from playlists, channels, or many videos in one package.",
        link: { href: "/bulk-youtube-subtitle-downloader", text: "Open bulk downloader" },
      },
    ],
    linkTitle: "Go deeper with focused subtitle tools",
    linkBody:
      "Use the homepage for the main workflow, then choose the focused page that matches your exact subtitle task.",
    links: [
      {
        href: "/download-youtube-subtitles-online",
        text: "Download YouTube subtitles online",
        body: "A direct online workflow for single-video subtitle exports.",
      },
      {
        href: "/youtube-subtitle-downloader",
        text: "YouTube subtitle downloader",
        body: "A focused SRT/VTT/TXT tool page for single video downloads.",
      },
      {
        href: "/youtube-caption-downloader",
        text: "YouTube caption downloader",
        body: "A caption and CC-focused page for accessibility and editing.",
      },
      {
        href: "/bulk-youtube-subtitle-downloader",
        text: "Bulk subtitle downloader",
        body: "A playlist and channel workflow for large subtitle collections.",
      },
      {
        href: "/guide/playlist-subtitles-bulk",
        text: "Playlist subtitle download guide",
        body: "Step-by-step guide to downloading every subtitle from a playlist in one click.",
      },
      {
        href: "/youtube-transcript-generator",
        text: "YouTube transcript generator",
        body: "Convert any YouTube video to clean text — no timestamps, ready for notes and AI tools.",
      },
      {
        href: "/youtube-vtt-downloader",
        text: "YouTube VTT downloader",
        body: "A WebVTT-focused page for HTML5 video and web players.",
      },
    ],
  },
  zh: {
    badge: "快速指南",
    answerTitle: "几步下载 YouTube 字幕",
    answerBody:
      "粘贴 YouTube 视频、播放列表或频道链接，选择可用语言，然后导出 SRT、VTT 或 TXT 字幕。SRT 适合剪辑和播放器，VTT 适合网页视频，TXT 适合阅读、整理笔记和 AI 文本处理。",
    intentTitle: "你可以用 YTVidHub 做什么？",
    intentSubtitle:
      "根据你的使用场景选择合适的字幕下载方式。",
    intents: [
      {
        title: "下载 YouTube 字幕",
        body: "从 YouTube 视频中下载创作者上传或自动生成的字幕，支持 SRT、VTT 和 TXT 格式。",
      },
      {
        title: "提取字幕文本",
        body: "粘贴视频、播放列表或频道链接，快速提取可用字幕，不需要手动复制字幕文本。",
      },
      {
        title: "保存 CC 字幕",
        body: "下载 YouTube CC 和封闭字幕，用于无障碍检查、内容审核、翻译和发布。",
      },
      {
        title: "批量收集字幕",
        body: "适合学习、翻译、剪辑、内容复用、研究整理和批量字幕收集。",
      },
    ],
    formatTitle: "SRT、VTT、TXT 字幕格式怎么选？",
    formatRows: [
      {
        label: "SRT",
        bestFor: "适合视频播放器、剪辑软件、字幕翻译和平台上传，兼容性最好。",
        link: { href: "/what-is-an-srt-file", text: "了解 SRT 格式" },
      },
      {
        label: "VTT",
        bestFor: "适合网页播放器、HTML5 视频、在线课程和浏览器字幕场景。",
        link: { href: "/youtube-vtt-downloader", text: "下载 VTT 字幕" },
      },
      {
        label: "TXT",
        bestFor: "适合学习笔记、文本整理、内容分析、AI 总结和提示词处理。",
        link: { href: "/youtube-transcript-generator", text: "生成字幕文本" },
      },
    ],
    workflowTitle: "单个视频、字幕提取、批量下载的区别",
    workflowRows: [
      {
        label: "单视频字幕下载",
        bestFor: "适合从一个 YouTube 视频下载 SRT、VTT 或 TXT 字幕。",
        link: { href: "/youtube-subtitle-downloader", text: "打开字幕下载工具" },
      },
      {
        label: "字幕/CC 下载",
        bestFor: "适合下载 YouTube CC 字幕、封闭字幕和无障碍字幕文本。",
        link: { href: "/youtube-caption-downloader", text: "打开字幕 CC 工具" },
      },
      {
        label: "批量字幕下载",
        bestFor: "适合从播放列表、频道或多个视频一次性收集字幕。",
        link: { href: "/bulk-youtube-subtitle-downloader", text: "打开批量下载工具" },
      },
    ],
    linkTitle: "选择更适合你的字幕工具",
    linkBody:
      "首页用于快速开始；如果你有更明确的任务，可以进入下面的专题工具页。",
    links: [
      {
        href: "/download-youtube-subtitles-online",
        text: "在线下载 YouTube 字幕",
        body: "适合快速下载单个视频字幕。",
      },
      {
        href: "/youtube-subtitle-downloader",
        text: "YouTube 字幕下载工具",
        body: "适合单个视频的 SRT、VTT、TXT 导出。",
      },
      {
        href: "/youtube-caption-downloader",
        text: "YouTube CC 字幕下载",
        body: "适合下载 captions、CC 和封闭字幕。",
      },
      {
        href: "/bulk-youtube-subtitle-downloader",
        text: "批量字幕下载",
        body: "适合播放列表、频道和多视频字幕收集。",
      },
      {
        href: "/youtube-vtt-downloader",
        text: "YouTube VTT 字幕下载",
        body: "适合网页播放器和 WebVTT 字幕场景。",
      },
    ],
  },
  es: {
    badge: "Guía rápida",
    answerTitle: "Descarga subtítulos de YouTube en pocos pasos",
    answerBody:
      "Pega un enlace de YouTube, elige un idioma disponible y exporta subtítulos en SRT, VTT o TXT. Usa SRT para edición, VTT para reproductores web y TXT cuando necesites texto limpio para leer, resumir o procesar con IA.",
    intentTitle: "¿Qué puedes hacer con YTVidHub?",
    intentSubtitle:
      "Elige el flujo de trabajo que mejor se adapte a tu tarea con subtítulos de YouTube.",
    intents: [
      {
        title: "Descargar subtítulos de YouTube",
        body: "Extrae subtítulos subidos por el creador o generados automáticamente desde videos de YouTube.",
      },
      {
        title: "Descargador de subtítulos YouTube",
        body: "Pega una URL de video, playlist o canal y exporta subtítulos sin instalar software.",
      },
      {
        title: "Descargar captions de YouTube",
        body: "Guarda pistas CC y subtítulos con tiempo para revisión, accesibilidad y publicación.",
      },
      {
        title: "Exportar SRT, VTT o TXT",
        body: "Elige el formato correcto para edición de video, reproductores web, lectura o análisis con IA.",
      },
    ],
    formatTitle: "SRT vs VTT vs TXT: elige el formato correcto",
    formatRows: [
      {
        label: "SRT",
        bestFor:
          "Editores de video, VLC, traducción, subida de subtítulos y máxima compatibilidad.",
        link: { href: "/what-is-an-srt-file", text: "Ver formato SRT" },
      },
      {
        label: "VTT",
        bestFor:
          "Video HTML5, reproductores web, cursos online y flujos de captions en navegador.",
        link: { href: "/youtube-vtt-downloader", text: "Descargar VTT" },
      },
      {
        label: "TXT",
        bestFor:
          "Texto limpio para notas, resúmenes, reutilización de contenido e IA.",
        link: { href: "/youtube-transcript-generator", text: "Generar transcripción" },
      },
    ],
    workflowTitle: "Subtítulos, captions y transcripciones",
    workflowRows: [
      {
        label: "Descargador de subtítulos",
        bestFor: "Ideal para descargar SRT/VTT desde un solo video de YouTube.",
        link: { href: "/youtube-subtitle-downloader", text: "Abrir descargador" },
      },
      {
        label: "Descargador de captions",
        bestFor: "Ideal para pistas CC, captions y revisión de accesibilidad.",
        link: { href: "/youtube-caption-downloader", text: "Abrir captions" },
      },
      {
        label: "Descarga masiva",
        bestFor: "Ideal para listas de reproducción, canales y múltiples videos.",
        link: { href: "/bulk-youtube-subtitle-downloader", text: "Abrir descarga masiva" },
      },
    ],
    linkTitle: "Herramientas enfocadas para cada tarea",
    linkBody:
      "Empieza en la página principal y usa estas páginas cuando tengas una necesidad más específica.",
    links: [
      {
        href: "/download-youtube-subtitles-online",
        text: "Descargar subtítulos online",
        body: "Flujo directo para exportar subtítulos de un video.",
      },
      {
        href: "/youtube-subtitle-downloader",
        text: "YouTube subtitle downloader",
        body: "Página enfocada en descargas SRT, VTT y TXT.",
      },
      {
        href: "/youtube-caption-downloader",
        text: "YouTube caption downloader",
        body: "Página enfocada en captions y pistas CC.",
      },
      {
        href: "/bulk-youtube-subtitle-downloader",
        text: "Descarga masiva de subtítulos",
        body: "Flujo para playlists, canales y múltiples videos.",
      },
      {
        href: "/youtube-vtt-downloader",
        text: "YouTube VTT downloader",
        body: "Página enfocada en subtítulos WebVTT.",
      },
    ],
  },
};

const getContent = (locale: Locale) => {
  if (locale === "zh") return contentByLocale.zh;
  if (locale === "es") return contentByLocale.es;
  return contentByLocale.en;
};

export default function SeoIntentSections({ locale }: { locale: Locale }) {
  const content = getContent(locale);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
            {content.badge}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {content.answerTitle}
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-700 md:text-lg">
            {content.answerBody}
          </p>
        </div>

        <div className="mt-16 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {content.intentTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {content.intentSubtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {content.intents.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <ComparisonTable title={content.formatTitle} rows={content.formatRows} />
          <ComparisonTable title={content.workflowTitle} rows={content.workflowRows} />
        </div>

        <div className="mt-16 rounded-3xl border border-slate-200 bg-slate-50/70 p-5 md:p-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              {content.linkTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
              {content.linkBody}
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {content.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_24px_-22px_rgba(15,23,42,0.5)] transition-colors hover:border-blue-200 hover:bg-white"
              >
                <h3 className="text-base font-bold leading-snug text-slate-950 group-hover:text-blue-700">
                  {link.text}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {link.body}
                </p>
                <span className="mt-4 text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                  Open tool
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonTable({
  title,
  rows,
}: {
  title: string;
  rows: ComparisonRow[];
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_16px_30px_-28px_rgba(15,23,42,0.45)]">
      <div className="border-b border-slate-200 bg-slate-50/80 px-5 py-4 md:px-6">
        <h2 className="text-lg font-bold leading-snug text-slate-950 md:text-xl">
          {title}
        </h2>
      </div>
      <div className="divide-y divide-slate-100">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-3 px-5 py-5 transition-colors hover:bg-slate-50/70 sm:grid-cols-[132px_1fr] md:px-6"
          >
            <div>
              <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-bold text-slate-950 shadow-sm">
                {row.label}
              </span>
            </div>
            <p className="text-sm leading-6 text-slate-600">
              <span>{row.bestFor}</span>
              {row.link ? (
                <>
                  {" "}
                  <Link
                    href={row.link.href}
                    className="font-semibold text-blue-600 underline decoration-blue-200 underline-offset-4 hover:text-blue-700 hover:decoration-blue-400"
                  >
                    {row.link.text}
                  </Link>
                  .
                </>
              ) : null}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
