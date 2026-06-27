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

const contentByLocale: Record<"en" | "es" | "zh" | "tr" | "ko", LocalizedSeoContent> = {
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
        href: "/youtube-vtt-downloader",
        text: "YouTube VTT downloader",
        body: "A WebVTT-focused page for HTML5 video and web players.",
      },
      {
        href: "/what-is-vtt-file",
        text: "What is a VTT file?",
        body: "Complete guide to the WebVTT subtitle format — syntax, use cases, and free download.",
      },
      {
        href: "/youtube-transcript-downloader",
        text: "YouTube transcript downloader",
        body: "Download YouTube transcripts as TXT, SRT, or VTT — single videos, playlists, and channels.",
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

  // 韩语内容
  // 来源：基于 ko.json 现有文案，覆盖 Semrush 确认的 S 级关键词
  // 目标词：유튜브 자막 추출（4400月搜 KD15）유튜브 자막 다운로드（1900月搜 KD13）
  // 目的：修复 /ko/ 首页 Google 显示英文 description 的问题，抢占韩语低竞争市场
  ko: {
    badge: "빠른 시작 가이드",
    answerTitle: "유튜브 자막 추출 및 다운로드 방법",
    answerBody:
      "유튜브 영상, 재생목록 또는 채널 URL을 붙여넣고 원하는 언어를 선택한 후 SRT, VTT, TXT 형식으로 자막을 바로 내보내세요. 단일 영상부터 전체 재생목록 일괄 다운로드까지 지원합니다. 설치나 회원가입 없이 무료로 이용 가능합니다.",
    intentTitle: "YTVidHub로 무엇을 할 수 있나요?",
    intentSubtitle:
      "유튜브 자막 추출 목적에 맞는 워크플로우를 선택하세요.",
    intents: [
      {
        title: "유튜브 자막 추출",
        body: "유튜브 영상에서 크리에이터가 업로드한 자막 또는 자동 생성 자막을 SRT, VTT, TXT 형식으로 추출하세요. 편집, 번역, 접근성 향상, AI 학습에 활용할 수 있습니다.",
      },
      {
        title: "유튜브 자막 다운로드",
        body: "영상, 재생목록, 채널 URL을 붙여넣어 수동 복사 없이 구조화된 자막 파일을 즉시 다운로드하세요. SRT, VTT, TXT 형식을 지원합니다.",
      },
      {
        title: "재생목록 자막 일괄 다운로드",
        body: "전체 재생목록이나 채널에서 자막을 한 번에 처리하세요. 대량 자막 수집을 위한 일괄 다운로드 워크플로우입니다.",
      },
      {
        title: "SRT, VTT 또는 TXT 형식으로 내보내기",
        body: "워크플로우에 맞는 파일 형식을 선택하세요. 영상 편집에는 SRT, 웹 플레이어에는 VTT, AI 프롬프트 및 분석에는 TXT가 적합합니다.",
      },
    ],
    formatTitle: "SRT, VTT, TXT: 올바른 자막 형식 선택하기",
    formatRows: [
      {
        label: "SRT",
        bestFor:
          "영상 편집기, VLC, 자막 업로드, 번역 작업 및 광범위한 플레이어 호환성에 최적입니다.",
        link: { href: "/what-is-an-srt-file", text: "SRT 형식 알아보기" },
      },
      {
        label: "VTT",
        bestFor:
          "HTML5 동영상, 강의 플랫폼, 브라우저 재생 및 WebVTT 자막 워크플로우에 최적입니다.",
        link: { href: "/youtube-vtt-downloader", text: "VTT 자막 다운로드" },
      },
      {
        label: "TXT",
        bestFor:
          "메모, 콘텐츠 재활용, 검색, 연구 및 AI 프롬프트를 위한 타임스탬프 없는 깔끔한 텍스트입니다.",
        link: { href: "/youtube-transcript-generator", text: "트랜스크립트 생성" },
      },
    ],
    workflowTitle: "자막, 캡션, 트랜스크립트 차이점",
    workflowRows: [
      {
        label: "자막 다운로더",
        bestFor:
          "단일 유튜브 영상에서 시간 동기화된 SRT/VTT 파일이 필요할 때.",
        link: { href: "/youtube-subtitle-downloader", text: "자막 다운로더 열기" },
      },
      {
        label: "캡션 다운로더",
        bestFor:
          "CC 트랙, 폐쇄 자막 및 접근성 검토가 필요할 때.",
        link: { href: "/youtube-caption-downloader", text: "캡션 다운로더 열기" },
      },
      {
        label: "일괄 다운로더",
        bestFor:
          "재생목록, 채널, 또는 여러 영상에서 한 번에 자막을 다운로드할 때.",
        link: { href: "/bulk-youtube-subtitle-downloader", text: "일괄 다운로더 열기" },
      },
    ],
    linkTitle: "목적에 맞는 전문 자막 도구",
    linkBody:
      "메인 워크플로우는 홈페이지를 이용하고, 세부 자막 작업에 맞는 전문 페이지를 선택하세요.",
    links: [
      {
        href: "/youtube-subtitle-downloader",
        text: "유튜브 자막 다운로더",
        body: "단일 영상 다운로드를 위한 SRT/VTT/TXT 전문 도구 페이지.",
      },
      {
        href: "/bulk-youtube-subtitle-downloader",
        text: "일괄 자막 다운로더",
        body: "대용량 자막 수집을 위한 재생목록 및 채널 워크플로우.",
      },
      {
        href: "/guide/playlist-subtitles-bulk",
        text: "재생목록 자막 일괄 다운로드 가이드",
        body: "재생목록에서 자막을 한 번에 다운로드하는 단계별 가이드.",
      },
      {
        href: "/youtube-transcript-generator",
        text: "유튜브 트랜스크립트 생성기",
        body: "메모 및 AI 도구를 위해 유튜브 영상을 텍스트로 변환하세요.",
      },
    ],
  },

  // 土耳其语内容
  // 来源：基于 tr.json 现有文案风格，覆盖 GSC 高价值关键词
  // 目的：修复 /tr/ 首页 Google 显示英文 description 的问题
  tr: {
    badge: "Hızlı Rehber",
    answerTitle: "YouTube altyazılarını birkaç adımda indir",
    answerBody:
      "Bir YouTube video, oynatma listesi veya kanal bağlantısı yapıştır, mevcut dil seçeneklerinden birini seç ve altyazıları SRT, VTT veya TXT formatında dışa aktar. SRT video editörler için, VTT web oynatıcıları için, TXT ise okunabilir transkript metni için idealdir.",
    intentTitle: "YTVidHub ile neler indirebilirsiniz?",
    intentSubtitle:
      "YouTube altyazı ihtiyacınıza uygun iş akışını seçin.",
    intents: [
      {
        title: "YouTube altyazı indir",
        body: "YouTube videolarından içerik üreticisi tarafından yüklenen veya otomatik oluşturulan altyazıları düzenleme, çeviri, erişilebilirlik ve araştırma için çıkar.",
      },
      {
        title: "YouTube altyazı çıkarma",
        body: "Video, oynatma listesi veya kanal URL'si yapıştır ve manuel kopyala-yapıştır yönteminden yapılandırılmış altyazı dışa aktarmaya geç.",
      },
      {
        title: "Toplu altyazı indir",
        body: "Tüm oynatma listelerini ve kanalları tek seferde işle. Büyük altyazı koleksiyonları için toplu indirme iş akışı.",
      },
      {
        title: "SRT, VTT veya TXT olarak dışa aktar",
        body: "İş akışınıza uygun dosya türünü seçin: video editörler, web oynatıcıları, temiz notlar veya yapay zeka için hazır metin.",
      },
    ],
    formatTitle: "SRT, VTT veya TXT: doğru altyazı formatını seç",
    formatRows: [
      {
        label: "SRT",
        bestFor:
          "Video editörler, VLC, altyazı yüklemeleri, çeviri iş akışları ve geniş oynatıcı uyumluluğu için idealdir.",
        link: { href: "/what-is-an-srt-file", text: "SRT formatını öğren" },
      },
      {
        label: "VTT",
        bestFor:
          "HTML5 video, kurs platformları, tarayıcı oynatma ve WebVTT altyazı iş akışları için idealdir.",
        link: { href: "/youtube-vtt-downloader", text: "VTT altyazı indir" },
      },
      {
        label: "TXT",
        bestFor:
          "Notlar, içerik yeniden kullanımı, arama, araştırma ve yapay zeka istemleri için okunabilir transkript metni.",
        link: { href: "/youtube-transcript-generator", text: "Transkript oluştur" },
      },
    ],
    workflowTitle: "Altyazı, Altyazı CC ve Transkript farkı",
    workflowRows: [
      {
        label: "Altyazı indirici",
        bestFor:
          "Tek bir YouTube videosundan zamanlanmış SRT/VTT dosyalarına ihtiyaç duyduğunuzda.",
        link: { href: "/youtube-subtitle-downloader", text: "Altyazı indiriciyi aç" },
      },
      {
        label: "Altyazı CC indirici",
        bestFor:
          "CC parçaları, kapalı altyazılar ve erişilebilirlik incelemesine ihtiyaç duyduğunuzda.",
        link: { href: "/youtube-caption-downloader", text: "CC indiriciyi aç" },
      },
      {
        label: "Toplu indirici",
        bestFor:
          "Oynatma listelerinden, kanallardan veya birden fazla videodan altyazı indirmeniz gerektiğinde.",
        link: { href: "/bulk-youtube-subtitle-downloader", text: "Toplu indiriciyi aç" },
      },
    ],
    linkTitle: "Daha odaklı altyazı araçlarına geç",
    linkBody:
      "Ana iş akışı için ana sayfayı kullan, ardından altyazı görevinize uygun odaklanmış sayfayı seç.",
    links: [
      {
        href: "/youtube-subtitle-downloader",
        text: "YouTube altyazı indirici",
        body: "Tek video indirmeleri için SRT/VTT/TXT odaklı araç sayfası.",
      },
      {
        href: "/bulk-youtube-subtitle-downloader",
        text: "Toplu altyazı indirici",
        body: "Büyük altyazı koleksiyonları için oynatma listesi ve kanal iş akışı.",
      },
      {
        href: "/youtube-transcript-generator",
        text: "YouTube transkript oluşturucu",
        body: "Notlar ve yapay zeka araçları için herhangi bir YouTube videosunu metne dönüştür.",
      },
      {
        href: "/youtube-vtt-downloader",
        text: "YouTube VTT indirici",
        body: "HTML5 video ve web oynatıcıları için WebVTT odaklı sayfa.",
      },
    ],
  },
};

const getContent = (locale: Locale) => {
  if (locale === "zh") return contentByLocale.zh;
  if (locale === "es") return contentByLocale.es;
  if (locale === "tr") return contentByLocale.tr;
  if (locale === "ko") return contentByLocale.ko;
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
