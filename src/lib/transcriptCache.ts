"use client";

export type TranscriptCacheRecord = {
  text: string;
  format: string;
};

export function getTranscriptCacheKey(videoUrl: string, lang: string = "en") {
  return `ytvidhub_transcript_${videoUrl}_${lang}`;
}

export function getLegacyTranscriptCacheKey(videoUrl: string) {
  return `ytvidhub_transcript_${videoUrl}`;
}

function parseTranscriptCache(raw: string | null): TranscriptCacheRecord | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as TranscriptCacheRecord;
    if (!parsed || typeof parsed.text !== "string" || typeof parsed.format !== "string") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function readTranscriptCache(videoUrl: string, lang: string = "en") {
  if (typeof window === "undefined") return null;

  const exactKey = getTranscriptCacheKey(videoUrl, lang);
  const exactRecord = parseTranscriptCache(sessionStorage.getItem(exactKey));
  if (exactRecord) return exactRecord;

  const legacyRecord = parseTranscriptCache(
    sessionStorage.getItem(getLegacyTranscriptCacheKey(videoUrl)),
  );

  if (legacyRecord) {
    try {
      sessionStorage.setItem(exactKey, JSON.stringify(legacyRecord));
    } catch {}
  }

  return legacyRecord;
}

export function writeTranscriptCache(
  videoUrl: string,
  lang: string,
  record: TranscriptCacheRecord,
) {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(
      getTranscriptCacheKey(videoUrl, lang),
      JSON.stringify(record),
    );
  } catch {}
}
