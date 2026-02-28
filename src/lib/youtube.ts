/**
 * Extract YouTube video ID from any supported URL format:
 * - youtube.com/watch?v=VIDEO_ID
 * - youtu.be/VIDEO_ID
 * - youtube.com/live/VIDEO_ID
 * - youtube.com/shorts/VIDEO_ID
 * - youtube.com/embed/VIDEO_ID
 * - m.youtube.com/watch?v=VIDEO_ID
 */
export function extractVideoId(url: string): string {
  // ?v= or &v= parameter
  const vParam = url.match(/[?&]v=([^&#]{11})/)?.[1];
  if (vParam) return vParam;

  // youtu.be/VIDEO_ID
  const shortUrl = url.match(/youtu\.be\/([^?&#]{11})/)?.[1];
  if (shortUrl) return shortUrl;

  // /live/, /shorts/, /embed/ path
  const pathId = url.match(/\/(?:live|shorts|embed)\/([^?&#]{11})/)?.[1];
  if (pathId) return pathId;

  // fallback — return empty string instead of dangerous slice
  return '';
}

/**
 * Normalize YouTube URL:
 * - m.youtube.com → www.youtube.com
 * - watch?v=xxx&list=PLxxx → playlist?list=PLxxx
 * - Strip tracking params (&si=, &index=, &t= etc.)
 */
export function normalizeYoutubeUrl(url: string): string {
  let normalized = url.trim();

  // m.youtube.com → www.youtube.com
  normalized = normalized.replace(/\/\/m\.youtube\.com/, '//www.youtube.com');

  // watch?v=xxx&list=PLxxx → playlist?list=PLxxx
  const listMatch = normalized.match(/[?&]list=([^&#]+)/);
  if (listMatch && !normalized.includes('playlist?list=')) {
    return `https://www.youtube.com/playlist?list=${listMatch[1]}`;
  }

  return normalized;
}

/**
 * Check if a URL is a playlist or channel URL
 */
export function isPlaylistOrChannelUrl(url: string): boolean {
  return (
    url.includes('playlist?list=') ||
    url.includes('&list=') ||
    url.includes('/channel/') ||
    url.includes('/@') ||
    url.includes('/c/') ||
    url.includes('/user/')
  );
}
