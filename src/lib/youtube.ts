/**
 * Extract YouTube video ID from any supported URL format:
 * - youtube.com/watch?v=VIDEO_ID
 * - youtu.be/VIDEO_ID
 * - youtube.com/live/VIDEO_ID
 * - youtube.com/shorts/VIDEO_ID
 * - youtube.com/embed/VIDEO_ID
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

  // fallback
  return url.slice(-11);
}
